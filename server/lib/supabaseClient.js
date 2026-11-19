import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.warn('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set: contact messages will not be stored.');
}

export const supabase = url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
