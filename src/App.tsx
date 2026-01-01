import { useState } from 'react';
import { Header } from './components/Header';
import { CameraCard } from './components/CameraCard';
import { MapView } from './components/Map';
import { cameras } from './data/cameras';
import { Camera } from './types';
import { cn } from './utils/cn';
import { X, Maximize2 } from 'lucide-react';

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCameraSelect = (camera: Camera) => {
    setSelectedCamera(camera);
    // On mobile, close sidebar when selecting
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="flex-1 flex relative overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "absolute lg:relative z-20 h-full w-full sm:w-80 lg:w-96 bg-background/95 backdrop-blur border-r border-border transition-all duration-300 ease-in-out transform flex flex-col",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:-ml-96"
          )}
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-lg">Locations</h2>
            <p className="text-xs text-muted-foreground">Select a camera to view live feed</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cameras.map((camera) => (
              <CameraCard 
                key={camera.id} 
                camera={camera} 
                isActive={selectedCamera?.id === camera.id}
                onClick={handleCameraSelect}
              />
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 relative bg-secondary/20">
          {/* Map Layer */}
          <div className="absolute inset-0 z-0">
            <MapView 
              cameras={cameras} 
              selectedCamera={selectedCamera} 
              onSelectCamera={handleCameraSelect} 
            />
          </div>

          {/* Video Overlay */}
          {selectedCamera && (
            <div className="absolute top-4 right-4 left-4 sm:left-auto sm:w-[480px] z-10 animate-in slide-in-from-bottom-10 fade-in duration-300">
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-border/20 ring-1 ring-black/5">
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={selectedCamera.streamUrl}
                    title={selectedCamera.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 bg-card/95 backdrop-blur flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{selectedCamera.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCamera.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedCamera(null)}
                      className="p-2 hover:bg-accent rounded-full transition-colors"
                      title="Close Feed"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;