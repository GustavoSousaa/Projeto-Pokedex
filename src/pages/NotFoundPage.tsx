import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" 
        alt="Psyduck" 
        className="w-40 h-40 mb-8 animate-pulse"
      />
      
      <h1 className="text-4xl font-bold mb-4 text-center">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-lg">
        Oops! Looks like you've ventured into tall grass without any Pokémon. This page doesn't exist.
      </p>
      
      <Link 
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <Home size={18} className="mr-2" />
        Return Home
      </Link>
    </div>
  );
};