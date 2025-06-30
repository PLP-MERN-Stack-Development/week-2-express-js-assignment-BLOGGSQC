#  Express.js Product API – Week 2 Assignment

##  Overview

This project is a RESTful API built with **Express.js** that manages a product inventory. It includes CRUD operations, middleware for logging, authentication, validation, error handling, and advanced features like filtering, pagination, and search.

---

##  Folder Structure

.
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateProduct.js
├── utils/
│   └── errors.js
├── server.js
└── README.md

---

##  Setup Instructions

1. Clone your repository
git clone https://github.com/YOUR_USERNAME/week-2-express-js-assignment-BLOGGSQC.git
cd week-2-express-js-assignment-BLOGGSQC
2. Install dependencies
npm install


3. Start the server
node server.js

Server runs at: http://localhost:3000

---

##  Authentication

All POST, PUT, DELETE routes require an API key header:

x-api-key: your_secret_key

---

## 📡 API Endpoints

| Method | Endpoint                    | Description                                      |
|--------|-----------------------------|--------------------------------------------------|
| GET    | `/`                         | Welcome message                                  |
| GET    | `/api/products`             | Get all products (supports search, category, page, limit) |
| GET    | `/api/products/:id`         | Get a specific product by ID                     |
| POST   | `/api/products`             | Create a new product (protected)                 |
| PUT    | `/api/products/:id`         | Update a product (protected)                     |
| DELETE | `/api/products/:id`         | Delete a product (protected)                     |
| GET    | `/api/products/stats`       | Product count by category                        |

---

##  Product Schema

```json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "inStock": boolean
}
 Examples
 Create a product
POST /api/products

Headers:
x-api-key: your_secret_key
Body:
{
  "name": "Headphones",
  "description": "Noise-cancelling",
  "price": 200,
  "category": "electronics",
  "inStock": true
}