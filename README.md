# DevTinder-backend

DevTinder-backend is the server-side codebase for **DevTinder**, a matchmaking platform designed for developers. It includes user authentication, connection request management (like accept, reject, ignore, and show interest), and profile updates.

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **bcrypt for password hashing**
- **CORS, other essential middleware**

## ✨ Features

- 🔐 User Signup & Login (JWT-based Authentication)
- 👤 Edit and update user profile
- 🔁 Send, accept, reject, or ignore connection requests
- 🔎 View incoming and outgoing requests
- 🚪 Secure logout
- 🧪 RESTful APIs for frontend consumption

## 📡 API Endpoints (Brief)

| Method | Endpoint                            | Description                  |
| ------ | ----------------------------------- | ---------------------------- |
| POST   | signup                              | User registration            |
| POST   | login                               | User login                   |
| GET    | /profile/view                       | Get logged-in user profile   |
| PATCH  | /profile/edit                       | Edit user profile            |
| POST   | /request/send/:status/:toUserId     | Send connection request      |
| POST   | /requests/review/:status/:requsetId | Accept/Reject request        |
| GET    | /user/requests/received             | See received request         |
| GET    | /user/connections                   | User connections             |
| GET    | /feed                               | other users card on homepage |
