const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
if (process.env.NODE_ENV !== 'production') {
  // Load .env only in non-production environments
  const result = require('dotenv').config();
  if (result.error) {
    console.log("Unable to load \".env\" file.");
    process.exit(-1);
  }
}

var routesV1 = require('./routes/index');

var app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', routesV1);

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Colombo API',
      version: '1.0.0',
      description: 'API documentation for the Colombo GreenDrive project',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
        description: 'Development server',
      },
      {
        url: 'https://greendrive.duckdns.org/api/v1',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Path to the API docs - centralized in swagger/definitions.js
  apis: ['./swagger/definitions.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Requested endpoint is not matched by any route
app.use(function (req, res, next) {
  res.status(404);
  res.json({
    status: 404,
    message: 'Endpoint Not Found'
  });
});

// Custom error handler
app.use((err, req, res, next) => {
  // Set the status code (default to 500 if not set)
  const statusCode = err.status || 500;
  // Send a JSON response with the error message
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
