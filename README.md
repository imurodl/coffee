# Amaya Backend ☕️

REST API for **Amaya Roasting Co.**, a specialty-coffee e-commerce platform.
It handles authentication, product management, orders, member roles, and a
server-rendered admin panel.

🔗 **Live API**: [https://api.amaya.uz](https://api.amaya.uz)
🔗 **Storefront**: [https://amaya.uz](https://amaya.uz) ([frontend repo](https://github.com/imurodl/coffee-react))
🛠️ Built with **TypeScript**, **Express.js**, **MongoDB/Mongoose**, and **Socket.IO**

---

## 🚀 Features

- User authentication with JWT (cookie-based)
- Role-based access control (admin, user)
- Product CRUD with collections, search, and pagination
- Order system with status flow (Paused → Process → Finished)
- Image upload (Multer) and static file serving
- Real-time updates via Socket.IO
- Server-rendered admin panel (EJS) at `/admin`

---

## 🧱 Tech Stack

- **Language**: TypeScript
- **Server**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (cookie-based)
- **Realtime**: Socket.IO
- **File upload**: Multer
- **Admin panel**: EJS views served from `/admin`
- **Containerization**: Docker + Docker Compose
- **Deployment**: OCI (Ubuntu, ARM) — Docker container behind nginx

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/imurodl/coffee.git
cd coffee

# Install dependencies
npm install

# Run in development (auto-reload)
npm run start:dev

# Build and run in production
npm run build
npm run start:prod
```

The server listens on `PORT` (default `4003`).

---

## 🌱 Environment Variables

Create a `.env` file in the project root:

```env
PORT=4003
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
SECRET_TOKEN=your_jwt_secret
```

---

## ✨ Author

Built by [@imurodl](https://github.com/imurodl)
