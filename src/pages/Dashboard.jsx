import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useLoan } from '../contexts/LoanContext';
import { 
  PlusCircle, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  BarChart3,
  TrendingUp,
  History,
  Award,
  Check,
  X
} from 'lucide-react';

const Dashboard = () => {
  const { wallet, address } = useWallet();
  const { myLoans, fundedLoans, loading } = useLoan();
  const [activeTab, setActiveTab] = useState('borrowed');

  // Redirect to homepage if wallet is not connected
  if (!wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Connect Your Wallet</h1>
          <p className="mt-4 text-neutral-600">Please connect your wallet to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalBorrowed = myLoans.reduce((acc, loan) => acc + loan.amount, 0);
  const totalLent = fundedLoans.reduce((acc, loan) => {
    const lendAmount = loan.lenders.find(l => address.includes(l.address.substring(0, 8)))?.amount || 0;
    return acc + lendAmount;
  }, 0);
  const activeLoans = myLoans.filter(loan => loan.status === 'Active').length + 
                      fundedLoans.filter(loan => loan.status === 'Active').length;
  const completedLoans = myLoans.filter(loan => loan.status === 'Completed').length + 
                         fundedLoans.filter(loan => loan.status === 'Completed').length;

  // Card Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/create-loan"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Loan Request
            </Link>
            <Link
              to="/marketplace"
              className="ml-3 inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Browse Loans
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <BarChart3 className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-neutral-500 truncate">
                      Total Borrowed
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-neutral-900">
                        {totalBorrowed} ADA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                  <TrendingUp className="h-6 w-6 text-secondary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-neutral-500 truncate">
                      Total Lent
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-neutral-900">
                        {totalLent} ADA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-accent-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-neutral-500 truncate">
                      Active Loans
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-neutral-900">
                        {activeLoans}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                  <Check className="h-6 w-6 text-success-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-neutral-500 truncate">
                      Completed Loans
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-neutral-900">
                        {completedLoans}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-secondary-500 to-primary-500 shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8 md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Your Achievements</h3>
              <p className="mt-2 text-secondary-100">
                You've earned 3 badges and unlocked the "Trusted Lender" rank.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/achievements"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <Award className="h-4 w-4 mr-2" />
                View Achievements
              </Link>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 px-6 py-4">
            <div className="flex space-x-4 overflow-x-auto py-2">
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-md p-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-md p-3">
                <History className="h-6 w-6 text-white" />
              </div>
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loans Tab Navigation */}
        <div className="mt-8 border-b border-neutral-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('borrowed')}
              className={`${
                activeTab === 'borrowed'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
            >
              My Loan Requests
            </button>
            <button
              onClick={() => setActiveTab('lent')}
              className={`${
                activeTab === 'lent'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Funded by Me
            </button>
          </nav>
        </div>

        {/* Loans Content */}
        <div className="mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-neutral-600">Loading loans...</p>
            </div>
          ) : (
            activeTab === 'borrowed' ? (
              myLoans.length > 0 ? (
                <div className="overflow-hidden shadow border border-neutral-200 sm:rounded-md">
                  <ul className="divide-y divide-neutral-200">
                    {myLoans.map((loan, index) => (
                      <motion.li 
                        key={loan.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link to={`/loan/${loan.id}`} className="block hover:bg-neutral-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                              <div className="flex-shrink-0">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                                  loan.status === 'Active' ? 'bg-primary-100 text-primary-600' :
                                  loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-600' :
                                  loan.status === 'Completed' ? 'bg-success-100 text-success-600' : 
                                  'bg-error-100 text-error-600'
                                }`}>
                                  {loan.status === 'Active' && <Clock className="h-6 w-6" />}
                                  {loan.status === 'Funding' && <DollarSign className="h-6 w-6" />}
                                  {loan.status === 'Completed' && <Check className="h-6 w-6" />}
                                  {loan.status === 'Defaulted' && <X className="h-6 w-6" />}
                                </div>
                              </div>
                              <div className="min-w-0 flex-1 px-4">
                                <div>
                                  <p className="text-sm font-medium text-primary-600 truncate">
                                    {loan.purpose}
                                  </p>
                                  <p className="mt-1 flex items-center text-sm text-neutral-500">
                                    <span className="truncate">{loan.amount} ADA</span>
                                    <span className="ml-1 mr-1">•</span>
                                    <span className="truncate">{loan.duration} days</span>
                                    <span className="ml-1 mr-1">•</span>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                      ${loan.status === 'Active' ? 'bg-primary-100 text-primary-800' :
                                        loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-800' :
                                        loan.status === 'Completed' ? 'bg-success-100 text-success-800' :
                                        'bg-error-100 text-error-800'
                                      }`}>
                                      {loan.status}
                                    </span>
                                  </p>
                                </div>
                                <div className="mt-2 flex justify-between">
                                  <div className="sm:flex">
                                    <div className="flex items-center text-sm text-neutral-500">
                                      <span>Funded: {loan.funded} ADA ({Math.round((loan.funded / loan.amount) * 100)}%)</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-sm text-neutral-500">
                                    <span>Repaid: {loan.repaid} ADA</span>
                                  </div>
                                </div>
                                {loan.status === 'Active' && (
                                  <div className="mt-1 relative pt-1">
                                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                                      <div
                                        style={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success-500"
                                      ></div>
                                    </div>
                                  </div>
                                )}
                                {loan.status === 'Funding' && (
                                  <div className="mt-1 relative pt-1">
                                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                                      <div
                                        style={{ width: `${(loan.funded / loan.amount) * 100}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary-500"
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <ChevronRight className="h-5 w-5 text-neutral-400" />
                            </div>
                          </div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-12 bg-white shadow rounded-lg">
                  <DollarSign className="mx-auto h-12 w-12 text-neutral-400" />
                  <h3 className="mt-2 text-sm font-medium text-neutral-900">No loan requests</h3>
                  <p className="mt-1 text-sm text-neutral-500">Get started by creating a new loan request.</p>
                  <div className="mt-6">
                    <Link
                      to="/create-loan"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Loan Request
                    </Link>
                  </div>
                </div>
              )
            ) : (
              fundedLoans.length > 0 ? (
                <div className="overflow-hidden shadow border border-neutral-200 sm:rounded-md">
                  <ul className="divide-y divide-neutral-200">
                    {fundedLoans.map((loan, index) => (
                      <motion.li 
                        key={loan.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link to={`/loan/${loan.id}`} className="block hover:bg-neutral-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                              <div className="flex-shrink-0">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                                  loan.status === 'Active' ? 'bg-primary-100 text-primary-600' :
                                  loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-600' :
                                  loan.status === 'Completed' ? 'bg-success-100 text-success-600' : 
                                  'bg-error-100 text-error-600'
                                }`}>
                                  {loan.status === 'Active' && <Clock className="h-6 w-6" />}
                                  {loan.status === 'Funding' && <DollarSign className="h-6 w-6" />}
                                  {loan.status === 'Completed' && <Check className="h-6 w-6" />}
                                  {loan.status === 'Defaulted' && <X className="h-6 w-6" />}
                                </div>
                              </div>
                              <div className="min-w-0 flex-1 px-4">
                                <div>
                                  <p className="text-sm font-medium text-primary-600 truncate">
                                    {loan.purpose}
                                  </p>
                                  <p className="mt-1 flex items-center text-sm text-neutral-500">
                                    <span className="truncate">Borrower: {loan.borrowerName}</span>
                                    <span className="ml-1 mr-1">•</span>
                                    <span className="truncate">{loan.amount} ADA at {loan.interest}%</span>
                                    <span className="ml-1 mr-1">•</span>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                      ${loan.status === 'Active' ? 'bg-primary-100 text-primary-800' :
                                        loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-800' :
                                        loan.status === 'Completed' ? 'bg-success-100 text-success-800' :
                                        'bg-error-100 text-error-800'
                                      }`}>
                                      {loan.status}
                                    </span>
                                  </p>
                                </div>
                                <div className="mt-2 flex justify-between">
                                  <div className="sm:flex">
                                    <div className="flex items-center text-sm text-neutral-500">
                                      <span>
                                        My contribution: {
                                          loan.lenders.find(l => address.includes(l.address.substring(0, 8)))?.amount || 0
                                        } ADA
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-sm text-neutral-500">
                                    <span>Repaid: {loan.repaid} ADA</span>
                                  </div>
                                </div>
                                {loan.status === 'Active' && (
                                  <div className="mt-1 relative pt-1">
                                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                                      <div
                                        style={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success-500"
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <ChevronRight className="h-5 w-5 text-neutral-400" />
                            </div>
                          </div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-12 bg-white shadow rounded-lg">
                  <DollarSign className="mx-auto h-12 w-12 text-neutral-400" />
                  <h3 className="mt-2 text-sm font-medium text-neutral-900">No funded loans</h3>
                  <p className="mt-1 text-sm text-neutral-500">Start lending by browsing active loan requests.</p>
                  <div className="mt-6">
                    <Link
                      to="/marketplace"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Browse Loan Marketplace
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;