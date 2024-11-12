# **EchoType**

An open-source typing practice application that uses literary quotes to help users improve their typing speed and accuracy. EchoType selects random quotes from books and allows users to practice typing them, providing real-time feedback and statistics.

## **Table of Contents**

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Architecture and Design](#architecture-and-design)
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
- **Loading Animation**:
    - An animated loading screen provides visual feedback during data fetching.
- **Responsive Design**:
    - Optimized for both desktop and mobile devices.
- **Performance Optimization**:
    - Utilizes React's `useMemo` and `useCallback` hooks for efficient rendering.
    - Memoization of computations and functions to enhance performance.
- **Accessibility**:
    - Focus management and keyboard event handling improve accessibility.
    - Visual indicators and ARIA attributes enhance user experience for all users.

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

### **Configure AWS Amplify (Optional)**

If you plan to use AWS Amplify for data fetching, configure it by initializing Amplify:

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
    - Options to retake the test or sign in to track progress.
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
│   │   ├── CustomTable.css
│   │   └── Main.css
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── package.json
└── README.md
```

- **components/**: Contains all React components used in the application.
- **styles/**: Contains CSS files for styling the components.
- **App.tsx**: The main application component that manages state and data fetching.
- **index.tsx**: Entry point of the React application.

---

## **Architecture and Design**

### **Overview**

EchoType is built using React and TypeScript, following a component-based architecture. The application leverages AWS Amplify for data fetching, retrieving quotes from a backend service. The architecture emphasizes modularity, reusability, and separation of concerns, making it scalable and maintainable. Recent enhancements include:

- **Filter Modal with Advanced Filtering**:
    - Multi-select support for titles, authors, and languages.
    - Optimized with `useMemo` and `useCallback` for performance.
    - Abstracted filtering logic to enable easy addition of new filters in the future.
- **Performance Optimizations**:
    - Memoization of computations and functions to prevent unnecessary re-renders.
    - Ensured referential stability of functions and data using React hooks.
- **Bug Fixes and Improvements**:
    - Addressed issues with quote selection logic to ensure quotes are selected only from filtered books or a specifically selected book.
    - Implemented state management enhancements to maintain consistent behavior.

### **Component Hierarchy**

- **App.tsx**
    - **Header**
        - **Logo**
        - **ControlBar**
            - **Button**
        - **CTA**
    - **Main**
        - **TypingArea** (conditionally rendered)
        - **Results** (conditionally rendered)
            - **Graphs** (using Recharts)
    - **FilterModal** (conditionally rendered)
        - **CustomTable**
    - **Footer**

### **Data Flow and State Management**

- **App.tsx**: Central point for state management.
    - **State Variables**:
        - `activeMode`: Current typing mode (`short`, `medium`, `long`).
        - `booksData`: Array of books fetched from the backend.
        - `filteredBooksData`: Books after applying filters.
        - `currentBook`: Currently selected book (can be `null` if no specific book is selected).
        - `currentQuote`: The quote currently displayed for typing.
        - `loading`, `error`: For handling data fetching states.
        - `isFilterModalOpen`: Controls the visibility of the filter modal.
        - `progress`: Tracks loading progress.
    - **Data Fetching**:
        - Fetches book data from the backend using AWS Amplify on component mount.
        - Cleans the data by filtering out `null` or `undefined` quotes.
    - **Quote Selection Logic**:
        - **`selectRandomQuote` Function**:
            - Selects a random book and quote based on `activeMode` and applied filters.
            - Ensures the quote type corresponds to the selected mode.
            - Handles cases where the selected book does not have quotes of the desired type.
        - **State Updates**:
            - Uses `useEffect` to select a new quote when filters or `activeMode` change.
            - Resets `currentBook` if it no longer matches the applied filters.
- **FilterModal**:
    - **Features**:
        - **Multi-Select Filters**:
            - Title, Author, and Language fields support multiple selections.
        - **Available Books Section**:
            - Displays books matching the applied filters.
            - Users can select a specific book.
        - **Reset Filters**:
            - Clears all selected filters.
    - **Optimization**:
        - **Memoization**:
            - Uses `useMemo` and `useCallback` to optimize expensive computations and functions.
        - **Abstracted Filtering Logic**:
            - Created a generic `computeFilteredOptions` function to handle filtering.
            - Reduces code duplication and simplifies adding new filters.
        - **Referential Stability**:
            - Ensures function and data references remain stable to prevent unnecessary re-renders.
- **Other Components**:
    - **TypingArea**:
        - Manages typing logic and statistics.
        - Provides real-time feedback and updates.
    - **Results**:
        - Displays detailed typing statistics and interactive graphs.
    - **CustomTable**:
        - Used in `FilterModal` to display the list of available books.
        - Handles selection of a specific book.
    - **Header**, **Footer**, **Main**:
        - Organize the layout and provide navigation and additional information.

### **Key Design Principles**

- **Modularity and Reusability**:
    - Components are designed to be self-contained and reusable.
- **Separation of Concerns**:
    - Logic for data fetching, state management, and UI rendering is appropriately divided.
- **Type Safety and Code Quality**:
    - TypeScript is used throughout to ensure type safety.
    - Linter and formatter configurations enforce coding standards.
- **Performance Optimization**:
    - **Memoization**:
        - `useMemo` and `useCallback` are extensively used.
        - Memoized computations and functions prevent unnecessary re-renders.
    - **Referential Stability**:
        - Ensured by avoiding inline functions and objects in JSX.
        - Functions and data passed to child components maintain stable references.
- **User Experience Enhancements**:
    - **Filter Modal Usability**:
        - Users can easily filter and browse books.
        - The reset filters button enhances usability.
    - **Accessibility**:
        - Focus management and keyboard interactions are implemented.
        - Visual indicators provide feedback on interactive elements.
    - **Visual Feedback**:
        - Loading animations and progress indicators enhance the experience.

---

## **Technologies Used**

- **React** with **TypeScript**: For building the user interface.
- **AWS Amplify**: For data fetching and backend services.
- **Recharts**: For rendering interactive graphs and charts.
- **Material-UI (MUI)**: For UI components and styling.
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
- **Contributors**: Thanks to all contributors who have helped improve EchoType.

---

## **Contact**

For any inquiries or feedback, please contact:

- **Email**: ilya.dyaglev@gmail.com
- **GitHub**: [ilya-dyaglev](https://github.com/ilya-dyaglev)

---

**Enjoy practicing your typing skills with EchoType!**