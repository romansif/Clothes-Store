import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Ошибка: SUPABASE_URL или SUPABASE_KEY не загрузились из .env!');
    console.error('SUPABASE_URL:', supabaseUrl);
    throw new Error('Supabase URL or Key is missing in environment variables.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);