import React, { createContext, useState, useContext, useEffect } from 'react';

const LoanContext = createContext();

export const useLoan = () => useContext(LoanContext);

export const LoanProvider = ({ children }) => {
  const [loans, setLoans] = useState([]);
  const [myLoans, setMyLoans] = useState([]);
  const [fundedLoans, setFundedLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock loan data for demonstration
  useEffect(() => {
    const mockLoans = [
      {
        id: '1',
        borrower: 'addr1qx...5g5g',
        borrowerName: 'Alice',
        amount: 500,
        duration: 30, // days
        interest: 5, // percent
        purpose: 'Starting a small online business',
        collateral: 1000,
        status: 'Active',
        funded: 350,
        repaid: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        lenders: [
          { address: 'addr1qz...8jr7', amount: 250 },
          { address: 'addr1qy...6cvs', amount: 100 },
        ],
        created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        borrower: 'addr1qz...jr79',
        borrowerName: 'Bob',
        amount: 1000,
        duration: 60, // days
        interest: 7, // percent
        purpose: 'Education expenses',
        collateral: 1500,
        status: 'Funding',
        funded: 600,
        repaid: 0,
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        lenders: [
          { address: 'addr1qz...8jr7', amount: 300 },
          { address: 'addr1qy...6cvs', amount: 300 },
        ],
        created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        borrower: 'addr1qy...6cv8',
        borrowerName: 'Carol',
        amount: 2000,
        duration: 90, // days
        interest: 8, // percent
        purpose: 'Home improvement project',
        collateral: 3000,
        status: 'Funding',
        funded: 1200,
        repaid: 0,
        dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        lenders: [
          { address: 'addr1qz...8jr7', amount: 1200 },
        ],
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        borrower: 'addr1qz...8jr7',
        borrowerName: 'David',
        amount: 750,
        duration: 45, // days
        interest: 6, // percent
        purpose: 'Medical expenses',
        collateral: 1200,
        status: 'Completed',
        funded: 750,
        repaid: 750,
        dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        lenders: [
          { address: 'addr1qy...6cvs', amount: 500 },
          { address: 'addr1qx...5g5g', amount: 250 },
        ],
        created: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        borrower: 'addr1qy...6cvs',
        borrowerName: 'Eve',
        amount: 1500,
        duration: 60, // days
        interest: 7.5, // percent
        purpose: 'Purchase farming equipment',
        collateral: 2250,
        status: 'Active',
        funded: 1500,
        repaid: 500,
        dueDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
        lenders: [
          { address: 'addr1qx...5g5g', amount: 750 },
          { address: 'addr1qz...8jr7', amount: 750 },
        ],
        created: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    setLoans(mockLoans);
    
    // For demonstration, set the first loan as one of the user's loans
    setMyLoans([mockLoans[0]]);
    
    // For demonstration, set some loans as funded by the user
    setFundedLoans([mockLoans[1], mockLoans[4]]);
  }, []);

  const createLoan = (loanData) => {
    setLoading(true);
    
    try {
      // In a real implementation, this would interact with Cardano smart contracts
      setTimeout(() => {
        const newLoan = {
          id: `${loans.length + 1}`,
          borrower: 'addr1qxy8rzd8ykr0z6jk5juzt0qw0tpz8c7tt0y6ctnv7p5sh8g8jr79sugagq7caex57z2v6cv8yuqkzg5g5gqqds6h5fcs8kstq6',
          borrowerName: 'You',
          amount: Number(loanData.amount),
          duration: Number(loanData.duration),
          interest: Number(loanData.interest),
          purpose: loanData.purpose,
          collateral: Number(loanData.collateral),
          status: 'Funding',
          funded: 0,
          repaid: 0,
          dueDate: new Date(Date.now() + Number(loanData.duration) * 24 * 60 * 60 * 1000).toISOString(),
          lenders: [],
          created: new Date().toISOString(),
        };
        
        setLoans(prev => [...prev, newLoan]);
        setMyLoans(prev => [...prev, newLoan]);
        setLoading(false);
        
        return newLoan;
      }, 1500);
    } catch (err) {
      setError('Failed to create loan. Please try again.');
      setLoading(false);
    }
  };

  const fundLoan = (loanId, amount) => {
    setLoading(true);
    
    try {
      // In a real implementation, this would interact with Cardano smart contracts
      setTimeout(() => {
        setLoans(prev => 
          prev.map(loan => {
            if (loan.id === loanId) {
              const newFunded = loan.funded + Number(amount);
              const newStatus = newFunded >= loan.amount ? 'Active' : 'Funding';
              return {
                ...loan,
                funded: newFunded,
                status: newStatus,
                lenders: [
                  ...loan.lenders,
                  { 
                    address: 'addr1qxy8rzd8ykr0z6jk5juzt0qw0tpz8c7tt0y6ctnv7p5sh8g8jr79sugagq7caex57z2v6cv8yuqkzg5g5gqqds6h5fcs8kstq6', 
                    amount: Number(amount) 
                  }
                ]
              };
            }
            return loan;
          })
        );
        
        // Update funded loans for current user
        const fundedLoan = loans.find(loan => loan.id === loanId);
        if (fundedLoan) {
          setFundedLoans(prev => [...prev, fundedLoan]);
        }
        
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fund loan. Please try again.');
      setLoading(false);
    }
  };

  const repayLoan = (loanId, amount) => {
    setLoading(true);
    
    try {
      // In a real implementation, this would interact with Cardano smart contracts
      setTimeout(() => {
        setLoans(prev => 
          prev.map(loan => {
            if (loan.id === loanId) {
              const newRepaid = loan.repaid + Number(amount);
              const newStatus = newRepaid >= loan.amount ? 'Completed' : 'Active';
              return {
                ...loan,
                repaid: newRepaid,
                status: newStatus
              };
            }
            return loan;
          })
        );
        
        // Update my loans
        setMyLoans(prev => 
          prev.map(loan => {
            if (loan.id === loanId) {
              const newRepaid = loan.repaid + Number(amount);
              const newStatus = newRepaid >= loan.amount ? 'Completed' : 'Active';
              return {
                ...loan,
                repaid: newRepaid,
                status: newStatus
              };
            }
            return loan;
          })
        );
        
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to repay loan. Please try again.');
      setLoading(false);
    }
  };

  const getLoanById = (id) => {
    return loans.find(loan => loan.id === id);
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        myLoans,
        fundedLoans,
        loading,
        error,
        createLoan,
        fundLoan,
        repayLoan,
        getLoanById
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};