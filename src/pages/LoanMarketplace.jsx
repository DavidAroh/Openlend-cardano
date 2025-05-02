import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLoan } from '../contexts/LoanContext';
import { useWallet } from '../contexts/WalletContext';
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  PlusCircle,
  ChevronRight,
  Calendar,
  Percent
} from 'lucide-react';

const LoanMarketplace = () => {
  const { loans, loading } = useLoan();
  const { wallet } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [filteredLoans, setFilteredLoans] = useState([]);

  // Filter and sort loans
  useEffect(() => {
    let results = [...loans];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(loan => loan.status.toLowerCase() === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(loan => 
        loan.purpose.toLowerCase().includes(lowerSearchTerm) ||
        loan.borrowerName.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        results.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case 'amount-high':
        results.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-low':
        results.sort((a, b) => a.amount - b.amount);
        break;
      case 'interest-high':
        results.sort((a, b) => b.interest - a.interest);
        break;
      default:
        results.sort((a, b) => new Date(b.created) - new Date(a.created));
    }
    
    setFilteredLoans(results);
  }, [loans, searchTerm, statusFilter, sortOption]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:text-3xl sm:truncate">
              Loan Marketplace
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Browse and fund loans from borrowers in the OPENLEND community.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            {wallet && (
              <Link
                to="/create-loan"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Loan Request
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-neutral-300 rounded-md"
                placeholder="Search by purpose or borrower"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="funding">Funding</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="newest">Newest First</option>
                <option value="amount-high">Amount (High to Low)</option>
                <option value="amount-low">Amount (Low to High)</option>
                <option value="interest-high">Interest Rate (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loans Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading loans...</p>
          </div>
        ) : (
          filteredLoans.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredLoans.map((loan) => (
                <motion.div 
                  key={loan.id} 
                  variants={itemVariants}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 ${
                    loan.status === 'Active' ? 'bg-primary-500' :
                    loan.status === 'Funding' ? 'bg-secondary-500' :
                    loan.status === 'Completed' ? 'bg-success-500' : 
                    'bg-error-500'
                  }`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900 truncate">
                          {loan.purpose}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          By {loan.borrowerName}
                        </p>
                      </div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${loan.status === 'Active' ? 'bg-primary-100 text-primary-800' :
                          loan.status === 'Funding' ? 'bg-secondary-100 text-secondary-800' :
                          loan.status === 'Completed' ? 'bg-success-100 text-success-800' :
                          'bg-error-100 text-error-800'
                        }`}>
                        {loan.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-neutral-500" />
                          <span className="ml-1 text-sm text-neutral-500">Amount</span>
                        </div>
                        <p className="mt-1 text-lg font-medium text-neutral-900">{loan.amount} ADA</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <Percent className="h-5 w-5 text-neutral-500" />
                          <span className="ml-1 text-sm text-neutral-500">Interest</span>
                        </div>
                        <p className="mt-1 text-lg font-medium text-neutral-900">{loan.interest}%</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-neutral-500" />
                          <span className="ml-1 text-sm text-neutral-500">Duration</span>
                        </div>
                        <p className="mt-1 text-lg font-medium text-neutral-900">{loan.duration} days</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-neutral-500" />
                          <span className="ml-1 text-sm text-neutral-500">Due Date</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral-900">
                          {new Date(loan.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {loan.status === 'Funding' && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-neutral-700">
                            Funding Progress
                          </span>
                          <span className="text-sm font-medium text-neutral-700">
                            {Math.round((loan.funded / loan.amount) * 100)}%
                          </span>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200">
                          <div
                            style={{ width: `${(loan.funded / loan.amount) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary-500"
                          ></div>
                        </div>
                        <div className="text-sm text-neutral-500">
                          <span className="font-medium">{loan.funded} ADA</span> of {loan.amount} ADA funded
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Link
                        to={`/loan/${loan.id}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-white shadow rounded-lg mt-6">
              <Search className="mx-auto h-12 w-12 text-neutral-400" />
              <h3 className="mt-2 text-sm font-medium text-neutral-900">No loans found</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Try adjusting your search filters or check back later for new loan requests.
              </p>
              {wallet && (
                <div className="mt-6">
                  <Link
                    to="/create-loan"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Loan Request
                  </Link>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LoanMarketplace;