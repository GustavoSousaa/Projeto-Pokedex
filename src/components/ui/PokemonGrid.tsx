import React from 'react';
import { PokemonCard } from './PokemonCard';
import { usePokemonStore } from '../../stores/pokemonStore';
import { LoadingSpinner } from './LoadingSpinner';

export const PokemonGrid: React.FC = () => {
  const { 
    filteredPokemon, 
    isLoading, 
    error, 
    currentPage, 
    totalPages, 
    fetchPokemonList 
  } = usePokemonStore();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchPokemonList(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchPokemonList(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  if (isLoading && filteredPokemon.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => fetchPokemonList(currentPage)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};