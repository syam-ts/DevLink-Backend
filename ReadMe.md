<h2>📦 DevLink Backend</h2>
<p>DevLink is a freelance job marketplace built with the MERN stack. This repository contains the backend (server) side of the application, including APIs, authentication, job management, real-time chat, and user role management.</p>

<h2>🔧 Tech Stack</h2>
<ul>
<li></li> 
</ul>
<li>Node.js</li> 
<li>Express.js</li> 
<li>MongoDB & Mongoose</li> 
<li>JWT Authentication</li> 
<li>Socket.IO (for real-time chat)</li> 
<li>Cloudinary (for file/image uploads)</li> 
<li>Docker (for containerization)</li> 
<li>dotenv (for environment configs)</li> 
<li>CORS</li> 
<li>Winston (logger)</li> 

<h2>📁 Folder Structure</h2>

<pre>
/devlink-backend
|
├── <b>Dockerfile</b>              # Docker build config
├── <b>docker-compose.yml</b>      # Docker compose file (optional)
├── <b>package.json</b>
├── <b>tsconfig.json</b>
├── <b>yarn.lock</b>
├── <b>ReadMe.md</b>
├── <b>node_modules/</b>
├── <b>.env</b>                    # Environment variables (not committed)
|
└── <b>/src</b>
    ├── <b>app.ts</b>              # Main entry point
    ├── <b>application/</b>        # Core application logic (use cases, services)
    ├── <b>domain/</b>             # Business models and interfaces
    ├── <b>helper/</b>             # Common helper functions/utilities
    ├── <b>infrastructure/</b>     # External services, DB, route handlers
    ├── <b>logger/</b>             # Winston logger configuration
    ├── <b>types/</b>              # TypeScript types and interfaces
    ├── <b>utils/</b>              # Reusable utility functions
    └── <b>dist/</b>               # Compiled output (ignored in dev)
</pre>

<p>
This layout follows <strong>Clean Architecture principles</strong>, making your backend modular, testable, and scalable.
</p>

<h2>🔑 Features</h2>
<ul>
  <li>🔐 JWT-based Role Authentication (User, Client, Admin)</li>
  <li>📤 Job Posting & Bidding System</li>
  <li>🧑‍💼 User Profile Management (with verification)</li>
  <li>📩 Real-Time Chat (Socket.IO)</li>
  <li>📊 Admin Dashboard & Analytics (API only)</li>
  <li>🌐 Secure REST API with rate limiting, CORS</li>
  <li>📦 File upload using Cloudinary</li>
  <li>🐳 Docker support for simplified development & deployment</li>
</ul>

<hr />

<h2>🚀 Getting Started</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18+)</li>
  <li>MongoDB Atlas or Local MongoDB</li>
  <li>Cloudinary Account</li>
  <li>Docker (for containerized setup, optional but recommended)</li>
</ul>

<h3>📥 1. Clone the Repository</h3>
<pre><code>git clone https://github.com/yourusername/devlink-backend.git
cd devlink-backend
</code></pre>

<h3>📦 2. Install Dependencies</h3>
<pre><code>
yarn install
</code></pre>

<h3>⚙️ 3. Create .env File</h3>
<pre><code>touch .env
</code></pre>
<p>Add the following variables:</p>
<pre><code>
PORT=3000 
MONGO_URI=your_mongo_db_connection_string
FRONTEND_ORIGIN=https://your-frontend-url.com
BACKEND_ORIGIN=http://localhost:3000
STRIPE_CUSTOMER_EMAIL=your_stripe_customer_email
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
GROQ_API_KEY=your_groq_api_key
ADMIN_OBJECT_ID=your_admin_mongodb_object_id
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=your_admin_password
BCRYPT_SALT=10
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_SECRET=your_access_token_secret

</code></pre>

<h3>▶️ 4. Run the Development Server (Non-Docker)</h3>
<pre><code>yarn dev
</code></pre>

<hr />

<h2>🐳 Running with Docker</h2>
<p>Make sure your <code>.env</code> file is correctly set up.</p>

<h3>1. Build the Docker Image</h3>
<pre><code>docker build -t devlink-backend .
</code></pre>

<h3>2. Run the Container</h3>
<pre><code>docker run -d -p 5000:5000 --env-file .env devlink-backend
</code></pre>

<h3>⚙️ Optional: Using Docker Compose</h3>
<p>Add this <code>docker-compose.yml</code>:</p>

<pre><code class="language-yaml">version: '3.8'

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
</code></pre>

<p>Then run:</p>
<pre><code>docker-compose up --build
</code></pre>

<p><strong>Note:</strong> Make sure MongoDB is hosted on Atlas or accessible via <code>MONGO_URI</code> in your <code>.env</code> file.</p>
