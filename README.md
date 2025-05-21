# Wisp Chat Application

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js).  
Featuring user authentication, real-time messaging with Socket.io, image uploads with Cloudinary, and a sleek frontend UI powered by React, TailwindCSS, and Zustand state management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend API](#backend-api)
- [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Contributions](#contributions)

---

## Features

- User registration and login with JWT authentication stored in HTTP-only cookies
- User profile management including profile picture update
- Supports both text and image-based messages
- User list sidebar to select chat partners
- Socket.io integration for instant message delivery
- Secure media uploads using Cloudinary
- Interactive API documentation via Swagger (OpenAPI)

---

## Tech Stack

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- Secure JWT-based auth stored in HTTP-only cookies
- Express Rate Limit for extra protection
- Socket.io for real-time communication
- Cloudinary for image upload & hosting
- Winston for logging
- Swagger for API documentation

### Frontend

- React 19
- Vite (build tool)
- Tailwind CSS with DaisyUI for styling and changing themes
- Zustand for state management
- React Router DOM for routing
- Axios for HTTP requests
- React Hot Toast for notifications
- Socket.io-client for real-time messaging

---

## Getting Started

### Prerequisites

- Node.js (v18+) and npm/yarn
- MongoDB instance (local or cloud)
- Cloudinary account for media hosting

### Environment Variables

Create `.env` files in both backend and frontend (if needed) with:

### Backend

```
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Frontend (Optional)

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## Backend API

The backend API is RESTful and documented via Swagger/OpenAPI. The base URL is:
http://localhost:3001/api

### Authentication

- `POST /auth/signup` — Register new user
- `POST /auth/login` — Login user, returns JWT token in cookie
- `POST /auth/logout` — Logout user (clears cookie)
- `PUT /auth/update-profile` — Update user profile picture (requires auth)
- `GET /auth/check` — Get current authenticated user info

### Messaging

- `GET /messages/users` — Get all users for sidebar (requires auth)
- `GET /messages/{id}` — Get chat messages with a specific user (requires auth)
- `POST /messages/send/{id}` — Send a message to a specific user (text and/or image)

_For detailed request and response schemas, see the Swagger doc in `swagger.json`._

---

## Frontend

The frontend is located in the `/frontend` folder and powered by React + Vite.

### Key Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint checks

### Main Libraries

- React 19
- Zustand (global state management)
- React Router DOM (routing)
- Tailwind CSS + DaisyUI (styling)
- Axios (API calls)
- Socket.io-client (real-time events)

---

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/your-username/wisp-chat-app.git
cd wisp-chat-app
```

2. Start the backend

```bash
cd backend
npm install
npm run dev
```

3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

4. Access the app

- Frontend: http://localhost:5173
- Backend API: http://locahost:3001/api

## Deployment

- Deploy backend to platforms like Heroku, Render, or your VPS.
- Set environment variables for production securely.
- Frontend can be deployed on Netlify, Vercel, or any static hosting.
- Ensure backend URL in frontend .env is updated to production API URL.

## Future Improvements

Here are some planned enhancements for the Wisp Chat Application:

### Features

- Group chat functionality
- End-to-end encryption for messages
- Message reactions and replies
- Read receipts for messages
- Voice and video calling integration
- Message search functionality
- Dark/light theme toggle

### Technical Improvements

- Implement progressive web app (PWA) capabilities
- Add unit and integration testing with Jest and React Testing Library
- Improve accessibility (WCAG compliance)
- Add message pagination for better performance with large chat histories
- Implement offline mode with local storage caching
- Add TypeScript for better type safety
- Containerize application with Docker for easier deployment

_Feel free to contribute to any of these planned improvements!_

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request. Please ensure any pull requests follow the existing code style and include relevant tests if applicable.

- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request
