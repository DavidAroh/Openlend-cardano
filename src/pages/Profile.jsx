import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useLoan } from '../contexts/LoanContext';
import {
  User,
  ArrowLeft,
  Copy,
  Clock,
  CheckCircle,
  AlertTriangle,
  BadgeCheck,
  Award,
  BarChart3,
  Check,
  X
} from 'lucide-react';

const Profile = () => {
  const { wallet, address, balance } = useWallet();
  const { myLoans, fundedLoans } = useLoan();
  const [copied, setCopied] = useState(false);

  // Redirect to homepage if wallet is not connected
  if (!wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Connect Your Wallet</h1>
          <p className="mt-4 text-neutral-600">Please connect your wallet to view your profile.</p>
        </div>
      </div>
    );
  }

  // Calculate reputation score (simplified version)
  const reputationScore = () => {
    let score = 50; // Base score
    
    // Add points for completed loans (repaid)
    score += myLoans.filter(loan => loan.status === 'Completed').length * 10;
    
    // Add points for funding loans
    score += fundedLoans.length * 5;
    
    // Cap at 100
    return Math.min(score, 100);
  };

  // Stats
  const stats = [
    {
      name: 'Loan Requests',
      value: myLoans.length,
      icon: <BarChart3 className="h-5 w-5 text-primary-500" />
    },
    {
      name: 'Loans Funded',
      value: fundedLoans.length,
      icon: <BadgeCheck className="h-5 w-5 text-secondary-500" />
    },
    {
      name: 'Loans Repaid',
      value: myLoans.filter(loan => loan.status === 'Completed').length,
      icon: <CheckCircle className="h-5 w-5 text-success-500" />
    },
    {
      name: 'Defaulted Loans',
      value: myLoans.filter(loan => loan.status === 'Defaulted').length,
      icon: <AlertTriangle className="h-5 w-5 text-error-500" />
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-neutral-900">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Your personal details and activity on OPENLEND.
            </p>
          </div>
          <div className="border-t border-neutral-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-1">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-neutral-900">
                        {wallet.type === 'nami' ? 'Nami' : 'Eternl'} Wallet User
                      </h3>
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                        Verified
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-neutral-500">
                      <button
                        onClick={copyToClipboard}
                        className="group flex items-center hover:text-neutral-700 focus:outline-none"
                      >
                        {address.substring(0, 14)}...{address.substring(address.length - 4)}
                        <Copy className="ml-2 h-4 w-4 group-hover:text-primary-500" />
                      </button>
                      {copied && (
                        <span className="ml-2 text-xs text-success-600">Copied!</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-neutral-50 rounded-md p-3"
                      >
                        <div className="flex items-center">
                          {stat.icon}
                          <span className="ml-1 text-xs text-neutral-500">{stat.name}</span>
                        </div>
                        <p className="mt-1 text-lg font-medium text-neutral-900">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
            <h3 className="text-lg leading-6 font-medium text-neutral-900">
              Wallet Details
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-neutral-500">Wallet Type</dt>
                <dd className="mt-1 text-sm text-neutral-900">{wallet.type === 'nami' ? 'Nami' : 'Eternl'} Wallet</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-neutral-500">Network</dt>
                <dd className="mt-1 text-sm text-neutral-900 capitalize">{wallet.network}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-neutral-500">Balance</dt>
                <dd className="mt-1 text-sm text-neutral-900">{balance} ADA</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-neutral-500">Connected Since</dt>
                <dd className="mt-1 text-sm text-neutral-900">{new Date().toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Reputation Section */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
            <h3 className="text-lg leading-6 font-medium text-neutral-900">
              Reputation Score
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Your reputation in the OPENLEND community based on your lending and borrowing activity.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-neutral-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: reputationScore() / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${
                      reputationScore() >= 80 ? 'text-success-500' :
                      reputationScore() >= 50 ? 'text-primary-500' :
                      'text-error-500'
                    }`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      transformOrigin: 'center',
                      transform: 'rotate(-90deg)',
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-neutral-900">{reputationScore()}</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-lg font-medium text-neutral-900">
                  {reputationScore() >= 80 ? 'Excellent' :
                   reputationScore() >= 60 ? 'Good' :
                   reputationScore() >= 40 ? 'Fair' :
                   'Needs Improvement'}
                </h4>
                <p className="mt-1 text-sm text-neutral-500">
                  Your reputation is based on your loan repayment history, lending activity, and overall participation.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-700 mb-3">Reputation Factors</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-success-500" />
                  </div>
                  <div className="ml-3 text-sm text-neutral-600">
                    <span className="font-medium text-neutral-900">Loan Repayments</span>: {myLoans.filter(loan => loan.status === 'Completed').length} loans repaid on time
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-success-500" />
                  </div>
                  <div className="ml-3 text-sm text-neutral-600">
                    <span className="font-medium text-neutral-900">Lending Activity</span>: Funded {fundedLoans.length} loans totaling {fundedLoans.reduce((total, loan) => {
                      const lendAmount = loan.lenders.find(l => address.includes(l.address.substring(0, 8)))?.amount || 0;
                      return total + lendAmount;
                    }, 0)} ADA
                  </div>
                </li>
                {myLoans.some(loan => loan.status === 'Defaulted') && (
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <X className="h-5 w-5 text-error-500" />
                    </div>
                    <div className="ml-3 text-sm text-neutral-600">
                      <span className="font-medium text-neutral-900">Defaulted Loans</span>: {myLoans.filter(loan => loan.status === 'Defaulted').length} defaulted loans
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="mt-8">
          <Link
            to="/achievements"
            className="block bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-neutral-900">
                  Achievements
                </h3>
                <Award className="h-5 w-5 text-primary-500" />
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-sm text-neutral-600 mb-4">
                View all your badges, ranks, and NFT rewards.
              </p>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  3 Badges
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                  Trusted Lender
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  2 NFTs
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;