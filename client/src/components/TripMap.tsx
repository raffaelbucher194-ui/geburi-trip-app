import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapView } from "@/components/Map";
import { getRevealedLocations, getAllEvents, isEventRevealed, LUGANO_REVEAL_TIME } from "@/data/tripData";
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

  // Get current event and unrevealed secret events
  const currentEvent = ((): any => {
    try {
      const { getCurrentEvent } = require('@/data/tripEngine');
      return getCurrentEvent();
    } catch (e) {
      return null;
    }
  })();

  const allEvents = getAllEvents();
  const unrevealedSecrets = allEvents
    .filter(e => e.coordinates && e.isSecret && !isEventRevealed(e))
    // dedupe by coords
    .reduce((acc: any[], e) => {
      const key = `${e.coordinates!.lat}-${e.coordinates!.lng}`;
      if (!acc.some(a => `${a.coordinates.lat}-${a.coordinates.lng}` === key)) acc.push(e);
      return acc;
    }, []);

  // Build locations array for FitBounds (include current + secrets)
  const fitLocations = [
    ...revealedLocations.map(l => ({ lat: l.lat, lng: l.lng })),
    ...(currentEvent && currentEvent.coordinates ? [{ lat: currentEvent.coordinates.lat, lng: currentEvent.coordinates.lng }] : []),
    ...unrevealedSecrets.map(s => ({ lat: s.coordinates!.lat, lng: s.coordinates!.lng })),
  ];

  // Aggregate events by coordinate for pin rendering
  const mapByCoord: Record<string, any> = {};
  for (const e of getAllEvents()) {
    if (!e.coordinates) continue;
    const key = `${e.coordinates.lat}-${e.coordinates.lng}`;
    if (!mapByCoord[key]) {
      mapByCoord[key] = {
        lat: e.coordinates.lat,
        lng: e.coordinates.lng,
        name: e.location || e.title,
        types: new Set([e.type]),
        events: [e],
      };
    } else {
      mapByCoord[key].types.add(e.type);
      mapByCoord[key].events.push(e);
    }
  }

  const totalPins = Object.keys(mapByCoord).length;
  const now = ((): Date => {
    try {
      const { getNow } = require('@/data/tripData');
      return getNow();
    } catch (e) {
      return new Date();
    }
  })();

  // pin SVG generator (backwards-compatible name)
  const makePinIcon = (color: string, size = 28, innerText?: string) => {
    const height = Math.round(size * 1.6);
    const anchorY = height - Math.round(size * 0.15);
    const inner = innerText ? `<text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.round(size/2.2)}" fill="#fff" font-family="sans-serif">${innerText}</text>` : '';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${height}" viewBox="0 0 ${size} ${height}">
        <g transform="translate(0,0)">
          <path d="M ${size/2} ${Math.round(size*0.12)} C ${size*0.18} ${Math.round(size*0.2)} ${size*0.18} ${Math.round(size*0.6)} ${size/2} ${Math.round(size*0.9)} C ${size*0.82} ${Math.round(size*0.6)} ${size*0.82} ${Math.round(size*0.2)} ${size/2} ${Math.round(size*0.12)} Z" fill="${color}" stroke="#fff" stroke-width="1" />
          <circle cx="${size/2}" cy="${Math.round(size*0.28)}" r="${Math.round(size*0.18)}" fill="${color}" />
          ${inner}
          <path d="M ${Math.round(size*0.42)} ${Math.round(size*0.95)} L ${size/2} ${height} L ${Math.round(size*0.58)} ${Math.round(size*0.95)} Z" fill="${color}" />
        </g>
      </svg>
    `;

    try {
      return L.divIcon({
        className: 'custom-pin',
        html: svg,
        iconSize: [size, height],
        iconAnchor: [Math.round(size/2), anchorY],
      });
    } catch (err) {
      console.error('Failed to create pin icon', err);
      // fallback to a simple default marker
      return L.divIcon({ className: 'default-pin' });
    }
  };

  // keep legacy name for compatibility
  const makeNeedleIcon = makePinIcon;

  // small div icons for question mark and current
  const questionIcon = L.divIcon({
    className: 'custom-question-icon',
    html: `<div style="background:#F59E0B;color:#fff;width:28px;height:28px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:700">?</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

  const currentIcon = L.divIcon({
    className: 'custom-current-icon',
    html: `<div style="background:#FF3B30;color:#fff;width:28px;height:28px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:700">•</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

  return (
    <div className="relative h-[60vh] sm:h-[72vh] rounded-sm overflow-hidden">
      {/* Debug overlay so we can see counts without opening console */}
      <div className="absolute top-3 right-3 z-50 bg-white/90 text-xs text-muted-foreground p-2 rounded-sm shadow-sm">
        <div>Revealed: {revealedLocations.length}</div>
        <div>Secrets: {unrevealedSecrets.length}</div>
        <div>Pins total: {totalPins}</div>
        <div>Current: {currentEvent ? currentEvent.title : '—'}</div>
      </div>

      <MapView>
        <FitBounds locations={fitLocations} />

        {/* All aggregated pins (one per unique coordinate) */}
        {Object.values(mapByCoord).map((loc: any, idx: number) => {
          // only show if any event at this coord is current or in the past
          const hasPastOrCurrent = loc.events.some((ev: any) => {
            const isPastOrNow = ev.date.getTime() <= now.getTime();
            const isCurrentHere = currentEvent && currentEvent.coordinates && currentEvent.coordinates.lat === ev.coordinates.lat && currentEvent.coordinates.lng === ev.coordinates.lng;
            return isPastOrNow || isCurrentHere;
          });

          if (!hasPastOrCurrent) return null; // skip future-only coords

          const isCurrent = loc.events.some((ev: any) => {
            return currentEvent && currentEvent.coordinates && currentEvent.coordinates.lat === ev.coordinates.lat && currentEvent.coordinates.lng === ev.coordinates.lng;
          });

          const secretEvent = loc.events.find((ev: any) => ev.isSecret && !isEventRevealed(ev));
          const isSecretUnrevealed = !!secretEvent;

          // Past pins share one neutral color
          const pastColor = '#374151'; // gray-700
          const pastNeedle = makeNeedleIcon(pastColor, 26);
          const currentNeedle = makeNeedleIcon('#FF3B30', 40, isSecretUnrevealed ? '?' : undefined);
          const secretNeedle = makeNeedleIcon('#F59E0B', 30, '?');

          const icon = isCurrent ? currentNeedle : (isSecretUnrevealed ? secretNeedle : pastNeedle);

          return (
            <Marker
              key={`pin-${idx}-${loc.lat}-${loc.lng}`}
              position={[loc.lat, loc.lng]}
              icon={icon}
              opacity={isSecretUnrevealed ? 0.9 : 1}
              zIndexOffset={isCurrent ? 1000 : 0}
            >
              <Popup>
                <div className="space-y-1">
                  <strong>{isSecretUnrevealed ? 'Geheim' : loc.name}</strong>
                  <div className="text-xs text-muted-foreground">
                    {isSecretUnrevealed ? `Wird enthüllt am: ${new Date(secretEvent.revealAt || secretEvent.date).toLocaleString('de-CH')}` : `${Array.from(loc.types).join(', ')}`}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapView>
    </div>
  );
}
