import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import PokemonPage from './presentation/pages/PokemonPage';
import './i18n/config'; // Importa la configuración de i18next

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <main className="bg-white shadow-md p-4 rounded-lg">
        <PokemonPage />
      </main>
      <footer className="mt-4 text-center">
        <button className="mr-2 p-2 bg-blue-500 text-white rounded" onClick={() => changeLanguage('en')}>English</button>
        <button className="p-2 bg-green-500 text-white rounded" onClick={() => changeLanguage('es')}>Español</button>
      </footer>
    </div>
  );
};

export default App;