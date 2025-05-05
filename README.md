# Amaya Backend ☕️

**Coffee** is the backend for the Amaya coffee e-commerce platform.  
It provides RESTful APIs for authentication, product management, orders, and user roles.

🔗 **Live Admin Panel**: [https://amaya.onrender.com/admin](https://amaya.onrender.com/admin)  
🛠️ Built with **Express.js**, **MongoDB**, and **REST API**

---

## 🚀 Features

- User authentication with JWT
- Role-based access control (admin, user)
- Product CRUD operations
- Order system with status flow (Paused → Processing → Finished)
- Image upload and static file serving
- RESTful API endpoints
- MongoDB integration with Mongoose
- Simple admin panel connected to the backend

---

## 🧱 Tech Stack

- **Server**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (stored in headers)
- **File Upload**: Multer
- **Frontend**: Admin panel served from `/admin`
- **Deployment**: [Render](https://render.com/)

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/imurodl/coffee.git
cd coffee

# Install dependencies
npm install

# Start the server
npm run dev
```

---

## 🌱 Environment Variables

Create a .env file in the root directory:

PORT=3007
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_session_secret
SESSION_TOKEN=your_session_token

---

## ✨ Author

Built by [@imurodl](https://github.com/imurodl)
