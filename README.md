<div align="center">

<img src="https://img.shields.io/badge/Fin-Forge-4F46E5?style=for-the-badge&logoColor=white" alt="Fin Forge" height="60"/>

# Fin Forge

**A full-stack financial management platform with real-time analytics, secure authentication, and multi-currency support.**

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Roadmap](#-roadmap)

</div>

---

## Overview

Fin Forge is a portfolio-quality, full-stack financial management web application. It allows users to securely track income and expenses, visualize spending habits, and analyze monthly financial trends — all within a clean, responsive, dark-mode interface.

Built with a React + Vite frontend and a Node.js + Express backend, it uses MongoDB for persistent storage and JWT for secure, user-scoped authentication.

---

## ✨ Features

### 🔐 Authentication & Security
- User registration with validation
- Secure login with JWT-based authentication
- Protected routes and authenticated API access
- User-scoped data — each user only sees their own records

### 💸 Transaction Management
- Add income and expense transactions
- Edit and delete existing records
- View full transaction history
- Filter and sort transactions

### 📊 Dashboard & Analytics
- Total balance, income, and expense summaries
- Balance trend visualization
- Monthly income vs. expense comparison chart
- Category-wise spending breakdown
- Smart financial insights based on activity

### 🎨 User Experience
- Responsive layout for desktop, tablet, and mobile
- Dark mode interface
- Multi-currency display support
- Empty state handling for new users
- Polished landing page with product presentation

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, React Router DOM, Recharts, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JSON Web Token (JWT), bcryptjs |
| **Utilities** | dotenv, cors |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB URI (local or [Atlas](https://www.mongodb.com/atlas))
- Exchange Rate API key (for multi-currency support)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fin-forge.git
cd fin-forge
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the server:

```bash
npm start
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_EXCHANGE_API_KEY=your_exchange_rate_api_key
```

Start the dev server:

```bash
npm run dev
```

### 4. Open in Browser

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

---

## 📁 Project Structure

```
fin-forge/
│
├── Backend/
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── Transaction.js       # Transaction schema
│   │   └── Users.js             # User schema
│   ├── .env
│   ├── package.json
│   └── server.js                # Express app entry point
│
└── Frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── assets/
    │   │   └── finforge-logo.svg
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── InsightsSection.jsx
    │   │   ├── OverviewSection.jsx
    │   │   ├── SummaryCard.jsx
    │   │   ├── TransactionForm.jsx
    │   │   ├── TransactionsSection.jsx
    │   │   └── TransactionTable.jsx
    │   ├── context/
    │   │   └── DataContext.jsx
    │   ├── hooks/
    │   │   ├── useCurrency.js
    │   │   └── useFinancialData.js
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── LandingPage.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── utils/
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── index.html
    └── package.json
```

---

## 🔑 How It Works

1. **Register / Login** — Users create an account and receive a JWT token on login.
2. **Protected Access** — The token authenticates every API request; users only access their own data.
3. **Dashboard** — After login, users see their current balance, income/expense totals, and chart-based insights.
4. **Transactions** — Users can create, edit, delete, and filter transactions. All changes reflect instantly in the analytics.

---

## 🗺 Roadmap

Planned features for future iterations:

- [ ] CSV export for transaction history
- [ ] Budget goal tracking
- [ ] Date-range filtering
- [ ] User profile & settings page
- [ ] Recurring transaction support
- [ ] Demo account mode
- [ ] Downloadable financial reports
- [ ] Financial goal planning
- [ ] Advanced onboarding flow

---

## 👤 Author

**Sajad Bashir Mir**

---

## 📄 License

This project is open for learning, showcasing, and portfolio purposes.
