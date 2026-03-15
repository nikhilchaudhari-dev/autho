# 🔐 Full-Stack Authentication Website

A production-ready full-stack authentication system built with Node.js, Express.js, MySQL, and Vanilla JavaScript. Features secure JWT-based authentication, bcrypt password hashing, and Railway deployment support.

## ✨ Features

- 🔒 **Secure Authentication** - JWT token-based authentication with 1-hour expiration
- 🔑 **Password Security** - Bcrypt hashing with 10 salt rounds
- 👤 **User Registration** - Complete signup system with validation
- 🚪 **Login System** - Email/password authentication
- 📊 **Protected Dashboard** - User-specific data display
- 🔄 **Auto Redirects** - Smart routing based on auth state
- 💾 **Token Storage** - Secure localStorage implementation
- 🚀 **Railway Ready** - Pre-configured for easy deployment
- 🎨 **Modern UI** - Clean, responsive design
- ⚡ **Connection Pooling** - Optimized MySQL database connections

## 📁 Project Structure

```
project-root/
│
├── public/
│   ├── index.html          # Landing page
│   ├── signup.html         # Registration page
│   ├── login.html          # Login page
│   ├── dashboard.html      # Protected dashboard
│   ├── style.css           # Styles
│   └── script.js           # Frontend logic
│
├── middleware/
│   └── auth.js             # JWT verification middleware
│
├── server.js               # Express server & API routes
├── db.js                   # MySQL connection pool
├── package.json            # Dependencies
├── schema.sql              # Database schema
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database (mysql2 driver)
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Fetch API** - HTTP requests

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v5.7 or higher, or MySQL 8+)
- **Git** (for version control)

### 1. Clone or Setup Project

```bash
# Navigate to project directory
cd pp

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Full-stack auth system"
```

### 2. Install Dependencies

```bash
npm install
```

This installs:

- express
- mysql2
- jsonwebtoken
- bcryptjs
- dotenv
- cors

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
copy .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=auth_db

# JWT Secret (IMPORTANT: Use a strong random string!)
JWT_SECRET=your_super_secret_random_string_here_minimum_32_chars
```

### 4. Setup MySQL Database

#### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source schema.sql

# Or manually:
CREATE DATABASE IF NOT EXISTS auth_db;
USE auth_db;

# The users table will be auto-created by the server
```

#### Option B: Using MySQL Workbench or phpMyAdmin

1. Open your MySQL management tool
2. Connect to your database
3. Run the SQL from `schema.sql`
4. Or let the server auto-create the table on first run

### 5. Start the Server

```bash
# Production mode
npm start

# Development mode with auto-restart (optional)
npm run dev
```

The server will start at: **http://localhost:3000**

You should see:

```
✓ Database connected successfully
✓ Database table initialized

╔════════════════════════════════════════════════╗
║   Server is running                            ║
║   ➜ Local: http://localhost:3000               ║
║   ➜ Press Ctrl+C to stop                       ║
╚════════════════════════════════════════════════╝
```

## 🧪 Testing the Application

### Test User Registration

1. Go to http://localhost:3000
2. Click **"Sign Up"**
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Click **"Create Account"**
5. You'll be redirected to the dashboard

### Test Login

1. Go to http://localhost:3000/login
2. Enter credentials
3. Click **"Login"**
4. Access granted to dashboard

### Test Protected Routes

1. Try accessing http://localhost:3000/dashboard without logging in
2. You'll be redirected to login page
3. After login, you can access the dashboard

### Test Logout

1. Click **"Logout"** button in navigation
2. You'll be redirected to login page
3. Token is removed from localStorage

## 🌐 Deployment to Railway

### Step 1: Prepare Your Repository

```bash
# Make sure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

### Step 3: Add MySQL Database

1. In your Railway project dashboard
2. Click **"New"** → **"Database"** → **"Add MySQL"**
3. Wait for MySQL to provision
4. Railway will automatically set these environment variables:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

