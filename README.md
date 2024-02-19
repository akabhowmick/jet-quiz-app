# React TypeScript Quiz App

## Overview

This is a quiz application built using React with TypeScript for the frontend and Supabase for the backend. The app is inspired by the popular website JetPunk and allows users to make and take quizzes on various topics.

## Features

- **Quiz Taking**: Users can select from a variety of quizzes on different topics and test their knowledge.
- **Score Tracking**: The app keeps track of users' scores and displays them at the end of each quiz.
- **Leaderboards**: Users can see how their scores compare to others on the leaderboard.
- **Responsive Design**: The app is designed to be responsive and work well on both desktop and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that adds optional types to the language.
- **Supabase**: An open-source alternative to Firebase, providing real-time GraphQL APIs for your backend.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/quiz-app.git
2. Navigate to the project directory: cd quiz-app
3. Install dependencies: npm install 
4. Set up Supabase:

- Create an account on Supabase and set up a new project.
- Create tables for quizzes and leaderboard using the Supabase dashboard.
- Copy your Supabase URL and API key.

5. Set up environment variables:

Create a `.env` file in the root directory and add the following:
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_KEY=your-supabase-api-key
6. Run the app:npm start

7. Open your browser and navigate to `http://localhost:3000` to view the app.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Submit a pull request.






