/**
 * DESIGN: Industrial Athlete - Trip Map Component
 * Interactive map that reveals locations as the trip progresses
 * Locations are only shown after the event has started
 */

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapView } from '@/components/Map';
import { getRevealedLocations, LOCATIONS, LUGANO_REVEAL_TIME } from '@/data/tripData';
import { MapPin, Lock, Eye } from 'lucide-react';

const typeColors: Record<string, string> = {
  food: '#F59E0B',
  workout: '#FF3B30',
  travel: '#3B82F6',
  wellness: '#10B981',
  competition: '#FF3B30',
  free: '#A855F7',
  work: '#6B7280',
};

export default function TripMap() {
  const [revealedLocations, setRevealedLocations] = useState(getRevealedLocations());
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isLuganoRevealed, setIsLuganoRevealed] = useState(false);
  
  // Update revealed locations every minute
  useEffect(() => {
    const updateLocations = () => {
      setRevealedLocations(getRevealedLocations());
      setIsLuganoRevealed(new Date() >= LUGANO_REVEAL_TIME);
    };
    
    updateLocations();
    const interval = setInterval(updateLocations, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Initialize map markers when map is ready
  const handleMapReady = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Set initial view to Switzerland
    mapInstance.setCenter({ lat: 46.8, lng: 8.2 });
    mapInstance.setZoom(7);
    
    // Style the map for dark mode
    mapInstance.setOptions({
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
    });
  }, []);
  
  // Update markers when revealed locations change
  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers for revealed locations
    const newMarkers = revealedLocations.map((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: typeColors[location.type] || '#FF3B30',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
        animation: google.maps.Animation.DROP,
      });
      
      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="background: #1a1a1a; color: #fff; padding: 8px 12px; border-radius: 4px; font-family: 'Space Grotesk', sans-serif;">
            <strong style="font-size: 14px;">${location.name}</strong>
          </div>
        `,
      });
      
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        const pos = marker.getPosition();
        if (pos) bounds.extend(pos);
      });
      map.fitBounds(bounds, 50);
    }
  }, [map, revealedLocations]);
  
  // Count hidden vs revealed locations
  const totalLocations = Object.keys(LOCATIONS).length;
  const hiddenCount = totalLocations - revealedLocations.length;
  
  return (
    <div className="relative">
      {/* Map container */}
      <div className="h-[300px] sm:h-[400px] rounded-sm overflow-hidden border-2 border-border">
        <MapView onMapReady={handleMapReady} />
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Revealed count */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <Eye className="w-4 h-4" />
            <span>{revealedLocations.length} Orte enthüllt</span>
          </div>
          
          {hiddenCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>{hiddenCount} noch geheim</span>
            </div>
          )}
        </div>
        
        {/* Secret hint */}
        {!isLuganoRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-sm"
          >
            <Lock className="w-3 h-3" />
            <span>Geheime Destination wartet...</span>
          </motion.div>
        )}
      </div>
      
      {/* Location list */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {revealedLocations.map((location, index) => (
          <motion.div
            key={`${location.lat}-${location.lng}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-2 rounded-sm"
          >
            <MapPin 
              className="w-3 h-3 shrink-0" 
              style={{ color: typeColors[location.type] || '#FF3B30' }}
            />
            <span className="truncate">{location.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
