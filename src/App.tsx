import { useState } from 'react';
import { Header } from './components/Header';
import { CameraList } from './components/CameraList';
import { MapView } from './components/MapView';
import { CameraModal } from './components/CameraModal';
import { cameras } from './data/cameras';
import { Camera } from './types';
import { motion } from 'framer-motion';

// Inline CameraList component for simplicity in this file structure, 
// or could be separate. Let's keep it clean.
const CameraGrid = ({ cameras, onSelect }: { cameras: Camera[], onSelect: (c: Camera) => void }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {cameras.map((camera) => (
      <import('./components/CameraCard').then(m => m.CameraCard) 
        // Dynamic import logic isn't needed here, just standard import. 
        // Fixing this in the actual render below.
      />
    ))}
  </div>
);

// Re-importing properly
import { CameraCard } from './components/CameraCard';

function App() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      
      <main className="container mx-auto p-4 md:p-6">
        {viewMode === 'list' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Available Cameras</h2>
              <span className="text-sm text-muted-foreground">{cameras.length} Active Streams</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cameras.map((camera) => (
                <CameraCard 
                  key={camera.id} 
                  camera={camera} 
                  onSelect={setSelectedCamera} 
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MapView cameras={cameras} onSelect={setSelectedCamera} />
          </motion.div>
        )}
      </main>

      {selectedCamera && (
        <CameraModal 
          camera={selectedCamera} 
          onClose={() => setSelectedCamera(null)} 
        />
      )}
    </div>
  );
}

export default App;