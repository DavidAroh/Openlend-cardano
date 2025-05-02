import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { ArrowRight, Shield, Zap, Users, Award, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { wallet, connectWallet } = useWallet();
  
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary-500" />,
      title: "Trusted & Secure",
      description: "All transactions are secured by the Cardano blockchain, ensuring transparency and immutability."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-500" />,
      title: "Fast & Efficient",
      description: "Get funded quickly without the traditional banking bureaucracy and lengthy approval processes."
    },
    {
      icon: <Users className="h-6 w-6 text-primary-500" />,
      title: "Community Powered",
      description: "Direct peer-to-peer lending creates a supportive ecosystem of lenders and borrowers."
    },
    {
      icon: <Award className="h-6 w-6 text-primary-500" />,
      title: "Gamified Experience",
      description: "Earn rewards, badges, and build your reputation as you participate in the ecosystem."
    }
  ];

  const testimonials = [
    {
      quote: "OPENLEND helped me secure funding for my small business when traditional banks wouldn't even consider my application.",
      author: "Sarah J.",
      role: "Small Business Owner"
    },
    {
      quote: "I've been able to diversify my investment portfolio by funding multiple microloans, all while helping real people achieve their goals.",
      author: "Michael T.",
      role: "Investor"
    },
    {
      quote: "The gamification elements make lending fun, and I love seeing my lender score increase with each successful loan.",
      author: "David R.",
      role: "Active Lender"
    }
  ];

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="relative pt-16 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                >
                  <span className="block">Decentralized</span>
                  <span className="block">Microfinance on</span>
                  <span className="block text-accent-400">Cardano</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 text-base text-white sm:mt-5 sm:text-xl lg:text-lg"
                >
                  OPENLEND empowers users to access micro-loans through peer-to-peer lending without relying on traditional banking institutions. Borrow funds for your needs or become a lender and earn interest, all on the secure Cardano blockchain.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 sm:mt-10 space-y-4 sm:space-y-0 sm:flex sm:space-x-4"
                >
                  {wallet ? (
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-neutral-100 md:py-4 md:text-lg md:px-10"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => connectWallet('nami')}
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-neutral-100 md:py-4 md:text-lg md:px-10"
                    >
                      Connect Wallet
                    </button>
                  )}
                  <Link
                    to="/marketplace"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-800 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Loans
                  </Link>
                </motion.div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
                >
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img
                      className="w-full"
                      src="https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Screenshot of the application"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-lg font-medium">Empower your financial future</p>
                      <p className="text-sm">Join the decentralized finance revolution</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
              A better way to access financial services
            </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
              OPENLEND provides a transparent, secure, and efficient platform for microfinance services on the Cardano blockchain.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 text-white">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-neutral-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-neutral-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
              How OPENLEND works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
              A simple, four-step process for borrowers and lenders to participate in our microfinance ecosystem.
            </p>
          </div>

          <div className="mt-16">
            <div className="flex flex-wrap -mx-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              >
                <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Create Request</h3>
                  <p className="text-neutral-600 text-sm flex-grow">Borrowers create loan requests specifying amount, duration, purpose, and collateral.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              >
                <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Fund the Loan</h3>
                  <p className="text-neutral-600 text-sm flex-grow">Lenders browse active loan requests and choose which ones to fund.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              >
                <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Receive & Use</h3>
                  <p className="text-neutral-600 text-sm flex-grow">Once fully funded, smart contracts lock the funds and disburse them to the borrower.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-full md:w-1/4 px-4"
              >
                <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Repay & Earn</h3>
                  <p className="text-neutral-600 text-sm flex-grow">Borrowers repay over time, and lenders receive principal plus interest through smart contracts.</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Explore Loan Marketplace
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What our users say
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-lg p-6 shadow-sm"
              >
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <svg className="h-8 w-8 text-primary-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-neutral-600 mb-6">{testimonial.quote}</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{testimonial.author}</p>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Join OPENLEND today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {wallet ? (
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-neutral-900 bg-white hover:bg-neutral-50"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => connectWallet('nami')}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-neutral-900 bg-white hover:bg-neutral-50"
                >
                  Connect Wallet
                </button>
              </div>
            )}
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-800 bg-opacity-60 hover:bg-opacity-70"
              >
                Browse Loans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;