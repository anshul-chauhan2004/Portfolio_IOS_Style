import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zjmhvrflmgqwwjoqcxwb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqbWh2cmZsbWdxd3dqb3FjeHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjM3MjIsImV4cCI6MjA4MTE5OTcyMn0.mH8yNXkNggPVR6vYxN7YrzQNKOvIWtdwr5kxvuLf2y8'

export const supabase = createClient(supabaseUrl, supabaseKey)
