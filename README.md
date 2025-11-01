# 🌾 MGNREGA District Dashboard — Full Stack (Frontend + Backend)

A modern, responsive, and data-driven web application visualizing **MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)** data across Indian districts — built using **React**, **TailwindCSS**, **Framer Motion**, **Node.js**, and **MongoDB**.

---

## 🚀 Features

✅ Interactive animated dashboard  
✅ Auto-detect user’s district using GPS & OpenStreetMap  
✅ Compare multiple districts side-by-side  
✅ Gender & social group insights  
✅ Monthly trend analytics using Chart.js  
✅ RESTful API with Node.js + Express  
✅ MongoDB-backed data storage  
✅ Fully responsive, mobile-first design  
✅ Beautiful UI animations with Framer Motion  

---

## ⚙️ Tech Stack

### 🖥️ Frontend
| Feature | Technology |
|----------|-------------|
| Framework | ⚛️ React 18+ |
| Styling | 🎨 Tailwind CSS |
| Animations | 🎞️ Framer Motion |
| Charts | 📊 Chart.js + react-chartjs-2 |
| Geolocation | 🗺️ OpenStreetMap Reverse Geocoding |
| API Calls | ⚙️ Axios |
| i18n | 🌎 react-i18next |

### ⚡ Backend
| Feature | Technology |
|----------|-------------|
| Server | 🧩 Node.js + Express |
| Database | 🍃 MongoDB + Mongoose |
| API Type | 🔁 RESTful APIs |
| Env Config | ⚙️ dotenv |
| Dev Tool | 🔄 Nodemon |
| Security | 🌍 CORS enabled |

---

## 🧱 Folder Structure

```
mgnrega-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── DistrictSelector.jsx
│   │   │   ├── LineChart.jsx
│   │   │   ├── WorkTypePie.jsx
│   │   │   ├── GenderChart.jsx
│   │   │   ├── SocialGroupChart.jsx
│   │   │   ├── CompareSection.jsx
│   │   │   └── MapView.jsx
│   │   ├── pages/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Compare.jsx
│   │   │   └── Reports.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── logo.png
│   ├── vite.config.js
│   └── README.md
│
└── backend/
    ├── models/
    │   └── Athi.js
    ├── routes/
    │   └── athiRoutes.js
    ├── server.js
    ├── .env
    └── README.md
```

---

## 🧭 Environment Variables

**Frontend (.env)**
```
VITE_API_URL=http://localhost:4000/api
```

**Backend (.env)**
```
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mgnrega
```

---

## ⚙️ Installation & Setup

1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/mgnrega-dashboard.git
cd mgnrega-dashboard
```

2️⃣ Setup Backend  
```bash
cd backend
npm install
npm run dev
```
Backend runs on **http://localhost:4000**

3️⃣ Setup Frontend  
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

---

## 🪄 Build for Production

```bash
cd frontend
npm run build
npm run preview
```

---

## 🌿 Frontend Features

| Section | Description |
|----------|-------------|
| 🏠 Hero Page | Beautiful gradient background introducing the MGNREGA Dashboard |
| 📍 Auto Detection | Detects your current district via GPS |
| 📈 Dashboard | Monthly trend charts using Chart.js |
| 👩‍🌾 Gender Chart | Gender-based worker distribution |
| 👥 Social Group Chart | SC/ST/Other distribution |
| ⚖️ Compare Page | Side-by-side district comparison cards |
| 🗺️ Map View | Interactive map built with React Leaflet |

---

## 🎨 UI Highlights

🌾 Soft gradient backgrounds (green → blue → white)  
✨ Rounded cards with subtle shadows  
📊 Animated transitions for charts and sections  
📱 Fully responsive layouts using Tailwind grid system  
💫 Hover and scale animations via Framer Motion  

---

## 🧰 Commands Summary

| Command | Description |
|----------|-------------|
| npm install | Install dependencies |
| npm run dev | Start development server |
| npm run build | Build production app |
| npm run preview | Preview production build |

---

## ☁️ Deployment

### 🌐 Frontend
Use **Vercel**, **Netlify**, or **GitHub Pages**  
```bash
npm run build
```
Then upload the **dist/** folder.

### ⚙️ Backend
Use **Render**, **Railway**, or **Vercel Functions**  
Set environment variables (**PORT**, **MONGO_URI**)

---

## 💡 Future Enhancements

🔹 CSV / Excel Export  
🔹 Caching with Redis  
🔹 GraphQL API support  
🔹 Role-based authentication  
🔹 AI-powered district ranking predictions  

---

## 👨‍💻 Developer

**Your Name**  
💼 [LinkedIn](#) • 🧑‍💻 [GitHub](#)

> “Empowering Rural India through transparent data and technology.”

---

## 🪴 License

MIT License © 2025 — Open Source Initiative
