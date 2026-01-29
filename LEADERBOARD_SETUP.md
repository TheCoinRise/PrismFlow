# Global Leaderboard Setup with Supabase

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up (free tier is fine)
3. Click "New Project"
4. Fill in:
   - **Name**: `prismflow-leaderboard` (or any name)
   - **Database Password**: (save this, you won't need it for API)
   - **Region**: Choose closest to you
5. Wait ~2 minutes for project to initialize

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL and run it:

```sql
-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  total_stars INTEGER DEFAULT 0,
  total_gems INTEGER DEFAULT 0,
  completed_levels INTEGER DEFAULT 0,
  best_move_count INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_stars ON leaderboard(total_stars DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_username ON leaderboard(username);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read leaderboard
CREATE POLICY "Anyone can read leaderboard" ON leaderboard
  FOR SELECT
  USING (true);

-- Allow anyone to insert/update their own scores
CREATE POLICY "Anyone can insert scores" ON leaderboard
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update scores" ON leaderboard
  FOR UPDATE
  USING (true);
```

## Step 3: Create Database Function for Score Submission

In the **SQL Editor**, run this to create a function that handles score updates:

```sql
-- Function to upsert (insert or update) a score
-- This function increments totals when a level is completed
CREATE OR REPLACE FUNCTION submit_score(
  p_username TEXT,
  p_level_id TEXT,
  p_move_count INTEGER,
  p_stars INTEGER,
  p_gems_earned INTEGER
)
RETURNS void AS $$
BEGIN
  INSERT INTO leaderboard (username, total_stars, total_gems, completed_levels)
  VALUES (p_username, p_stars, p_gems_earned, 1)
  ON CONFLICT (username) DO UPDATE SET
    total_stars = leaderboard.total_stars + p_stars,
    total_gems = leaderboard.total_gems + p_gems_earned,
    completed_levels = leaderboard.completed_levels + 1,
    last_updated = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Note:** The function uses `SECURITY DEFINER` so it can be called via the REST API with the anon key.

## Step 4: Get Your API URL and Key

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: (the `anon` key, not the `service_role` key)

## Step 5: Update Your App Config

The API service is already configured to use Supabase! Just set your credentials:

### Option A: Set Environment Variables (Recommended for Production)

In your EAS build, set secrets:

```bash
eas secret:create --scope project --name LEADERBOARD_API_URL --value "https://xxxxx.supabase.co"
eas secret:create --scope project --name SUPABASE_ANON_KEY --value "your-anon-key-here"
```

### Option B: Update app.config.js Directly (For Testing)

Update `app.config.js`:

```javascript
extra: {
  // ... other config
  leaderboardApiUrl: process.env.LEADERBOARD_API_URL || "https://xxxxx.supabase.co",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "your-anon-key-here"
}
```

Replace `xxxxx` with your actual Supabase project ID (found in your project URL).

## Step 6: Test It!

1. Build and run your app
2. Set a username in Settings
3. Complete a level
4. Check the Leaderboard screen - you should see your score!

---

## How It Works

- **No server code needed!** Supabase auto-generates REST endpoints from your database
- The app calls Supabase's REST API directly:
  - `POST /rest/v1/rpc/submit_score` - Submits scores
  - `GET /rest/v1/leaderboard?order=total_stars.desc` - Gets leaderboard
  - `GET /rest/v1/leaderboard?username=eq.{username}` - Gets user rank

## Troubleshooting

- **"Leaderboard API not configured"** - Make sure you set `LEADERBOARD_API_URL` and `SUPABASE_ANON_KEY`
- **401 Unauthorized** - Check that your anon key is correct
- **Function not found** - Make sure you ran the SQL function creation script in Step 3
- **Scores not appearing** - Check Supabase dashboard → Table Editor → `leaderboard` to see if data is being inserted
