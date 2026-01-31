import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect } from "react";

interface MapViewProps {
  onMapReady?: (map: any) => void;
}

export function MapView({ onMapReady }: MapViewProps) {
  return (
    <MapContainer
      center={[46.8, 8.2]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      whenReady={(e) => onMapReady?.(e.target)}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
