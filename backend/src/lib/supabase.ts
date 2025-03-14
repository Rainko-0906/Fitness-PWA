import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient<Database>;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ 开发环境：使用模拟数据');
    // 在开发环境中，我们可以使用模拟数据
    supabase = {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
      },
      from: (table: string) => ({
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    } as unknown as SupabaseClient<Database>;
  } else {
    throw new Error('Missing Supabase environment variables');
  }
} else {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export { supabase }; 