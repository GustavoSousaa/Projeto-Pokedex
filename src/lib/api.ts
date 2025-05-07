import axios from 'axios';
import { 
  PokemonListResponse, 
  PokemonDetails, 
  PokemonSpecies, 
  EvolutionChain 
} from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const api = {
  async getPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  async getPokemonByNameOrId(nameOrId: string | number): Promise<PokemonDetails> {
    try {
      const response = await axios.get<PokemonDetails>(
        `${API_URL}/pokemon/${nameOrId.toString().toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    try {
      const response = await axios.get<PokemonSpecies>(
        `${API_URL}/pokemon-species/${nameOrId.toString().toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon species ${nameOrId}:`, error);
      throw error;
    }
  },

  async getEvolutionChain(url: string): Promise<EvolutionChain> {
    try {
      const response = await axios.get<EvolutionChain>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
      throw error;
    }
  },

  async searchPokemon(query: string): Promise<PokemonDetails[]> {
    try {
      // Get a list of all pokemon to search through
      const allPokemon = await this.getPokemonList(0, 1000);
      const filteredPokemon = allPokemon.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const detailsPromises = filteredPokemon.slice(0, 10).map(pokemon => 
        this.getPokemonByNameOrId(pokemon.name)
      );
      
      return await Promise.all(detailsPromises);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      throw error;
    }
  }
};