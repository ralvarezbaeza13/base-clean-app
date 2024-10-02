import React, { useState } from 'react';
import { useFetchPokemon } from '../hooks/useFetchPokemon';
import PokemonList from '../components/PokemonList';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { useTranslation } from 'react-i18next';

const PokemonPage: React.FC = () => {
  const { data, loading, error } = useFetchPokemon();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('pokemonList')}</h1>
      <Loading isOpen={loading} />
      {error && <p className="text-center text-red-500">{t('error')}: {error}</p>}
      {data && <PokemonList pokemon={data} onPokemonClick={handlePokemonClick} />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pokemon Details">
        <p>{selectedPokemon}</p>
      </Modal>
    </div>
  );
};

export default PokemonPage;