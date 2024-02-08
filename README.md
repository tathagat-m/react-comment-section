# React Comment Component

This is a React component for adding comments and replies with various features such as validation, sorting, editing, and deleting.

<img width="1271" alt="Screenshot 2024-02-08 at 7 20 01 PM" src="https://github.com/tathagat-m/react-comment-section/assets/101791679/f1a382c9-6560-4515-83a3-7537203b0756">

<img width="392" alt="Screenshot 2024-02-08 at 7 19 36 PM" src="https://github.com/tathagat-m/react-comment-section/assets/101791679/47191f50-af4b-4fe3-a0cf-be5e6e77dd7c">

## Features

- Validates whether the name and comment text are entered before adding a comment or reply.
- Saves each comment or reply with the current date and time.
- Comments and replies are sortable by date and time.
- Users can edit the comment/reply text by clicking on the edit button.
- Users can see '(Edited)' tag beside edited comments/replies.
- Users can view the date and time on which the comment/reply was last updated. On hovering over the timestamp, they can also see when the comment was initially added.
- Delete button is placed on the border of the comment or reply for easy access.
- Data persistence using localStorage to prevent loss of data on page refresh.

## Installation

To install and run the component locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/tathagat-m/react-comment-component.git
```

2. Navigate to the project directory:

```bash
cd react-comment-component
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

This will run the application locally. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

To use the component in your React application, you can import it and include it in your components as needed.

> *You can go to "App.js" to find the below code*

```jsx
import React from 'react';
import CommentComponent from './CommentComponent';

function App() {
  return (
    <div className="App">
      <h1>My Comment Component</h1>
      <CommentComponent />
    </div>
  );
}

export default App;
```

## Testing

To ensure the proper functioning of the application, comprehensive testing should be conducted. This includes testing all features mentioned in the requirements document:

- Validate if name and comment text are entered while adding a comment or a reply.
- Check if each comment or reply is saved with the current date and time.
- Test the sorting functionality to ensure comments and replies are sorted by date and time.
- Verify that users can only edit the comment text and not the name.
- Ensure the delete button is placed correctly and functions as expected.
- Test data persistence using web storage to confirm that data is not lost on page refresh.

## Contributions

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute this code for any purpose with proper attribution.

