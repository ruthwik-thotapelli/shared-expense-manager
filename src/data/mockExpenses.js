export const mockExpenses = [
  {
    id: "e1",
    groupId: "g1",
    description: "Monthly Apartment Rent",
    amount: 1500.00,
    date: "2026-05-01T10:00:00Z",
    category: "Rent",
    paidBy: "u1", // Alice paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 500.00 },
      { userId: "u2", amount: 500.00 },
      { userId: "u3", amount: 500.00 },
    ],
  },
  {
    id: "e2",
    groupId: "g1",
    description: "Groceries (Whole Foods)",
    amount: 180.00,
    date: "2026-05-05T15:30:00Z",
    category: "Groceries",
    paidBy: "u2", // Bob paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 60.00 },
      { userId: "u2", amount: 60.00 },
      { userId: "u3", amount: 60.00 },
    ],
  },
  {
    id: "e3",
    groupId: "g1",
    description: "Electricity & Gas Bill",
    amount: 120.00,
    date: "2026-05-15T09:00:00Z",
    category: "Utilities",
    paidBy: "u3", // Charlie paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 40.00 },
      { userId: "u2", amount: 40.00 },
      { userId: "u3", amount: 40.00 },
    ],
  },
  {
    id: "e4",
    groupId: "g2",
    description: "Gas Station - Refuel",
    amount: 80.00,
    date: "2026-06-02T11:45:00Z",
    category: "Transport",
    paidBy: "u5", // Evan paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 20.00 },
      { userId: "u2", amount: 20.00 },
      { userId: "u4", amount: 20.00 },
      { userId: "u5", amount: 20.00 },
    ],
  },
  {
    id: "e5",
    groupId: "g2",
    description: "Vegas Airbnb Lodging",
    amount: 600.00,
    date: "2026-06-01T14:00:00Z",
    category: "Lodging",
    paidBy: "u1", // Alice paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 150.00 },
      { userId: "u2", amount: 150.00 },
      { userId: "u4", amount: 150.00 },
      { userId: "u5", amount: 150.00 },
    ],
  },
  {
    id: "e6",
    groupId: "g3",
    description: "Sushi Diner Night",
    amount: 240.00,
    date: "2026-05-18T20:30:00Z",
    category: "Food & Drinks",
    paidBy: "u4", // Diana paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 80.00 },
      { userId: "u3", amount: 80.00 },
      { userId: "u4", amount: 80.00 },
    ],
  },
  {
    id: "e7",
    groupId: "g3",
    description: "Stand-up Comedy Tickets",
    amount: 150.00,
    date: "2026-05-25T18:00:00Z",
    category: "Entertainment",
    paidBy: "u3", // Charlie paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 50.00 },
      { userId: "u3", amount: 50.00 },
      { userId: "u4", amount: 50.00 },
    ],
  },
  {
    id: "e8",
    groupId: "g1",
    description: "High-speed Internet",
    amount: 60.00,
    date: "2026-05-20T08:15:00Z",
    category: "Utilities",
    paidBy: "u1", // Alice paid
    splitType: "equal",
    splits: [
      { userId: "u1", amount: 20.00 },
      { userId: "u2", amount: 20.00 },
      { userId: "u3", amount: 20.00 },
    ],
  },
];
