import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, DollarSign, Award, User, Menu, X, CreditCard } from 'lucide-react';

const Navbar = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Marketplace', path: '/marketplace', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Achievements', path: '/achievements', icon: <Award className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleConnectModal = () => setIsConnectModalOpen(!isConnectModalOpen);

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                className="w-8 h-8 mr-2"
              >
                <svg width="32" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.41 0L11.651 10L5.892 0H0L9.489 16.508L0 32H5.892L11.651 22L17.41 32H23.302L13.813 16.508L23.302 0H17.41Z" fill="#2DD4BF"/>
                  <path d="M28.511 0L22.752 10L16.993 0H11.101L20.59 16.508L11.101 32H16.993L22.752 22L28.511 32H34.403L24.914 16.508L34.403 0H28.511Z" fill="#8B5CF6"/>
                </svg>
              </motion.div>
              <span className="text-lg font-bold text-primary-600">OPEN<span className="text-secondary-500">LEND</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === link.path
                    ? 'border-primary-500 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            {wallet ? (
              <div className="flex items-center">
                <div className="mr-4 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">{wallet.balance} ADA</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={disconnectWallet}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                >
                  Disconnect Wallet
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleConnectModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Connect Wallet
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {wallet && (
              <div className="mr-4 text-sm text-neutral-600">
                <span className="font-medium text-neutral-800">{wallet.balance} ADA</span>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-3 py-2 text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                    : 'border-l-4 border-transparent text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800'
                }`}
                onClick={toggleMenu}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            ))}
            {!wallet && (
              <button
                onClick={() => {
                  toggleMenu();
                  toggleConnectModal();
                }}
                className="flex w-full items-center px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800"
              >
                <CreditCard className="w-5 h-5" />
                <span className="ml-2">Connect Wallet</span>
              </button>
            )}
            {wallet && (
              <button
                onClick={() => {
                  toggleMenu();
                  disconnectWallet();
                }}
                className="flex w-full items-center px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800"
              >
                <CreditCard className="w-5 h-5" />
                <span className="ml-2">Disconnect Wallet</span>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Connect Wallet Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={toggleConnectModal}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-neutral-900">Connect Wallet</h3>
              <button
                onClick={toggleConnectModal}
                className="text-neutral-400 hover:text-neutral-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  connectWallet('nami');
                  toggleConnectModal();
                }}
                className="w-full flex items-center justify-between p-3 border border-neutral-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className="ml-3 font-medium">Nami Wallet</span>
                </div>
                <span className="text-sm text-neutral-500">Connect</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  connectWallet('eternl');
                  toggleConnectModal();
                }}
                className="w-full flex items-center justify-between p-3 border border-neutral-300 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-secondary-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-secondary-600" />
                  </div>
                  <span className="ml-3 font-medium">Eternl Wallet</span>
                </div>
                <span className="text-sm text-neutral-500">Connect</span>
              </motion.button>
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Connect your Cardano wallet to start lending and borrowing on OPENLEND.
            </p>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Navbar;