import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useLoan } from '../contexts/LoanContext';
import {
  Clock,
  DollarSign,
  Calendar,
  User,
  Shield,
  ArrowLeft,
  Percent,
  Check,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wallet, balance } = useWallet();
  const { getLoanById, fundLoan, repayLoan, loading } = useLoan();
  const [loan, setLoan] = useState(null);
  const [fundAmount, setFundAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [showFundForm, setShowFundForm] = useState(false);
  const [showRepayForm, setShowRepayForm] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  const [showLenderList, setShowLenderList] = useState(false);

  // Get loan data
  useEffect(() => {
    const loanData = getLoanById(id);
    if (loanData) {
      setLoan(loanData);
    } else {
      navigate('/marketplace');
    }
  }, [id, getLoanById, navigate]);

  if (!loan) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading loan details...</p>
        </div>
      </div>
    );
  }

  const isMyLoan = wallet && loan.borrower.includes(wallet.address.substring(0, 8));
  const remainingToFund = loan.amount - loan.funded;
  const remainingToRepay = loan.amount - loan.repaid;
  const isRepayable = isMyLoan && loan.status === 'Active';
  const isFundable = wallet && loan.status === 'Funding' && !isMyLoan;

  const handleFund = (e) => {
    e.preventDefault();
    if (!fundAmount || fundAmount <= 0 || fundAmount > remainingToFund || fundAmount > balance) {
      return;
    }
    
    setProcessingAction(true);
    
    fundLoan(loan.id, Number(fundAmount)).then(() => {
      setShowFundForm(false);
      setFundAmount('');
      setProcessingAction(false);
      
      // Refresh loan data
      const updatedLoan = getLoanById(id);
      setLoan(updatedLoan);
    });
  };

  const handleRepay = (e) => {
    e.preventDefault();
    if (!repayAmount || repayAmount <= 0 || repayAmount > remainingToRepay || repayAmount > balance) {
      return;
    }
    
    setProcessingAction(true);
    
    repayLoan(loan.id, Number(repayAmount)).then(() => {
      setShowRepayForm(false);
      setRepayAmount('');
      setProcessingAction(false);
      
      // Refresh loan data
      const updatedLoan = getLoanById(id);
      setLoan(updatedLoan);
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Marketplace
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-neutral-900">
                  {loan.purpose}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-neutral-500">
                  Loan #{loan.id} • Created {new Date(loan.created).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full
                ${loan.status === 'Active' ? 'bg-primary-100 text-primary-800' :
                  loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-800' :
                  loan.status === 'Completed' ? 'bg-success-100 text-success-800' :
                  'bg-error-100 text-error-800'
                }`}>
                {loan.status}
              </span>
            </div>
          </div>

          {/* Loan Details */}
          <div className="border-b border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <dl className="grid grid-cols-1 gap-y-4">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Amount
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.amount} ADA
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      Interest Rate
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.interest}%
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.duration} days
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due Date
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {new Date(loan.dueDate).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <dl className="grid grid-cols-1 gap-y-4">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Borrower
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.borrowerName} ({loan.borrower.substring(0, 8)}...{loan.borrower.substring(loan.borrower.length - 4)})
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Collateral
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.collateral} ADA
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Funded
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.funded} ADA ({Math.round((loan.funded / loan.amount) * 100)}%)
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-500 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Repaid
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-2 font-medium">
                      {loan.repaid} ADA ({Math.round((loan.repaid / loan.amount) * 100)}%)
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="space-y-4">
              {loan.status === 'Funding' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-neutral-700">
                      Funding Progress
                    </span>
                    <span className="text-sm font-medium text-neutral-700">
                      {Math.round((loan.funded / loan.amount) * 100)}%
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(loan.funded / loan.amount) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary-500"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              )}
              
              {loan.status === 'Active' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-neutral-700">
                      Repayment Progress
                    </span>
                    <span className="text-sm font-medium text-neutral-700">
                      {Math.round((loan.repaid / loan.amount) * 100)}%
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success-500"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lenders List */}
          {loan.lenders.length > 0 && (
            <div className="px-6 py-4 border-b border-neutral-200">
              <button
                onClick={() => setShowLenderList(!showLenderList)}
                className="flex justify-between items-center w-full"
              >
                <span className="text-sm font-medium text-neutral-700">
                  Lenders ({loan.lenders.length})
                </span>
                {showLenderList ? (
                  <ChevronUp className="h-4 w-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-500" />
                )}
              </button>
              
              {showLenderList && (
                <div className="mt-4 overflow-hidden">
                  <ul role="list" className="divide-y divide-neutral-200">
                    {loan.lenders.map((lender, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="py-3 flex justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-600" />
                          </div>
                          <p className="ml-4 text-sm font-medium text-neutral-900">
                            {lender.address.substring(0, 8)}...{lender.address.substring(lender.address.length - 4)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          {lender.amount} ADA
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Actions Section */}
          <div className="px-6 py-4">
            {!wallet ? (
              <div className="bg-primary-50 p-4 rounded-md flex items-start">
                <Info className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-primary-800">Connect Wallet</h3>
                  <p className="mt-1 text-sm text-primary-700">
                    Please connect your Cardano wallet to interact with this loan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isFundable && (
                  <div>
                    {!showFundForm ? (
                      <button
                        onClick={() => setShowFundForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Fund this Loan
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="bg-neutral-50 p-4 rounded-md"
                      >
                        <h3 className="text-sm font-medium text-neutral-900 mb-3">Fund this Loan</h3>
                        
                        <form onSubmit={handleFund}>
                          <div className="mb-4">
                            <label htmlFor="fundAmount" className="block text-sm font-medium text-neutral-700">
                              Amount to Fund (ADA)
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                type="number"
                                name="fundAmount"
                                id="fundAmount"
                                step="1"
                                min="1"
                                max={Math.min(remainingToFund, balance)}
                                className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-12 sm:text-sm border-neutral-300 rounded-md"
                                placeholder="0"
                                value={fundAmount}
                                onChange={(e) => setFundAmount(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-neutral-500 sm:text-sm">ADA</span>
                              </div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">
                              Remaining to be funded: {remainingToFund} ADA. Your balance: {balance} ADA.
                            </p>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              disabled={processingAction || !fundAmount || fundAmount <= 0 || fundAmount > remainingToFund || fundAmount > balance}
                              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                processingAction || !fundAmount || fundAmount <= 0 || fundAmount > remainingToFund || fundAmount > balance
                                  ? 'bg-neutral-400 cursor-not-allowed'
                                  : 'bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500'
                              }`}
                            >
                              {processingAction ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Confirm Funding
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowFundForm(false)}
                              className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </div>
                )}
                
                {isRepayable && (
                  <div>
                    {!showRepayForm ? (
                      <button
                        onClick={() => setShowRepayForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Repay Loan
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="bg-neutral-50 p-4 rounded-md"
                      >
                        <h3 className="text-sm font-medium text-neutral-900 mb-3">Repay Loan</h3>
                        
                        <form onSubmit={handleRepay}>
                          <div className="mb-4">
                            <label htmlFor="repayAmount" className="block text-sm font-medium text-neutral-700">
                              Amount to Repay (ADA)
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                type="number"
                                name="repayAmount"
                                id="repayAmount"
                                step="1"
                                min="1"
                                max={Math.min(remainingToRepay, balance)}
                                className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-12 sm:text-sm border-neutral-300 rounded-md"
                                placeholder="0"
                                value={repayAmount}
                                onChange={(e) => setRepayAmount(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-neutral-500 sm:text-sm">ADA</span>
                              </div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">
                              Remaining to be repaid: {remainingToRepay} ADA. Your balance: {balance} ADA.
                            </p>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              disabled={processingAction || !repayAmount || repayAmount <= 0 || repayAmount > remainingToRepay || repayAmount > balance}
                              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                processingAction || !repayAmount || repayAmount <= 0 || repayAmount > remainingToRepay || repayAmount > balance
                                  ? 'bg-neutral-400 cursor-not-allowed'
                                  : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                              }`}
                            >
                              {processingAction ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Confirm Repayment
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowRepayForm(false)}
                              className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </div>
                )}
                
                {loan.status === 'Completed' && (
                  <div className="bg-success-50 p-4 rounded-md flex items-start">
                    <Check className="h-5 w-5 text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-success-800">Loan Completed</h3>
                      <p className="mt-1 text-sm text-success-700">
                        This loan has been fully repaid. Thank you for using OPENLEND!
                      </p>
                    </div>
                  </div>
                )}
                
                {loan.status === 'Defaulted' && (
                  <div className="bg-error-50 p-4 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 text-error-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-error-800">Loan Defaulted</h3>
                      <p className="mt-1 text-sm text-error-700">
                        This loan has been marked as defaulted. Collateral will be distributed to lenders.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;