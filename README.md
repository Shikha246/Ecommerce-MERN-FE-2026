# 🛍️ BookStore — Ecommerce MERN Application

A full-stack ecommerce application built using the MERN stack, for browsing and purchasing books.

Users can browse the catalog, manage a cart and wishlist, save shipping addresses, place orders, and get help from an AI shopping assistant — all through a responsive, authenticated interface.

---

## 🔗 Live Demo

### [Frontend Link](https://ecommerce-mern-fe-2026.vercel.app/)

---

## 🎥 Demo Video

Watch a walkthrough of all major features of the application:

[Watch Demo Video](https://drive.google.com/file/d/1gXVZZtDEOhSnuppUasKE7D40FErspyMY/view?usp=sharing)

---

## ⚡ Quick Start

Clone the repository and run the project locally.

```bash
git clone https://github.com/Shikha246/Ecommerce-MERN-FE-2026.git
cd Ecommerce-MERN-FE-2026
npm install
npm run dev
```

---

## 🛠️ Tech Stack

### Frontend
* React.js
* React Router DOM
* Context API
* Axios
* React Toastify
* CSS3

### Backend
* Node.js
* Express.js
* Google Gemini API (AI assistant / function calling)

### Auth
* JWT (jsonwebtoken)
* bcryptjs

### Database
* MongoDB
* Mongoose

### Development Tools
* Vite
* Git & GitHub
* Postman

### Additional Libraries Used

| Library          | Purpose                                          |
| ---------------- | ------------------------------------------------- |
| Axios            | Handles API communication                          |
| React Router DOM | Client-side routing                                |
| React Toastify   | User notifications                                 |
| Express          | Backend server framework                           |
| Mongoose         | MongoDB ODM                                        |
| dotenv           | Environment variable management                    |
| cors             | Cross-origin resource sharing                       |
| nodemon          | Auto server restart during development             |
| jsonwebtoken     | Issues and verifies JWTs for authenticated sessions |
| bcryptjs         | Hashes and verifies user passwords                  |
| @google/genai    | Gemini API SDK powering the AI assistant            |

---

## ✨ Features

### 🔐 Authentication
* User signup & login
* Passwords hashed with bcryptjs
* JWT-based session handling
* Protected profile route (`GET /api/auth/profile`)

### 🛍️ Product Catalog
* Browse all products
* View individual product details
* Browse by category (programming, fiction, self-help, finance)

### 🛒 Cart Management
* Add and remove items from cart
* Increase/decrease item quantity
* Live stock management — adding to cart reserves stock, removing restores it
* Clear entire cart

### ❤️ Wishlist Management
* Add/remove products from wishlist
* Prevent duplicate wishlist entries
* View saved wishlist products

### 📍 Address Management
* Add, update, and delete saved shipping addresses
* Select an address at checkout

### 📦 Order Management
* Place orders with shipping details
* View order history

### 📂 Category Management
* Fetch all categories and category details

### 🤖 AI Shopping Assistant
* Conversational chatbot on every page via a floating chat widget
* Answers product questions (availability, price, category, author) by querying the live catalog in real time — never guesses or invents book details
* Looks up the logged-in customer's own order status and history on request
* Order lookups are scoped strictly to the authenticated user via JWT — the assistant can never access another customer's data, and guests are prompted to log in rather than shown any order info
* Built with Google's Gemini API using function/tool calling: the model decides when it needs real data, the backend runs the actual MongoDB query, and the result is fed back to generate a grounded response

### 📱 Responsive UI
* Mobile, tablet, and desktop optimized

### 🔗 REST API Integration
* Full CRUD across products, cart, wishlist, addresses, and orders
* MongoDB persistence throughout

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

---

# 📡 API Reference

## 🔐 Auth APIs

**Signup**
`POST /api/auth/signup`
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "yourpassword" }
```

**Login**
`POST /api/auth/login`
```json
{ "email": "jane@example.com", "password": "yourpassword" }
```
Response includes a JWT `token`.

**Get Profile** (protected)
`GET /api/auth/profile`
Header: `Authorization: Bearer <token>`

---

## 🤖 AI Assistant API

**Send Chat Message**
`POST /api/chat/message`
```json
{ "message": "Do you have any finance books under 500?", "history": [] }
```
Include `Authorization: Bearer <token>` to let the assistant answer order-related questions for the logged-in user. Without a token, it can still answer product questions but will ask guests to log in for order lookups.

---

## 🛍️ Product APIs

**Get All Products** — `GET /api/products`
```json
{
  "name": "Atomic Habits",
  "author": "James Clear",
  "category": "self-help",
  "price": 499,
  "stock": 12,
  "rating": 4.7
}
```

**Get Product By ID** — `GET /api/products/:id`

---

## 🛒 Cart APIs

**Get Cart** — `GET /api/cart/:userId`

**Add to Cart** — `POST /api/cart/add`
```json
{ "userId": "...", "product": { "_id": "...", "name": "Atomic Habits", "price": 499 } }
```

**Remove from Cart** — `DELETE /api/cart/remove`
```json
{ "userId": "...", "productId": "..." }
```

**Update Quantity** — `PUT /api/cart/update`
```json
{ "userId": "...", "productId": "...", "action": "inc" }
```

**Clear Cart** — `DELETE /api/clear/:userId`

---

## ❤️ Wishlist APIs

**Get Wishlist** — `GET /api/wishlist/:userId`

**Add to Wishlist** — `POST /api/wishlist/add`
```json
{ "userId": "...", "productId": "..." }
```

**Remove from Wishlist** — `DELETE /api/wishlist/remove/:userId/:productId`

---

## 📍 Address APIs

**Add Address** — `POST /api/address`

**Get Addresses** — `GET /api/address/:userId`

**Update Address** — `PUT /api/address/update/:id`

**Delete Address** — `DELETE /api/address/delete/:id`

---

## 📦 Order APIs

**Place Order** — `POST /api/orders/place`
```json
{
  "userId": "...",
  "items": [{ "productId": "...", "name": "Atomic Habits", "price": 499, "qty": 1 }],
  "address": { "name": "...", "street": "...", "city": "...", "state": "...", "pincode": "..." },
  "total": 499
}
```

**Get User Orders** — `GET /api/orders/:userId`

---

## 📂 Category APIs

**Get All Categories** — `GET /api/categories`

**Get Category By ID** — `GET /api/categories/:id`

---

## 🚀 Future Enhancements

* Payment Gateway Integration
* Product Reviews & Ratings
* Admin Dashboard
* Coupon Management
* Order Tracking
* Inventory Management

---

## 📬 Contact

📧 **[ramrakhyani.shikha@gmail.com](mailto:ramrakhyani.shikha@gmail.com)**

## 👩‍💻 Author

Built with ❤️ by **Shikha Ramrakhyani**
GitHub: https://github.com/Shikha246

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
