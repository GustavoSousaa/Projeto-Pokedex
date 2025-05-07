import React from 'react';
import { PokemonType } from '../../types/pokemon';
import { usePokemonStore } from '../../stores/pokemonStore';
import { getTypeColor } from '../../utils/pokemonUtils';

const ALL_TYPES: PokemonType[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 
  'ice', 'fighting', 'poison', 'ground', 'flying', 
  'psychic', 'bug', 'rock', 'ghost', 'dragon', 
  'dark', 'steel', 'fairy'
];

export const TypeFilter: React.FC = () => {
  const { selectedType, filterByType } = usePokemonStore();
  
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByType(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedType === null 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          All
        </button>
        
        {ALL_TYPES.map(type => (
          <button
            key={type}
            onClick={() => filterByType(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium text-white capitalize transition-colors`}
            style={{ 
              backgroundColor: selectedType === type 
                ? getTypeColor(type) 
                : `${getTypeColor(type)}80` // Add transparency
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};