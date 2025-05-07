import React, { useEffect } from 'react';
import { usePokemonStore } from '../stores/pokemonStore';
import { PokemonGrid } from '../components/ui/PokemonGrid';
import { TypeFilter } from '../components/ui/TypeFilter';

export const HomePage: React.FC = () => {
  const { fetchPokemonList, currentPage } = usePokemonStore();
  
  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [fetchPokemonList, currentPage]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Explore the world of Pokémon! Browse through hundreds of Pokémon species, 
        view their stats, abilities, and more. Use the filters below to find your favorites.
      </p>
      
      <TypeFilter />
      <PokemonGrid />
    </div>
  );
};