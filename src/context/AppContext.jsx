import { createContext, useContext, useState, useEffect } from 'react';
import { transactions as initialTransactions } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance-transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('finance-role') || 'viewer';
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    type: 'all',
    dateRange: 'all',
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('finance-darkmode');
    return saved === 'true';
  });

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem('finance-role', role);
  }, [role]);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('finance-darkmode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id, updates) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const isAdmin = role === 'admin';

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === 'All Categories' || 
      transaction.category === filters.category;
    
    const matchesType = filters.type === 'all' || transaction.type === filters.type;

    let matchesDate = true;
    if (filters.dateRange !== 'all') {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      const monthsAgo = parseInt(filters.dateRange);
      const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
      matchesDate = transactionDate >= cutoffDate;
    }

    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  // Calculate insights
  const calculateInsights = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');

    // Spending by category
    const spendingByCategory = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

    const highestSpendingCategory = Object.entries(spendingByCategory)
      .sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const monthlyData = transactions.reduce((acc, t) => {
      const month = t.date.substring(0, 7);
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        acc[month].income += t.amount;
      } else {
        acc[month].expenses += Math.abs(t.amount);
      }
      return acc;
    }, {});

    const months = Object.keys(monthlyData).sort();
    const currentMonth = months[months.length - 1];
    const previousMonth = months[months.length - 2];

    const monthlyComparison = currentMonth && previousMonth ? {
      current: monthlyData[currentMonth],
      previous: monthlyData[previousMonth],
      incomeChange: ((monthlyData[currentMonth].income - monthlyData[previousMonth].income) / monthlyData[previousMonth].income * 100).toFixed(1),
      expenseChange: ((monthlyData[currentMonth].expenses - monthlyData[previousMonth].expenses) / monthlyData[previousMonth].expenses * 100).toFixed(1),
    } : null;

    // Total calculations
    const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

    // Transaction count this month
    const thisMonth = new Date().toISOString().substring(0, 7);
    const thisMonthTransactions = transactions.filter(t => t.date.startsWith(thisMonth)).length;

    return {
      highestSpendingCategory: highestSpendingCategory ? { name: highestSpendingCategory[0], amount: highestSpendingCategory[1] } : null,
      monthlyComparison,
      totalIncome,
      totalExpenses,
      totalBalance,
      savingsRate,
      spendingByCategory,
      thisMonthTransactions,
      transactionCount: transactions.length,
    };
  };

  const insights = calculateInsights();

  return (
    <AppContext.Provider value={{
      transactions,
      filteredTransactions,
      setTransactions,
      role,
      setRole,
      isAdmin,
      filters,
      setFilters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      insights,
      darkMode,
      setDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
