export interface Camera {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  thumbnail: string;
  streamUrl: string;
  type: 'youtube' | 'iframe';
}