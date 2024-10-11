import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa el Router y las Rutas
import "./App.css";
import PokemonPage from "./presentation/pages/PokemonPage";
import MapPage from "./presentation/pages/MapPage"; // Importamos la nueva página del mapa
import "./i18n/config"; // Importa la configuración de i18next

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<PokemonPage />} />{" "}
            {/* Ruta para PokemonPage */}
            <Route path="/map" element={<MapPage />} />{" "}
            {/* Ruta para MapPage */}
          </Routes>
        </main>
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;
