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

- **Random Quote Selection**: Fetches random quotes from a collection of books to provide a unique typing experience each time.
- **Multiple Difficulty Levels**: Users can choose between short, medium, and long quotes to match their typing proficiency.
- **Real-Time Feedback**:
    - Displays correct and incorrect keystrokes.
    - Highlights the current character to be typed.
    - Updates typing statistics such as Errors, Words Per Minute (WPM), and Accuracy.
- **Progress Tracking**: Visual progress bar that shows the user's typing progress through the quote.
- **Book Information**: Displays the title, author, and release date of the book from which the quote is taken.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## **Demo**

[Live Demo](#) (Add link to live demo if available)

---

## **Installation**

### **Prerequisites**

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **AWS Amplify CLI** (if interacting with AWS backend)

### **Clone the Repository**

```bash
git clone https://github.com/yourusername/echotype.git
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

- **Header**: Contains the logo, typing mode selection, and a call-to-action.
- **Control Bar**: Use the buttons to select the typing mode:
    - **Short**: Short quotes for quick practice.
    - **Medium**: Medium-length quotes for moderate difficulty.
    - **Long**: Longer quotes for advanced practice.
- **Typing Area**:
    - Click on the typing area to focus and begin typing.
    - The quote is displayed with real-time feedback on your keystrokes.
    - Statistics are updated as you type.
- **Progress Bar**: Shows your progress through the quote.
- **Book Information**: Displays details about the book from which the quote is taken.
- **Other Quote Button**: Click to fetch a new quote from a different book.

### **Keyboard Shortcuts**

- **Backspace**: Correct mistakes by deleting the previous character.
- **Standard Shortcuts**: Browser shortcuts like `Ctrl+R` or `Cmd+R` are not blocked.

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
│   │   ├── ProgressContainer.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── ControlBar.css
│   │   ├── TypingArea.css
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

EchoType is built using React and TypeScript, following a component-based architecture. The application leverages AWS Amplify for data fetching, retrieving quotes from a backend service. The architecture emphasizes modularity, reusability, and separation of concerns, making it scalable and maintainable.

### **Component Hierarchy**

- **App.tsx**
    - **Header**
        - **Logo**
        - **ControlBar**
            - **Button**
        - **CTA**
    - **Main**
        - **TypingArea**
            - **ProgressContainer**
    - **Footer**

### **Data Flow and State Management**

- **App.tsx**: Acts as the root component and central point for state management.
    - **State Variables**:
        - `activeMode`: The current typing mode (`short`, `medium`, `long`).
        - `booksData`: The array of books fetched from the backend.
        - `currentBook`: The currently selected book.
        - `currentQuote`: The quote currently displayed for typing.
        - `loading` and `error`: For handling data fetching states.
    - **Data Fetching**:
        - Fetches book data from the backend using AWS Amplify when the component mounts.
        - Cleans the data by filtering out `null` or `undefined` quotes.
    - **Quote Selection Logic**:
        - Selects a random book and quote based on the `activeMode`.
        - Ensures that the quote type corresponds to the selected mode.
        - Provides functions to change the typing mode and select a new quote.
- **Header**:
    - **ControlBar**:
        - Allows users to change the `activeMode`.
        - Passes the selected mode back to `App.tsx` through callbacks.
    - **CTA**:
        - Displays a call-to-action message (e.g., "track your progress").
- **Main**:
    - Receives `currentQuote` and `currentBook` as props.
    - Renders the **TypingArea** and displays book information.
- **TypingArea**:
    - Manages its own state for typing logic.
        - **State Variables**:
            - `typedChars`: Array of characters with their typing status.
            - `currentCharIndex`: Index of the current character to be typed.
            - `errors`, `wpm`, `accuracy`: Typing statistics.
            - `isFocused`: Whether the typing area is focused.
            - `isFinished`: Whether the user has finished typing the quote.
    - **Event Handling**:
        - Handles keyboard events for typing.
        - Updates typing statistics and progress.
        - Manages focus state to enable or disable typing input.
    - **ProgressContainer**:
        - Displays the progress bar.
        - Updated based on `currentCharIndex` and the length of the quote.
- **Footer**:
    - Contains any footer content or links.

### **Key Design Principles**

- **Modularity**: Components are designed to be reusable and self-contained.
- **Separation of Concerns**: Logic for data fetching, state management, and UI rendering is appropriately divided.
- **Type Safety**: TypeScript is used throughout the application to ensure type safety and reduce runtime errors.
- **Performance Optimization**:
    - **Memoization**: `useMemo` and `useCallback` hooks are used to optimize performance by memoizing expensive calculations and functions.
    - **Efficient Data Handling**: Data is fetched once and reused, with unnecessary re-fetching avoided.
- **User Experience**:
    - **Responsive Design**: Ensures the application is usable on various screen sizes.
    - **Accessibility**: Focus management and keyboard event handling are implemented to improve accessibility.
    - **Real-Time Feedback**: Users receive immediate visual feedback on their typing performance.

### **Data Handling with AWS Amplify**

- **Backend Integration**:
    - Uses AWS Amplify to interact with backend services, fetching book data and quotes.
- **Data Cleaning**:
    - Filters out `null` or `undefined` values from the fetched data to maintain data integrity.
- **Error Handling**:
    - Implements error states to inform users when data fetching fails or no data is available.

### **Styling and Theming**

- **CSS Modules**:
    - Each component has its own CSS file for modular styling.
- **Theming**:
    - Consistent color schemes and fonts are used throughout the application.
- **Visual Indicators**:
    - Typing statuses (correct, incorrect, current) are visually distinguished.
    - Focused elements provide visual cues to enhance user interaction.

---

## **Technologies Used**

- **React** with **TypeScript**: For building the user interface.
- **AWS Amplify**: For data fetching and backend services.
- **CSS**: For styling components.
- **HTML5** and **ES6+ JavaScript**.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. **Create** your feature branch: `git checkout -b feature/YourFeature`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin feature/YourFeature`.
5. **Open** a pull request.

Please make sure your code adheres to the project's coding standards and includes appropriate tests.

---

## **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**

- **[Project Gutenberg](https://www.gutenberg.org/)**: The quotes and literary texts used in this application are sourced from Project Gutenberg. Project Gutenberg is a library of over 60,000 free eBooks, offering a vast collection of literary works in the public domain.

---

**Disclaimer**: This application uses content from Project Gutenberg. All the books and quotes are in the public domain. Please ensure compliance with any relevant laws and regulations when using this content.

---

## **Contact**

For any inquiries or feedback, please contact:

- **Email**: ilya.dyaglev@gmail.com
- **GitHub**: [ilya.dyaglev](https://github.com/ilya-dyaglev)

---

**Enjoy practicing your typing skills with EchoType!**

