# BOOM Entertainment Full Stack App

This is a full-stack video streaming platform built for the BOOM Entertainment assignment challenge. It allows creators to upload videos, users to watch and purchase long-form content, gift creators, and interact via comments.

---

## 🧱 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS**
- **Axios**
- **React Router**
- **React Player**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **Multer** (file uploads)
- **dotenv**, **cors**, **nodemon**

---

## 🚀 Features
- User registration & login (no JWT used in this version)
- Short-form and long-form video uploads
- Unified scrolling feed (with autoplay for short-form)
- Simulated wallet system (₹500 starting balance)
- Purchase long-form videos
- Gift creators
- Comment on videos

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/boom-entertainment.git
cd boom-entertainment
```

### 2. Setup Environment Variables
Create a `.env` file inside `/server`:
```env
MONGO_URI=your-mongodb-uri
PORT=5000
```
> Make sure to URL-encode any special characters in your MongoDB password.

### 3. Install dependencies
```bash
# Root
npm install

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 4. Run the app
At the root:
```bash
npm run dev
```
- React frontend: `http://localhost:5173`
- Express backend: `http://localhost:5000`

---

## 📡 API Documentation

### Auth
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | /api/auth/register | Register user       |
| POST   | /api/auth/login    | Login user          |

### Videos
| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | /api/videos/upload          | Upload short/long-form video         |
| GET    | /api/videos/feed            | Get all videos (scrolling feed)      |
| POST   | /api/videos/:id/watch       | Watch video (loads by ID)            |
| POST   | /api/videos/:id/purchase    | Purchase long-form video             |
| POST   | /api/videos/:id/comment     | Add comment                          |
| POST   | /api/videos/:id/gift        | Gift creator with a mock amount      |

### Users
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | /api/users       | Placeholder route    |

---

## 🧪 Testing
Use Postman or Thunder Client to test:
- Register/Login users
- Upload videos
- Simulate purchases and gifting

---

## 📦 Deployment
You can deploy this app using:
- **Frontend**: Vercel / Netlify (build from `/client`)
- **Backend**: Render / Railway (start from `/server`)
- Be sure to configure environment variables in both services.

---

## 👨‍💻 Author
Built by [Your Name] — for the BOOM Entertainment challenge. Feel free to fork and customize.

---

## 📜 License
MIT License
