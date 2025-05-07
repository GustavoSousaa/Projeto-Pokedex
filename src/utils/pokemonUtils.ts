import { PokemonType } from '../types/pokemon';

export const getTypeColor = (type: PokemonType): string => {
  const typeColors: Record<PokemonType, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  return typeColors[type] || '#777777';
};

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, '0');
};

export const formatHeight = (height: number): string => {
  const heightInMeters = height / 10;
  const heightInFeet = heightInMeters * 3.281;
  const feet = Math.floor(heightInFeet);
  const inches = Math.round((heightInFeet - feet) * 12);
  
  return `${heightInMeters.toFixed(1)}m (${feet}'${inches}")`;
};

export const formatWeight = (weight: number): string => {
  const weightInKg = weight / 10;
  const weightInLbs = weightInKg * 2.205;
  
  return `${weightInKg.toFixed(1)}kg (${weightInLbs.toFixed(1)}lbs)`;
};

export const formatStatName = (statName: string): string => {
  const statNames: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  
  return statNames[statName] || statName;
};

export const getStatColor = (statName: string): string => {
  const statColors: Record<string, string> = {
    'hp': '#FF5959',
    'attack': '#F5AC78',
    'defense': '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    'speed': '#FA92B2'
  };
  
  return statColors[statName] || '#777777';
};

export const getEnglishFlavorText = (flavorTexts: Array<{flavor_text: string, language: {name: string}}>): string => {
  const englishEntry = flavorTexts.find(entry => entry.language.name === 'en');
  return englishEntry ? englishEntry.flavor_text.replace(/\f|\n|\r/g, ' ') : 'No description available.';
};