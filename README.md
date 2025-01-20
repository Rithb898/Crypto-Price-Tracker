# CryptoTracker

A modern cryptocurrency tracking application built with React that provides real-time data, market analysis, and portfolio management features.

## Features

- Real-time cryptocurrency price tracking
- Dark/Light theme support
- Responsive design for all devices
- Advanced filtering and search capabilities
- Trending cryptocurrencies section
- Favorites/Watchlist functionality
- Detailed coin information and charts

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui
- React Router DOM
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-tracker.git
```

2. Install dependencies:

```bash
cd crypto-tracker
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`.

## Project Structure

```
crypto-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer component
│   │   └── ...
│   ├── context/            # React Context providers
│   │   ├── theme.jsx       # Theme context
│   │   └── CryptoContext.jsx # Cryptocurrency data context
│   ├── lib/                # Utilities and helpers
│   │   ├── utils.js        # Utility functions
│   │   └── coinGecko.js    # API integration
│   ├── pages/              # Route components
│   │   ├── HomePage.jsx
│   │   ├── CryptoPage.jsx
│   │   └── ...
│   └── main.jsx           # App entry point
├── public/                # Static assets
├── index.html
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_COINGECKO_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
```

## Features in Detail

### Theme Support

- Light/Dark mode toggle
- Persistent theme preference
- Custom color schemes

### Cryptocurrency Data

- Real-time price updates
- Market cap rankings
- 24h price changes
- Trading volume
- Historical data charts

### User Interface

- Responsive grid/list views
- Advanced search and filtering
- Interactive charts
- Loading states
- Error handling

## API Integration

The application uses the CoinGecko API for cryptocurrency data. Key endpoints:

- `/coins/markets` - List all cryptocurrencies
- `/coins/{id}` - Get detailed coin information
- `/simple/price` - Get current prices
- `/trending` - Get trending coins

## Development Guidelines

### Code Style

- Use ESLint and Prettier for consistent formatting
- Follow React best practices
- Use meaningful component and variable names
- Document complex logic with comments

### Component Structure

- Keep components small and focused
- Use proper prop types
- Implement error boundaries
- Optimize re-renders

### State Management

- Use Context API for global state
- Implement proper loading states
- Handle errors gracefully
- Cache API responses when appropriate

## Performance Optimization

- Lazy loading of routes
- Image optimization
- Debounced search
- Memoized components
- Virtual scrolling for large lists

## Testing

Run the test suite:

```bash
npm run test
```

Key testing areas:

- Component rendering
- User interactions
- API integration
- Theme switching
- Route navigation

## Deployment

Build for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Follow code style guidelines
4. Write clear commit messages
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For support, email support@cryptotracker.com or open an issue in the repository.
