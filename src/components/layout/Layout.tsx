import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { usePokemonStore } from '../../stores/pokemonStore';

export const Layout: React.FC = () => {
  const { darkMode } = usePokemonStore();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};