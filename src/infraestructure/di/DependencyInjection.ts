import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './Types';
import { PokemonRepositoryImpl } from '../../infraestructure/data/PokemonRepositoryImpl';
import { FetchPokemonUseCase } from '../../usecases/FetchPokemonUseCase';

// Crear el contenedor
const container = new Container();

// Vincular las implementaciones a los tipos
container.bind(TYPES.PokemonRepository).to(PokemonRepositoryImpl);
container.bind(TYPES.FetchPokemonUseCase).toDynamicValue((context) => {
  return new FetchPokemonUseCase(context.container.get(TYPES.PokemonRepository));
});

export { container };