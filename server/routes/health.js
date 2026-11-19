import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';

const startedAt = Date.now();

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      status: 'ok',
      service: 'NutriSmart AI API',
      uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
