export interface Camera {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  thumbnail: string;
  streamUrl: string;
  type: 'youtube' | 'iframe';
}