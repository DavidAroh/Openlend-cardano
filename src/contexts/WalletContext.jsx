import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Simulate connected wallet for demo
  const connectWallet = async (walletType) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // In a real implementation, this would connect to actual Cardano wallets
      // using the Cardano wallet connector API
      setTimeout(() => {
        const mockWalletData = {
          type: walletType,
          address: 'addr1qxy8rzd8ykr0z6jk5juzt0qw0tpz8c7tt0y6ctnv7p5sh8g8jr79sugagq7caex57z2v6cv8yuqkzg5g5gqqds6h5fcs8kstq6',
          balance: 5000, // ADA value
          network: 'testnet'
        };
        
        setWallet(mockWalletData);
        setAddress(mockWalletData.address);
        setBalance(mockWalletData.balance);
        setIsConnecting(false);
        
        // Store in localStorage for persistence
        localStorage.setItem('cardanoWallet', JSON.stringify(mockWalletData));
      }, 1000);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setAddress('');
    setBalance(0);
    localStorage.removeItem('cardanoWallet');
  };

  // Check for existing wallet connection on load
  useEffect(() => {
    const savedWallet = localStorage.getItem('cardanoWallet');
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet);
      setWallet(walletData);
      setAddress(walletData.address);
      setBalance(walletData.balance);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        address,
        balance,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};