import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PokemonDetails, PokemonType } from '../../types/pokemon';
import { usePokemonStore } from '../../stores/pokemonStore';
import { getTypeColor, formatPokemonId } from '../../utils/pokemonUtils';

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { favorites, toggleFavorite } = usePokemonStore();
  const isFavorite = favorites.includes(pokemon.id);
  
  const primaryType = pokemon.types[0]?.type.name as PokemonType;
  const bgColor = getTypeColor(primaryType);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };
  
  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <div 
        className="relative rounded-lg overflow-hidden shadow-lg h-full"
        style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, white 100%)` }}
      >
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>
        
        <div className="p-4 flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          
          <div className="mt-2 w-full text-center">
            <p className="text-gray-500 font-medium">#{formatPokemonId(pokemon.id)}</p>
            <h2 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h2>
            
            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types.map(typeInfo => (
                <span 
                  key={typeInfo.type.name}
                  className="px-3 py-1 rounded-full text-xs text-white font-medium capitalize"
                  style={{ backgroundColor: getTypeColor(typeInfo.type.name as PokemonType) }}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};