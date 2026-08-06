import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Явно указываем путь к .env файлу в корне проекта
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Поднимаемся из src/lib/ в корень backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Проверка для быстрой отладки
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Ошибка: SUPABASE_URL или SUPABASE_KEY не загрузились!');
    console.error('Проверь process.env.SUPABASE_URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseKey);