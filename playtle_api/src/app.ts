import express from 'express';
import { gamesRouter } from './routes/gameRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/games', gamesRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;