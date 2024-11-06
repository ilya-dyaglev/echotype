import { Handler } from 'aws-lambda';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import AWS from 'aws-sdk';

// Load environment variables
dotenv.config();

// Get the OpenAI API key from environment variables
const apiKey = process.env.GPT_API_SECRET || '';
if (!apiKey) {
    throw new Error("API key is missing. Ensure GPT_API_SECRET is set in .env file.");
}

// Set up the DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || '';

// Define the JSON schema (adapted to typescript)
const jsonSchema = {
    name: "store_book_data",
    description: "Stores book metadata and categorized quotes for a typing practice service",
    strict: true,
    schema: {
        type: "object",
        properties: {
            bookId: { type: "string", description: "The unique identifier for the book" },
            title: { type: "string", description: "The title of the book" },
            author: { type: "string", description: "The author of the book" },
            releaseDate: { type: "string", format: "date-time", description: "The release date in ISO 8601 format" },
            language: { type: "string", description: "The language of the book" },
            license: { type: "string", description: "The license type of the book" },
            smallQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Short quotes (50-100 characters)",
            },
            mediumQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Medium quotes (150-200 characters)",
            },
            largeQuotes: {
                type: "array",
                items: { type: "string" },
                description: "Long quotes (>200 characters)",
            },
        },
        additionalProperties: false,
        required: ["bookId", "title", "author", "releaseDate", "language", "license", "smallQuotes", "mediumQuotes", "largeQuotes"]
    }
};

// Helper function to generate a random book ID
const getRandomBookId = (): number => Math.floor(Math.random() * 150) + 1;

// Function to fetch book content from Project Gutenberg
const fetchBookContent = async (bookId: number): Promise<string> => {
    const url = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;
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
const getBookContentSample = async (bookId: number): Promise<string> => {
    const content = await fetchBookContent(bookId);
    return content ? content.slice(1000, 10000) : "";
};

// Main Lambda function handler
export const handler: Handler = async (): Promise<string> => {
    try {
        const bookId = getRandomBookId();
        const bookContentSample = await getBookContentSample(bookId);
        if (!bookContentSample) {
            console.error("No content available for the selected book ID.");
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
        console.log("JSON response:", jsonResponse);

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