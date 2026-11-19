import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { corsOptions } from './middleware/cors.js';
import healthRouter from './routes/health.js';
import bmiRouter from './routes/bmi.js';
import caloriesRouter from './routes/calories.js';
import mealPlanRouter from './routes/mealPlan.js';
import contactRouter from './routes/contact.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

app.use('/api', cors(corsOptions));

app.use('/api/health', healthRouter);
app.use('/api/bmi', bmiRouter);
app.use('/api/calories', caloriesRouter);
app.use('/api/meal-plan', mealPlanRouter);
app.use('/api/contact', contactRouter);

app.use('/api', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  const status = error.status ?? 500;
  const message = status === 500 ? 'Something went wrong on the server.' : error.message;
  if (status === 500) console.error(error);
  res.status(status).json({ error: message });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`NutriSmart AI API listening on port ${port}`);
});
