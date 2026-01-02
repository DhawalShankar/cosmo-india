# 📚 Cosmo India Prakashan - Digital Publishing Platform

> A full-stack e-commerce platform for book publishing and digital content distribution. Built with React, Node.js serverless functions, and MongoDB.

[![Live Site](https://img.shields.io/badge/live-cosmoindiaprakashan.in-blue)](https://cosmoindiaprakashan.in)

---

## 🎯 About

Cosmo India Prakashan is a digital publishing platform designed to make Indian literature and cultural content accessible globally. The platform handles book sales, user accounts, payment processing, and digital content distribution.

**Vision:** Build scalable publishing infrastructure to revive and promote Indian literature and culture on a global scale.

**Built by:** Dhawal Shukla (3rd Year B.Tech Student)  
**Live:** [cosmoindiaprakashan.in](https://cosmoindiaprakashan.in)

---

## ✨ Features

- Browse and purchase books across multiple categories
- User authentication with JWT and secure password hashing
- Shopping cart with persistent storage (MongoDB for logged-in users)
- Multiple delivery addresses management
- Razorpay payment gateway integration with signature verification
- Order history and tracking
- Members-only section for exclusive e-books and magazines
- Automated email notifications for orders
- Dark/light theme toggle

---

## 🛠️ Tech Stack

**Frontend**
- React 18 with Vite
- TailwindCSS
- React Router v6
- Context API for state management
- Lucide React icons

**Backend**
- Node.js serverless functions (Vercel)
- MongoDB Atlas with Mongoose
- JWT authentication
- bcrypt password hashing
- HTTP-only cookies

**Integrations**
- Razorpay Payment Gateway
- Nodemailer (Gmail SMTP)
- Vercel serverless deployment

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

**Authentication**
- `POST /api/user?action=register` - Register new user
- `POST /api/user?action=login` - Login user
- `GET /api/user?action=me` - Get current user
- `POST /api/user?action=logout` - Logout user

**User Management**
- `PUT /api/user?action=update` - Update profile
- `PUT /api/user?action=change-password` - Change password
- `GET /api/user/addresses` - Get all addresses
- `POST /api/user/addresses` - Add new address

**Cart**
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Update cart

**Payment**
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment & send confirmation

---

## 🔐 Key Technical Implementations

### Authentication
- JWT tokens stored in HTTP-only cookies (7-day expiration)
- bcrypt password hashing with 10 salt rounds
- Email uniqueness validation
- Secure cookie attributes: `SameSite=None; Secure`

### Payment Security
- HMAC-SHA256 signature verification for all payments
- Server-side validation before order creation
- Automated email notifications post-purchase

### Serverless Optimization
- Global MongoDB connection caching to prevent pool exhaustion
- Connection reuse across function invocations
- Optimized pool size and timeout configurations

### Database Design
- User schema with embedded cart and addresses
- Order history tracking with payment details
- Indexed queries for performance

---

## 🎯 Technical Challenges Solved

1. **Serverless Cold Starts** - Implemented global connection caching for MongoDB
2. **Payment Security** - HMAC signature verification to prevent tampering
3. **Cart Persistence** - localStorage for guests, MongoDB for logged-in users
4. **Cross-Origin Auth** - Proper CORS headers and cookie configuration
5. **Guest Cart Migration** - Seamless cart merging when users log in

---

## 📚 What I Learned

- Serverless architecture and connection pooling
- JWT authentication with HTTP-only cookies
- Payment gateway integration and cryptographic verification
- MongoDB schema design with embedded documents
- React Context API for global state
- Email automation with Nodemailer
- Full-stack deployment on Vercel

---

## 🔮 Future Improvements

- Admin dashboard for inventory management
- Advanced search and filtering
- Product recommendations
- Order tracking system
- Review and rating system
- Multi-language support for regional content

---

## 👨‍💻 Contact

**Dhawal Shukla**  

This is a personal project built to learn full-stack development while creating something meaningful. I'm continuously improving and expanding the platform.

- **GitHub:** [@dhawalshankar](https://github.com/dhawalshankar)
- **LinkedIn:** [dhawalshukl](https://linkedin.com/in/dhawalshukl)
- **Email:** dhawalmannu@gmail.com
- **Portfolio:** [dhawalshukl.vercel.app](https://dhawalshukl.vercel.app)

---

## 📝 Note

This repository is for portfolio and recruitment purposes. The project represents my skills in full-stack development, payment integration, authentication systems, and serverless architecture. Feedback and suggestions are welcome.

---

*Built with the goal of reviving Indian literature and culture through modern digital infrastructure.*