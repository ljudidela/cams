import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Camera } from '../types';
import L from 'leaflet';
import { Video } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom modern icon
const createCustomIcon = (isActive: boolean) => {
  const color = isActive ? '#3b82f6' : '#64748b';
  const html = ReactDOMServer.renderToString(
    <div style={{ 
      backgroundColor: color, 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }}>
      <Video size={16} color="white" />
    </div>
  );

  return L.divIcon({
    html: html,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

interface MapProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera) => void;
}

// Helper to fly to selected camera
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, {
      duration: 1.5
    });
  }, [center, map]);
  return null;
}

export const MapView = ({ cameras, selectedCamera, onSelectCamera }: MapProps) => {
  const center: [number, number] = selectedCamera 
    ? selectedCamera.coordinates 
    : [34.0522, -118.2437];

  return (
    <MapContainer 
      center={center} 
      zoom={11} 
      scrollWheelZoom={true} 
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <MapController center={center} />

      {cameras.map((camera) => (
        <Marker 
          key={camera.id} 
          position={camera.coordinates}
          icon={createCustomIcon(selectedCamera?.id === camera.id)}
          eventHandlers={{
            click: () => onSelectCamera(camera),
          }}
        >
          <Popup className="custom-popup">
            <div className="font-sans text-sm font-semibold">
              {camera.name}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};