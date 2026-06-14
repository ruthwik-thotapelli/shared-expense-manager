export const mockBalances = [
  // Group 1: Shared Apartment 404
  {
    groupId: "g1",
    from: "u2", // Bob
    to: "u1",   // Alice
    amount: 440.00,
  },
  {
    groupId: "g1",
    from: "u3", // Charlie
    to: "u1",   // Alice
    amount: 500.00,
  },

  // Group 2: Road Trip to Vegas
  {
    groupId: "g2",
    from: "u2", // Bob
    to: "u1",   // Alice
    amount: 170.00,
  },
  {
    groupId: "g2",
    from: "u4", // Diana
    to: "u1",   // Alice
    amount: 170.00,
  },
  {
    groupId: "g2",
    from: "u5", // Evan
    to: "u1",   // Alice
    amount: 90.00,
  },

  // Group 3: Weekly Dinners
  {
    groupId: "g3",
    from: "u1", // Alice
    to: "u4",   // Diana
    amount: 110.00,
  },
  {
    groupId: "g3",
    from: "u1", // Alice
    to: "u3",   // Charlie
    amount: 20.00,
  },
];
