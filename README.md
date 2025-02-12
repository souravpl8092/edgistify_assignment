# E-Commerce Platform

## 📌 Overview

ShopKart is a **full-stack e-commerce platform** built with the **MERN stack (MongoDB, Express.js, React, TypeScript, Node.js)**. It features user authentication, cart management, order placement, and order history tracking with Redux for state management.

## 🚀 Features

- **User Authentication** (Sign Up, Login, Logout)
- **Add to Cart & Cart Management**
- **Checkout & Payment Processing**
- **Shipping Address Management**
- **Order History & Status Tracking**
- **Redux for State Management**
- **Backend API Integration**

## 🎯 Design Decisions & Assumptions

- **JWT is used for authentication**
- **Redux Toolkit is used for state management**
- **Framer Motion is used for smooth UI animations**
- **The API follows RESTful design principles**

## 🛠️ Tech Stack

### **Frontend:**

- React + TypeScript
- Redux Toolkit
- TypeScript
- React Router
- React Toastify
- CSS Modules

### **Backend:**

- Node + TypeScript
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT) Authentication

## 🚀 Deployment

- **Frontend:** [Edgistify App](https://edgistifyassignment-app.vercel.app/)
- **Backend:** [Edgistify Server](https://edgistifyassignment-server.vercel.app/)
- **Database:** MongoDB Atlas

## 📂 Project Structure

```
📦 e-commerce-platform
├── 📁 client (Frontend)
│   ├── 📁 src
│   │   ├── 📁 api
│   │   │   ├── authApi.ts
│   │   │   ├── cartApi.ts
│   │   │   ├── orderService.ts
│   │   │   ├── productApi.ts
│   │   ├── 📁 components
│   │   │   ├── 📁 Auth
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Logout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   ├── 📁 pages
│   │   │   ├── Cart.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ShippingForm.tsx
│   │   ├── 📁 routes
│   │   │   ├── ProtectedRoutes.tsx
│   │   ├── 📁 store
│   │   │   ├── 📁 slices
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── cartSlice.ts
│   │   │   │   ├── orderSlice.ts
│   │   │   │   ├── shippingSlice.ts
│   │   │   ├── store.ts
│   │   ├── 📁 types
│   │   │   ├── product.ts
│   │   ├── 📁 utils
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── styles
│   ├── package.json
├── 📁 server (Backend)
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 controllers
│   ├── 📁 middleware
│   ├── 📁 services
│   ├── server.js
│   ├── config.js
│   ├── package.json
```

## ⚙️ Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/souravpl8092/edgistify-assignment.git
cd edgistify-assignment
```

### **2. Setup Backend**

```sh
cd server
npm install
npm start
```

### **3. Setup Frontend**

```sh
cd client
npm install
npm start
```

### **4. Setup Environment Variables**

Create a `.env` file in the `backend` directory and add:

```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **5. Run the Application**

#### Start the Backend:

```sh
cd backend
npm run dev
```

#### Start the Frontend:

```sh
cd frontend
npm start
```

---

## 🌍 API Endpoints

| Method   | Endpoint               | Description              |
| -------- | ---------------------- | ------------------------ |
| `POST`   | `/api/auth/register`   | Register a new user      |
| `POST`   | `/api/auth/login`      | User login               |
| `GET`    | `/api/products`        | Get all products         |
| `GET`    | `/api/products/:id`    | Get product details      |
| `POST`   | `/api/cart`            | Add product to cart      |
| `PATCH`  | `/api/cart`            | Update product of cart   |
| `GET`    | `/api/cart`            | Get cart details         |
| `DELETE` | `/api/cart/remove/:id` | Remove product from cart |
| `POST`   | `/api/orders`          | Place an order           |
| `GET`    | `/api/orders`          | Get user order history   |

## 🎨 UI Preview

Here are some previews of the key pages in the application:

| **Page**                  | **Preview**                                          |
| ------------------------- | ---------------------------------------------------- |
| **Product List Page**     | ![Product List](https://i.imgur.com/nCUz69A.png)     |
| **Sign Up Page**          | ![Sign Up](https://i.imgur.com/kONsKqA.png)          |
| **Login Page**            | ![Login](https://i.imgur.com/Y5DKbgG.png)            |
| **Cart Page**             | ![Cart](https://i.imgur.com/19WfnxP.png)             |
| **Shipping Details Page** | ![Shipping Details](https://i.imgur.com/vRKvbtD.png) |
| **Order History Page**    | ![Order History](https://i.imgur.com/yQdiqDW.png)    |

## 🔐 Credentials

Use the following credentials for testing:

```sh
Email: testuser@example.com
Password: password12345
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by [Sourav Paul](https://github.com/souravpl8092) 🚀

---
