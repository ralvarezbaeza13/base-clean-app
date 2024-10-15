import React, { useRef } from "react";
import QRCode from "react-qr-code";

const CustomBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const defaultUrl = "https://app.mappedin.com/map/6707ebf0cda55a000ba37320";

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 relative">
      <nav className="bg-blue-900 p-4 text-white flex justify-between items-center z-10">
        <h1 className="text-xl font-semibold">Explora el Mapa</h1>
      </nav>

      <div className="flex-grow relative">
        <iframe
          src={defaultUrl}
          title="Mapa Interactivo"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>

      {/* Bottom Sheet más pequeño con contenido alineado a la izquierda */}
      <div
        ref={bottomSheetRef}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg h-[25%] max-h-[350px] overflow-y-auto"
        style={{ zIndex: 20 }}
      >
        <div className="p-4  items-center">
          <h2 className="text-3xl font-bold text-blue-900 mt-4">
            Lleva el Mapa Contigo 📲
          </h2>
        </div>

        <div className="p-4 flex flex-col items-center space-y-4">
          <p className="text-gray-600">
            Escanea este código QR para abrir el mapa en tu dispositivo.
          </p>
          <QRCode value={defaultUrl} size={180} className="shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default CustomBottomSheet;
