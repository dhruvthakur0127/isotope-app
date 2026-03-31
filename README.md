# ⚛️ Nucleonomic — Interactive Nuclear Isotope Economics Platform

An interactive web platform for learning about nuclear isotope production economics through educational content, quizzes, economic comparison tools, and gamified simulations.

🌐 **Live Demo:** [nucleonomic.netlify.app](https://nucleonomic.netlify.app)

---

## 📌 About

Nucleonomic is designed to make nuclear isotope economics accessible and engaging. The platform covers the **$17.77 billion** global isotope industry across healthcare, industry, agriculture, and research domains — combining structured learning with hands-on interactive tools.

### Key Features

- **📚 Learning Modules** — Four comprehensive modules covering nuclear fundamentals, economic analysis frameworks, real-world case studies (Mo-99, F-18, Lu-177), and future industry trends
- **📝 Interactive Quiz** — Multiple-choice assessments on nuclear economics with instant feedback and detailed explanations
- **📊 Economic Comparison Tool** — Side-by-side analysis of isotope production methods (research reactors, dedicated reactors, medical cyclotrons, linear accelerators) with adjustable parameters
- **🏭 Facility Manager Game** — Simulate building and managing a nuclear isotope production facility
- **📈 Isotope Trading Simulator** — Trade isotopes, analyze market trends, and optimize supply chains
- **🔐 User Authentication** — Login system with progress tracking and quiz history

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| Animations | Framer Motion, CSS animations |
| Build Tool | Vite 6 |
| Backend | Node.js, Express |
| Deployment | Netlify (with Netlify Functions) |
| State Management | TanStack React Query |
| Routing | React Router v6 |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/dhruvthakur0127/isotope-app.git
cd isotope-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

Output will be in `dist/spa` (client) and `dist/server` (server).

---

## 📂 Project Structure

```
isotope-app/
├── client/                  # Frontend React application
│   ├── components/ui/       # shadcn/ui component library
│   ├── pages/
│   │   ├── Index.tsx        # Landing page with 3D atom animation
│   │   ├── Learn.tsx        # Educational learning modules
│   │   ├── Quiz.tsx         # Interactive quiz system
│   │   ├── Comparison.tsx   # Production method comparison tool
│   │   ├── GameFacility.tsx # Facility management game
│   │   ├── GameTrading.tsx  # Isotope trading simulator
│   │   ├── Welcome.tsx      # User dashboard
│   │   ├── Login.tsx        # Authentication page
│   │   └── Results.tsx      # Quiz results & analytics
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── server/                  # Express backend
│   ├── routes/              # API routes (users, demo)
│   └── database.ts          # Data layer
├── shared/                  # Shared types & API definitions
├── data/                    # Static data (users.json)
├── netlify/                 # Netlify serverless functions
└── public/                  # Static assets
```

---

## 🎓 Learning Content

The platform covers four domains of nuclear isotope applications:

| Domain | Market Share | Applications |
|--------|-------------|-------------|
| 🏥 Healthcare | 45% | Medical imaging, cancer treatment, radiopharmaceuticals |
| 🏭 Industry | 30% | Material testing, quality control, thickness gauging |
| 🌾 Agriculture | 15% | Food preservation, pest control, soil analysis |
| 🔬 Research | 10% | Scientific studies, dating methods, space exploration |

---

## 👤 Author

**Dhruv Thakur**
- GitHub: [@dhruvthakur0127](https://github.com/dhruvthakur0127)
- Institution: Birla Vishvakarma Mahavidyalaya (BVM), Gujarat

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
