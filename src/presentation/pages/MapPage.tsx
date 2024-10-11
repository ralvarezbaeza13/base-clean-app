import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const MapPage: React.FC = () => {
  // Set the first URL as the default
  const [currentUrl, setCurrentUrl] = useState<string>(
    "https://app.mappedin.com/map/6707ebf0cda55a000ba37320?floor=m_7bb20b220c93cf35"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const navigate = useNavigate();

  const urls = [
    {
      name: "Mappedin Map 1",
      url: "https://app.mappedin.com/map/6707ebf0cda55a000ba37320?floor=m_7bb20b220c93cf35",
    },
    {
      name: "Mappedin Map 2",
      url: "https://another.map.example.com/map2",
    },
    {
      name: "Mappedin Map 3",
      url: "https://another.map.example.com/map3",
    },
  ];

  const handleUrlChange = (url: string) => {
    setCurrentUrl(url);
    setIsModalOpen(false); // Close modal after selecting map
    setLoading(true); // Show loader again on URL change
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      setLoading(false); // Hide the loader after iframe content has loaded
    }, 1000); // Small timeout to ensure rendering completion
  };

  // Listen for the "beforeinstallprompt" event to trigger the PWA install option
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e); // Store the event for triggering later
      setShowInstallPrompt(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install prompt");
        } else {
          console.log("User dismissed the PWA install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt
        setShowInstallPrompt(false); // Hide the install button
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
          {/* Loader Text */}
          <h1 className="text-2xl font-bold mb-4 animate-pulse">Cargando...</h1>

          {/* Animated "The Palace Company" */}
          <h2 className="text-4xl font-bold text-gray-800 animate-palace-animation">
            The Palace Company
          </h2>

          {/* Loader Animation */}
          <div className="mt-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <div className="w-full h-full flex flex-col">
        <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            onClick={() => navigate("/")} // Always go to Home
          >
            Back to Home
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)} // Open modal to select map
          >
            Select Map
          </button>

          {/* Show Install PWA Button if eligible */}
          {showInstallPrompt && (
            <button
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              onClick={handleInstallClick} // Trigger PWA install
            >
              Install App
            </button>
          )}
        </nav>

        {/* WebView or iframe to display the selected map */}
        <div className="flex-grow">
          {currentUrl && (
            <iframe
              src={currentUrl}
              title="Interactive Map"
              className="w-full h-full border-0"
              allowFullScreen
              onLoad={handleIframeLoad} // Trigger loader removal when iframe loads
            />
          )}
        </div>

        {/* Modal for Map Selection */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
            <div className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white rounded-lg shadow-lg w-full sm:w-1/3 max-w-full sm:max-w-md">
              <div className="p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Select a Map
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  {urls.map((url) => (
                    <button
                      key={url.url}
                      className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300 rounded-lg"
                      onClick={() => handleUrlChange(url.url)}
                    >
                      {url.name}
                    </button>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default MapPage;
