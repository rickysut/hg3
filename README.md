# Q&A System

A modern React-based question and answer system built with TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- **Ask Questions**: Users can submit questions with optional names
- **Display Active Questions**: Display screen shows the currently active question
- **Admin Panel**: Moderators can manage and activate questions
- **Real-time Updates**: Questions update in real-time across all connected clients
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error boundaries and user feedback

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Routing**: React Router
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hg3
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   Create a `questions` table in your Supabase database with the following structure:

```sql
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'answered')),
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Enable Realtime for the questions table:

   - Go to your Supabase dashboard
   - Navigate to Database → Replication
   - Under "Source", select your database
   - Find the "questions" table and toggle the Realtime switch to enable it
   - This is required for real-time updates to work in the admin panel

6. Start the development server:

```bash
npm run dev
```

## Usage

### Asking Questions

1. Navigate to the home page (`/`)
2. Enter your question in the text area
3. Optionally add your name
4. Click "Submit Question"

### Displaying Questions

1. Navigate to `/display` to see the currently active question
2. The display automatically refreshes every 5 seconds

### Managing Questions (Admin)

1. Navigate to `/admin` to access the moderator panel
2. View all submitted questions
3. Click "Show" next to a question to make it active
4. Only one question can be active at a time

## Project Structure

```
src/
├── components/
│   └── ErrorBoundary.tsx    # Error handling component
├── hooks/
│   └── useSupabaseQuery.ts  # Custom hook for Supabase queries
├── pages/
│   ├── Ask.tsx              # Question submission form
│   ├── Display.tsx          # Active question display
│   └── Admin.tsx            # Admin panel for moderation
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
├── supabaseClient.ts        # Supabase client configuration
└── index.css                # Global styles and Tailwind imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
