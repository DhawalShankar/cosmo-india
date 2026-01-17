# 📚 Cosmo India Prakashan – A Publishing House and Media Platform

> A full-stack e-commerce platform for book publishing and digital content distribution.
> Built with React, Node.js serverless functions, and MongoDB.

[![Live Site](https://img.shields.io/badge/live-cosmoindiaprakashan.in-blue)](https://cosmoindiaprakashan.in)

---

## 🎯 About

**Cosmo India Prakashan** is a digital publishing platform focused on making Indian literature and cultural content accessible globally. The platform supports book discovery, secure purchasing, user accounts, and digital content delivery.

**Vision**
Build scalable publishing infrastructure to revive and promote Indian literature and culture on a global scale.

**Built by:** Dhawal Shukla
**Live:** [https://cosmoindiaprakashan.in](https://cosmoindiaprakashan.in)

---

## ✨ Features (Currently Working)

* Browse and purchase books
* User authentication using JWT (HTTP-only cookies)
* Secure password hashing with bcrypt
* Shopping cart with persistence

  * Guests: `localStorage`
  * Logged-in users: MongoDB
* Multiple delivery address management
* Razorpay payment gateway integration
* Cryptographic payment signature verification
* Automated order confirmation emails
* Members-only section for digital content
* Dark / light theme toggle

---

## ❌ Known Gaps (Not Implemented Yet)

The following are **intentional gaps** and are tracked via GitHub issues:

* Products are **hardcoded** (not database-driven)
* Orders are **not persistently stored** in the database
* No user-facing **order history or tracking**
* No admin dashboard
* No inventory or stock management
* No reviews or ratings

If something appears missing, check the **Issues** section first.

---

## 🛠️ Tech Stack

### Frontend

* React 18 (Vite)
* TailwindCSS
* React Router v6
* Context API
* Lucide React icons

### Backend

* Node.js serverless functions (Vercel)
* MongoDB Atlas with Mongoose
* JWT authentication
* bcrypt password hashing
* HTTP-only cookies

### Integrations

* Razorpay Payment Gateway
* Nodemailer (Gmail SMTP)
* Vercel serverless deployment

---

## 📁 Project Structure

```
cosmo-india/
├── api/                          # Serverless API endpoints
│   ├── lib/                      # Database, JWT, hashing utilities
│   ├── models/                   # Mongoose schemas
│   ├── payment/                  # Razorpay integration
│   ├── cart.js                   # Cart operations
│   └── user.js                   # Auth & user management
│
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   ├── context/                  # Auth, Cart, DarkMode contexts
│   ├── pages/                    # Route pages
│   └── App.jsx
│
└── vercel.json                   # Deployment configuration
```

---

## 🔌 API Endpoints

### Authentication

* `POST /api/user?action=register`
* `POST /api/user?action=login`
* `GET /api/user?action=me`
* `POST /api/user?action=logout`

### User Management

* `PUT /api/user?action=update`
* `PUT /api/user?action=change-password`
* `GET /api/user/addresses`
* `POST /api/user/addresses`

### Cart

* `GET /api/cart`
* `POST /api/cart`

### Payment

* `POST /api/payment/create-order`
* `POST /api/payment/verify`

---

## 🔐 Key Technical Decisions

* JWT stored in **HTTP-only cookies** for security
* Razorpay **signature verification is mandatory**
* MongoDB connection caching to reduce serverless cold starts
* Business secrets are never exposed to contributors
* Serverless constraint: **maximum 12 API files** (currently 8 in use)

---

## 🤝 Contributions

This is a **business-backed, production platform**, not a learning or tutorial project.

* Contributions are welcome from developers comfortable working independently
* No setup hand-holding is provided
* Read **CONTRIBUTING.md** before opening a PR
* Business stability and security take priority over experimentation

### Environment & Secrets

* No `.env` or `.env.example` is provided
* Contributors must infer required variables from the codebase
* Use your own test credentials
* Requests for production secrets will not be entertained

---

## 🧠 Good Areas to Contribute

Issues labeled:

* `good first issue` (limited scope, not reduced standards)
* `backend`
* `database`
* `payments`

Typical contributions include:

* Moving products to a database
* Implementing persistent order storage
* Adding user order history APIs
* Improving performance and security

---

## 🔮 What’s Next (Roadmap)

* Database-backed products (remove hardcoding)
* Persistent order storage after payment verification
* User-facing order history and tracking
* Admin dashboard for inventory
* Advanced search and filtering
* Multi-language support for regional content

---
## 📚 Content & Data Notice

The MIT License applies only to the source code in this repository.

All books, publications, product data, text content, images, logos, and branding
associated with Cosmo India Prakashan are proprietary and protected by copyright.

They may not be reused, redistributed, or republished without explicit permission,
even if referenced or temporarily stored in the codebase.
---

## 👨‍💻 Contact

**Dhawal Shukla**

* **GitHub:** [https://github.com/dhawalshankar](https://github.com/dhawalshankar)
* **LinkedIn:** [https://linkedin.com/in/dhawalshukl](https://linkedin.com/in/dhawalshukl)
* **Email:** [dhawalmannu@gmail.com](mailto:dhawalmannu@gmail.com)
* **Portfolio:** [https://dhawalshukl.vercel.app](https://dhawalshukl.vercel.app)

---

## 📝 Note

**Cosmo India Prakashan is an active, ongoing business platform.**

This repository contains the real production codebase powering the live site and is under continuous development.
It also serves as a reference for recruitment and portfolio evaluation.

Business requirements always take precedence over experimental or educational changes.

---

*Built with the goal of reviving Indian literature and culture through modern digital infrastructure.*

---