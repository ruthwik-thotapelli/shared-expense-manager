# Shared Expense Manager

A polished frontend for a shared expense management dashboard built with React, Vite, Tailwind CSS, Recharts, and React Router.

## 🚀 Live Deployment
This repository is configured for deployment on Vercel using `vercel.json`.

### Vercel deployment settings
- Build command: `npm run build`
- Output directory: `dist`
- Route fallback for SPA navigation is configured in `vercel.json`

## ✨ Features
- Responsive dashboard with expense overview and activity trend charts
- Groups, expenses, balances, and settlements pages
- CSV import support for expense data
- Dark mode compatible UI
- Mock auth flow with login/register support
- Accessible UI improvements for keyboard and screen reader users

## 🧩 Tech stack
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- React Icons
- Framer Motion
- React Hot Toast

## 💻 Local setup
```bash
npm install
npm run dev
```
Then open `http://localhost:5173` in your browser.

## ✅ Available scripts
- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

## 📦 Deployment to Vercel
1. Sign in to Vercel at https://vercel.com.
2. Import this GitHub repository.
3. Set the framework preset to **Vite** if prompted.
4. Use the build command `npm run build` and output directory `dist`.
5. Deploy and confirm the project loads correctly.

If you prefer CLI deployment and already have a Vercel token:
```bash
npx vercel --prod
```

## 🏗️ Backend API (optional)
This repository now includes a simple Express backend scaffold in `backend/` with a SQLite initializer.

To run the backend locally:
```bash
cd backend
npm install
npm start
```

Available example API endpoints:
- `GET /api/status`
- `GET /api/users`
- `GET /api/groups`
- `GET /api/expenses`
- `GET /api/dashboard`

## 🛠️ Notes
- The frontend is built with mock data in `src/data`.
- The backend scaffold uses SQLite and seeds sample data from `backend/init.sql`.
- `vercel.json` is included to support SPA routing and static build output.

## 📄 License
MIT
