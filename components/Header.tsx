import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-300 mb-6">
      <div className="flex flex-col">
        <h1 className="font-mono font-bold text-xl tracking-tighter text-sys-black uppercase">
          <span className="text-accent-red">ANTI DEEKSHA</span> PROTECTION
        </h1>
        <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
          By Adri Mukund
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
        <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
        <span className="font-mono text-xs text-gray-400">V 2.1.0</span>
      </div>
    </div>
  );
};

export default Header;