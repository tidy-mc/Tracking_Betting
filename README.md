# Betting Tracker - Profit & Loss Management

A modern web application for tracking betting profits and losses across multiple platforms and sports. Built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- ✅ Add, edit, and delete betting records
- ✅ Track profit/loss calculations automatically
- ✅ Filter bets by sport, platform, race type, state, and track
- ✅ Comprehensive statistics and analytics
- ✅ Interactive profit/loss chart over time
- ✅ Mobile-responsive design
- ✅ Local data storage (no server required)

### Betting Platforms Supported
- TAB
- Ladbrokes
- Betfair
- Sportsbet
- Tabtouch
- Picklebet

### Sports & Race Types
- Horse Racing (Harness, Gallops, Greyhounds)
- Greyhound Racing
- Football, Basketball, Tennis
- Cricket, Rugby, AFL, NRL
- And more...

### Data Management
- Export data to JSON files
- Import data from JSON files
- Clear all data functionality
- Persistent local storage

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd betting-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   ├── charts/       # Chart components
│   └── layout/       # Layout components
├── pages/            # Page components
├── context/          # React context for state management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── hooks/            # Custom React hooks
```

## Usage

### Adding a Bet
1. Navigate to the "Bets" page
2. Click "Add Bet" button
3. Fill in the required fields:
   - Date
   - Sport
   - Betting Platform
   - Race Type (for racing sports)
   - State and Track
   - Stake amount
   - Return amount
4. Add optional notes
5. Click "Add Bet"

### Viewing Statistics
- **Dashboard**: Overview with key metrics and recent activity
- **Statistics**: Detailed breakdowns by sport, platform, and race type
- **Bets**: Full list with filtering and search capabilities

### Data Management
- **Export**: Download all data as JSON file
- **Import**: Upload previously exported data
- **Clear**: Remove all data (use with caution)

## Mobile Support

The application is fully responsive and works great on mobile devices. Key mobile features:

- Touch-friendly interface
- Responsive design
- PWA capabilities for installation
- Optimized for iPhone and Android

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Storage

All data is stored locally in the browser's localStorage. No data is sent to external servers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Note**: This application is for personal use only. Please gamble responsibly and within your means. 