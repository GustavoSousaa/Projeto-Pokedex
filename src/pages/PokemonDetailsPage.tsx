import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, TrendingUp, Shield, Zap } from 'lucide-react';
import { usePokemonStore } from '../stores/pokemonStore';
import { api } from '../lib/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { PokemonDetails, PokemonSpecies, EvolutionChain } from '../types/pokemon';
import {
  getTypeColor,
  formatPokemonId,
  formatHeight,
  formatWeight,
  formatStatName,
  getStatColor,
  getEnglishFlavorText
} from '../utils/pokemonUtils';

export const PokemonDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite } = usePokemonStore();
  
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isFavorite = pokemon ? favorites.includes(pokemon.id) : false;
  
  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch Pokemon details
        const pokemonData = await api.getPokemonByNameOrId(id);
        setPokemon(pokemonData);
        
        // Fetch species information
        const speciesData = await api.getPokemonSpecies(id);
        setSpecies(speciesData);
        
        // Fetch evolution chain
        if (speciesData.evolution_chain) {
          const evolutionData = await api.getEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChain(evolutionData);
        }
      } catch (err) {
        console.error('Error fetching Pokemon details:', err);
        setError('Failed to load Pokemon details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPokemonData();
  }, [id]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error || !pokemon) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Pokemon not found'}</h1>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }
  
  // Extract primary type
  const primaryType = pokemon.types[0]?.type.name;
  const bgColor = primaryType ? getTypeColor(primaryType as any) : '#777777';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Pokédex
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Hero section with Pokemon image and basic info */}
        <div 
          className="p-8 relative"
          style={{ background: `linear-gradient(135deg, ${bgColor}60 0%, ${bgColor}20 100%)` }}
        >
          <button
            onClick={() => toggleFavorite(pokemon.id)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={24} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
            />
          </button>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">#{formatPokemonId(pokemon.id)}</p>
              <h1 className="text-3xl md:text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {pokemon.types.map(typeInfo => (
                  <span 
                    key={typeInfo.type.name}
                    className="px-4 py-1 rounded-full text-sm text-white font-medium capitalize"
                    style={{ backgroundColor: getTypeColor(typeInfo.type.name as any) }}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
              
              {species && (
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {getEnglishFlavorText(species.flavor_text_entries)}
                </p>
              )}
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                  <p className="font-medium">{formatHeight(pokemon.height)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <p className="font-medium">{formatWeight(pokemon.weight)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium capitalize">
                    {species?.is_legendary ? 'Legendary' : 
                     species?.is_mythical ? 'Mythical' : 
                     species?.habitat?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Generation</p>
                  <p className="font-medium capitalize">
                    {species?.generation.name.replace('generation-', 'Gen ') || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="p-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Stats
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {formatStatName(stat.stat.name)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full"
                    style={{ 
                      width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                      backgroundColor: getStatColor(stat.stat.name) 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abilities section */}
        <div className="p-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Zap size={20} className="mr-2" />
            Abilities
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pokemon.abilities.map(abilityInfo => (
              <div 
                key={abilityInfo.ability.name}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium capitalize">{abilityInfo.ability.name.replace('-', ' ')}</h3>
                  {abilityInfo.is_hidden && (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 rounded-full">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Evolution chain section */}
        {evolutionChain && (
          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield size={20} className="mr-2" />
              Evolution Chain
            </h2>
            
            <EvolutionChainDisplay chain={evolutionChain.chain} />
          </div>
        )}
      </div>
    </div>
  );
};

interface EvolutionChainDisplayProps {
  chain: EvolutionChain['chain'];
}

const EvolutionChainDisplay: React.FC<EvolutionChainDisplayProps> = ({ chain }) => {
  const renderEvolutionChain = (current: EvolutionChain['chain'], depth = 0) => {
    const speciesId = current.species.url.split('/').filter(Boolean).pop();
    
    return (
      <div key={current.species.name} className="flex flex-col items-center">
        <Link to={`/pokemon/${speciesId}`} className="group">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`}
              alt={current.species.name}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-center capitalize font-medium group-hover:text-blue-500 transition-colors">
            {current.species.name}
          </p>
        </Link>
        
        {current.evolves_to.length > 0 && (
          <div className="my-4 flex flex-col items-center">
            <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 my-1">
              {current.evolves_to[0].evolution_details[0]?.min_level 
                ? `Level ${current.evolves_to[0].evolution_details[0].min_level}` 
                : current.evolves_to[0].evolution_details[0]?.trigger.name === 'use-item' && current.evolves_to[0].evolution_details[0]?.item
                  ? `Use ${current.evolves_to[0].evolution_details[0].item.name.replace('-', ' ')}` 
                  : 'Evolution trigger'}
            </div>
            <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
          </div>
        )}
        
        {current.evolves_to.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {current.evolves_to.map(evolution => renderEvolutionChain(evolution, depth + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex justify-center">
      {renderEvolutionChain(chain)}
    </div>
  );
};