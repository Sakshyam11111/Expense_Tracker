import React, { useState, useEffect, useMemo } from 'react';
import {
  User, CreditCard, TrendingUp, TrendingDown, Plus, Eye, EyeOff,
  ArrowRight, DollarSign, ShoppingBag, Plane, Zap, Home, Car,
  Download, BarChart3, LogOut, Menu, X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Expenses from './Expenses';
import Income from './Income';
import AddIncomeModal from './AddIncomeModal';
import AddExpenseModal from './AddExpenseModal';

const ExpenseTracker = ({ initialView = 'dashboard' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState(initialView);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileImage: null,
    totalBalance: 100900,
    totalIncome: 115200,
    totalExpenses: 14300,
  });

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', category: 'Shopping', amount: 430, date: '17th Feb 2025', icon: ShoppingBag },
    { id: 2, type: 'expense', category: 'Travel', amount: 670, date: '13th Feb 2025', icon: Plane },
    { id: 3, type: 'expense', category: 'Electricity Bill', amount: 200, date: '11th Feb 2025', icon: Zap },
    { id: 4, type: 'expense', category: 'Loan Repayment', amount: 600, date: '10th Feb 2025', icon: Home },
    { id: 5, type: 'expense', category: 'Transport', amount: 300, date: '14th Jan 2025', icon: Car },
  ]);

  const [incomes, setIncomes] = useState([
    { id: 1, source: 'Salary', amount: 12000, date: '12th Feb 2025' },
    { id: 2, source: 'Interest from Savings', amount: 9600, date: '13th Jan 2025' },
    { id: 3, source: 'Freelance', amount: 4500, date: '15th Jan 2025' },
    { id: 4, source: 'Investment', amount: 3000, date: '10th Dec 2024' },
    { id: 5, source: 'Salary', amount: 12500, date: '12th Dec 2024' },
  ]);

  // Define handleLogin function
  const handleLogin = (e, { username, email, profileImage }) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      name: username || email, // Use email as fallback if username is not provided
      email,
      profileImage,
    }));
    setIsAuthenticated(true);
  };

  // Restore authentication state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUserData = localStorage.getItem('userData');
    if (storedAuth === 'true' && storedUserData) {
      try {
        setIsAuthenticated(true);
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  // Persist authentication state and user data to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [isAuthenticated, userData]);

  // Update currentView based on route changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') {
      setCurrentView('dashboard');
    } else if (path === '/expenses') {
      setCurrentView('expense');
    } else if (path === '/income') {
      setCurrentView('income');
    }
  }, [location.pathname]);

  const parseCustomDate = (dateStr) => {
    const cleanDateStr = dateStr.replace(/(st|nd|rd|th)/, '');
    return new Date(cleanDateStr);
  };

  const expenseChartData = useMemo(() => {
    const today = new Date('2025-07-21');
    const fourWeeksAgo = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
    const weeks = Array(4).fill(0);

    transactions.forEach((transaction) => {
      const transactionDate = parseCustomDate(transaction.date);
      if (transactionDate >= fourWeeksAgo && transactionDate <= today) {
        const weekIndex = Math.floor((today - transactionDate) / (7 * 24 * 60 * 60 * 1000));
        if (weekIndex >= 0 && weekIndex < 4) {
          weeks[3 - weekIndex] += transaction.amount;
        }
      }
    });

    return weeks;
  }, [transactions]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData({
      name: '',
      email: '',
      profileImage: null,
      totalBalance: 100900,
      totalIncome: 115200,
      totalExpenses: 14300,
    });
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const addIncome = (incomeData) => {
    const newIncome = {
      id: incomes.length + 1,
      source: incomeData.source,
      amount: parseFloat(incomeData.amount),
      date: new Date(incomeData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).replace(/ /g, ' '),
    };
    setIncomes((prev) => [...prev, newIncome]);
    setUserData((prev) => ({
      ...prev,
      totalIncome: prev.totalIncome + newIncome.amount,
      totalBalance: prev.totalBalance + newIncome.amount,
    }));
    setShowAddIncomeModal(false);
  };

  const addExpense = (expenseData) => {
    const newExpense = {
      id: transactions.length + 1,
      type: 'expense',
      category: expenseData.category,
      amount: parseFloat(expenseData.amount),
      date: new Date(expenseData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).replace(/ /g, ' '),
      icon: getIconForCategory(expenseData.category),
    };
    setTransactions((prev) => [...prev, newExpense]);
    setUserData((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + newExpense.amount,
      totalBalance: prev.totalBalance - newExpense.amount,
    }));
    setShowAddExpenseModal(false);
  };

  const getIconForCategory = (category) => {
    const iconMap = {
      Shopping: ShoppingBag,
      Travel: Plane,
      Bills: Zap,
      'Loan Repayment': Home,
      Transport: Car,
    };
    return iconMap[category] || CreditCard;
  };

  const deleteIncome = (incomeId) => {
    const incomeToDelete = incomes.find((income) => income.id === incomeId);
    if (incomeToDelete) {
      setIncomes((prev) => prev.filter((income) => income.id !== incomeId));
      setUserData((prev) => ({
        ...prev,
        totalIncome: prev.totalIncome - incomeToDelete.amount,
        totalBalance: prev.totalBalance - incomeToDelete.amount,
      }));
    }
  };

  const deleteExpense = (expenseId) => {
    const expenseToDelete = transactions.find((transaction) => transaction.id === expenseId);
    if (expenseToDelete) {
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== expenseId));
      setUserData((prev) => ({
        ...prev,
        totalExpenses: prev.totalExpenses - expenseToDelete.amount,
        totalBalance: prev.totalBalance + expenseToDelete.amount,
      }));
    }
  };

  if (!isAuthenticated) {
    return isLogin ? (
      <Login
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
      />
    ) : (
      <Signup
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block w-60 sm:w-64 md:w-80 sticky top-0 h-screen" data-aos="fade-right">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          userData={userData}
          handleLogout={handleLogout}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" data-aos="fade-right">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-60 sm:w-64 h-screen z-50">
            <Sidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              userData={userData}
              handleLogout={handleLogout}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>
        </div>
      )}

      <div className="flex-1 p-3 sm:p-4 md:p-6">
        {currentView === 'dashboard' && (
          <Dashboard
            userData={userData}
            transactions={transactions}
            incomes={incomes}
            setShowAddIncomeModal={setShowAddIncomeModal}
            setShowAddExpenseModal={setShowAddExpenseModal}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}
        {currentView === 'expense' && (
          <Expenses
            transactions={transactions}
            setShowAddExpenseModal={setShowAddExpenseModal}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            deleteExpense={deleteExpense}
          />
        )}
        {currentView === 'income' && (
          <Income
            incomes={incomes}
            setShowAddIncomeModal={setShowAddIncomeModal}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            deleteIncome={deleteIncome}
          />
        )}

        <AddIncomeModal
          showAddIncomeModal={showAddIncomeModal}
          setShowAddIncomeModal={setShowAddIncomeModal}
          addIncome={addIncome}
        />
        <AddExpenseModal
          showAddExpenseModal={showAddExpenseModal}
          setShowAddExpenseModal={setShowAddExpenseModal}
          addExpense={addExpense}
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;