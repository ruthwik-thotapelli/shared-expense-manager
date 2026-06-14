# Backend API

This folder contains a simple Express backend scaffold with a SQLite initializer.

## Run locally

```bash
cd backend
npm install
npm start
```

## API endpoints

- `GET /api/status`
- `GET /api/users`
- `GET /api/groups`
- `GET /api/expenses`
- `GET /api/dashboard`

## Database

The backend bootstraps a local SQLite database file at `backend/database.sqlite` on first run.
The schema and sample data are loaded from `backend/init.sql`.
