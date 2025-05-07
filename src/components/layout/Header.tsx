import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Heart } from 'lucide-react';
import { usePokemonStore } from '../../stores/pokemonStore';
import { SearchBar } from '../ui/SearchBar';
import pokeballIcon from '../../assets/pokeball.svg';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = usePokemonStore();
  
  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={pokeballIcon} alt="Pokédex" className="w-8 h-8 animate-spin-slow" />
            <Link to="/" className="text-2xl font-bold tracking-tight">Pokédex</Link>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-md">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="flex items-center gap-1 hover:text-red-200 transition-colors">
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-red-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};