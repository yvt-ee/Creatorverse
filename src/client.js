import { createClient } from '@supabase/supabase-js';


// Create a variable called URL. Assign it a string containing your Supabase Project URL.
const URL = 'https://ohqkzwmtrorshccfvfvg.supabase.co';

// Create a variable called API_KEY. Assign it a string containing your Supabase Project API Key.
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocWt6d210cm9yc2hjY2Z2ZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTMyODAsImV4cCI6MjA2OTU2OTI4MH0.8oSXUEedfHN6_u7muxOxTNJHpS1IHhQnFFCCpEnwdTQ';

// Export the supabase variable by adding the export keyword before const supabase.
export const supabase = createClient(URL, API_KEY);



