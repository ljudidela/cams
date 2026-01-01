import { Camera } from '../types';
import { Play, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

interface CameraCardProps {
  camera: Camera;
  isActive: boolean;
  onClick: (camera: Camera) => void;
}

export const CameraCard = ({ camera, isActive, onClick }: CameraCardProps) => {
  return (
    <div 
      onClick={() => onClick(camera)}
      className={cn(
        "group cursor-pointer rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50",
        isActive ? "ring-2 ring-primary border-transparent bg-accent" : "bg-card"
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={camera.thumbnail} 
          alt={camera.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-background/90 p-3 rounded-full text-primary shadow-xl">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
        {isActive && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
             <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">
               WATCHING
             </div>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{camera.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{camera.location}</span>
        </div>
      </div>
    </div>
  );
};