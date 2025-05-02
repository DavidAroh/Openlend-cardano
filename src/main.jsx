import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WalletProvider } from './contexts/WalletContext';
import { LoanProvider } from './contexts/LoanContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <LoanProvider>
          <App />
        </LoanProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);