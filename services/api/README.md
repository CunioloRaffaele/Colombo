# Colombo API

Backend API service for the Green Drive project. This Express.js application provides RESTful endpoints for user management, vehicle tracking, and geographic zone management.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Scripts](#scripts)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database
- npm

### Installation

1. Navigate to the API directory:
```bash
cd services/api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Generate Prisma schema (if needed):
```bash
npx prisma db pull
```

5. Generate Prisma client locally (this is done automatically by the `easyStart` script, but you can run it manually if needed):
```bash
npx prisma generate
```

6. Start the server:
```bash
npm run easyStart
```

Or for development with hot reloading:
```bash
npm run debug
```

The Express server will be running on `http://localhost:3000` by default.

## Environment Variables

Create a `.env` file in the `services/api` directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secret-key` |
| `JWT_EXPIRATION` | JWT token expiration time | `24h` |
| `DATABASE_URL` | PostgreSQL connection string for Prisma | `postgresql://user:password@localhost:5432/dbname` |

**Note:** Never commit `.env` files to version control. Use environment variables on the server or a secret manager in production.

## API Documentation

Interactive Swagger documentation is available at: `http://localhost:3000/api-docs`

The API uses OpenAPI 3.0 specification. All endpoints are prefixed with `/v1`.

### Servers

- **Development:** `http://localhost:3000/v1`
- **Production:** `https://greendrive.duckdns.org/api/v1`

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/ping` | Health check - returns `{"message": "pong"}` |

### Users (Citizens)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/v1/auth/user` | Register a new citizen | No |
| POST | `/v1/auth/login/user` | Login a citizen | No |
| GET | `/v1/auth/user` | Get authenticated citizen info | Yes |
| PUT | `/v1/auth/user` | Update citizen account | Yes |
| DELETE | `/v1/auth/user` | Delete citizen account | Yes |

### Municipalities (Comuni)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/v1/auth/comune` | Register a municipality | No |
| POST | `/v1/auth/login/comune` | Login a municipality | No |
| GET | `/v1/auth/comune` | Get authenticated municipality info | Yes |
| GET | `/v1/auth/comuni` | List all registered municipalities | No |
| GET | `/v1/auth/comuni/subset?query=` | Search municipalities by name prefix | No |

### Vehicles

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/v1/vehicles/car` | Add a car to user account | Yes |
| GET | `/v1/vehicles/cars` | List all user's cars | Yes |
| GET | `/v1/vehicles/car/details/:vin` | Get car info by VIN | Yes |
| DELETE | `/v1/vehicles/car/:vin` | Remove a car from user account | Yes |

### Zones

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/v1/zones` | Save a geographic zone | No |
| POST | `/v1/zones/contains` | Check if a point is inside a zone | No |

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected endpoints:

1. Obtain a token by logging in via `/v1/auth/login/user` or `/v1/auth/login/comune`
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Token Payload

The JWT token contains:
- `email`: User's email address
- `type`: Account type (`cittadino` or `comune`)
- `nome`: User's first name (for citizens) or municipality name (for municipalities)

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run easyStart` | Generate Prisma client and start server |
| `npm run debug` | Start server with nodemon for development |
| `npm run prisma:pull` | Pull database schema to Prisma |
| `npm run prisma:generate` | Generate Prisma client |

## Project Structure

```
services/api/
├── app.js              # Express app configuration
├── bin/
│   └── www             # Server entry point
├── middleware/
│   ├── auth.js         # JWT authentication middleware
│   └── validateJsonRequest.js  # JSON content-type validation
├── prisma/
│   └── schema.prisma   # Database schema
├── routes/
│   ├── index.js        # Route aggregator
│   ├── users/          # User & municipality endpoints
│   ├── vehicles/       # Vehicle management endpoints
│   └── zones/          # Geographic zone endpoints
├── swagger/
│   └── definitions.js  # OpenAPI/Swagger documentation
└── utils/
    ├── jwt.js          # JWT utility functions
    └── prisma.js       # Prisma client instance
```

## Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found |
| 406 | Not Acceptable - Non-JSON request |
| 500 | Internal Server Error |
