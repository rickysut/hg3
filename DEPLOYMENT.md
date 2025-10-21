# Deploying to Netlify

## Method 1: Using Netlify CLI (Recommended)

1. Install Netlify CLI globally:

   ```bash
   npm install -g netlify-cli
   ```

2. Login to your Netlify account:

   ```bash
   netlify login
   ```

3. Deploy your site:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Method 2: Using Git Integration

1. Push your code to a GitHub repository

2. Connect your Netlify account to GitHub

3. In Netlify dashboard:
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

## Method 3: Drag and Drop

1. Run the build command:

   ```bash
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder to the deployment area

## Environment Variables

After deployment, you'll need to set your environment variables in Netlify:

1. Go to Site settings → Build & deploy → Environment
2. Add these variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Update your DNS records as instructed by Netlify
