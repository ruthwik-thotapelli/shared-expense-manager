BEGIN TRANSACTION;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  coverImage TEXT NOT NULL
);

CREATE TABLE group_members (
  group_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  paidBy TEXT NOT NULL,
  groupId TEXT NOT NULL
);

INSERT INTO users (id, name, email, role, password) VALUES
  ('u1', 'Emma Lewis', 'emma@example.com', 'admin', 'password123'),
  ('u2', 'Noah Patel', 'noah@example.com', 'member', 'password123'),
  ('u3', 'Ava Kim', 'ava@example.com', 'member', 'password123');

INSERT INTO groups (id, name, description, category, coverImage) VALUES
  ('g1', 'Home Renovation', 'Split household upgrade costs and purchases.', 'Home', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80'),
  ('g2', 'Weekend Trip', 'Manage travel and dining expenses together.', 'Travel', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80');

INSERT INTO group_members (group_id, user_id) VALUES
  ('g1', 'u1'),
  ('g1', 'u2'),
  ('g1', 'u3'),
  ('g2', 'u1'),
  ('g2', 'u2');

INSERT INTO expenses (id, description, amount, date, paidBy, groupId) VALUES
  ('e1', 'Paint and supplies', 275.0, '2026-06-01', 'u1', 'g1'),
  ('e2', 'Furniture delivery', 420.0, '2026-06-07', 'u2', 'g1'),
  ('e3', 'Train tickets', 310.0, '2026-06-10', 'u1', 'g2'),
  ('e4', 'Dinner at the cabin', 182.5, '2026-06-12', 'u2', 'g2');

COMMIT;
