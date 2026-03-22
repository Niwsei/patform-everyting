import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vientiane Nest API Documentation',
      version: '1.0.0',
      description: 'Centralized API for the Vientiane Nest ecosystem (V1)',
      contact: {
        name: 'Vientiane Nest Dev Team',
        email: 'dev@vte-nest.la'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/modules/**/*.routes.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
