# JWT Authentication System

## Overview
This project implements a complete authentication system using JWT (JSON Web Tokens).

Users can:
- Login using email and password
- Receive a JWT token
- Access protected routes
- Stay logged in after refresh
- Logout securely

---

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT + bcrypt

---

## Features
- Secure login with bcrypt password verification
- JWT token generation
- Protected routes using middleware
- Session persistence using localStorage
- Logout functionality

---

## How It Works

1. User enters email and password
2. Backend verifies credentials using bcrypt
3. JWT token is generated and sent to frontend
4. Token is stored in localStorage
5. Protected routes check for token
6. Logout removes token from storage

---

## Demo Instructions

1. Login with valid credentials
2. Check localStorage for JWT token
3. Access dashboard
4. Refresh page (session persists)
5. Logout and verify access is removed

---

## Security Note
JWT is used for stateless authentication. In this project, tokens are stored in localStorage for simplicity.

---

## Author
Jatin

Final PR update