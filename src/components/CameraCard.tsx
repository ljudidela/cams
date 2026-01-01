import { Play, MapPin } from 'lucide-react';
import { Camera } from '../types';
import { motion } from 'framer-motion';

interface CameraCardProps {
  camera: Camera;
  onSelect: (camera: Camera) => void;
}

export const CameraCard = ({ camera, onSelect }: CameraCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={camera.thumbnail} 
          alt={camera.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
          <button 
            onClick={() => onSelect(camera)}
            className="rounded-full bg-primary/90 p-4 text-primary-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Play className="h-8 w-8 fill-current pl-1" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          LIVE
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold leading-none tracking-tight">{camera.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{camera.location}</span>
        </div>
      </div>
    </motion.div>
  );
};