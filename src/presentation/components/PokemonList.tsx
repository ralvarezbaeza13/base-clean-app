import React from 'react';
import { Pokemon } from '../../domain/entities/Pokemon';

interface PokemonListProps {
  pokemon: Pokemon[];
  onPokemonClick: (name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemon, onPokemonClick }) => {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {pokemon.map((poke) => (
        <li
          key={poke.name}
          className="text-lg bg-gray-200 p-2 rounded cursor-pointer"
          onClick={() => onPokemonClick(poke.name)}
        > 
          {poke.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;