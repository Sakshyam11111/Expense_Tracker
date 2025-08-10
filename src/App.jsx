import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import LandingPage from './components/LandingPage';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ExpenseTracker initialView="dashboard" />} />
        <Route path="/expenses" element={<ExpenseTracker initialView="expense" />} />
        <Route path="/income" element={<ExpenseTracker initialView="income" />} />
      </Routes>
    </Router>
  );
};

export default App;