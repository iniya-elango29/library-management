<<<<<<< HEAD
# 📚 Library Management System

A full-stack **Library Management System** built using **Node.js,
Express, and EJS**, designed to manage books, users, and transactions
efficiently.

------------------------------------------------------------------------

## 🚀 Features

-   🔐 User Authentication (Login/Register)
-   📖 Book Management (Add, View, Update, Delete)
-   👨‍🎓 User/Student Management
-   🔄 Issue & Return Book Transactions
-   📊 Dashboard Overview
-   🧾 Transaction Tracking
-   🎨 Clean UI with EJS templates

------------------------------------------------------------------------

## 🏗️ Project Structure

    libmanagement/
    │
    ├── backend/
    │   ├── config/
    │   │   ├── db.js
    │   │   └── setup-db.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── bookController.js
    │   │   ├── transactionController.js
    │   │   └── userController.js
    │   │
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   │
    │   ├── models/
    │   │   ├── Book.js
    │   │   ├── User.js
    │   │   └── Transaction.js
    │   │
    │   ├── routes/
    │   │   ├── bookRoutes.js
    │   │   ├── transactionRoutes.js
    │   │   └── userRoutes.js
    │   │
    │   └── server.js
    │
    ├── views/
    │   ├── dashboard.ejs
    │   ├── books.ejs
    │   ├── students.ejs
    │   ├── transactions.ejs
    │   ├── login.ejs
    │   ├── register.ejs
    │   └── landing.ejs
    │
    ├── public/
    │   └── style.css
    │
    ├── package.json
    └── package-lock.json

------------------------------------------------------------------------

## ⚙️ Tech Stack

-   Backend: Node.js, Express.js\
-   Frontend: EJS\
-   Database: Configured via db.js\
-   Authentication: Middleware-based

------------------------------------------------------------------------

## 🔄 Application Flow

User → Routes → Controllers → Models → Database\
                             ↓\
                          Views (EJS)

------------------------------------------------------------------------

## 🛠️ Installation & Setup

``` bash
git clone https://github.com/iniya-elango29/lib-management.git
cd lib-management
Replace your mysql user password in db.js and setup-db.js file
npm install
node backend/config/setup-db.js
node backend/server.js
```

Open: http://localhost:3000

------------------------------------------------------------------------

## 🔐 Authentication

-   Login & Registration handled via authController\
-   Protected routes use authMiddleware

------------------------------------------------------------------------

## 📌 Key Modules

-   Books: Manage library books\
-   Users: Manage students/users\
-   Transactions: Issue & return tracking

------------------------------------------------------------------------

## 📈 Future Enhancements

-   Search & filter books\
-   Fine calculation system\
-   Admin roles & permissions\
-   REST API support

------------------------------------------------------------------------

## 👨‍💻 Author

GitHub: https://github.com/iniya-elango29

------------------------------------------------------------------------

## 📄 License

MIT License
=======
# library-management
>>>>>>> 4ac5dc99d9b24c94c83ff5ca6e8d9be79698d2ff
