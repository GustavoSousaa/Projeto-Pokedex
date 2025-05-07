import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-20 h-20">
        {/* Pokéball spinner */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-t-4 border-red-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};