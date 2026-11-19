import { Router } from 'express';
import { ApiError, asyncHandler, cleanText, isEmail } from '../lib/http.js';
import { supabase } from '../lib/supabaseClient.js';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const name = cleanText(req.body?.name, 120);
    const email = cleanText(req.body?.email, 200);
    const topic = cleanText(req.body?.topic, 120) || 'General question';
    const message = cleanText(req.body?.message, 5000);

    if (name.length < 2) throw new ApiError(400, 'Please provide your name.');
    if (!isEmail(email)) throw new ApiError(400, 'Please provide a valid email address.');
    if (message.length < 10) throw new ApiError(400, 'Message should be at least 10 characters.');

    if (!supabase) {
      throw new ApiError(503, 'Message storage is not configured on this server yet.');
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({ name, email, topic, message })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to store contact message:', error.message);
      throw new ApiError(500, 'We could not save your message right now. Please try again later.');
    }

    res.status(201).json({ ok: true, id: data.id });
  })
);

export default router;