### Step 4: Configure Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```
PORT=3000
DB_HOST=${{MYSQLHOST}}
DB_USER=${{MYSQLUSER}}
DB_PASSWORD=${{MYSQLPASSWORD}}
DB_NAME=${{MYSQLDATABASE}}
JWT_SECRET=your_production_jwt_secret_minimum_32_characters_random
```

**Important:** Update `JWT_SECRET` with a strong random string!

Generate a secure JWT secret:

```javascript
// Generate in Node.js console
require("crypto").randomBytes(64).toString("hex");
```

### Step 5: Deploy

1. Railway automatically deploys on push to main branch
2. Go to **Deployments** tab to view logs
3. Once deployed, Railway provides a public URL
4. Click the URL to access your live app!

### Step 6: Custom Domain (Optional)

1. In Railway dashboard, go to **Settings**
2. Add custom domain under **Domains**
3. Configure DNS records as instructed

## 📊 API Endpoints

### Authentication Routes

| Method | Endpoint         | Description             | Auth Required |
| ------ | ---------------- | ----------------------- | ------------- |
| POST   | `/api/signup`    | Register new user       | ❌            |
| POST   | `/api/login`     | Authenticate user       | ❌            |
| POST   | `/api/logout`    | Logout user             | ✅            |
| GET    | `/api/dashboard` | Get user dashboard data | ✅            |

### Request/Response Examples

#### Signup

**Request:**

```json
POST /api/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

**Request:**

```json
POST /api/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Protected Dashboard

**Request:**

```http
GET /api/dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-03-15T10:30:00.000Z"
  }
}
```

## 🔐 Security Features

### Password Security

- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Minimum 6 character password requirement
- ✅ No plaintext passwords stored

### JWT Token Security

- ✅ Signed with secret key
- ✅ 1-hour expiration time
- ✅ Verified on every protected request
- ✅ Stored securely in localStorage

### Database Security

- ✅ Parameterized queries (SQL injection prevention)
- ✅ Connection pooling for performance
- ✅ Unique constraint on email

### Best Practices

- ✅ Environment variables for sensitive data
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on frontend and backend
- ✅ Error handling without exposing internals

## 🐛 Troubleshooting

### Database Connection Failed

**Error:** `✗ Database connection failed`

**Solutions:**

1. Verify MySQL is running: `mysql -u root -p`
2. Check credentials in `.env` file
3. Ensure database exists: `CREATE DATABASE auth_db`
4. Verify DB_USER has proper permissions

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**

```bash
# Windows - Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change PORT in .env to different number
PORT=3001
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**

```bash
npm install
```

### JWT Secret Missing

**Error:** `jwtSecret must be provided`

**Solution:**

1. Check `.env` file exists
2. Verify `JWT_SECRET` is set
3. Restart server after changes

### Table Doesn't Exist

**Error:** `Table 'auth_db.users' doesn't exist`

**Solution:**

```bash
# Run schema.sql manually
mysql -u root -p auth_db < schema.sql

# Or let server auto-create it (it runs CREATE TABLE IF NOT EXISTS)
```

### Login Fails with "Invalid Credentials"

**Solutions:**

1. Verify user exists in database
2. Check if password meets minimum length
3. Try registering a new user
4. Clear browser cache and localStorage

### Frontend Not Loading

**Solutions:**

1. Check `public` folder exists with HTML files
2. Verify static middleware in server.js
3. Check browser console for errors
4. Clear browser cache

## 📝 Environment Variables Reference

| Variable      | Description        | Default   | Required |
| ------------- | ------------------ | --------- | -------- |
| `PORT`        | Server port        | 3000      | ✅       |
| `DB_HOST`     | MySQL host         | localhost | ✅       |
| `DB_USER`     | MySQL username     | root      | ✅       |
| `DB_PASSWORD` | MySQL password     | ''        | ✅       |
| `DB_NAME`     | Database name      | auth_db   | ✅       |
| `JWT_SECRET`  | JWT signing secret | -         | ✅       |

## 🔧 Development Tips

### Enable Debug Logging

Add to server.js:

```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Test with Postman/Thunder Client

Import these endpoints to test API directly without frontend.

### Database Management

Use MySQL Workbench, phpMyAdmin, or DBeaver for visual database management.

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [bcryptjs NPM](https://www.npmjs.com/package/bcryptjs)
- [Railway Documentation](https://docs.railway.app/)

## 🤝 Contributing

This is a starter template. Feel free to customize:

- Add password reset functionality
- Implement email verification
- Add user profile editing
- Include role-based access control
- Add OAuth providers (Google, Facebook, etc.)

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

Built with modern web technologies for educational and production purposes.

---

**Happy Coding! 🚀**

For issues or questions, check the troubleshooting section above.
