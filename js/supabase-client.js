// Impor fungsi createClient dari library Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// GANTI DENGAN URL DAN KUNCI ANON SUPABASE ANDA
const supabaseUrl = 'https://xfbdmeejwlmijobjzmwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmYmRtZWVqd2xtaWpvYmp6bXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc2MjYsImV4cCI6MjA2ODIyMzYyNn0.RXPz8_4Gbl48D6G3LRTshvTvDT7c-x-JHd2mWb47lSg';

// Buat koneksi ke Supabase dan EKSPOR variabelnya agar bisa digunakan file lain
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
