# Library Management API

A RESTful API for managing books and borrow records in a library system, built with Express.js, TypeScript, and MongoDB (Mongoose).

# 🎯 Objective

Build a Library Management System with:

Schema validation

Business logic for borrowing books and availability

Aggregation pipeline usage

Mongoose static & instance methods

Middleware (pre, post hooks)

Filtering, sorting, pagination

# 🛠️ Technologies Used

Node.js & Express.js

TypeScript

MongoDB & Mongoose

Nodemon (for development)

# 🚀 Features
Create, read, update, delete books

Filter and sort books

Borrow books with stock validation

Automatically update availability status

View borrowed books summary via aggregation

Custom Mongoose methods and middleware

Proper error handling with descriptive responses

## 📁 Folder Structure

```
src/
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── interfaces/
│   ├── book.interface.ts
│   └── borrow.interface.ts
├── middleware/
│   ├── allErrorHandel.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
├── app.ts
├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```


## 🚀 Getting Started


### 📁 Clone the Repository

```bash
git clone https://github.com/tanjimN4/Library-Management-API-with-Express-TypeScript-MongoDB-Assignment.git
cd Library-Management-API-with-Express-TypeScript-MongoDB-Assignment
```

### 📦 Install Dependencies

```
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_uri
```

### ▶️ Run the Server

```bash
# For development
npm run dev

# For production
npm run build && npm start
```

---

## 🛠️ API Endpoints

### 📘 Book APIs

#### ✅ Create Book

```http
POST /api/books
```

**Request Body:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 📚 Get All Books

```http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

#### 🔍 Get Book by ID

```http
GET /api/books/:bookId
```

#### ✏️ Update Book

```http
PUT /api/books/:bookId
```

**Request Body:**

```json
{ "copies": 10 }
```

#### ❌ Delete Book

```http
DELETE /api/books/:bookId
```

---

### 📦 Borrow APIs

#### ✅ Borrow a Book

```http
POST /api/borrow
```

**Request Body:**

```json
{
  "book": "bookObjectIdHere",
  "quantity": 2,
  "dueDate": "2025-06-18T00:00:00.000Z"
}
```

#### 📊 Get Borrow Summary

```http
GET /api/borrow
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---
