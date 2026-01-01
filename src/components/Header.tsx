import { Video, Map, List } from 'lucide-react';
import { clsx } from 'clsx';

interface HeaderProps {
  viewMode: 'list' | 'map';
  setViewMode: (mode: 'list' | 'map') => void;
}

export const Header = ({ viewMode, setViewMode }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <Video className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">LA Cams</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Live surveillance network</p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setViewMode('list')}
            className={clsx(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
              viewMode === 'list' 
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={clsx(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
              viewMode === 'map'
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Map View</span>
          </button>
        </div>
      </div>
    </header>
  );
};