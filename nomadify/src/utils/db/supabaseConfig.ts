import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://evczqgnjshqwabzldfft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Y3pxZ25qc2hxd2FiemxkZmZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTM2NzUwNywiZXhwIjoyMDE2OTQzNTA3fQ.BXi3xsQvSRM4u8Fxt2os_ES7cGqV5TuJmkj7gw7uTX8';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is missing in the environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;