# 💬 ChatApp — Express & MongoDB Based CRUD Application

Welcome to **ChatApp** — a simple yet powerful chat management app built with **Node.js**, **Express**, and **MongoDB**. It showcases full CRUD functionality, elegant error handling (including invalid ObjectIds), and a clean MVC structure using **EJS templating**.

Whether you're learning backend development or just need a boilerplate for an Express-Mongo project — this is for you! 🚀

---

## 🧠 What This Project Covers

- 🛠️ **Express + MongoDB** integration
- 🔄 **CRUD operations** for chat entries
- 📦 **Mongoose** schema modeling
- ⚠️ Robust **error handling** (including custom `ExpressError` class)
- 🎨 Basic frontend views with **EJS**
- 🔍 Smart handling of invalid routes and invalid MongoDB ObjectIds

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- Git

---

### 📥 Installation

```bash
# Clone the repo
git clone https://github.com/rana-ashutosh-singh-04/whatsapp-DBMS.git

# Install dependencies
npm install

# Start your MongoDB server
mongod

# Start the app
node index.js

🗃️ Project Structure
csharp
Copy
Edit
.
├── models/
│   └── chat.js            # Mongoose schema
├── views/
│   ├── index.ejs          # List of chats
│   └── edit.ejs           # Edit chat view
├── utils/
│   └── ExpressError.js    # Custom error handler
├── public/                # Static assets (optional)
├── index.js               # Main server file
└── README.md
