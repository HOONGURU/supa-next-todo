curl 'https://xrbwesvrrljzlsledfik.supabase.co/rest/v1/todos_no_rls?select=*' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYndlc3ZycmxqemxzbGVkZmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNzY0MzcsImV4cCI6MjAzMzg1MjQzN30.wultSJza5Y0D62frQG-GKSScE-btzPgovQB2tSS8A_Y"

npx supabase gen types typescript --project-id "xrbwesvrrljzlsledfik" --schema public > types/supabase.ts
