import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evczqgnjshqwabzldfft.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL is missing in the environment variables');
}

if(!supabaseKey){
  throw new Error('Supabase Key is missing in the environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;