# LMS Backend API

Production-ready backend for a MERN Learning Management System (LMS).

## Features

- JWT authentication with role-based access
- Course management
- Student enrollments
- Admin user management

## Project Structure

```
backend/
  config/
    db.js
  controllers/
  middleware/
  models/
  routes/
  utils/
  server.js
```

## Environment Variables

Create a `.env` file in `backend/` with the following values:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

## Scripts

- `npm start` - start the server
- `npm run dev` - start with nodemon
- `npm test` - run a smoke test (no DB required)

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/courses`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `GET /api/users`
- `DELETE /api/users/:id`
- `POST /api/enroll`
- `GET /api/my-courses`

## Notes

- Course create/update/delete requires `admin` or `instructor` roles.
- Enrollment endpoints are restricted to `student` roles.
