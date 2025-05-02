import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useLoan } from '../contexts/LoanContext';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  DollarSign,
  Clock,
  Percent,
  Shield,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

const CreateLoanRequest = () => {
  const navigate = useNavigate();
  const { wallet, balance } = useWallet();
  const { createLoan, loading } = useLoan();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: 500,
      duration: 30,
      interest: 5,
      purpose: '',
      collateral: 750
    }
  });

  // Redirect to homepage if wallet is not connected
  if (!wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Connect Your Wallet</h1>
          <p className="mt-4 text-neutral-600">Please connect your wallet to create a loan request.</p>
        </div>
      </div>
    );
  }

  // Watch the amount input to calculate suggested collateral
  const watchedAmount = watch('amount');
  const suggestedCollateral = watchedAmount * 1.5;

  const onSubmit = (data) => {
    createLoan(data).then((newLoan) => {
      navigate(`/loan/${newLoan.id}`);
    });
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

        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
            <h3 className="text-lg leading-6 font-medium text-neutral-900">
              Create Loan Request
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Fill out the form below to create a new loan request on the OPENLEND platform.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-neutral-700">
                    Loan Amount (ADA) <span className="text-error-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      className={`focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-neutral-300 rounded-md ${
                        errors.amount ? 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500' : ''
                      }`}
                      placeholder="0"
                      step="50"
                      min="100"
                      max="10000"
                      {...register('amount', { 
                        required: 'Loan amount is required',
                        min: {
                          value: 100,
                          message: 'Minimum loan amount is 100 ADA'
                        },
                        max: {
                          value: 10000,
                          message: 'Maximum loan amount is 10,000 ADA'
                        }
                      })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">ADA</span>
                    </div>
                  </div>
                  {errors.amount && (
                    <p className="mt-2 text-sm text-error-600">{errors.amount.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="collateral" className="block text-sm font-medium text-neutral-700">
                    Collateral Amount (ADA) <span className="text-error-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="number"
                      id="collateral"
                      className={`focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-neutral-300 rounded-md ${
                        errors.collateral ? 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500' : ''
                      }`}
                      placeholder="0"
                      step="50"
                      min={watchedAmount}
                      {...register('collateral', { 
                        required: 'Collateral amount is required',
                        min: {
                          value: watchedAmount,
                          message: `Collateral must be at least equal to the loan amount (${watchedAmount} ADA)`
                        }
                      })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">ADA</span>
                    </div>
                  </div>
                  {errors.collateral ? (
                    <p className="mt-2 text-sm text-error-600">{errors.collateral.message}</p>
                  ) : (
                    <p className="mt-2 text-sm text-neutral-500">
                      Suggested: {suggestedCollateral} ADA (150% of loan amount)
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-neutral-700">
                    Duration (Days) <span className="text-error-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="number"
                      id="duration"
                      className={`focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-neutral-300 rounded-md ${
                        errors.duration ? 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500' : ''
                      }`}
                      placeholder="30"
                      step="1"
                      min="7"
                      max="365"
                      {...register('duration', { 
                        required: 'Duration is required',
                        min: {
                          value: 7,
                          message: 'Minimum duration is 7 days'
                        },
                        max: {
                          value: 365,
                          message: 'Maximum duration is 365 days'
                        }
                      })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">Days</span>
                    </div>
                  </div>
                  {errors.duration && (
                    <p className="mt-2 text-sm text-error-600">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-neutral-700">
                    Interest Rate (%) <span className="text-error-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="number"
                      id="interest"
                      className={`focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-neutral-300 rounded-md ${
                        errors.interest ? 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500' : ''
                      }`}
                      placeholder="5"
                      step="0.5"
                      min="1"
                      max="20"
                      {...register('interest', { 
                        required: 'Interest rate is required',
                        min: {
                          value: 1,
                          message: 'Minimum interest rate is 1%'
                        },
                        max: {
                          value: 20,
                          message: 'Maximum interest rate is 20%'
                        }
                      })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  {errors.interest && (
                    <p className="mt-2 text-sm text-error-600">{errors.interest.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-neutral-700">
                  Loan Purpose <span className="text-error-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="purpose"
                    rows={3}
                    className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md ${
                      errors.purpose ? 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500' : ''
                    }`}
                    placeholder="Describe what you need the loan for..."
                    {...register('purpose', { 
                      required: 'Loan purpose is required',
                      minLength: {
                        value: 10,
                        message: 'Loan purpose must be at least 10 characters'
                      },
                      maxLength: {
                        value: 200,
                        message: 'Loan purpose cannot exceed 200 characters'
                      }
                    })}
                  />
                </div>
                {errors.purpose ? (
                  <p className="mt-2 text-sm text-error-600">{errors.purpose.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-neutral-500">
                    Briefly describe the purpose of your loan (10-200 characters). Clear explanations increase funding chances.
                  </p>
                )}
              </div>

              {/* Guidelines Section */}
              <div className="bg-neutral-50 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-primary-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-neutral-700">Loan Request Guidelines</h3>
                    <div className="mt-2 text-sm text-neutral-600">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Provide accurate and honest information about your loan purpose</li>
                        <li>Higher collateral increases your chances of getting funded</li>
                        <li>Reasonable interest rates (5-10%) are more likely to attract lenders</li>
                        <li>All loan transactions are secured by smart contracts on the Cardano blockchain</li>
                        <li>Defaulting on loans will affect your reputation score</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning if not enough balance for collateral */}
              {wallet && balance < watchedAmount && (
                <div className="rounded-md bg-error-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-error-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-error-800">Insufficient Balance</h3>
                      <div className="mt-2 text-sm text-error-700">
                        <p>
                          Your wallet balance ({balance} ADA) is less than the required collateral for this loan. Please adjust the loan amount or add funds to your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Link
                  to="/dashboard"
                  className="bg-white py-2 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || (wallet && balance < watchedAmount)}
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    loading || (wallet && balance < watchedAmount)
                      ? 'bg-neutral-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : 'Create Loan Request'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLoanRequest;