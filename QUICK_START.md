# 🚀 FinGAT Quick Start Guide

## One-Command Startup

### Windows PowerShell
```powershell
.\start_servers.ps1
```

This will automatically:
- ✅ Check if ports 8000 and 3000 are available
- ✅ Start the backend server (FastAPI)
- ✅ Wait for backend to be healthy
- ✅ Start the frontend server (Vite + React)
- ✅ Open both in separate terminal windows

---

## Manual Startup

### Backend (Terminal 1)
```powershell
cd FinGAT_Backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend (Terminal 2)
```powershell
cd FinGATv2_FrontEnd
npm run dev
```

---

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | React dashboard |
| **Backend API** | http://localhost:8000 | FastAPI server |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation |
| **Health Check** | http://localhost:8000/api/v1/health | Backend health status |

---

## First Time Setup

### 1. Backend Setup
```powershell
cd FinGAT_Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Optional: Sync latest stock data
python scripts/sync_data.py

# Optional: Train model (takes 30-60 minutes)
python scripts/train_with_hybrid_rl.py

# Generate predictions
python predict_now.py
```

### 2. Frontend Setup
```powershell
cd FinGATv2_FrontEnd

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Verification Checklist

### ✅ Backend Health
```powershell
# Test backend API
curl http://localhost:8000/api/v1/health

# Expected response:
# {"status":"healthy","model_loaded":true,"timestamp":"..."}
```

### ✅ Frontend Connection
1. Open http://localhost:3000
2. Dashboard should load within 2-3 seconds
3. Check browser console for API logs:
   - `[API] → GET /health`
   - `[API] ✓ GET /health (50ms)`

### ✅ Predictions Loading
1. Navigate to "Predictions" page
2. Should see top predictions table
3. Try single stock search (e.g., "INFY", "TCS", "RELIANCE")

---

## Performance Optimization

### Frontend Caching
The frontend uses **sessionStorage** for instant loading:
- Stocks data cached for 5 minutes
- Predictions cached for 5 minutes
- Model status cached for 30 minutes

### Backend Optimization
- Model pre-loaded on startup
- Predictor pre-initialized to avoid delays
- Database connection pooling enabled

### Expected Load Times
| Action | Time |
|--------|------|
| Initial page load | 1-2 seconds |
| Dashboard data | 0.5-1 second (cached) |
| Top-K predictions | 1-2 seconds |
| Single stock prediction | 50-200ms |
| Route navigation | Instant (cached) |

---

## Troubleshooting

### Port Already in Use
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Backend Not Starting
```powershell
# Check Python version (need 3.8+)
python --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Not Connecting
```powershell
# Check .env file
cat FinGATv2_FrontEnd\.env

# Should contain:
# VITE_API_URL=http://localhost:8000

# Restart frontend
npm run dev
```

### Model Not Loaded
```powershell
# Generate predictions first
cd FinGAT_Backend
python predict_now.py

# Or train new model
python scripts/train_with_hybrid_rl.py
```

---

## Development Tips

### Hot Reload
Both servers support hot reload:
- **Backend**: Automatically reloads on `.py` file changes
- **Frontend**: Automatically reloads on `.tsx`, `.ts`, `.css` changes

### API Testing
Use the interactive API docs:
```
http://localhost:8000/docs
```

### Browser DevTools
- Open Console (F12) to see API request logs
- Network tab shows request timing
- React DevTools for component debugging

### Performance Monitoring
Check console logs for timing:
```
[API] ✓ GET /predict/top-k?k=50 (1234ms)
[DataContext] Loaded: {stocks: 500, sectors: 15, predictions: 50}
[DataContext] Data cached successfully
```

---

## Production Deployment

### Backend → Railway
```bash
railway login
railway init
railway up
```

### Frontend → Vercel
```bash
npm run build
vercel --prod
```

### Environment Variables
Update `.env` files with production URLs:
```
# Frontend .env
VITE_API_URL=https://your-backend.railway.app

# Backend .env
DATABASE_URL=postgresql://...
```

---

## API Endpoints Reference

### Predictions
- `GET /api/v1/predict/top-k?k=10` - Top K predictions
- `GET /api/v1/predict/single/{ticker}` - Single stock prediction
- `GET /api/v1/predict/now` - Full prediction batch

### Data
- `GET /api/v1/stocks?limit=500` - List stocks
- `GET /api/v1/sectors` - List sectors

### Model
- `GET /api/v1/model/info` - Model information
- `GET /api/v1/model/status/simple` - Model status
- `POST /api/v1/retrain` - Trigger retraining

### Utilities
- `POST /api/v1/utils/run-predict-now` - Generate predictions
- `POST /api/v1/utils/update-data` - Update stock data
- `GET /api/v1/health` - Health check

---

## Support

For issues or questions:
1. Check logs in terminal windows
2. Review browser console (F12)
3. Check API docs at http://localhost:8000/docs
4. Review START_SERVERS.md for detailed troubleshooting

---

**Happy Trading! 📈**
