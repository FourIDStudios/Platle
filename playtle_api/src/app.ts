import express from 'express';
import { gamesRouter } from './routes/gameRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { userRouter } from './routes/userRoutes';

const app = express();
const cors = require('cors')

app.use(express.json());

//Cors Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}))

// Routes
app.use('/games', gamesRouter);
app.use('/users', userRouter);



// Global error handler (should be after routes)
app.use(errorHandler);

export default app;