# 🛍️ Ecommerce MERN Application

A full-stack Ecommerce application built using the MERN stack.

This platform enables users to browse products, manage wishlists, place orders, and enjoy a seamless online shopping experience through a responsive and user-friendly interface.

---

## 🔗 Live Demo

### Frontend

https://ecommerce-mern-fe-2026.vercel.app/

### GitHub Repository

https://github.com/Shikha246/Ecommerce-MERN-FE-2026

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

### Database

* MongoDB
* Mongoose

### Development Tools

* Vite
* Git & GitHub
* Postman

### Additional Libraries Used

| Library          | Purpose                                |
| ---------------- | -------------------------------------- |
| Axios            | Handles API communication              |
| React Router DOM | Client-side routing                    |
| React Toastify   | User notifications                     |
| Express          | Backend server framework               |
| Mongoose         | MongoDB ODM                            |
| dotenv           | Environment variable management        |
| cors             | Cross-origin resource sharing          |
| nodemon          | Auto server restart during development |

---

## ✨ Features

### 🛍️ Product Management

* View all products
* View product details
* Add products to database
* Browse products by category

### ❤️ Wishlist Management

* Add products to wishlist
* Remove products from wishlist
* View saved wishlist products
* Prevent duplicate wishlist entries

### 📦 Order Management

* Place orders
* Store shipping information
* View order history
* Track customer purchases

### 📂 Category Management

* Fetch all categories
* View category details

### 📱 Responsive UI

* Mobile-friendly design
* Tablet responsive
* Desktop optimized

### 🔗 REST API Integration

* Connected frontend and backend
* Full CRUD operations
* MongoDB persistence

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

---

# 📡 API Reference

---

# 🛍️ Product APIs

## Get All Products

### Request

`GET /api/products`

### Response

```json
{
  "data": {
    "products": [
      {
        "_id": "6846e6b9f5c8b71234567890",
        "title": "Men's Running Shoes",
        "price": 2499,
        "category": "Footwear"
      }
    ]
  }
}
```

---

## Get Product By ID

### Request

`GET /api/products/:productId`

### Response

```json
{
  "data": {
    "product": {
      "_id": "6846e6b9f5c8b71234567890",
      "title": "Men's Running Shoes",
      "price": 2499,
      "description": "Comfortable running shoes"
    }
  }
}
```

---

## Create Product

### Request

`POST /api/products`

```json
{
  "title": "Wireless Headphones",
  "price": 3999,
  "category": "Electronics",
  "description": "Noise cancelling headphones"
}
```

### Response

```json
{
  "message": "Product added successfully",
  "data": {
    "product": {
      "_id": "6846e6b9f5c8b71234567890",
      "title": "Wireless Headphones",
      "price": 3999
    }
  }
}
```

---

# ❤️ Wishlist APIs

## Get Wishlist

### Request

`GET /wishlist/:userId`

### Response

```json
{
  "products": [
    "6846e6b9f5c8b71234567890",
    "6846e7a2f5c8b71234567891"
  ]
}
```

---

## Add Product To Wishlist

### Request

`POST /wishlist/add`

```json
{
  "userId": "12345",
  "productId": "6846e6b9f5c8b71234567890"
}
```

### Response

```json
{
  "products": [
    "6846e6b9f5c8b71234567890"
  ]
}
```

---

## Remove Product From Wishlist

### Request

`DELETE /wishlist/remove/:userId/:productId`

### Response

```json
{
  "products": []
}
```

---

# 📦 Order APIs

## Place Order

### Request

`POST /orders/place`

```json
{
  "userId": "12345",
  "items": [
    {
      "productId": "6846e6b9f5c8b71234567890",
      "quantity": 2
    }
  ],
  "address": "Pune, Maharashtra",
  "total": 4998
}
```

### Response

```json
{
  "_id": "6852e6b9f5c8b71234999999",
  "userId": "12345",
  "total": 4998,
  "address": "Pune, Maharashtra",
  "createdAt": "2026-06-01T10:30:15.123Z"
}
```

---

## Get User Orders

### Request

`GET /orders/:userId`

### Response

```json
[
  {
    "_id": "6852e6b9f5c8b71234999999",
    "total": 4998,
    "address": "Pune, Maharashtra",
    "createdAt": "2026-06-01T10:30:15.123Z"
  }
]
```

---

# 📂 Category APIs

## Get All Categories

### Request

`GET /api/categories`

### Response

```json
{
  "data": {
    "categories": [
      {
        "_id": "123",
        "categoryName": "Electronics"
      },
      {
        "_id": "124",
        "categoryName": "Footwear"
      }
    ]
  }
}
```

---

## Get Category By ID

### Request

`GET /api/categories/:categoryId`

### Response

```json
{
  "data": {
    "category": {
      "_id": "123",
      "categoryName": "Electronics"
    }
  }
}
```

---

## 📂 Project Structure

```bash
backend/
│
├── models/
│   ├── Product.models.js
│   ├── Category.models.js
│   ├── Wishlist.models.js
│   └── Order.models.js
│
├── routes/
│   ├── Product.routes.js
│   ├── Category.routes.js
│   ├── Wishlist.routes.js
│   └── Order.routes.js
│
├── server.js
├── package.json
└── .env
```

---

## 🚀 Future Enhancements

* User Authentication
* Payment Gateway Integration
* Product Reviews & Ratings
* Admin Dashboard
* Coupon Management
* Order Tracking
* Inventory Management

---

## 📬 Contact

For bugs, issues, or feature requests, feel free to reach out:

📧 **[ramrakhyani.shikha@gmail.com](mailto:ramrakhyani.shikha@gmail.com)**

---

## 👩‍💻 Author

Built with ❤️ by **Shikha Ramrakhyani**

GitHub:
https://github.com/Shikha246

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
