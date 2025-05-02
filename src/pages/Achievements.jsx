import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useLoan } from '../contexts/LoanContext';
import {
  Award,
  ArrowLeft,
  User,
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  Check,
  BadgeCheck,
  Heart,
  Zap,
  Map,
  Star
} from 'lucide-react';

const Achievements = () => {
  const { wallet } = useWallet();
  const { myLoans, fundedLoans } = useLoan();

  // Achievements data
  const badges = [
    {
      id: 'first-loan',
      name: 'First Steps',
      description: 'Created your first loan request',
      icon: <DollarSign className="h-6 w-6" />,
      unlocked: myLoans.length > 0,
      progress: myLoans.length > 0 ? 100 : 0,
      color: 'bg-primary-500'
    },
    {
      id: 'first-lend',
      name: 'Helping Hand',
      description: 'Funded your first loan',
      icon: <Heart className="h-6 w-6" />,
      unlocked: fundedLoans.length > 0,
      progress: fundedLoans.length > 0 ? 100 : 0,
      color: 'bg-secondary-500'
    },
    {
      id: 'loan-repaid',
      name: 'Promise Keeper',
      description: 'Fully repaid a loan',
      icon: <Check className="h-6 w-6" />,
      unlocked: myLoans.filter(loan => loan.status === 'Completed').length > 0,
      progress: myLoans.filter(loan => loan.status === 'Completed').length > 0 ? 100 : 0,
      color: 'bg-success-500'
    },
    {
      id: 'three-loans',
      name: 'Active Borrower',
      description: 'Created 3 loan requests',
      icon: <TrendingUp className="h-6 w-6" />,
      unlocked: myLoans.length >= 3,
      progress: Math.min(Math.round((myLoans.length / 3) * 100), 100),
      color: 'bg-primary-500'
    },
    {
      id: 'three-lends',
      name: 'Generous Lender',
      description: 'Funded 3 different loans',
      icon: <DollarSign className="h-6 w-6" />,
      unlocked: fundedLoans.length >= 3,
      progress: Math.min(Math.round((fundedLoans.length / 3) * 100), 100),
      color: 'bg-secondary-500'
    },
    {
      id: 'big-loan',
      name: 'Big Dreamer',
      description: 'Created a loan request of 1000+ ADA',
      icon: <Zap className="h-6 w-6" />,
      unlocked: myLoans.some(loan => loan.amount >= 1000),
      progress: myLoans.some(loan => loan.amount >= 1000) ? 100 : 
               myLoans.length > 0 ? Math.min(Math.round((Math.max(...myLoans.map(loan => loan.amount)) / 1000) * 100), 99) : 0,
      color: 'bg-accent-500'
    }
  ];

  const ranks = [
    {
      id: 'new-user',
      name: 'Newcomer',
      description: 'Just started on OPENLEND',
      icon: <User className="h-6 w-6" />,
      unlocked: true,
      current: !badges.some(badge => badge.unlocked),
      color: 'bg-neutral-400'
    },
    {
      id: 'trusted-borrower',
      name: 'Trusted Borrower',
      description: 'Successfully repaid at least one loan',
      icon: <Shield className="h-6 w-6" />,
      unlocked: myLoans.filter(loan => loan.status === 'Completed').length > 0,
      current: myLoans.filter(loan => loan.status === 'Completed').length > 0 && 
               fundedLoans.length < 3,
      color: 'bg-primary-500'
    },
    {
      id: 'trusted-lender',
      name: 'Trusted Lender',
      description: 'Funded at least three loans',
      icon: <BadgeCheck className="h-6 w-6" />,
      unlocked: fundedLoans.length >= 3,
      current: fundedLoans.length >= 3 && 
               myLoans.filter(loan => loan.status === 'Completed').length < 3,
      color: 'bg-secondary-500'
    },
    {
      id: 'community-pillar',
      name: 'Community Pillar',
      description: 'Active in both lending and borrowing with perfect repayment',
      icon: <Star className="h-6 w-6" />,
      unlocked: fundedLoans.length >= 3 && myLoans.filter(loan => loan.status === 'Completed').length >= 3,
      current: fundedLoans.length >= 3 && myLoans.filter(loan => loan.status === 'Completed').length >= 3,
      color: 'bg-accent-500'
    }
  ];

  // NFTs the user has earned
  const nfts = [
    {
      id: 'trusted-lender-nft',
      name: 'Trusted Lender NFT',
      description: 'Awarded for funding multiple loans and helping community members',
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      unlocked: fundedLoans.length >= 3,
      color: 'bg-secondary-500'
    },
    {
      id: 'promise-keeper-nft',
      name: 'Promise Keeper NFT',
      description: 'Awarded for maintaining a perfect repayment record',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      unlocked: myLoans.filter(loan => loan.status === 'Completed').length >= 2,
      color: 'bg-primary-500'
    }
  ].filter(nft => nft.unlocked);

  // Find the current rank
  const currentRank = ranks.find(rank => rank.current) || ranks[0];

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

  // Redirect to homepage if wallet is not connected
  if (!wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Connect Your Wallet</h1>
          <p className="mt-4 text-neutral-600">Please connect your wallet to view your achievements.</p>
        </div>
      </div>
    );
  }

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

        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:text-3xl sm:truncate">
              Your Achievements
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Track your progress and earn rewards for your activity on OPENLEND.
            </p>
          </div>
        </div>

        {/* Current Rank Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
            <h3 className="text-lg leading-6 font-medium text-neutral-900">
              Current Rank
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Your status in the OPENLEND community.
            </p>
          </div>
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className={`flex-shrink-0 h-24 w-24 rounded-full ${currentRank.color} flex items-center justify-center text-white`}>
                {currentRank.icon}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h4 className="text-xl font-bold text-neutral-900">
                  {currentRank.name}
                </h4>
                <p className="mt-1 text-sm text-neutral-600">
                  {currentRank.description}
                </p>
                <div className="mt-3">
                  <Link
                    to="/marketplace"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Map className="h-3 w-3 mr-1" />
                    View Rank Path
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">
            Badges
          </h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {badges.map((badge) => (
              <motion.div 
                key={badge.id}
                variants={itemVariants}
                className={`relative bg-white overflow-hidden shadow rounded-lg ${badge.unlocked ? '' : 'opacity-70'}`}
              >
                <div className={`h-2 ${badge.color}`}></div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full ${badge.unlocked ? badge.color : 'bg-neutral-200'} flex items-center justify-center text-white`}>
                      {badge.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-neutral-900">
                        {badge.name}
                      </h4>
                      <p className="text-sm text-neutral-500">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-neutral-700">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-neutral-700">
                        {badge.progress}%
                      </span>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200">
                      <div
                        style={{ width: `${badge.progress}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${badge.color}`}
                      ></div>
                    </div>
                  </div>
                  {badge.unlocked && (
                    <div className="absolute top-4 right-4">
                      <Award className="h-5 w-5 text-primary-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* NFT Rewards Section */}
        {nfts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">
              NFT Rewards
            </h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {nfts.map((nft) => (
                <motion.div 
                  key={nft.id}
                  variants={itemVariants}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className={`h-2 ${nft.color}`}></div>
                  <div className="p-4">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-medium text-neutral-900">
                        {nft.name}
                      </h4>
                      <p className="mt-1 text-sm text-neutral-500">
                        {nft.description}
                      </p>
                      <div className="mt-4 flex items-center">
                        <BadgeCheck className="h-5 w-5 text-primary-500" />
                        <span className="ml-2 text-sm text-primary-600">
                          Owned by you
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Rank Path Section */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">
            Rank Path
          </h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
              <p className="max-w-2xl text-sm text-neutral-500">
                Your journey through the OPENLEND community ranks. Complete activities to unlock higher ranks and earn rewards.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ol className="relative border-l border-neutral-200">
                {ranks.map((rank, index) => (
                  <motion.li 
                    key={rank.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-10 ml-6 last:mb-0"
                  >
                    <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ${
                      rank.unlocked ? rank.color : 'bg-neutral-200'
                    } text-white`}>
                      {rank.icon}
                    </span>
                    <div className={`${rank.current ? 'border-2 border-primary-500' : ''} p-4 rounded-lg ${rank.current ? 'bg-primary-50' : 'bg-neutral-50'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${rank.current ? 'text-primary-900' : 'text-neutral-900'}`}>
                          {rank.name}
                        </h3>
                        {rank.unlocked && (
                          <span className="bg-success-100 text-success-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className={`mb-2 text-sm ${rank.current ? 'text-primary-700' : 'text-neutral-600'}`}>
                        {rank.description}
                      </p>
                      {rank.current && (
                        <div className="mt-2">
                          <span className="text-xs font-semibold inline-block py-1 px-2 rounded bg-primary-200 text-primary-800">
                            Current Rank
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;