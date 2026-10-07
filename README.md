# In-House CRM - Car Service Management

A professional Next.js 15 application for managing car service operations with real-time analytics and tracking.

## Features

- **Dashboard Analytics**: Real-time statistics with 4 key metrics (Cars In Service, Completed, Pending Delivery, Monthly Revenue)
- **Interactive Charts**: Line charts for daily trends, pie charts for service distribution, and bar charts for revenue tracking
- **Car Intake Form**: Comprehensive form with validation for adding new cars to the service system
- **Data Filtering**: Filter cars by status with dynamic table updates
- **Premium Design**: Purple/grey/gold color scheme with modern glass morphism effects

## Tech Stack

- **Next.js 15** - Latest stable version with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Modern utility-first styling
- **Recharts v3** - Production-ready charting library
- **Lucide React** - Beautiful icons
- **ESLint 9** - Latest linting standards

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard
1. Push your code to GitHub
2. Import the repository in Vercel
3. Select the `in-house-crm` directory as the root
4. Deploy

## Project Structure

```
in-house-crm/
├── app/
│   ├── add-car/
│   │   └── page.tsx         # Car intake form
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Dashboard with charts and tables
│   └── globals.css          # Global styles
├── lib/
│   └── mockData.ts          # Mock data and TypeScript interfaces
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── eslint.config.mjs        # ESLint 9 configuration
```

## Features Detail

### Dashboard Page (/)
- 4 stat cards showing key metrics
- Line chart: Daily intake vs delivery trends
- Pie chart: Service type distribution
- Bar chart: Monthly revenue tracking
- Filterable table of recent cars with status indicators

### Car Intake Form (/add-car)
- Validated form fields:
  - Car details: Name, model, year, fuel type, KM run
  - Owner details: Name, contact, email
  - Service details: Complaints, expected delivery date
- Real-time validation with error messages
- Premium UI with purple/gold accents

## Mock Data

The application includes 6 sample car records with:
- Various service statuses (In Service, Completed, Pending Delivery)
- Different service types (General Maintenance, Major Repair, AC Service, etc.)
- Complete owner information and service details
- Revenue and trend data for charts

## Environment

- Node.js 18+ recommended
- No environment variables required for demo
- Ready for production deployment

## License

Private - For internal use only
