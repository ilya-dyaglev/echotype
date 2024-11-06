import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a
    .schema({
      BookMetadata: a
          .model({
            bookId: a.id().required(), // Unique identifier for each book
            title: a.string().required(), // Title of the book
            author: a.string().required(), // Author of the book
            releaseDate: a.string().required(), // Release date in ISO 8601 format
            language: a.string().required(), // Language of the book
            license: a.string().required(), // License type of the book
            smallQuotes: a.string().array().required(), // Short quotes (50-100 characters)
            mediumQuotes: a.string().array().required(), // Medium quotes (150-200 characters)
            largeQuotes: a.string().array().required(), // Long quotes (>200 characters)
          })
          .identifier(["bookId"]), // Set bookId as the identifier
    })
    .authorization((allow) => [allow.publicApiKey()]); // Allow public access using API key (for demo)

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey", // Use API key for authorization
    apiKeyAuthorizationMode: {
      expiresInDays: 30, // Set API key to expire in 30 days
    },
  },
});

/*== Explanation ==========================================================
- **BookMetadata**: Created a `BookMetadata` model to store book metadata and content quotes.
  - **bookId**: Unique identifier for each book (`a.id().required()`).
  - **title**, **author**, **releaseDate**, **language**, **license**: All are string fields, marked as required.
  - **smallQuotes**, **mediumQuotes**, **largeQuotes**: Arrays of strings to store categorized quotes, each marked as required.
- **identifier**: Set `bookId` as the custom identifier for each record.
- **Authorization**:
  - **publicApiKey()**: Allow public access using an API key.
  - Set up an API key authorization mode that expires in 30 days.
=========================================================================*/