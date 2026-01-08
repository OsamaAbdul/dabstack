# Dabstack

Dabstack is a modern, comprehensive dashboard and project management application designed for digital agencies and their clients. It provides a seamless interface for managing projects, tracking revenue, real-time messaging, and handling user administration.

## System Overview

The application is built as a Single Page Application (SPA) using React and modern web technologies, backed by Supabase for authentication, database, and real-time capabilities. It features a responsive design that works across desktop and mobile devices.

### Key Modules

- **Authentication**: Secure user login and registration flows.
- **Client Dashboard**: A dedicated view for clients to track their project progress, view billing/invoices, and communicate with the admin.
- **Admin Panel**: A powerful administration interface for managing users, projects, and viewing platform analytics.
- **Messaging System**: Real-time chat functionality allowing communication between clients and admins, supporting message editing and deletion.
- **Billing & Analytics**: Visualization of revenue, project growth, and detailed billing history.

## Technology Stack

The project leverages a modern stack to ensure performance, scalability, and developer experience:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: Radix UI primitives with shadcn/ui for accessible, consistent components
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: React Router DOM (v6)
- **Backend/Infrastructure**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Charts/Visualization**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Features

### 1. Dashboard & Project Management
- **Project Tracking**: Users can view the status (Onboarding, In Progress, Completed) of their projects.
- **Budget Monitoring**: clear display of project budgets and payments.
- **Interactive UI**: Smooth transitions and animations for a premium feel.

### 2. Admin Capabilities
- **User Management**: Admins can view all registered users and clients.
- **Analytics Dashboard**: Real-time visualization of:
    - Total Users and Clients
    - Revenue trends (Area Chart)
    - Monthly Project Growth (Bar Chart)
- **Role-Based Access Control**: Strict separation of Admin vs. User views and permissions.

### 3. Messaging
- **Real-Time Updates**: Messages appear instantly via Supabase Realtime subscriptions.
- **Edit & Delete**: Users can edit or delete their own messages, with proper state reflection for all participants.
- **Typing Indicators**: Optimistic UI updates for a snappy experience.

### 4. User Settings
- **Profile Management**: Users can update their personal details (Full Name).
- **Security**: Visual confirmation of email address and account status.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication forms and modals
│   ├── dashboard/     # Dashboard-specific features (AdminPanel, Messaging, etc.)
│   ├── landing/       # Landing page sections
│   └── ui/            # Generic design system components (buttons, cards, inputs)
├── hooks/             # Custom React hooks (useAuth, useMessages, useProjects, etc.)
├── pages/             # Route components (Dashboard, Auth, Index, NotFound)
├── lib/               # Utility functions (cn, etc.)
├── integrations/      # Third-party integrations (Supabase client & types)
└── App.tsx            # Main application entry point with routing
```

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OsamaAbdul/dabstack.git
   cd project-compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Deployment

The application is optimized for deployment on modern hosting platforms like Vercel or Netlify.

1. Build the production assets:
   ```bash
   npm run build
   ```

2. Preview the build locally:
   ```bash
   npm run preview
   ```

## License

All rights reserved. 2026 Dabstack.
