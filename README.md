# 💸 Shared Expense Manager

> A modern expense-sharing platform built to handle real-world financial collaboration, messy data imports, dynamic group memberships, settlements, and transparent balance calculations.

[![React](https://img.shields.io/badge/React-19-blue)]()
[![Vite](https://img.shields.io/badge/Vite-Latest-purple)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Modern-38BDF8)]()
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)]()

## 🌐 Live Demo

**Application:**
https://shared-expense-manager-xi.vercel.app/

**GitHub Repository:**
https://github.com/ruthwik-thotapelli/shared-expense-manager

---

## 🎯 Problem Statement

Managing shared expenses becomes difficult when:

* Members join and leave groups.
* Expenses are logged in multiple currencies.
* Duplicate entries exist.
* Settlements are mixed with expenses.
* Users need transparency into balance calculations.

This project provides a scalable solution for tracking expenses, settlements, and balances while maintaining complete visibility into how every amount is calculated.

---

## ✨ Core Features

### 🔐 Authentication

* Login UI
* Registration UI
* Protected route structure

### 📊 Dashboard

* Total Owed
* Total Receivable
* Net Balance
* Recent Activities
* Spending Analytics

### 👥 Group Management

* Create Groups
* Manage Members
* Track Member Join/Leave Lifecycle

### 💰 Expense Management

* Equal Split
* Exact Split
* Percentage Split
* Expense History
* Expense Breakdown

### ⚖️ Balance Engine

* Group-wise Balances
* Individual Summary
* Debt Simplification
* Who Owes Whom

### 🤝 Settlements

* Record Payments
* Settlement History

### 📂 CSV Import Workflow

* Drag & Drop Upload
* Import Preview
* Import Validation

### 🚨 Anomaly Detection

Handles real-world data issues such as:

* Duplicate Expenses
* Invalid Dates
* Missing Fields
* Currency Mismatches
* Settlement Records Logged as Expenses

---

## 🏛️ Architecture

```text
Frontend (React + Vite)
        │
        ▼
 REST API Layer
        │
        ▼
Backend (Express.js)
        │
        ▼
Database Layer (SQLite/PostgreSQL Ready)
```

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Framer Motion
* Recharts
* React Hot Toast
* React Icons

### Backend Scaffold

* Node.js
* Express.js
* SQLite

### Deployment

* Vercel

---

## 📁 Project Structure

```text
shared-expense-manager/
│
├── backend/
│   ├── db.js
│   ├── init.sql
│   ├── server.js
│   └── package.json
│
├── public/
├── scripts/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── vercel.json
├── vite.config.js
└── package.json
```

---

## 🚀 Local Setup

```bash
git clone https://github.com/ruthwik-thotapelli/shared-expense-manager.git

cd shared-expense-manager

npm install

npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

## 📈 Engineering Highlights

✔ Responsive SaaS-style Dashboard

✔ Component-Based Architecture

✔ Mock Data Layer for Rapid Prototyping

✔ CSV Import & Validation Workflow

✔ Scalable Folder Structure

✔ Backend API Scaffold Included

✔ Deployment Ready

✔ Mobile Responsive

✔ Accessibility Friendly

---

## 🔮 Future Enhancements

* JWT Authentication
* PostgreSQL Migration
* Real-time Expense Updates
* Exchange Rate Integration
* Role-Based Access Control
* Expense Approval Workflow
* Audit Logging

---

## 👨‍💻 Developer

**Ruthwik Reddy**

Software Engineering Enthusiast focused on building scalable, user-centric web applications using modern frontend and backend technologies.

> "Never show a balance that cannot be explained."

⭐ If you like this project, consider starring the repository.
