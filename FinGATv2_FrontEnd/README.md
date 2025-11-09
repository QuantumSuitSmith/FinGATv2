# 🎨 FinGAT Frontend - Modern Stock Prediction UI

Beautiful, responsive React frontend for FinGAT stock prediction system.

---

## 🚀 Quick Start

### **Installation**

```bash
# Install dependencies
npm install

# Setup environment
echo VITE_API_URL=http://localhost:8000/api/v1 > .env

# Start development server
npm run dev
```

App runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
FinGATv2_FrontEnd/
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Predictions.tsx    # Predictions page (2 tabs)
│   │   ├── Stocks.tsx         # Stock listing
│   │   └── ModelInfo.tsx      # Model information
│   │
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── api.ts             # API client
│   │   └── utils.ts           # Utility functions
│   │
│   ├── contexts/
│   │   └── ThemeContext.tsx   # Dark/Light theme
│   │
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
│
├── public/                    # Static assets
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

---

## 🎨 Features

### **Pages**

#### **Dashboard**
- Market overview with key metrics
- Quick stats (total stocks, sectors, predictions)
- Recent predictions preview
- Sector distribution chart
- Beautiful gradient hero section

#### **Predictions**
Two powerful tabs:

**1. Top Predictions Tab**
- View Top 10/20/50 stocks
- Filter by sector
- Search by ticker/company
- Sort by confidence/expected return
- Beautiful card layout with gradients

**2. Single Stock Tab**
- Search any stock by ticker
- Detailed prediction analysis
- Trading suggestions (STRONG BUY, BUY, SELL)
- Risk assessment
- Investment calculator
- Confidence visualization

#### **Stocks**
- Browse all 147+ stocks
- Filter by sector
- Search functionality
- Current price display
- Sector badges
- Responsive grid layout

#### **Model Info**
- Model architecture details
- Training configuration
- Performance metrics
- Feature information
- Real-time status
- Dashboard-style layout

### **UI Features**

- 🌓 **Dark/Light Theme** - Toggle with smooth transitions
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast Loading** - Optimized performance
- 🎨 **Modern Design** - Beautiful gradients and animations
- 🔍 **Advanced Search** - Filter and search everywhere
- 📊 **Data Visualization** - Charts and metrics
- 🎯 **Intuitive UX** - Easy to navigate

---

## 🔌 API Integration

### **API Client (src/lib/api.ts)**

```typescript
// Get predictions
const predictions = await apiClient.getTopPredictions(10, 'Technology');

// Single stock prediction
const prediction = await apiClient.getSinglePrediction('INFY');

// Get stocks
const stocks = await apiClient.getStocks(500, 'Finance');

// Get sectors
const sectors = await apiClient.getSectors();

// Get model info
const modelInfo = await apiClient.getModelInfo();
```

### **Environment Variables**

```env
# .env
VITE_API_URL=http://localhost:8000/api/v1

# .env.production
VITE_API_URL=https://your-backend.railway.app/api/v1
```

---

## 🎨 Styling

### **Tailwind CSS**

```bash
# Configured with:
- Custom colors
- Dark mode support
- Responsive breakpoints
- Custom animations
```

### **shadcn/ui Components**

Pre-built, customizable components:
- Button
- Card
- Input
- Select
- Badge
- Tabs
- And more...

### **Theme System**

```typescript
// ThemeContext provides:
- theme: 'light' | 'dark'
- toggleTheme()
- Persists to localStorage
```

---

## 🛠️ Development

### **Available Scripts**

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### **Code Style**

```typescript
// Use TypeScript
// Follow React best practices
// Use functional components
// Implement proper error handling
// Add loading states
```

---

## 📦 Dependencies

### **Core**

- `react@18.2.0` - UI library
- `react-dom@18.2.0` - React DOM
- `react-router-dom@6.20.0` - Routing
- `typescript@5.2.2` - Type safety

### **UI**

- `tailwindcss@3.3.5` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `lucide-react@0.294.0` - Icons
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes

### **Data**

- `axios@1.6.2` - HTTP client
- `recharts@2.10.3` - Charts (if needed)

### **Build**

- `vite@5.0.0` - Build tool
- `@vitejs/plugin-react@4.2.0` - React plugin

---

## 🚀 Deployment

### **Build for Production**

```bash
# Build
npm run build

# Output in dist/ folder
# Ready to deploy!
```

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Or use Vercel Dashboard:
# 1. Import from GitHub
# 2. Framework: Vite
# 3. Build: npm run build
# 4. Output: dist
# 5. Add VITE_API_URL env variable
```

### **Deploy to Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Or drag-and-drop dist/ folder
# to Netlify dashboard
```

### **Environment Variables**

Don't forget to set in deployment platform:

```env
VITE_API_URL=https://your-backend.railway.app/api/v1
```

---

## 🎯 Pages Overview

### **Dashboard (`/`)**

```typescript
// Features:
- Market overview
- Quick stats
- Recent predictions
- Sector distribution
- Navigation cards
```

### **Predictions (`/predictions`)**

```typescript
// Tab 1: Top Predictions
- Top K selector (10/20/50)
- Sector filter
- Search bar
- Prediction cards with:
  - Ticker & company
  - Direction (UP/DOWN)
  - Confidence %
  - Expected return
  - Rank
  - Sector badge

// Tab 2: Single Stock
- Ticker search
- Detailed prediction:
  - Direction & confidence
  - Expected return
  - Rank & quality
  - Trading suggestion
  - Risk level
  - Investment scenarios
```

### **Stocks (`/stocks`)**

```typescript
// Features:
- All 147+ stocks
- Sector filter dropdown
- Search by ticker/company
- Stock cards with:
  - Ticker & company
  - Current price
  - Sector badge
  - Exchange info
```

### **Model Info (`/model-info`)**

```typescript
// Features:
- Model architecture
- Training config
- Performance metrics
- Feature count
- Status indicator
- Last updated time
```

---

## 🎨 Theme System

### **Usage**

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

### **Tailwind Dark Mode**

```tsx
// Automatically applies dark: classes
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    Hello World
  </h1>
</div>
```

---

## 🔧 Configuration

### **Vite Config**

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### **Tailwind Config**

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
    },
  },
};
```

### **TypeScript Config**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🐛 Troubleshooting

### **API Connection Issues**

```bash
# Check VITE_API_URL
cat .env

# Verify backend is running
curl http://localhost:8000/api/v1/health

# Check CORS settings in backend
```

### **Build Errors**

```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run build
```

### **Type Errors**

```bash
# Run type check
npm run type-check

# Fix with:
# - Add proper types
# - Use 'any' sparingly
# - Check import paths
```

---

## 📚 Additional Resources

- **Main README:** [../README.md](../README.md)
- **Deployment Guide:** [../DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)
- **Quick Deploy:** [../QUICK_DEPLOY.md](../QUICK_DEPLOY.md)
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com

---

## 🤝 Contributing

1. Follow React best practices
2. Use TypeScript properly
3. Add proper error handling
4. Test on mobile devices
5. Update documentation

---

**Frontend is ready! 🎨**

Start dev server: `npm run dev`  
Build: `npm run build`  
Preview: `npm run preview`
