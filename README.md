# AstroCircle - Your Personal Astrology Dashboard

## Overview
AstroCircle is a modern web application that provides personalized astrological insights using birth chart analysis, planetary positions, and AI-powered predictions. The application uses Next.js 14, Supabase for authentication and data storage, and integrates with various astrological APIs.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Authentication & Data Flow](#authentication--data-flow)
- [API Integrations](#api-integrations)
- [Component Architecture](#component-architecture)
- [Database Schema](#database-schema)
- [AI Integration](#ai-integration)
- [Setup & Installation](#setup--installation)

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **Authentication**: Supabase Auth
- **AI**: DeepSeek API for astrological interpretations
- **APIs**: Free Astrology API for chart calculations
- **Data Visualization**: Recharts for trend visualization

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main dashboard page
│   ├── login/             # Authentication pages
│   └── api/               # API route handlers
├── components/
│   ├── cards/             # Reusable card components
│   │   ├── AstroAnalysisCard.tsx    # Planetary positions
│   │   ├── AspectCard.tsx           # Astrological aspects
│   │   ├── UserInfoCard.tsx         # User information
│   │   ├── VedicChartCard.tsx       # Vedic chart display
│   │   └── BirthChartCard.tsx       # Birth chart
│   ├── dashboard/         # Main dashboard components
│   │   ├── KundliChart.tsx          # Kundli chart visualization
│   │   └── UserProfile.tsx          # User profile management
│   └── ui/               # Shared UI components
├── lib/                  # Utility functions and services
│   ├── supabase.ts      # Supabase client configuration
│   ├── horoscope-service.ts  # Horoscope calculation service
│   └── chart-service.ts      # Chart generation service
└── types/               # TypeScript type definitions
```

## Authentication & Data Flow

### Supabase Integration
1. **Authentication Flow**:
   - Users sign up/login using Supabase Auth
   - JWT tokens are managed automatically by Supabase client
   - Protected routes check for valid session

2. **User Data Storage**:
   ```sql
   -- profiles table schema
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users PRIMARY KEY,
     full_name TEXT,
     birth_date DATE,
     birth_time TIME,
     birth_place TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Data Synchronization**:
   - Profile updates trigger real-time updates via Supabase subscriptions
   - Changes are reflected immediately in the UI
   - Cached in localStorage for offline access

## API Integrations

### 1. Free Astrology API
- **Endpoint**: `https://json.freeastrologyapi.com/`
- **Usage**: Generates SVG charts and calculates planetary positions
- **Authentication**: API key in environment variables
- **Rate Limits**: 100 requests/day

```typescript
// Example chart generation call
const response = await fetch('https://json.freeastrologyapi.com/horoscope-chart-svg-code', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    date: birthDate,
    time: birthTime,
    place: birthPlace
  })
});
```

### 2. DeepSeek AI Integration
- **Purpose**: Generates personalized astrological interpretations
- **Endpoint**: `/api/predictions`
- **Model**: DeepSeek-67B
- **Context Window**: 8K tokens
- **Response Format**:
  ```json
  {
    "health": "Detailed health prediction...",
    "career": "Career outlook...",
    "love": "Relationship insights...",
    "wealth": "Financial predictions..."
  }
  ```

## Component Architecture

### 1. Main Dashboard (`page.tsx`)
- Entry point for the application
- Manages layout and component composition
- Handles data fetching and state management

### 2. KundliChart Component
- Renders Vedic astrological chart
- Uses SVG for chart visualization
- Updates in real-time with planetary movements
- Handles zodiac sign calculations

### 3. UserProfile Component
- Manages user information
- Handles birth details updates
- Integrates with Supabase for data persistence
- Provides form validation and error handling

### 4. AstroAnalysisCard Component
- Displays planetary positions table
- Shows current positions of 9 planets
- Updates periodically for real-time positions
- Includes degree calculations for each planet

## Data Flow

1. **User Authentication**:
   ```mermaid
   sequenceDiagram
   User->>Frontend: Login/Signup
   Frontend->>Supabase: Auth Request
   Supabase-->>Frontend: JWT Token
   Frontend->>User: Dashboard Access
   ```

2. **Horoscope Generation**:
   ```mermaid
   sequenceDiagram
   Frontend->>API: Birth Details
   API->>Astro API: Chart Calculation
   Astro API-->>API: SVG & Positions
   API->>DeepSeek: Context + Prompt
   DeepSeek-->>API: Predictions
   API-->>Frontend: Combined Response
   ```

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ASTRO_API_KEY=your_astrology_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
```

## Setup & Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/yourusername/astrocircle.git
   cd astrocircle
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy `.env.example` to `.env.local`
   - Fill in required API keys and credentials

4. **Database Setup**:
   - Create Supabase project
   - Run migration scripts
   - Set up authentication providers

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## API Routes

### 1. `/api/horoscope`
- **Method**: POST
- **Purpose**: Generates horoscope readings
- **Parameters**:
  ```typescript
  {
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  }
  ```

### 2. `/api/chart`
- **Method**: POST
- **Purpose**: Generates astrological charts
- **Parameters**: Birth details
- **Returns**: SVG chart data

### 3. `/api/predictions`
- **Method**: POST
- **Purpose**: AI-generated predictions
- **Uses**: DeepSeek API
- **Returns**: Detailed predictions

## Error Handling
- Client-side form validation
- API error responses
- Supabase error handling
- Fallback UI components
- Error boundary implementation

## Performance Optimization
- Static page generation where possible
- Dynamic imports for heavy components
- Image optimization
- API response caching
- Supabase real-time subscriptions

## Security Measures
- JWT authentication
- API route protection
- Environment variable security
- SQL injection prevention
- XSS protection

## Future Enhancements
1. Multiple chart types support
2. Advanced prediction algorithms
3. Social sharing features
4. Compatibility calculations
5. Mobile app development

## AI Integration

The application uses DeepSeek R1 through OpenRouter for astrological calculations. Key features:

- **Model**: `deepseek/deepseek-r1:free`
- **Capabilities**: 
  - Calculates precise planetary positions
  - Handles complex astrological computations
  - Provides accurate house and zodiac sign placements
- **Benefits**:
  - Free input and output tokens
  - High performance (671B parameters)
  - MIT licensed and open-source
  - Reliable uptime through OpenRouter

The AI integration is primarily used in the planetary positions service (`src/lib/planetary-service.ts`) to calculate:
- Planet positions (Sun, Moon, Mars, etc.)
- House placements (1-12)
- Zodiac sign positions (in Sanskrit)
- Precise degree calculations


