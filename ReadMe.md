📦 DevLink Backend
DevLink is a freelance job marketplace built with the MERN stack. This repository contains the backend (server) side of the application, including APIs, authentication, job management, real-time chat, and user role management.

🔧 Tech Stack
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Socket.IO (for real-time chat)
Cloudinary (for file/image uploads)
Docker (for containerization)
dotenv (for environment configs)
CORS
Winston (logger)

📁 Folder Structure
/devlink-backend
│
├── Dockerfile              # Docker build config
├── docker-compose.yml      # Docker compose file (optional)
├── package.json
├── tsconfig.json
├── yarn.lock
├── ReadMe.md
├── node_modules/
├── .env                    # Environment variables (not committed)
│
└── /src
    ├── app.ts              # Main entry point
    ├── application/        # Core application logic (use cases, services)
    ├── domain/             # Business models and interfaces
    ├── helper/             # Common helper functions/utilities
    ├── infrastructure/     # External services, DB, route handlers
    ├── logger/             # Winston logger configuration
    ├── types/              # TypeScript types and interfaces
    ├── utils/              # Reusable utility functions
    └── dist/               # Compiled output (ignored in dev)
This layout follows Clean Architecture principles, making your backend modular, testable, and scalable.

🔑 Features
🔐 JWT-based Role Authentication (User, Client, Admin)
📤 Job Posting & Bidding System
🧑‍💼 User Profile Management (with verification)
📩 Real-Time Chat (Socket.IO)
📊 Admin Dashboard & Analytics (API only)
🌐 Secure REST API with rate limiting, CORS
📦 File upload using Cloudinary
🐳 Docker support for simplified development & deployment

🚀 Getting Started
Prerequisites
Node.js (v18+)
MongoDB Atlas or Local MongoDB
Cloudinary Account
Docker (for containerized setup, optional but recommended)

1. Clone the Repository
git clone https://github.com/yourusername/devlink-backend.git

cd devlink-backend

2. Install Dependencies
yarn install
# or
npm install

3. Create .env File
touch .env
Add the following variables:

env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000

4. Run the Development Server (Non-Docker)
yarn dev
# or
npm run dev

🐳 Running with Docker
Make sure your .env file is correctly set up.

1. Build the Docker Image
docker build -t devlink-backend .

2. Run the Container
docker run -d -p 5000:5000 --env-file .env devlink-backend
Optional: Using Docker Compose
Add this docker-compose.yml:

yaml
version: '3.8'

services:
  devlink-backend:
    build: .
    ports:
      - '5000:5000'
    env_file:
      - .env
    volumes:
      - .:/app
    restart: unless-stopped
Then run:

docker-compose up --build

Make sure MongoDB is hosted on Atlas or available via URL in .env.