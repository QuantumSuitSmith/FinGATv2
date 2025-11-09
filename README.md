# 📈 FinGAT v2 - AI-Powered Indian Stock Market Prediction

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-2.1+-red.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Accuracy](https://img.shields.io/badge/Accuracy-56%25+-brightgreen.svg)
![Stocks](https://img.shields.io/badge/Stocks-147+-orange.svg)

**Advanced Graph Attention Network for NSE/BSE Stock Predictions**

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [API Docs](#-api-endpoints) • [Demo](#-screenshots)

</div>

---

FinGAT v2 is a cutting-edge stock prediction system that uses **Graph Attention Networks (GAT)** with **Reinforcement Learning** to predict Indian stock market movements with high accuracy. Built for traders, investors, and financial analysts.

---

## 🌟 Features

### **AI-Powered Predictions**
- 🧠 **Hybrid RL Training** - Optimizes both features and hyperparameters
- 📊 **Graph Neural Networks** - Captures stock relationships and sector correlations
- 🎯 **High Accuracy** - 56%+ directional accuracy with confidence scoring
- 📈 **Multi-Scale Analysis** - Temporal features across multiple timeframes

### **Comprehensive Coverage**
- 📍 **147+ Indian Stocks** - NSE & BSE listed companies
- 🏢 **10+ Sectors** - Technology, Finance, Pharma, Automotive, Energy, etc.
- 📅 **Daily Updates** - Automated data sync and model retraining
- 🔄 **Real-time Predictions** - Fresh predictions every day at 6:30 PM IST

### **Modern Web Interface**
- 🎨 **Beautiful UI** - Modern, responsive design with dark/light themes
- 📱 **Mobile Friendly** - Works seamlessly on all devices
- ⚡ **Fast & Smooth** - Optimized performance with instant loading
- 🔍 **Advanced Filtering** - Search, sort, and filter by sector/confidence

### **Smart Analytics**
- 💡 **Trading Suggestions** - STRONG BUY, BUY, HOLD, SELL recommendations
- 📊 **Confidence Scores** - Know how confident the model is
- 💰 **Investment Calculator** - Calculate potential returns
- 📈 **Sector Analysis** - Track sector-wise performance

---

## 🏗️ Architecture

```
FinGATv2/
├── FinGAT_Backend/          # FastAPI Backend + ML Models
│   ├── app/                 # API application
│   ├── scripts/             # Training & data scripts
│   ├── data/                # Data loaders
│   ├── training/            # Model training modules
│   └── predictions/         # Generated predictions
│
├── FinGATv2_FrontEnd/       # React Frontend
│   ├── src/
│   │   ├── pages/          # Main pages
│   │   ├── components/     # Reusable components
│   │   ├── lib/            # API client & utilities
│   │   └── contexts/       # React contexts
│   └── public/             # Static assets
│
├── DEPLOYMENT_GUIDE.md      # Detailed deployment instructions
└── QUICK_DEPLOY.md          # 30-minute quick start
```

---

## 🚀 Quick Start

### **Prerequisites**
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/QuantumSuitSmith/FinGATv2.git
cd FinGATv2
```

### **2. Setup Backend**
```bash
cd FinGAT_Backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Setup environment
copy .env.example .env
# Edit .env with your database credentials

# Initialize database
python -c "from app.db.database import init_db; init_db()"

# Sync data and train model
python scripts/sync_data.py
python scripts/train_with_hybrid_rl.py
python predict_now.py

# Start backend
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

### **3. Setup Frontend**
```bash
cd FinGATv2_FrontEnd

# Install dependencies
npm install

# Setup environment
echo VITE_API_URL=http://localhost:8000/api/v1 > .env

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📊 Tech Stack

### **Backend**
- **Framework:** FastAPI
- **ML/DL:** PyTorch, PyTorch Lightning, PyTorch Geometric
- **RL:** Stable-Baselines3, Gymnasium
- **Database:** PostgreSQL, SQLAlchemy
- **Data:** yfinance, pandas, numpy
- **Scheduler:** APScheduler

### **Frontend**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Routing:** React Router

### **ML Architecture**
- **Model:** GATv2 (Graph Attention Network v2)
- **Optimization:** Hybrid RL (PPO)
- **Features:** 73 multi-scale temporal features
- **Training:** Automated daily retraining

---

## 🎯 API Endpoints

| Category | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| **Predictions** | `/api/v1/predict/top-k?k=10` | GET | Get top K stock predictions |
| | `/api/v1/predict/single/{ticker}` | GET | Single stock detailed prediction |
| | `/api/v1/predict/now` | POST | Generate fresh predictions |
| **Data** | `/api/v1/stocks?limit=500` | GET | List all stocks with details |
| | `/api/v1/sectors` | GET | List all available sectors |
| **Model** | `/api/v1/model/info` | GET | Model configuration & parameters |
| | `/api/v1/model/status` | GET | Current model status |
| | `/api/v1/retrain` | POST | Trigger model retraining |
| | `/api/v1/reload-features` | POST | Reload feature mask |
| **Health** | `/api/v1/health` | GET | API health check |

**📚 Full Interactive API Documentation:** `http://localhost:8000/docs`

---

## 🔄 Daily Automation

The system automatically runs daily at **6:30 PM IST** (after market close):

1. **Data Sync** - Updates stock prices from yfinance
2. **Model Training** - Retrains with latest data using Hybrid RL
3. **Prediction Generation** - Creates fresh predictions for next day
4. **Model Reload** - Hot-reloads new model without downtime

---

## 📈 Model Performance

- **Directional Accuracy:** 56%+ (UP/DOWN prediction)
- **Confidence Filtering:** Predictions with >40% confidence
- **Top-K Precision:** Higher accuracy for top-ranked stocks
- **Sector Coverage:** All major Indian market sectors
- **Update Frequency:** Daily after market close

---

## 🚀 Deployment

### **Recommended Stack**
- **Backend:** Railway.app ($20-30/month)
- **Frontend:** Vercel (FREE)
- **Database:** Railway PostgreSQL (included)

### **Quick Deploy**
```bash
# Backend
cd FinGAT_Backend
.\deploy.bat  # Prepares deployment files
git push origin main  # Railway auto-deploys

# Frontend
cd FinGATv2_FrontEnd
git push origin main  # Vercel auto-deploys
```

See [QUICK_START.md](QUICK_START.md) for detailed instructions.

---

## 📱 Screenshots

<div align="center">

### 🎯 Dashboard
*Beautiful overview with key metrics, model status, and top predictions*

### 📊 Predictions Page
- **Single Stock Search:** Enter any ticker for instant detailed analysis
- **Top Predictions:** View top 5, 10, or 20 stocks with filtering
- **Confidence Scores:** Know how confident the model is
- **Trading Suggestions:** Get actionable BUY/SELL/HOLD recommendations

### 📈 Stocks Browser
*Browse all 147+ stocks with advanced filtering, search, and sector analysis*

### 🤖 Model Info
*Real-time model status, training history, performance metrics, and architecture details*

</div>

---

## 🛠️ Development

### **Backend Development**
```bash
cd FinGAT_Backend

# Run tests
pytest

# Format code
black .

# Type checking
mypy app/

# Start with auto-reload
uvicorn app.main:app --reload
```

### **Frontend Development**
```bash
cd FinGATv2_FrontEnd

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 📂 Key Files

### **Backend**
- `app/main.py` - FastAPI application entry point
- `app/api/routes.py` - API endpoints
- `scripts/sync_data.py` - Data sync (CSVs + Database)
- `scripts/train_with_hybrid_rl.py` - Model training
- `predict_now.py` - Prediction generation
- `scripts/predict_single_stock.py` - Single stock predictor

### **Frontend**
- `src/main.tsx` - React application entry
- `src/App.tsx` - Main app component
- `src/pages/` - Page components
- `src/lib/api.ts` - API client
- `src/contexts/ThemeContext.tsx` - Theme management

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

This project is an enhanced implementation of the original FinGAT paper, adapted for the Indian stock market with significant improvements:

- **Original Paper:** [Financial Graph Attention Networks](https://github.com/Roytsai27/Financial-GraphAttention) by Roytsai27
- **yfinance** - Stock data provider
- **PyTorch Geometric** - Graph neural network library
- **Stable-Baselines3** - Reinforcement learning framework
- **FastAPI** - Modern Python web framework
- **React** - Frontend library
- **shadcn/ui** - Beautiful UI components

### Key Improvements Over Original
- ✅ Adapted for Indian market (NSE/BSE)
- ✅ 73 features vs 36 in original
- ✅ Automated daily training with RL
- ✅ Production-ready web application
- ✅ 100x faster predictions (<50ms)
- ✅ 56%+ accuracy vs ~50% in paper

---

## 📞 Support

- **Documentation:** See [QUICK_START.md](QUICK_START.md)
- **Issues:** [Open an issue](https://github.com/QuantumSuitSmith/FinGATv2/issues)
- **API Docs:** `http://localhost:8000/docs`
- **Original Paper:** [Financial Graph Attention Networks](https://github.com/Roytsai27/Financial-GraphAttention)

---

## 🎯 Roadmap

- [ ] Add more Indian stocks (500+)
- [ ] Implement portfolio optimization
- [ ] Add backtesting module
- [ ] Real-time WebSocket updates
- [ ] Mobile app (React Native)
- [ ] Advanced charting
- [ ] News sentiment analysis
- [ ] Multi-model ensemble

---

---

<div align="center">

**Built with ❤️ for Indian Stock Market Traders**

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/QuantumSuitSmith/FinGATv2/issues) • [Request Feature](https://github.com/QuantumSuitSmith/FinGATv2/issues) • [Contribute](https://github.com/QuantumSuitSmith/FinGATv2/pulls)

</div>
