import React, { createContext, useContext, useState, useEffect } from "react";
import { mockGroups } from "../data/mockGroups";
import { mockExpenses } from "../data/mockExpenses";
import { mockSettlements } from "../data/mockSettlements";
import { mockUsers } from "../data/mockUsers";
import { calculateNetBalances, getSimplifiedDebts } from "../utils/debtSimplification";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("groups", JSON.stringify(mockGroups));
    return mockGroups;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("expenses", JSON.stringify(mockExpenses));
    return mockExpenses;
  });

  const [settlements, setSettlements] = useState(() => {
    const saved = localStorage.getItem("settlements");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("settlements", JSON.stringify(mockSettlements));
    return mockSettlements;
  });

  // Settings
  const [simplifyDebtsToggle, setSimplifyDebtsToggle] = useState(() => {
    const saved = localStorage.getItem("simplifyDebtsToggle");
    return saved !== "false"; // default true
  });

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("settlements", JSON.stringify(settlements));
  }, [settlements]);

  useEffect(() => {
    localStorage.setItem("simplifyDebtsToggle", simplifyDebtsToggle.toString());
  }, [simplifyDebtsToggle]);

  // Actions
  const addGroup = (group) => {
    const newGroup = {
      id: `g${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...group,
    };
    setGroups((prev) => [...prev, newGroup]);
    return newGroup;
  };

  const deleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    setExpenses((prev) => prev.filter((e) => e.groupId !== groupId));
    setSettlements((prev) => prev.filter((s) => s.groupId !== groupId));
  };

  const addExpense = (expense) => {
    const newExpense = {
      id: `e${Date.now()}`,
      date: expense.date || new Date().toISOString(),
      ...expense,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  const editExpense = (expenseId, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === expenseId ? { ...e, ...updatedExpense } : e))
    );
  };

  const deleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
  };

  const addSettlement = (settlement) => {
    const newSettlement = {
      id: `s${Date.now()}`,
      date: settlement.date || new Date().toISOString(),
      status: "Completed",
      ...settlement,
    };
    setSettlements((prev) => [newSettlement, ...prev]);
    return newSettlement;
  };

  const deleteSettlement = (settlementId) => {
    setSettlements((prev) => prev.filter((s) => s.id !== settlementId));
  };

  const resetData = () => {
    setGroups(mockGroups);
    setExpenses(mockExpenses);
    setSettlements(mockSettlements);
    setSimplifyDebtsToggle(true);
    localStorage.setItem("groups", JSON.stringify(mockGroups));
    localStorage.setItem("expenses", JSON.stringify(mockExpenses));
    localStorage.setItem("settlements", JSON.stringify(mockSettlements));
    localStorage.setItem("simplifyDebtsToggle", "true");
  };

  // Helper selectors
  const getGroupExpenses = (groupId) => {
    return expenses.filter((e) => e.groupId === groupId);
  };

  const getGroupSettlements = (groupId) => {
    return settlements.filter((s) => s.groupId === groupId);
  };

  // Calculate balances for a specific group
  const getGroupBalances = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return [];
    const groupExpenses = getGroupExpenses(groupId);
    const groupSettlements = getGroupSettlements(groupId);
    
    const nets = calculateNetBalances(group.members, groupExpenses, groupSettlements);
    return getSimplifiedDebts(nets);
  };

  // Calculate global balances across all groups for a user
  // This aggregates nets across all groups they participate in.
  const getGlobalBalancesForUser = (userId) => {
    // 1. Gather all unique user IDs we interact with in any group
    const userGroups = groups.filter((g) => g.members.includes(userId));
    const allMemberIdsSet = new Set();
    userGroups.forEach((g) => g.members.forEach((mId) => allMemberIdsSet.add(mId)));
    const allMembers = Array.from(allMemberIdsSet);

    // 2. Gather all expenses and settlements in those groups
    const relevantGroupIds = userGroups.map((g) => g.id);
    const relevantExpenses = expenses.filter((e) => relevantGroupIds.includes(e.groupId));
    const relevantSettlements = settlements.filter((s) => relevantGroupIds.includes(s.groupId));

    // 3. Compute net balances globally
    const nets = calculateNetBalances(allMembers, relevantExpenses, relevantSettlements);

    // 4. Run simplification on these aggregated nets
    const simplified = getSimplifiedDebts(nets);
    
    // 5. Filter for transactions involving our target userId
    return simplified.filter((t) => t.from === userId || t.to === userId);
  };

  // Compute net balance (total owed to user - total user owes)
  const getUserNetStatistics = (userId) => {
    // Gather all groups
    const allMemberIds = Array.from(new Set(groups.flatMap((g) => g.members)));
    const nets = calculateNetBalances(allMemberIds, expenses, settlements);
    
    const userNet = nets[userId] || 0;
    
    // Calculate total owed (creditor) and total receivable (debtor) from the user's perspective
    const simplified = getSimplifiedDebts(nets);
    
    let totalOwed = 0; // Money the user owes to others
    let totalReceivable = 0; // Money others owe to the user

    simplified.forEach((t) => {
      if (t.from === userId) {
        totalOwed += t.amount;
      }
      if (t.to === userId) {
        totalReceivable += t.amount;
      }
    });

    return {
      netBalance: userNet,
      totalOwed: Number(totalOwed.toFixed(2)),
      totalReceivable: Number(totalReceivable.toFixed(2)),
    };
  };

  return (
    <AppContext.Provider
      value={{
        groups,
        expenses,
        settlements,
        simplifyDebtsToggle,
        setSimplifyDebtsToggle,
        addGroup,
        deleteGroup,
        addExpense,
        editExpense,
        deleteExpense,
        addSettlement,
        deleteSettlement,
        resetData,
        getGroupExpenses,
        getGroupSettlements,
        getGroupBalances,
        getGlobalBalancesForUser,
        getUserNetStatistics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
