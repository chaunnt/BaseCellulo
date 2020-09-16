/* eslint-disable no-unused-vars */
const router = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cellRouter = require('./Cell/routes/CellRouter')(Cell);

// Swagger set up
const modelPaths = ['./server/api/**/**/models/*.js'];
const routerPaths = [
  './server/api/**/routes/*.js',
  './server/auth/routes/*.js'
];

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'A NodeJS API Template with Express.JS and MongoDB'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:4000/api'
      }
    ]
  },
  apis: [...routerPaths, ...modelPaths]
};
const specs = swaggerJsdoc(options);

// swagger route
router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// api router will mount other routers for all our resources
router.use('/cell', cellRouter);

module.exports = router;
