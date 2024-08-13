# Entertainment App

## Overview

This project is a full-stack application developed to allow the users to add bookmarks, watch trailers, see a list of trending movies/tvseriex and so on. The project utilizes MongoDB data storage, Node.js with Express.js for server-side operations, and React.js for the frontend interface.

## Key Features

1. **Backend**

   - Node.js project using Express.js framework.
   - APIs for user signup, login, movie/TV series retrieval, searching, and bookmarking.
   - JWT authentication for secure access to user-specific data.

2. **Frontend**
   - React.js used to build a responsive, user-friendly interface.
   - Signup and login pages.
   - Homepage with trending and recommended sections.
   - Dynamic search functionality for movies and TV series.
   - Bookmark page to manage favorite movies/TV series.
   - Redux Toolkit implemented to manage state across the application.

## TechStack

- Frontend -> React, Tailwind, Redux-Toolkit
- Backend -> Express.js,
- Database -> MongoDb

## Acknowledgement

- TMDB for Media data

## Installation

### Prerequisites

- Node.js
- MongoDB Atlas Account
- TMDB API Key

### Backend Setup

1. Clone the repository.

   ```bash
   git clone https://github.com/your-username/movie-tv-db.git
   cd movie-tv-db/backend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:

   ```
   MONGODB_URI=<Your MongoDB Atlas URI>
   JWT_SECRET=<Your JWT Secret>
   TMDB_API_KEY=<Your TMDB API Key>
   ```

4. Start the server.
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory.

   ```bash
   cd ../frontend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the development server.
   ```bash
   npm start
   ```

## API Documentation

Detailed API documentation is available in the Postman collection included in the repository. This documentation covers all endpoints, including user authentication, movie/TV series retrieval, and bookmark management. You can access the documentation [here](https://documenter.getpostman.com/view/34641929/2sA3s4kAHk).

## Deployment

The project is deployed on Render, making it live and accessible. You can access the live project [here](https://entertainment-app-sandy.vercel.app/).

Feel free to explore the codebase and reach out if you have any questions or suggestions!

```
                #Have a Nice Day. Thank you :)
```
