import { X, MapPin, Wifi } from 'lucide-react';
import { Camera } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraModalProps {
  camera: Camera | null;
  onClose: () => void;
}

export const CameraModal = ({ camera, onClose }: CameraModalProps) => {
  if (!camera) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-none">{camera.name}</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {camera.location}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="aspect-video w-full bg-black relative">
            <iframe
              src={camera.streamUrl}
              title={camera.name}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-card p-4 flex justify-between items-center text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
               <Wifi className="h-4 w-4 text-green-500" />
               <span>Signal Strong</span>
             </div>
             <div>
               Source: Public Stream
             </div>
          </div>
        </motion.div>
        
        <div 
          className="absolute inset-0 -z-10" 
          onClick={onClose}
        />
      </div>
    </AnimatePresence>
  );
};