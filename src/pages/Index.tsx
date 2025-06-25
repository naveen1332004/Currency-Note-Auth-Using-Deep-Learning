
import React from 'react';
import CurrencyAuthenticator from '../components/CurrencyAuthenticator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Currency Note Authentication
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Advanced deep learning technology to verify the authenticity of currency notes with high precision
          </p>
        </div>
        <CurrencyAuthenticator />
      </div>
    </div>
  );
};

export default Index;
