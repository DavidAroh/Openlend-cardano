import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoanMarketplace from './pages/LoanMarketplace';
import CreateLoanRequest from './pages/CreateLoanRequest';
import LoanDetails from './pages/LoanDetails';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<LoanMarketplace />} />
            <Route path="/create-loan" element={<CreateLoanRequest />} />
            <Route path="/loan/:id" element={<LoanDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;