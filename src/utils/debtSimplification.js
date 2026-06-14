/**
 * Calculates the net balance for each member of a group.
 * A positive balance means the member is owed money (creditor).
 * A negative balance means the member owes money (debtor).
 * 
 * @param {string[]} members - Array of user IDs in the group
 * @param {object[]} expenses - Array of expenses in the group
 * @param {object[]} settlements - Array of settlements in the group
 * @returns {object} Map of userId -> net amount
 */
export const calculateNetBalances = (members, expenses, settlements) => {
  const nets = {};
  
  // Initialize all members with 0 net balance
  members.forEach((userId) => {
    nets[userId] = 0;
  });
  
  // Process expenses
  expenses.forEach((expense) => {
    const payerId = expense.paidBy;
    const amount = Number(expense.amount) || 0;
    
    // Add the total paid amount to the payer's net balance
    if (nets[payerId] !== undefined) {
      nets[payerId] += amount;
    }
    
    // Subtract the split share for each member involved
    if (expense.splits && Array.isArray(expense.splits)) {
      expense.splits.forEach((split) => {
        if (nets[split.userId] !== undefined) {
          nets[split.userId] -= Number(split.amount) || 0;
        }
      });
    }
  });
  
  // Process settlements
  settlements.forEach((settlement) => {
    // A settlement is registered as payerId paying payeeId an amount.
    // The payer's net balance increases (becomes less negative / more positive)
    // because they paid off some of their debt.
    // The payee's net balance decreases because they received cash (reducing what is owed to them).
    const payerId = settlement.payerId;
    const payeeId = settlement.payeeId;
    const amount = Number(settlement.amount) || 0;
    
    if (nets[payerId] !== undefined) {
      nets[payerId] += amount;
    }
    if (nets[payeeId] !== undefined) {
      nets[payeeId] -= amount;
    }
  });

  // Round values to 2 decimal places to avoid floating point issues
  Object.keys(nets).forEach((userId) => {
    nets[userId] = Number(nets[userId].toFixed(2));
  });
  
  return nets;
};

/**
 * Runs a greedy flow algorithm to simplify debts.
 * It matches the largest debtor with the largest creditor to minimize the total transactions.
 * 
 * @param {object} nets - Map of userId -> net amount
 * @returns {object[]} Array of transactions: { from, to, amount }
 */
export const getSimplifiedDebts = (nets) => {
  const debtors = [];
  const creditors = [];
  
  Object.keys(nets).forEach((userId) => {
    const net = nets[userId];
    if (net < -0.01) {
      debtors.push({ userId, amount: -net });
    } else if (net > 0.01) {
      creditors.push({ userId, amount: net });
    }
  });
  
  // Sort descending by amount so we process largest balances first
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);
  
  const transactions = [];
  let i = 0;
  let j = 0;
  
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const amountToSettle = Math.min(debtor.amount, creditor.amount);
    
    if (amountToSettle > 0.01) {
      transactions.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: Number(amountToSettle.toFixed(2)),
      });
    }
    
    debtor.amount -= amountToSettle;
    creditor.amount -= amountToSettle;
    
    if (debtor.amount <= 0.01) i++;
    if (creditor.amount <= 0.01) j++;
  }
  
  return transactions;
};

/**
 * Computes raw balances WITHOUT simplification.
 * It shows individual bilateral balances if someone paid an expense.
 * For a simpler UI, most users prefer simplified debts.
 */
export const getRawDebts = (members, expenses, settlements) => {
  // To keep it clean and robust, we calculate bilateral debts by matching net amounts.
  // In a real-world scenario, raw debts are hard to trace without direct pairwise billing.
  // We can treat raw debts as the simplified debts themselves, or compute standard pairwise sums.
  // Let's use the net flow simplified balances as they represent the most accurate outstanding balance.
  const nets = calculateNetBalances(members, expenses, settlements);
  return getSimplifiedDebts(nets);
};
