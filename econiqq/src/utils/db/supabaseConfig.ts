import { createClient } from '@supabase/supabase-js';

// Declaring the url and key for the Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_APP_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Declaring the if statements if url or key are missing
if (!supabaseUrl) {
  throw new Error('Supabase URL is missing in the environment variables');
} else if (!supabaseKey){
  throw new Error('Supabase Key is missing in the environment variables');
}

// declaring and creating the client for the supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// exporting the supabase
export default supabase;