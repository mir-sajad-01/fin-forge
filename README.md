# Fin Forge

Fin Forge is a full-stack financial management website built to help users manage income, expenses, and financial activity through a modern, responsive, and analytics-driven interface.

The platform combines a polished React frontend with a Node.js + Express backend, MongoDB for persistent data storage, JWT-based authentication, and financial visualizations powered by Recharts. It is designed as a portfolio-ready project that demonstrates both frontend craftsmanship and backend integration.

---

## Overview

Fin Forge provides users with a structured way to monitor their finances in one place. After registering and logging in, users can securely manage transactions, review balance summaries, analyze spending habits, and understand monthly financial trends through visual insights.

The project was built to reflect a realistic full-stack product experience, with emphasis on usability, security, responsiveness, and clean interface design.

---

## Highlights

- Full-stack financial management website
- Secure JWT-based authentication
- User-specific transaction management
- Interactive analytics and chart-driven insights
- Responsive design across desktop, tablet, and mobile
- Dark mode support
- Multi-currency display support
- Portfolio-quality landing page and product presentation

---

## Core Features

### Authentication & Security
- User registration with validation
- Secure login with JWT authentication
- Protected routes and authenticated API access
- User-scoped financial data handling

### Transaction Management
- Add income and expense transactions
- Edit existing transaction records
- Delete transactions
- View transaction history
- Filter and sort transaction data

### Dashboard & Analytics
- Total balance overview
- Total income and expense summaries
- Balance trend visualization
- Monthly income vs expense comparison
- Spending category breakdown
- Financial insights based on transaction activity

### User Experience
- Clean and modern landing page
- Responsive layout for all screen sizes
- Multi-currency display support
- Dark mode interface
- Empty states for new users
- Smooth and structured UI flow

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors

---

## Architecture

Fin Forge follows a straightforward full-stack architecture:

- **Frontend** handles UI rendering, routing, state management, data presentation, and analytics visualization.
- **Backend** manages authentication, protected API routes, business logic, and MongoDB operations.
- **MongoDB** stores users and transactions persistently.
- **JWT Authentication** secures access to protected resources and ensures that users only interact with their own data.

---

## Project Structure

```bash
Finance Dashboard UI/
│
├── Backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Transaction.js
│   │   └── Users.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── finforge-logo.svg
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── InsightsSection.jsx
│   │   │   ├── OverviewSection.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionsSection.jsx
│   │   │   └── TransactionTable.jsx
│   │   ├── context/
│   │   │   └── DataContext.jsx
│   │   ├── hooks/
│   │   │   ├── useCurrency.js
│   │   │   └── useFinancialData.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── README.md

How It Works
1. User Authentication
A user can create an account through the registration page and log in securely using their credentials. On successful login, the backend generates a JWT token, which is used to authorize protected requests.

2. Secure Data Access
Each authenticated user only has access to their own transaction records. Protected routes verify the JWT token before returning or modifying financial data.

3. Financial Dashboard
After login, users can access a dashboard that presents:

current balance
total income
total expenses
category-wise spending insights
monthly trend comparisons
financial summaries through visual charts
4. Transaction CRUD
Users can:

create new income or expense records
update existing transactions
delete transactions
review transaction history
filter and sort records for better analysis
Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/fin-forge.git
cd fin-forge
2. Setup Backend
Move into the backend folder:

cd Backend
npm install
Create a .env file inside Backend/ and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Start the backend server:

npm start
3. Setup Frontend
Open a new terminal and move into the frontend folder:

cd Frontend
npm install
Create a .env file inside Frontend/ and add:

VITE_API_BASE_URL=http://localhost:5000
VITE_EXCHANGE_API_KEY=your_exchange_rate_api_key
Start the frontend:

npm run dev
Running the Project
Backend
cd Backend
npm start
Frontend
cd Frontend
npm run dev
Default Local URLs
Frontend: http://localhost:5173
Backend: http://localhost:5000
Key Functionalities
Protected API Access
The backend secures sensitive routes through JWT middleware. Authenticated users can:

fetch their transactions
add transactions
update transactions
delete transactions
retrieve their profile data
Dynamic Financial Analytics
The dashboard calculates and displays:

total balance
total income
total expenses
monthly financial trends
category-wise expense breakdown
top spending category
month-over-month comparisons
Multi-Currency Support
The frontend supports multiple display currencies and uses exchange-rate data for converting values at the UI level.

Responsive Experience
Fin Forge is optimized for:

desktop layouts
tablet interfaces
mobile screens
Screens & Pages
Landing Page
Introduces the product, highlights its key features, presents the product value proposition, and directs users to login or registration.

Register Page
Allows new users to create an account.

Login Page
Authenticates users and redirects them into the main dashboard experience.

Dashboard
The core product interface for transaction management, balance tracking, and financial analytics.

Why This Project Matters
Fin Forge is more than a dashboard UI. It is a complete full-stack website that demonstrates practical product development across both client and server layers.

This project showcases skills in:

frontend application development
backend API design
authentication and authorization
database integration
state management
responsive interface design
reusable component architecture
chart-based data visualization
product-oriented UI/UX thinking
It is suitable for:

resume projects
GitHub portfolio showcases
internship applications
frontend or full-stack interviews
academic or personal project demonstrations

Future Improvements
Potential enhancements for future iterations include:
CSV export for transactions
budget goal tracking
date-range based filtering
user profile and settings page
recurring transaction support
demo account mode
downloadable reports
financial goal planning
more advanced onboarding flow

Author
Sajad Bashir Mir

License
This project is open for learning, showcasing, and portfolio purposes.
