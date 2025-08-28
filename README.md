🔒 Vigilent – Your Personal Privacy Dashboard

Vigilent is a full-stack privacy and security dashboard built with the MERN stack. It brings together modern tools to help users analyze, monitor, and protect their digital footprint in real time.

✨ Features

✅ Email Breach Check – Verify if your email has appeared in known data breaches.
✅ Fake Email Generator – Create disposable, anonymous emails to protect your identity.
✅ Permission Monitor – Track and revoke site permissions (camera, mic, location).
✅ Tracker Scanner – Detect and analyze trackers hidden in websites.
✅ Fingerprint Analyzer – Reveal how unique and trackable your browser/device setup is.
✅ Password Vault – Securely store passwords with AES-256 encryption.

🚀 Tech Stack

Frontend: React, TailwindCSS, Framer Motion
Backend: Node.js, Express
Database: MongoDB
Auth: JWT + React Context
Security: AES-256, PBKDF2, external privacy APIs

🖥️ Live Demo

🔗https://vigilent-weld.vercel.app/

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/twinklekhandekar/vigilent.git
cd vigilent

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app


Run the backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🌍 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🔐 Environment Variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app

✅ Roadmap / Future Enhancements

🔔 Real-time permission monitoring

📊 Privacy Score calculation

🌙 Dark Mode & PWA Support

🔒 OAuth Login (Google/GitHub)

🧪 Automated Unit & Integration Tests

🏗️ Author

👩‍💻 Twinkle Khandekar
📌 GitHub
 | LinkedIn

⭐ Support

If you like this project, give it a star ⭐ on GitHub!
