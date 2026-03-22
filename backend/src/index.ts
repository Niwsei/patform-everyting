import app from './server';
import http from 'http';
import { errorMiddleware } from '@/middlewares/error.middleware';

// Global Error Handler (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const startServer = () => {
  try {
    server.listen(PORT, () => {
      console.log(`🚀 [Vientiane Nest Backend] Service online at: http://localhost:${PORT}`);
      console.log(`📚 [Swagger Documentation] Available at: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

// Handle Shutdown Gracefully
const gracefulShutdown = () => {
  console.log('🛑 [Vientiane Nest Backend] Initiating shutdown...');
  server.close(() => {
    console.log('✅ [Vientiane Nest Backend] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

startServer();
