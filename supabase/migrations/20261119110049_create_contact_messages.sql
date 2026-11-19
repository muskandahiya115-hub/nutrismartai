/*
# Create contact_messages table

1. Plain-English summary
   The NutriSmart AI website has a contact form. Previously, submissions were only
   validated in the browser and never stored anywhere. This migration creates a table
   so the new Express backend can permanently save every message a visitor sends.

2. New Tables
   - `contact_messages`
     - `id` (uuid, primary key, auto-generated)
     - `name` (text, not null) - the visitor's name
     - `email` (text, not null) - the visitor's email address
     - `topic` (text, not null) - the subject they picked in the form
     - `message` (text, not null) - the message body
     - `created_at` (timestamp with time zone, defaults to now)

3. Modified Tables
   - None. This migration only creates one new table.

4. Security
   - Row Level Security is ENABLED on `contact_messages`.
   - No SELECT, UPDATE or DELETE policies are created, so the table is not readable
     through the public Data API. Contact submissions are private.
   - An INSERT policy allows the anonymous role to create rows (anyone may use the
     contact form), but never to read, change or delete existing ones.
   - INSERT privilege is granted only to `anon` and `service_role` (the backend uses
     the service role to store submissions).

5. Important notes
   - The backend writes with the service role key, which bypasses RLS but still needs
     the table and column grants.
   - No existing tables or data are modified.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  topic text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT (name, email, topic, message) ON contact_messages TO anon, service_role;

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;

CREATE POLICY "Anyone can submit a contact message"
ON contact_messages FOR INSERT
TO anon
WITH CHECK (true);
