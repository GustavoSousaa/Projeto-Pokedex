import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { usePokemonStore } from '../../stores/pokemonStore';

export const SearchBar: React.FC = () => {
  const { searchPokemon, searchQuery, isLoading } = usePokemonStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        searchPokemon(inputValue);
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [inputValue, searchPokemon, searchQuery]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchPokemon(inputValue);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
      </div>
    </form>
  );
};