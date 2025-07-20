import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ExpenseTracker from './components/ExpenseTracker';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Default animation duration
      once: true, // Animations happen only once on scroll
    });
  }, []);

  return <ExpenseTracker />;
};

export default App;