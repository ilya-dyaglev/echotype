# **EchoType**

An open-source typing practice application that uses literary quotes to help users improve their typing speed and accuracy. EchoType selects random quotes from books and allows users to practice typing them, providing real-time feedback and statistics.

## **Table of Contents**

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Architecture and Design](#architecture-and-design)
    - [Frontend Architecture](#frontend-architecture)
    - [Backend Architecture](#backend-architecture)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## **Features**

- **Random Quote Selection**: Fetches random quotes from a curated collection of books to provide a unique typing experience each time.
- **Multiple Typing Modes**:
    - **Short**: Practice with short quotes for quick sessions.
    - **Medium**: Medium-length quotes for moderate difficulty.
    - **Long**: Longer quotes for advanced practice.
- **Real-Time Feedback**:
    - Displays correct and incorrect keystrokes.
    - Highlights the current character to be typed.
    - Updates typing statistics such as Errors, Words Per Minute (WPM), and Accuracy.
- **Results Screen**:
    - Upon completion, displays a detailed results screen with typing statistics.
    - Provides interactive graphs showing typing speed and accuracy over time.
- **Keyboard Shortcuts**:
    - **Fetch New Quote**: Quickly fetch a new quote using a keyboard shortcut (e.g., `Tab` key).
- **Book Filtering and Selection**:
    - **Filter Books**:
        - Filter available books based on **Title**, **Author**, or **Language**.
        - Multi-select support for filtering by multiple titles, authors, or languages.
    - **Browse and Select Books**:
        - View a list of available books after applying filters.
        - Select a specific book to practice typing quotes exclusively from that book.
    - **Reset Filters**: Easily reset all filters to default settings.
- **Progress Tracking**:
    - Visual progress bar showing your typing progress through the quote.
    - Typing statistics updated in real-time.
- **Book Information**:
    - Displays detailed information about the book, including title, author, language, and release date.
- **Feedback Submission**:
    - **User Feedback Modal**:
        - Allows users to submit feedback directly from the application.
        - Feedback is stored securely in the backend for further review.
    - **Data Privacy**:
        - Users must agree to the processing of personal data before submitting feedback.
        - Feedback includes a unique ID and timestamp but does not require user authentication.
- **Loading Animation**:
    - An animated loading screen provides visual feedback during data fetching.
- **Performance Optimization**:
    - Utilizes React's `useMemo` and `useCallback` hooks for efficient rendering.
    - Memoization of computations and functions to enhance performance.
- **Accessibility**:
    - Focus management and keyboard event handling improve accessibility.

---

## **Demo**

[Live Demo](https://echotype.io)

---

## **Installation**

### **Prerequisites**

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **AWS Amplify CLI** (if interacting with AWS backend)

### **Clone the Repository**

```bash
git clone https://github.com/ilya-dyaglev/echotype.git
cd echotype
```

### **Install Dependencies**

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### **Configure AWS Amplify**

If you plan to use AWS Amplify for data fetching and backend services, configure it by initializing Amplify:

```bash
amplify init
```

Follow the prompts to set up your AWS configuration.

---

## **Usage**

### **Running the Application**

To start the development server:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The application will run on `http://localhost:3000` by default.

### **Navigating the Application**

- **Header**:
    - Contains the logo, typing mode selection, and a call-to-action.
    - Includes buttons to open the filter modal or fetch a new quote.
- **Control Bar**:
    - Use the buttons to select the typing mode:
        - **Short**
        - **Medium**
        - **Long**
- **Typing Area**:
    - Click on the typing area to focus and begin typing.
    - The quote is displayed with real-time feedback on your keystrokes.
    - Statistics are updated as you type.
- **Results Screen**:
    - Displays your typing statistics upon completion.
    - Provides interactive graphs showing typing speed and accuracy over time.
    - Options to retake the test.
- **Filter Modal**:
    - Accessed via the "Browse Books" button.
    - **Features**:
        - **Title, Author, and Language Filters**:
            - Multi-select filters to narrow down books.
        - **Available Books Section**:
            - Displays books matching the applied filters.
            - Select a specific book to practice with quotes exclusively from that book.
        - **Reset Filters**:
            - Quickly reset all filters to default settings.
    - **How to Use**:
        1. Click "Browse Books" to open the filter modal.
        2. Select titles, authors, or languages to filter the books.
        3. View the available books in the list.
        4. Optionally select a specific book from the list.
        5. Click "Apply Filters" to update the quotes based on your selection.
- **Feedback Submission**:
    - Accessed via the "Feedback" option in the footer.
    - **How to Submit Feedback**:
        1. Click on the "Feedback" link in the footer.
        2. A modal will appear prompting you to enter your feedback.
        3. Provide your feedback in the text area.
        4. Check the box to agree to the processing of your personal data.
        5. Click "Submit Feedback" to send your feedback.
- **Progress Bar**:
    - Shows your progress through the quote.
- **Book Information**:
    - Displays details about the current book, including title, author, language, and release date.
- **Other Quote Button**:
    - Click to fetch a new quote, optionally from a different book if no specific book is selected.

### **Keyboard Shortcuts**

- **Fetch New Quote**:
    - Press the `Tab` key to fetch a new quote.
- **Backspace**:
    - Correct mistakes by deleting the previous character.
- **Standard Shortcuts**:
    - Browser shortcuts like `Ctrl+R` or `Cmd+R` are not blocked.

### **Graph Interactions**

- **Hover over graphs**:
    - Tooltips display detailed information at each data point.
- **Graphs**:
    - **Typing Speed Over Time**: Shows WPM progression.
    - **Accuracy Over Time**: Shows accuracy percentage over time.

---

## **Project Structure**

```
echotype/
├── amplify/
│   ├── backend/
│   │   ├── data/
│   │   │   └── resource.ts
│   │   ├── jobs/
│   │   │   └── bookScrapper/
│   │   │       ├── handler.ts
│   │   │       └── resource.ts
│   │   └── backend.ts
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ControlBar.tsx
│   │   ├── Button.tsx
│   │   ├── CTA.tsx
│   │   ├── Main.tsx
│   │   ├── TypingArea.tsx
│   │   ├── Results.tsx
│   │   ├── FilterModal.tsx
│   │   ├── FeedbackModal.tsx
│   │   ├── CustomTable.tsx
│   │   ├── ProgressContainer.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── ControlBar.css
│   │   ├── TypingArea.css
│   │   ├── Results.css
│   │   ├── FilterModal.css
│   │   ├── FeedbackModal.css
│   │   ├── CustomTable.css
│   │   └── Main.css
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── package.json
└── README.md
```

- **amplify/**: Contains AWS Amplify backend configurations and resources.
- **components/**: Contains all React components used in the application.
    - **FeedbackModal.tsx**: Component for the feedback submission modal.
- **styles/**: Contains CSS files for styling the components.
- **types.ts**: TypeScript definitions for shared types, such as `FeedbackData`.
- **App.tsx**: The main application component that manages state and data fetching.
- **main.tsx**: Entry point of the React application.

---

## **Architecture and Design**

### **Overview**

EchoType is built using React and TypeScript on the frontend and AWS Amplify for backend services. The application leverages AWS services such as DynamoDB and Lambda functions to store and process data. The architecture emphasizes modularity, scalability, and maintainability.

### **Frontend Architecture**

- **Component-Based Structure**: React components are organized logically to promote reusability and separation of concerns.
- **State Management**: Uses React hooks like `useState`, `useEffect`, `useMemo`, and `useCallback` for efficient state and side-effect management.
- **Data Fetching**: Integrates with AWS Amplify to fetch data from the backend services.
- **Feedback Submission**:
    - **FeedbackModal Component**:
        - Allows users to submit feedback via a modal form.
        - Validates user input and ensures data privacy compliance.
        - Utilizes TypeScript interfaces (`FeedbackData`) for type safety.
    - **Integration in App.tsx**:
        - The `handleFeedbackSubmit` function processes the feedback data and sends it to the backend.
        - Feedback is stored in the `FeedbackData` table in DynamoDB.
- **Performance Optimization**:
    - Memoization of computations and functions to prevent unnecessary re-renders.
    - Referential stability of functions and data using React hooks.

### **Backend Architecture**

#### **Overview**

The backend is built using AWS Amplify and consists of several AWS services:

- **AWS Lambda Functions**: For serverless compute, handling tasks like data processing and scheduled jobs.
- **AWS DynamoDB**: A NoSQL database for storing book metadata, quotes, and user feedback.
- **AWS Amplify**: Simplifies the process of configuring AWS services and integrates them with the frontend.

#### **Backend Structure**

```
amplify/
├── backend.ts
├── data/
│   └── resource.ts
└── jobs/
    └── bookScrapper/
        ├── handler.ts
        └── resource.ts
```

- **backend.ts**: The main configuration file that defines backend resources.
- **data/**: Contains data models and schema definitions.
- **jobs/**: Contains AWS Lambda functions for scheduled jobs, such as the book scraper.

#### **AWS Amplify Backend Setup**

##### **backend.ts**

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { bookScrapper } from './jobs/bookScrapper/resource';

export const backend = defineBackend({
  data,
  bookScrapper,
});
```

- **Purpose**: Defines the backend resources using AWS Amplify.
- **Resources**:
    - **data**: Data models and storage configurations.
    - **bookScrapper**: Scheduled job to populate the database with book data.

#### **Data Schema**

##### **data/resource.ts**

Defines the data models and schemas used in the application.

```typescript
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  BookMetadata: a.model({
    bookId: a.id().required(),
    sourceId: a.integer().required(),
    sourceUrl: a.string().required(),
    title: a.string().required(),
    author: a.string().required(),
    releaseDate: a.datetime().required(),
    language: a.string().required(),
    license: a.string().required(),
    smallQuotes: a.string().array().required(),
    mediumQuotes: a.string().array().required(),
    largeQuotes: a.string().array().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).identifier(['bookId']),
  FeedbackData: a.model({
    feedbackId: a.string().required(),
    userId: a.string().nullable(),
    emailDestination: a.string().required(),
    feedbackContent: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).identifier(['feedbackId']),
}).authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
```

- **Models**:
    - **BookMetadata**: Stores metadata and quotes for books.
        - Fields: `bookId`, `sourceId`, `sourceUrl`, `title`, `author`, `releaseDate`, `language`, `license`, `smallQuotes`, `mediumQuotes`, `largeQuotes`, `createdAt`, `updatedAt`.
    - **FeedbackData**: Stores user feedback submissions.
        - Fields: `feedbackId`, `userId` (nullable), `emailDestination`, `feedbackContent`, `createdAt`, `updatedAt`.
- **Authorization**:
    - Allows public access using an API key (for demo purposes).
    - API key is set to expire in 30 days.

#### **Feedback Submission Flow**

- **Frontend**:
    - **FeedbackModal Component**:
        - Collects feedback content and ensures the user agrees to data processing.
        - Generates a unique `feedbackId` using UUID.
        - Captures timestamps for `createdAt` and `updatedAt`.
        - Submits the feedback data to the `handleFeedbackSubmit` function in `App.tsx`.
- **Backend**:
    - **Data Storage**:
        - Feedback data is stored in the `FeedbackData` DynamoDB table.
        - Includes fields like `feedbackId`, `userId` (set to `null` if not authenticated), and `feedbackContent`.
    - **Security**:
        - Data is transmitted securely via AWS Amplify's API.
        - No personal user data is stored unless provided in the feedback content.

#### **Scheduled Job: Book Scraper**

A scheduled AWS Lambda function that fetches book data and populates the DynamoDB table.

##### **jobs/bookScrapper/handler.ts**

- **Functionality**:
    - Fetches random book content from Project Gutenberg.
    - Processes content with OpenAI GPT to generate structured book metadata and quotes.
    - Stores data in DynamoDB.

##### **jobs/bookScrapper/resource.ts**

- **Purpose**: Configures the Lambda function to run on a schedule (every 15 minutes).
- **Environment Variables**:
    - **GPT_API_SECRET**: OpenAI API key.
    - **DYNAMODB_TABLE_NAME**: DynamoDB table name.
- **Timeout**: Sets the function timeout to 120 seconds.

#### **AWS Resources Used**

- **AWS Lambda**: Runs serverless functions for data processing and scheduled tasks.
- **AWS DynamoDB**: Stores book metadata, quotes, and user feedback.
- **AWS Amplify**: Orchestrates the configuration and deployment of AWS resources.

#### **Security and Authorization**

- **Public API Key**: For demo purposes, the application uses a public API key for accessing data.
- **Environment Variables**: Sensitive information like API keys are stored securely and accessed via environment variables.
- **Data Privacy**:
    - Users must agree to data processing before submitting feedback.
    - Feedback data is stored securely and only includes personal information if provided by the user.

---

## **Technologies Used**

- **React** with **TypeScript**: For building the user interface.
- **AWS Amplify**: For backend services, including data storage and serverless functions.
- **AWS Lambda**: For running serverless functions.
- **AWS DynamoDB**: For NoSQL database storage.
- **OpenAI GPT**: For generating book metadata and quotes.
- **Recharts**: For rendering interactive graphs and charts.
- **Material-UI (MUI)**: For UI components and styling.
- **UUID**: For generating unique identifiers.
- **Day.js**: For date and time formatting.
- **CSS**: For custom styling.
- **HTML5** and **ES6+ JavaScript**.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. **Create** your feature branch: `git checkout -b feature/YourFeature`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin feature/YourFeature`.
5. **Open** a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate documentation and tests.

---

## **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**

- **[Project Gutenberg](https://www.gutenberg.org/)**: The quotes and literary texts used in this application are sourced from Project Gutenberg, a library of over 70,000 free eBooks in the public domain.
- **[OpenAI](https://openai.com/)**: Utilized for generating book metadata and quotes using GPT models.
- **Contributors**: Thanks to all contributors who have helped improve EchoType.

---

## **Contact**

For any inquiries or feedback, please contact:

- **Email**: [idyaglev@echotype.io](mailto:idyaglev@echotype.io)
- **GitHub**: [ilya-dyaglev](https://github.com/ilya-dyaglev)

---

**Enjoy practicing your typing skills with EchoType!**