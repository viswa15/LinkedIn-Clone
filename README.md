# Linkedin-Clone

## 🛠️ Stack Used

- **Frontend:** React, TypeScript, Zustand, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** Vite (for frontend build), Zustand (state management)

---

## 🚀 Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/your-username/Linkedin-Clone.git
cd Linkedin-Clone
```

### 2. Backend Setup

```sh
cd backend
npm install
# Create a .env file and add your MongoDB URI and JWT secret
npm start
```

#### Example `.env` for backend:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
# Create a .env file and add your backend API URL
npm run dev
```

#### Example `.env` for frontend:
```
VITE_BASE_URL=https://linkedin-clone-backend-ragb.onrender.com
```

---

## 👤 Admin/Demo User Login

- **Email:** tvteja2003@gmail.com
- **Password:** Viswateja

---

## 📄 Notes

- Make sure MongoDB is running locally or provide a remote URI.
- The frontend expects the backend to run on the URL specified in `VITE_BASE_URL`.
- For demo purposes, use the above credentials to log in as an admin/demo