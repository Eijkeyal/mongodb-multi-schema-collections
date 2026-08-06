# MongoDB Collections Setup Script

A professional Node.js utility script for initializing MongoDB collections across multiple application domains.

## 📋 Overview

This script automates the creation of seven MongoDB collections for different application domains:

- **Student Management** — Student records and academic data
- **Hospital Patient** — Patient health records
- **Job Portal** — Job listings and applications
- **Recipe App** — Recipe collections and cooking data
- **Social Media** — Posts and user content
- **Online Courses** — Course materials and enrollments
- **E-commerce** — Product catalogs and inventory

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
   git clone <repository-url>
   cd <project-directory>
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the root directory:

```env
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   # or use MongoDB Atlas
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

## 📦 Project Structure
mongodb-multi-collection-setup/
│
├── config/
│   └── db.js                         # Database connection configuration
│
├── models/
│   ├── studentManagementSchema.js    # Student collection schema
│   ├── hospitalPatientSchema.js      # Patient collection schema
│   ├── jobPortalSchema.js            # Job collection schema
│   ├── recipeAppSchema.js            # Recipe collection schema
│   ├── socualMediaSchema.js          # Social media collection schema
│   ├── onlineCourseSchema.js         # Course collection schema
│   └── ecommercceProductSchema.js    # Product collection schema
│
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore rules
├── index.js                          # Main setup script
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
