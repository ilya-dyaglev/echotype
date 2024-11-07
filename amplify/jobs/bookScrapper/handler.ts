import { Handler } from 'aws-lambda';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import AWS from 'aws-sdk';
import {env} from "$amplify/env/bookScrapper";

// Get the OpenAI API key from environment variables
const apiKey = env.GPT_API_SECRET || '';
if (!apiKey) {
    throw new Error("API key is missing. Ensure GPT_API_SECRET is set in .env file.");
}

// Set up the DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = env.DYNAMODB_TABLE_NAME || '';

const libraryPotential = 70000; // project Gutenberg now has more than 70000 books available
const llmCharsCap = 15000; // max number of characters to pass into openai llm

// Define the JSON schema (adapted to typescript)
const jsonSchema = {
    name: "store_book_data",
    description: "Stores book metadata and categorized quotes for a typing practice service",
    strict: true,
    schema: {
        type: "object",
        properties: {
            bookId: {type: "string", description: "The unique identifier for the book, should be a string"},
            sourceId: { type: "number", description: "The unique identifier for the source id of the book" },
            title: { type: "string", description: "The title of the book" },
            author: { type: "string", description: "The author of the book" },
            releaseDate: { type: "string", description: "The release date in ISO 8601 format" },
            language: { type: "string", description: "The language of the book" },
            license: { type: "string", description: "The license type of the book" },
            smallQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Short quotes (200-250 characters)",
            },
            mediumQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Medium quotes (300-500 characters)",
            },
            largeQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Long quotes (>500 characters)",
            },
        },
        additionalProperties: false,
        required: ["bookId", "sourceId", "title", "author", "releaseDate", "language", "license", "smallQuotes", "mediumQuotes", "largeQuotes"]
    }
};

// Helper function to generate a random book ID
const getRandomSourceId = (): number => Math.floor(Math.random() * libraryPotential) + 1;

// Function to fetch book content from Project Gutenberg
const fetchBookContent = async (sourceId: number): Promise<string> => {
    const url = `https://www.gutenberg.org/cache/epub/${sourceId}/pg${sourceId}.txt`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch book data, status: ${response.status}`);
        const text = await response.text();
        return text || "";
    } catch (error) {
        console.error("Error fetching book content:", error);
        return ""; // Return empty string to handle in caller
    }
};

// Function to get a sample from the book content
const getBookContentSample = async (sourceId: number): Promise<string> => {
    const content = await fetchBookContent(sourceId);
    return content ? content.slice(0, llmCharsCap) : "";
};

// Main Lambda function handler
export const handler: Handler = async (): Promise<string> => {
    try {
        const sourceId = getRandomSourceId();
        const bookContentSample = await getBookContentSample(sourceId);
        if (!bookContentSample) {
            console.error("No content available for the selected source ID.");
            return 'Failed to retrieve book content.';
        }

        const openai = new OpenAI({ apiKey });

        const systemMessage = "You are an API that returns JSON book content formatted for DynamoDB.";
        const userMessage = `Provide the book's metadata and categorized quotes as JSON according to the provided schema. Use the following sample content: ${bookContentSample}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: userMessage }
            ],
            response_format: { type: "json_schema", json_schema: jsonSchema }
        });

        const jsonResponse = JSON.parse(<string>response.choices[0].message.content);

        jsonResponse.releaseDate = new Date(Date.parse(jsonResponse.releaseDate)).toISOString();
        jsonResponse.bookId = Math.random().toString(36).slice(2); // generating a random stringified id
        jsonResponse.sourceUrl = `https://www.gutenberg.org/cache/epub/${sourceId}/pg${sourceId}.txt`;

        console.log("JSON response after parsing:", jsonResponse);

        // Store the book data in DynamoDB
        const params = {
            TableName: TABLE_NAME as string,
            Item: jsonResponse
        };

        await dynamoDB.put(params).promise();
        console.log("Book data successfully stored in DynamoDB.");

        return 'Book data successfully stored.';
    } catch (error) {
        console.error("Error in Lambda function:", error);
        return 'Failed to store book data.';
    }
};