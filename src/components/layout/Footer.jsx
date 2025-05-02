import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <svg width="24" height="24" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M17.41 0L11.651 10L5.892 0H0L9.489 16.508L0 32H5.892L11.651 22L17.41 32H23.302L13.813 16.508L23.302 0H17.41Z" fill="#2DD4BF"/>
                <path d="M28.511 0L22.752 10L16.993 0H11.101L20.59 16.508L11.101 32H16.993L22.752 22L28.511 32H34.403L24.914 16.508L34.403 0H28.511Z" fill="#8B5CF6"/>
              </svg>
              <span className="text-lg font-bold text-white">OPEN<span className="text-secondary-400">LEND</span></span>
            </div>
            <p className="text-sm mb-4">
              Decentralized microfinance on the Cardano blockchain. Empower yourself with P2P lending and borrowing.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-neutral-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-neutral-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-neutral-400 hover:text-white text-sm">Dashboard</Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-neutral-400 hover:text-white text-sm">Loan Marketplace</Link>
              </li>
              <li>
                <Link to="/create-loan" className="text-neutral-400 hover:text-white text-sm">Create Loan</Link>
              </li>
              <li>
                <Link to="/achievements" className="text-neutral-400 hover:text-white text-sm">Achievements</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm flex items-center">
                  Documentation <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm flex items-center">
                  How It Works <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm flex items-center">
                  Cardano Basics <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm flex items-center">
                  Smart Contracts <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm">Team</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm">Hackathon Project</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white text-sm">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} OPENLEND. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500 mt-2 md:mt-0">
            Built for the Cardano Hackathon | This is a demo application
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;