import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Camera } from '../types';
import { divIcon } from 'leaflet';
import { Play } from 'lucide-react';

interface MapViewProps {
  cameras: Camera[];
  onSelect: (camera: Camera) => void;
}

// Custom marker icon using HTML/CSS
const createCustomIcon = () => {
  return divIcon({
    className: 'custom-marker',
    html: `<div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-white dark:ring-slate-900">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1z"/><path d="M4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>
             <span class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary"></span>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 36],
    popupAnchor: [0, -32],
  });
};

export const MapView = ({ cameras, onSelect }: MapViewProps) => {
  const center: [number, number] = [34.0522, -118.2437]; // LA Center

  return (
    <div className="h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <MapContainer center={center} zoom={11} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {cameras.map((camera) => (
          <Marker 
            key={camera.id} 
            position={camera.coordinates} 
            icon={createCustomIcon()}
          >
            <Popup className="custom-popup">
              <div className="w-48">
                <img 
                  src={camera.thumbnail} 
                  alt={camera.name} 
                  className="mb-2 h-24 w-full rounded-md object-cover"
                />
                <h3 className="font-bold">{camera.name}</h3>
                <p className="mb-2 text-xs text-slate-500">{camera.location}</p>
                <button
                  onClick={() => onSelect(camera)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="h-3 w-3" /> Watch Live
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};