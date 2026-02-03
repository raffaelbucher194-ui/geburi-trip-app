in/**
 * DESIGN: Industrial Athlete - Next Up Component
 * Shows the current/next event prominently
 */

import { motion } from 'framer-motion';
import { getNextEvent } from '@/data/tripEngine';
import { 
  Utensils, 
  Dumbbell, 
  Car, 
  Sparkles, 
  Trophy, 
  Coffee,
  Briefocase,
  MapPin,
  ChevronRight,
  Clock
} from 'lucide-react';
import { getDisplayEvent, isEventRevealed } from '@/data/tripData';

const typeIcons = {
  food: Utensils,
  workout: Dumbbell,
  travel: Car,
  wellness: Sparkles,
  competition: Trophy,
  free: Coffee,
  work: Briefcase,
};

export default function NextUp() {
  const rawEvent = getNextEvent();
  const nextEvent = rawEvent ? getDisplayEvent(rawEvent) : null;
  const revealed = rawEvent ? isEventRevealed(rawEvent) : true;
  
  if (!nextEvent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-500/10 border border-emerald-500/30 rounded-sm p-6 text-center"
      >
        <span className="text-4xl mb-4 block">🎉</span>
        <h3 className="font-display text-2xl text-emerald-500 tracking-wide">
          Trip abgeschlossen!
        </h3>
        <p className="text-muted-foreground mt-2">
          Was für ein Abenteuer!
        </p>
      </motion.div>
    );
  }
  const Icon = typeIcons[nextEvent.type] || Coffee ;
  const eventDate = nextEvent.date;
  const now = new Date(); // For testing purposes
  const diffMs = eventDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  let timeUntil = '';
  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24);
    timeUntil = `in ${days} Tag${days > 1 ? 'en' : ''}`;
  } else if (diffHours > 0) {
    timeUntil = `in ${diffHours}h ${diffMins}min`;
  } else if (diffMins > 0) {
    timeUntil = `in ${diffMins} Minuten`;
  } else {
    timeUntil = 'Jetzt!';
  }
  
  const formattedDate = eventDate.toLocaleDateString('de-CH', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
  
  const formattedTime = eventDate.toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden"
    >
      {/* Background image if available */}
      {nextEvent.image && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${nextEvent.image})` }}
        />
      )}
      
      <div className="relative chalk-board rounded-sm p-5 sm:p-8 glow-red">
        {/* Header */}
        {rawEvent?.isSecret && !revealed && (
          <span className="ml-2 text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-sm">
            🔒 Geheim
          </span>
        )}

        <div className="flex items-center gap-2 mb-4">
          <ChevronRight className="w-5 h-5 text-[#FF3B30] animate-pulse" />
          <span className="text-sm uppercase tracking-[0.3em] text-[#FF3B30] font-medium">
            Next Up
          </span>
        </div>
        
        
        {/* Main content */}
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Icon */}
          <div className="p-3 sm:p-4 bg-[#FF3B30]/20 rounded-sm">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF3B30]" />
          </div>
          
          {/* Details */}
          <div className="flex-1">
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-foreground mb-2">
              {nextEvent.title}
            </h3>
            
            {nextEvent.subtitle && (
              <p className="text-base sm:text-lg text-foreground/70 mb-3">
                {nextEvent.subtitle}
              </p>
            )}
            
            {/* Time info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formattedDate}, {formattedTime}</span>
              </div>
              
              {revealed && rawEvent?.location && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{rawEvent.location}</span>
                </div>
              )}
            </div>
            
            {/* Time until */}
            <div className="mt-4 inline-block bg-[#FF3B30] text-white px-4 py-2 rounded-sm">
              <span className="font-display text-lg tracking-wide">{timeUntil}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
