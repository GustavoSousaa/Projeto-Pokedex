import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';
import { PokemonDetails, PokemonType } from '../types/pokemon';

interface PokemonState {
  pokemonList: PokemonDetails[];
  filteredPokemon: PokemonDetails[];
  favorites: number[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedType: PokemonType | null;
  searchQuery: string;
  darkMode: boolean;
  
  // Actions
  fetchPokemonList: (page?: number) => Promise<void>;
  fetchPokemonDetails: (nameOrId: string | number) => Promise<PokemonDetails>;
  toggleFavorite: (id: number) => void;
  filterByType: (type: PokemonType | null) => void;
  searchPokemon: (query: string) => Promise<void>;
  toggleDarkMode: () => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set, get) => ({
      pokemonList: [],
      filteredPokemon: [],
      favorites: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 0,
      selectedType: null,
      searchQuery: '',
      darkMode: false,

      fetchPokemonList: async (page = 1) => {
        try {
          set({ isLoading: true, error: null });
          const offset = (page - 1) * 20;
          const response = await api.getPokemonList(offset, 20);
          
          const pokemonDetailsPromises = response.results.map(pokemon => 
            api.getPokemonByNameOrId(pokemon.name)
          );
          
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          
          set({
            pokemonList: pokemonDetails,
            filteredPokemon: pokemonDetails,
            currentPage: page,
            totalPages: Math.ceil(response.count / 20),
            isLoading: false
          });
        } catch (error) {
          set({ error: 'Failed to fetch Pokemon list', isLoading: false });
          console.error('Error in fetchPokemonList:', error);
        }
      },

      fetchPokemonDetails: async (nameOrId) => {
        try {
          return await api.getPokemonByNameOrId(nameOrId);
        } catch (error) {
          set({ error: `Failed to fetch details for Pokemon ${nameOrId}` });
          console.error('Error in fetchPokemonDetails:', error);
          throw error;
        }
      },

      toggleFavorite: (id) => {
        set(state => {
          const isFavorite = state.favorites.includes(id);
          return {
            favorites: isFavorite
              ? state.favorites.filter(favId => favId !== id)
              : [...state.favorites, id]
          };
        });
      },

      filterByType: (type) => {
        set(state => {
          if (!type) {
            return { 
              filteredPokemon: state.pokemonList,
              selectedType: null 
            };
          }
          
          const filtered = state.pokemonList.filter(pokemon =>
            pokemon.types.some(t => t.type.name === type)
          );
          
          return {
            filteredPokemon: filtered,
            selectedType: type
          };
        });
      },

      searchPokemon: async (query) => {
        try {
          set({ isLoading: true, searchQuery: query, error: null });
          
          if (!query.trim()) {
            // Reset to original list if query is empty
            return set(state => ({ 
              filteredPokemon: state.pokemonList,
              isLoading: false 
            }));
          }
          
          const results = await api.searchPokemon(query);
          set({ filteredPokemon: results, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to search Pokemon', isLoading: false });
          console.error('Error in searchPokemon:', error);
        }
      },

      toggleDarkMode: () => {
        set(state => ({ darkMode: !state.darkMode }));
      }
    }),
    {
      name: 'pokemon-storage',
      partialize: (state) => ({ 
        favorites: state.favorites,
        darkMode: state.darkMode 
      }),
    }
  )
);