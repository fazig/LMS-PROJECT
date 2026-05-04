# Professional LMS - Hunarmand Punjab Initiative

## Project Overview

This project is a modern, responsive, and robust Learning Management System (LMS) built for the **Hunarmand Punjab Initiative**. It provides a comprehensive platform for instructors to create and manage courses, and for students to enroll and learn. The system features a responsive UI with dynamic animations, role-based dashboards, and secure authentication to deliver a premium educational experience.
<img width="1352" height="648" alt="about us page" src="https://github.com/user-attachments/assets/36f11bce-415f-4e46-ba32-4503c972ed1b" />


## Technologies Used

### Frontend
- **React 18**: Core library for building the user interface.
- **Vite**: Ultra-fast build tool and development server.
- **React Router DOM**: For seamless client-side routing and navigation.
- **Axios**: For handling HTTP requests to the backend API.
- **Vanilla CSS**: Used for styling, ensuring a flexible, custom, and highly dynamic premium design system.
  <img width="1347" height="630" alt="Hero Section" src="https://github.com/user-attachments/assets/d032b57b-2aed-42d9-a073-4a7dd8e56c8f" />


### Backend
- **Node.js & Express.js**: Fast and scalable server environment and framework for handling API routes.
- **JSON Web Tokens (JWT)**: Used for stateless, secure user authentication.
- **bcryptjs**: For secure password hashing and verification.
- **CORS & Dotenv**: For handling cross-origin requests and environment variables.
<img width="1366" height="645" alt="student dashboard" src="https://github.com/user-attachments/assets/38f9cf84-2699-4f7e-8eef-b3dc4d304c16" />

### Database
- **MongoDB**: NoSQL database used to store users, courses, and enrollments.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, providing schema validation and easy database interactions.
- 

## LMS Options & Features

- **Role-Based Access Control**: Different dashboards and permissions for `admin`, `instructor`, and `student` roles.
- **Course Management**: Instructors and admins can create, update, read, and delete courses.
- **Student Enrollment**: Students can browse available courses, enroll in them, and track their enrolled classes.
- **User Management**: Admins have the authority to view and manage all users on the platform.
- **Dynamic Animations & Premium UI**: Features typing animations, glassmorphism, hover effects, and modern layouts to wow the users.
## Structure of project 

├── backend/
│   ├── .env
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── tests/
│   │   └── smoke.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CourseCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── InstructorDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── admin/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── instructor/
│   │   │   │   └── Dashboard.jsx
│   │   │   └── student/
│   │   │       └── Dashboard.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   ├── enrollmentService.js
│   │   │   └── userService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── LMS-PROJECT.code-workspace
│   └── README.md
│
└── README.md



## Authentication

Authentication is handled securely using **JWT (JSON Web Tokens)**:
1. **Registration**: New users register with their details. Passwords are encrypted using `bcryptjs` before being saved to the database.
2. **Login**: Users authenticate with their credentials. Upon success, the server responds with a signed JWT.
3. **Authorization**: Protected routes require the JWT to be passed in the Authorization header (`Bearer <token>`). Custom middleware verifies the token and user roles before granting access to resources.

## API Requests (Endpoints)

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user and receive a token

### Course Routes (`/api/courses`)
- `GET /` - Retrieve all available courses
- `POST /` - Create a new course (Requires: `admin` or `instructor`)
- `PUT /:id` - Update an existing course (Requires: `admin` or `instructor`)
- `DELETE /:id` - Delete a course (Requires: `admin` or `instructor`)

### User Routes (`/api/users`)
- `GET /` - Retrieve all registered users (Requires: `admin`)
- `DELETE /:id` - Remove a user from the platform (Requires: `admin`)

### Enrollment Routes (`/api`)
- `POST /enroll` - Enroll a student in a course (Requires: `student`)
- `GET /my-courses` - Retrieve all courses the logged-in student is enrolled in (Requires: `student`)

## Installation Steps

Follow these instructions to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd anitiv
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
# For development (uses nodemon)
npm run dev

# For production
npm start
```
*The backend API will run on `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
*(Ensure the API URL matches your backend URL)*

Start the frontend development server:
```bash
npm run dev
```
*The React application will be available at `http://localhost:5173` (or the port specified by Vite).*
## MONGODB 

<img width="1340" height="641" alt="mongodb" src="https://github.com/user-attachments/assets/9940ea71-d38f-4294-ad6f-8b6a9dd7b075" />

