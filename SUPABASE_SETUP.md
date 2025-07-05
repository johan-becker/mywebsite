# Supabase Authentication Setup

## 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Go to Settings > API to find your project credentials

## 2. Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace:
- `your_supabase_project_url` with your actual Supabase project URL
- `your_supabase_anon_key` with your actual Supabase anon key

## 3. Authentication Configuration

In your Supabase dashboard:

1. Go to **Authentication > Settings**
2. Configure **Site URL** to `http://localhost:3000` (for development)
3. Add your production URL when deploying
4. Configure **Email Templates** if needed
5. Set up **Redirect URLs** for OAuth providers (optional)

## 4. Database Setup (Optional)

If you want to store additional user profile data:

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  full_name TEXT,
  avatar_url TEXT,
  
  PRIMARY KEY (id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile." ON profiles FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
```

## 5. Features Included

- **Login/Signup Forms**: Theme-aware authentication forms
- **Email Verification**: Automatic email confirmation for new users
- **Password Visibility Toggle**: Show/hide password functionality
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Visual feedback during authentication
- **Responsive Design**: Works on all device sizes
- **Dual Theme Support**: Matrix and Professional themes

## 6. Usage

The authentication system is now integrated into your `/login` route. Users can:

1. **Sign Up**: Create a new account with email verification
2. **Sign In**: Login with existing credentials
3. **Toggle**: Switch between login and signup modes
4. **Theme Support**: Automatically adapts to current theme (Matrix/Professional)

## 7. Next Steps

After setting up authentication, you might want to:

1. Add password reset functionality
2. Implement OAuth providers (Google, GitHub, etc.)
3. Create protected routes
4. Add user profile management
5. Set up email templates customization

## 8. Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Enable RLS (Row Level Security) for database tables
- Configure proper CORS settings for production
- Use HTTPS in production environments 