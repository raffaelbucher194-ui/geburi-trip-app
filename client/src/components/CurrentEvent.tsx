/**
 * DESIGN: Industrial Athlete - Current Event Component
 * Shows ONLY the current/next event - everything else is hidden
 * Automatically updates when the event time passes
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Dumbbell, 
  Car, 
  Sparkles, 
  Trophy, 
  Coffee,
  Briefcase,
  MapPin,
  Clock,
  Lock,
  Unlock,
  ChevronRight,
  Phone,
  Globe,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { getCurrentEvent, getDisplayEvent, isEventRevealed, type TripEvent } from '@/data/tripData';
import confetti from 'canvas-confetti';

const typeIcons = {
  food: Utensils,
  workout: Dumbbell,
  travel: Car,
  wellness: Sparkles,
  competition: Trophy,
  free: Coffee,
  work: Briefcase,
};

const typeColors = {
  food: 'text-amber-500',
  workout: 'text-[#FF3B30]',
  travel: 'text-blue-400',
  wellness: 'text-emerald-400',
  competition: 'text-[#FF3B30]',
  free: 'text-purple-400',
  work: 'text-gray-400',
};

const statusConfig = {
  confirmed: { icon: CheckCircle2, color: 'text-emerald-500', label: 'Bestätigt' },
  pending: { icon: AlertCircle, color: 'text-amber-500', label: 'Noch offen' },
  flexible: { icon: Clock, color: 'text-blue-400', label: 'Flexibel' },
};

interface TimeUntil {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isNow: boolean;
}

function calculateTimeUntil(date: Date): TimeUntil {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  // Consider "now" if within 5 minutes before or 2 hours after start
  const isNow = diff <= 5 * 60 * 1000 && diff > -2 * 60 * 60 * 1000;
  const isPast = diff <= -2 * 60 * 60 * 1000;
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast, isNow };
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
    isNow,
  };
}

function formatTimeUntil(time: TimeUntil): string {
  if (time.isNow) return 'JETZT!';
  if (time.isPast) return 'Abgeschlossen';
  
  if (time.days > 0) {
    return `in ${time.days} Tag${time.days > 1 ? 'en' : ''} ${time.hours}h`;
  }
  if (time.hours > 0) {
    return `in ${time.hours}h ${time.minutes}min`;
  }
  if (time.minutes > 0) {
    return `in ${time.minutes}min ${time.seconds}s`;
  }
  return `in ${time.seconds}s`;
}

export default function CurrentEvent() {
  const [currentEvent, setCurrentEvent] = useState<TripEvent | null>(getCurrentEvent());
  const [displayEvent, setDisplayEvent] = useState<TripEvent | null>(null);
  const [timeUntil, setTimeUntil] = useState<TimeUntil | null>(null);
  const [justRevealed, setJustRevealed] = useState(false);
  const [prevEventId, setPrevEventId] = useState<string | null>(null);
  
  // Update current event and time every second
  useEffect(() => {
    const updateState = () => {
      const event = getCurrentEvent();
      setCurrentEvent(event);
      
      if (event) {
        const display = getDisplayEvent(event);
        setDisplayEvent(display);
        setTimeUntil(calculateTimeUntil(event.date));
        
        // Check if event just changed (new event revealed)
        if (prevEventId && prevEventId !== event.id) {
          setJustRevealed(true);
          // Trigger confetti for new event
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF3B30', '#FFFFFF', '#333333'],
          });
          setTimeout(() => setJustRevealed(false), 3000);
        }
        setPrevEventId(event.id);
      }
    };
    
    updateState();
    const interval = setInterval(updateState, 1000);
    return () => clearInterval(interval);
  }, [prevEventId]);
  
  if (!currentEvent || !displayEvent || !timeUntil) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="chalk-board rounded-sm p-8 sm:p-12 text-center"
      >
        <span className="text-6xl mb-6 block">🏁</span>
        <h2 className="font-display text-3xl sm:text-4xl text-emerald-500 tracking-wide mb-4">
          TRIP COMPLETE!
        </h2>
        <p className="text-muted-foreground text-lg">
          Was für ein Abenteuer das war!
        </p>
      </motion.div>
    );
  }
  
  const Icon = typeIcons[currentEvent.type];
  const iconColor = typeColors[currentEvent.type];
  const status = statusConfig[currentEvent.status];
  const StatusIcon = status.icon;
  const isRevealed = isEventRevealed(currentEvent);
  
  const formattedDate = currentEvent.date.toLocaleDateString('de-CH', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  
  const formattedTime = currentEvent.date.toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentEvent.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        {/* Just revealed banner */}
        {justRevealed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF3B30] text-white px-6 py-2 rounded-sm z-20"
          >
            <span className="font-display tracking-wider">NEUES EVENT!</span>
          </motion.div>
        )}
        
        {/* Background image */}
        {displayEvent.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-sm overflow-hidden"
            style={{ backgroundImage: `url(${displayEvent.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
          </div>
        )}
        
        <div className={`
          relative chalk-board rounded-sm p-6 sm:p-10 overflow-hidden
          ${timeUntil.isNow ? 'ring-2 ring-[#FF3B30] glow-red' : ''}
        `}>
          {/* Secret/Revealed indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {currentEvent.isSecret && (
              <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm ${
                isRevealed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {isRevealed ? (
                  <>
                    <Unlock className="w-3 h-3" />
                    <span>Enthüllt</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" />
                    <span>Geheim</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <ChevronRight className="w-5 h-5 text-[#FF3B30] animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-[#FF3B30] font-medium">
              {timeUntil.isNow ? 'Jetzt' : 'Als Nächstes'}
            </span>
          </div>
          
          {/* Main content */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Icon */}
            <motion.div 
              className={`p-4 sm:p-5 rounded-sm ${timeUntil.isNow ? 'bg-[#FF3B30]' : 'bg-secondary'}`}
              animate={timeUntil.isNow ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Icon className={`w-10 h-10 sm:w-14 sm:h-14 ${timeUntil.isNow ? 'text-white' : iconColor}`} />
            </motion.div>
            
            {/* Details */}
            <div className="flex-1">
              {/* Title */}
              <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-foreground mb-2">
                {displayEvent.title}
              </h2>
              
              {/* Subtitle */}
              {displayEvent.subtitle && (
                <p className="text-lg sm:text-xl text-foreground/70 mb-4">
                  {displayEvent.subtitle}
                </p>
              )}
              
              {/* Description */}
              {displayEvent.description && (
                <p className="text-base text-foreground/60 mb-4">
                  {displayEvent.description}
                </p>
              )}
              
              {/* Date & Time */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formattedDate}, {formattedTime}</span>
                </div>
                
                {displayEvent.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{displayEvent.location}</span>
                  </div>
                )}
                
                <div className={`flex items-center gap-1 ${status.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span>{status.label}</span>
                </div>
              </div>
              
              {/* Time until */}
              <motion.div 
                className={`inline-block px-6 py-3 rounded-sm ${
                  timeUntil.isNow 
                    ? 'bg-[#FF3B30] text-white' 
                    : 'bg-secondary text-foreground'
                }`}
                animate={timeUntil.isNow ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <span className="font-display text-2xl sm:text-3xl tracking-wide">
                  {formatTimeUntil(timeUntil)}
                </span>
              </motion.div>
              
              {/* Details section */}
              {displayEvent.details && (
                <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                  {displayEvent.details.address && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{displayEvent.details.address}</span>
                    </div>
                  )}
                  {displayEvent.details.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${displayEvent.details.phone}`} className="hover:text-[#FF3B30] transition-colors">
                        {displayEvent.details.phone}
                      </a>
                    </div>
                  )}
                  {displayEvent.details.website && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <a 
                        href={displayEvent.details.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[#FF3B30] transition-colors"
                      >
                        Website öffnen
                      </a>
                    </div>
                  )}
                  {displayEvent.details.price && (
                    <div className="text-sm text-emerald-400 font-medium">
                      {displayEvent.details.price}
                    </div>
                  )}
                  {displayEvent.details.notes && (
                    <div className="text-sm text-amber-400 bg-amber-500/10 px-3 py-2 rounded-sm mt-3">
                      ⚠️ {displayEvent.details.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
