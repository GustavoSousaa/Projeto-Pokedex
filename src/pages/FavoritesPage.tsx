import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePokemonStore } from '../stores/pokemonStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { PokemonCard } from '../components/ui/PokemonCard';
import { PokemonDetails } from '../types/pokemon';

export const FavoritesPage: React.FC = () => {
  const { favorites, fetchPokemonDetails } = usePokemonStore();
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length === 0) {
        setFavoritePokemon([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const pokemonPromises = favorites.map(id => fetchPokemonDetails(id));
        const pokemonData = await Promise.all(pokemonPromises);
        setFavoritePokemon(pokemonData);
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError('Failed to load your favorite Pokémon. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, [favorites, fetchPokemonDetails]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Pokédex
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorite Pokémon</h1>
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {!error && favoritePokemon.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl mb-4">You haven't added any Pokémon to your favorites yet.</p>
          <Link 
            to="/"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Explore Pokémon
          </Link>
        </div>
      )}
      
      {favoritePokemon.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritePokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};