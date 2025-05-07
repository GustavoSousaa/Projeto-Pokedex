export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
  generation: {
    name: string;
  };
  habitat: {
    name: string;
  } | null;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface EvolutionChain {
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
  };
  item: {
    name: string;
  } | null;
}

export type PokemonType = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' 
  | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' 
  | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' 
  | 'dark' | 'steel' | 'fairy';