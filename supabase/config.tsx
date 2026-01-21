import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://mifzihtvrwgngbpgyoej.supabase.co',
    'https://mifzihtvrwgngbpgyoej.supabase.co')