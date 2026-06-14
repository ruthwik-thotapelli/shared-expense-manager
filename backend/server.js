/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', service: 'shared-expense-manager-backend' });
});

app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, name, email, role FROM users').all();
  res.json({ users });
});

app.get('/api/groups', (req, res) => {
  const groups = db.prepare(
    `SELECT g.id, g.name, g.description, g.category, g.coverImage, u.id AS memberId, u.name AS memberName
     FROM groups g
     JOIN group_members gm ON g.id = gm.group_id
     JOIN users u ON u.id = gm.user_id
     ORDER BY g.name`
  ).all();

  const payload = groups.reduce((acc, row) => {
    const group = acc.find((item) => item.id === row.id);
    if (group) {
      group.members.push({ id: row.memberId, name: row.memberName });
    } else {
      acc.push({
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category,
        coverImage: row.coverImage,
        members: [{ id: row.memberId, name: row.memberName }],
      });
    }
    return acc;
  }, []);

  res.json({ groups: payload });
});

app.get('/api/expenses', (req, res) => {
  const expenses = db.prepare(
    `SELECT e.id, e.description, e.amount, e.date, e.paidBy, e.groupId, g.name AS groupName
     FROM expenses e
     LEFT JOIN groups g ON e.groupId = g.id
     ORDER BY e.date DESC`
  ).all();
  res.json({ expenses });
});

app.get('/api/dashboard', (req, res) => {
  const totals = db.prepare(
    `SELECT u.id, u.name,
      SUM(CASE WHEN e.paidBy = u.id THEN e.amount ELSE 0 END) AS totalPaid,
      SUM(e.amount) AS totalShared
     FROM users u
     LEFT JOIN expenses e ON e.groupId IS NOT NULL
     GROUP BY u.id, u.name`
  ).all();

  res.json({ totals });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
