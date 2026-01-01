import { Camera, MapPin, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 flex items-center justify-between z-50 sticky top-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-accent rounded-md lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-primary">
          <Camera className="w-6 h-6" />
          <h1 className="font-bold text-xl tracking-tight">LA<span className="text-foreground">View</span></h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="hidden sm:flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>Los Angeles, CA</span>
        </div>
        <div className="h-4 w-[1px] bg-border hidden sm:block"></div>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">LIVE</span>
      </div>
    </header>
  );
};