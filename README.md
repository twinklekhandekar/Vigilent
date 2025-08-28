🔒 Vigilent – Your Personal Privacy Dashboard

Vigilent is a full-stack privacy and security dashboard built with the MERN stack. It brings together modern tools to help users analyze, monitor, and protect their digital footprint in real time.

✨ Features

✔ 📧 Email Breach Check – Verify if your email has appeared in known data breaches.
✔ 🕵️ Fake Email Generator – Create disposable, anonymous emails to protect your identity.
✔ 🔐 Permission Monitor – Track and revoke site permissions (camera, mic, location).
✔ 📡 Tracker Scanner – Detect and analyze trackers hidden in websites.
✔ 🧬 Fingerprint Analyzer – Reveal how unique and trackable your browser/device setup is.
✔ 🗄️ Password Vault – Securely store passwords with AES-256 encryption.

Try Demo
https://vigilent-weld.vercel.app/

🚀 Tech Stack

Frontend: React, TailwindCSS, Framer Motion

Backend: Node.js, Express

Database: MongoDB

Auth: JWT + React Context

Security: AES-256, PBKDF2, External Privacy APIs


🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/twinklekhandekar/vigilent.git
cd vigilent

2️⃣ Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app

4️⃣ Run the app locally
# Backend
npm run dev

# Frontend
npm start

🌍 Live Demo

👉 Frontend: https://your-frontend.vercel.app

👉 Backend API: https://vigilent.onrender.com

⭐ Contribute & Support

Star ⭐ the repo if you like this project

Fork & contribute via Pull Requests

📬 Contact

Made with ❤️ by Twinkle Khandekar
