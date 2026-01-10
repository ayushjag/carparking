# ParkEase - Modern Car Parking Booking Platform

A comprehensive, two-sided marketplace for finding and listing parking spots. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### For Drivers

- **Location-Based Search**: Find available parking spots near any location
- **Real-Time Availability**: See live parking spot availability
- **Filter & Sort**: Filter by price, distance, rating, and parking type
- **Instant Booking**: Reserve parking spots with instant confirmation
- **Booking Management**: Track all bookings in a unified dashboard
- **Reviews & Ratings**: Read reviews from other drivers

### For Parking Owners

- **List Parking Spots**: Create and manage parking space listings
- **Set Your Own Prices**: Full control over hourly and daily rates
- **Availability Management**: Enable/disable listings anytime
- **Booking Tracking**: View all bookings and revenue in one place
- **Analytics Dashboard**: Track earnings and booking statistics

### Core Features

- **Role-Based Authentication**: Separate interfaces for drivers and parking owners
- **Secure Payments**: Integrated payment system (ready for Stripe)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean, Apple-like design with smooth animations
- **Database with RLS**: Secure data access with Row Level Security

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 1. Clone and Install

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. The database schema has already been created via migrations
3. Get your Supabase credentials:
   - Go to Project Settings > API
   - Copy the Project URL
   - Copy the anon/public key

### 3. Environment Variables

Update `.env.local` with your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Database Schema

The platform includes a comprehensive database schema with:

- **profiles**: User accounts with role-based access (driver/owner)
- **parking_spots**: Parking spot listings with location, pricing, and amenities
- **bookings**: Reservation records with status tracking
- **reviews**: User reviews and ratings for parking spots
- **favorites**: Saved parking spots for drivers

All tables include:

- Row Level Security (RLS) policies for data protection
- Proper indexes for optimal query performance
- Automatic timestamp updates
- Foreign key relationships

## Project Structure

\`\`\`
parkease/
├── app/ # Next.js app router pages
│ ├── auth/ # Authentication pages (login, signup)
│ ├── booking/ # Booking flow pages
│ ├── dashboard/ # User dashboard
│ ├── owner/ # Owner dashboard
│ ├── parking/ # Parking spot pages (create, view, edit)
│ ├── search/ # Search & browse parking spots
│ └── about/ # About page
├── components/ # React components
│ ├── layout/ # Navigation, footer, etc.
│ └── ui/ # Reusable UI components (shadcn/ui)
├── lib/ # Utility functions and configurations
│ ├── context/ # React context providers
│ └── supabase/ # Supabase client and types
├── hooks/ # Custom React hooks
└── public/ # Static assets
\`\`\`

## Key Pages

### Public Pages

- `/` - Landing page with search functionality
- `/search` - Browse and filter parking spots
- `/parking/[id]` - Parking spot details
- `/about` - About page

### Driver Pages (Authenticated)

- `/dashboard` - User bookings and history
- `/booking/[spotId]` - Booking checkout
- `/booking/confirmation/[bookingId]` - Booking confirmation

### Owner Pages (Authenticated)

- `/owner/dashboard` - Owner dashboard with stats and listings
- `/parking/create` - Create new parking spot listing

### Authentication

- `/auth/login` - Sign in
- `/auth/signup` - Sign up (choose role: driver or owner)

## Features in Detail

### Authentication System

- Email/password authentication via Supabase
- Role-based access control (driver vs. owner)
- Protected routes with automatic redirects
- Profile management

### Search & Discovery

- Location-based search
- Filter by price range, parking type, amenities
- Sort by distance, price, and ratings
- Real-time availability status

### Booking System

- Date/time selection
- Price calculation
- Vehicle information capture
- Instant booking confirmation
- Booking status tracking

### Owner Dashboard

- View all parking spot listings
- Toggle spot availability
- Track bookings and revenue
- View booking statistics

### User Dashboard

- View all bookings (active, completed, cancelled)
- Booking history
- Quick access to active reservations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

The `netlify.toml` configuration is already included for Vercel deployment.

### Environment Variables for Production

Make sure to set these in your deployment platform:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
\`\`\`

## Future Enhancements

Potential features to add:

- Google Maps/Mapbox integration for interactive maps
- Stripe payment integration
- Real-time notifications
- QR code parking entry
- Mobile app (React Native)
- Reviews and ratings system (UI ready, needs backend completion)
- Favorites/saved spots (UI ready, needs backend completion)
- Admin panel for platform management
- Analytics and reporting
- Multi-language support

## Contributing

This is a professional parking marketplace platform built by our development team. Feel free to customize and deploy for your own business needs.

## Clean Installation

To remove development artifacts:

\`\`\`bash
rm -rf .bolt # Remove Bolt development configuration
\`\`\`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase**
