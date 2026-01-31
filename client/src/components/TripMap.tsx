import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapView } from "@/components/Map";
import { getRevealedLocations, LOCATIONS, LUGANO_REVEAL_TIME } from "@/data/tripData";
import { Eye, Lock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  food: "#F59E0B",
  workout: "#FF3B30",
  travel: "#3B82F6",
  wellness: "#10B981",
  competition: "#FF3B30",
  free: "#A855F7",
  work: "#6B7280",
};

function FitBounds({ locations }: { locations: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!locations.length) return;
    const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations]);

  return null;
}

export default function TripMap() {
  const [revealedLocations, setRevealedLocations] = useState(getRevealedLocations());
  const [isLuganoRevealed, setIsLuganoRevealed] = useState(false);

  const update = () => {
    setRevealedLocations(getRevealedLocations());
    setIsLuganoRevealed(new Date() >= LUGANO_REVEAL_TIME);
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapView>
      <FitBounds locations={revealedLocations} />
      {revealedLocations.map(loc => (
        <Marker key={`${loc.lat}-${loc.lng}`} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapView>
  );
}
