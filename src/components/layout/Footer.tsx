import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Pokédex App. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Pokémon and its trademarks are ©1995-{new Date().getFullYear()} Nintendo, Creatures, and GAMEFREAK.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm">
              Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">PokéAPI</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};