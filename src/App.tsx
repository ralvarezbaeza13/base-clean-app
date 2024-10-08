import React from "react";
import "./App.css";
import PokemonPage from "./presentation/pages/PokemonPage";
import "./i18n/config"; // Importa la configuración de i18next

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <main className="bg-white shadow-md p-4 rounded-lg">
        <PokemonPage />
      </main>
      <footer className="mt-4 text-center"></footer>
    </div>
  );
};

export default App;
