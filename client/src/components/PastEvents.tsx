/**
 * DESIGN: Industrial Athlete - Past Events Component
 * Shows a compact list of events that have already happened
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Dumbbell, 
  Car, 
  Sparkles, 
  Trophy, 
  Coffee,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getPastEvents, getDisplayEvent, type TripEvent } from '@/data/tripData';

const typeIcons = {
  food: Utensils,
  workout: Dumbbell,
  travel: Car,
  wellness: Sparkles,
  competition: Trophy,
  free: Coffee,
  work: Briefcase,
};

export default function PastEvents() {
  const [pastEvents, setPastEvents] = useState<TripEvent[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Update past events every minute
  useEffect(() => {
    const updateEvents = () => {
      const events = getPastEvents().map(e => getDisplayEvent(e));
      setPastEvents(events);
    };
    
    updateEvents();
    const interval = setInterval(updateEvents, 60000);
    return () => clearInterval(interval);
  }, []);
  
  if (pastEvents.length === 0) {
    return null;
  }
  
  const displayedEvents = isExpanded ? pastEvents : pastEvents.slice(-3);
  
  return (
    <div className="chalk-board rounded-sm p-4 sm:p-6">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <h3 className="font-display text-lg tracking-wide text-foreground">
            ERLEDIGT ({pastEvents.length})
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
          <span className="text-xs">{isExpanded ? 'Weniger' : 'Mehr'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>
      
      {/* Events list */}
      <div className="space-y-2">
        {displayedEvents.map((event, index) => {
          const Icon = typeIcons[event.type];
          const time = event.date.toLocaleTimeString('de-CH', {
            hour: '2-digit',
            minute: '2-digit',
          });
          const date = event.date.toLocaleDateString('de-CH', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
          });
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 py-2 px-3 bg-secondary/30 rounded-sm opacity-60 hover:opacity-80 transition-opacity"
            >
              <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
              
              <div className="flex-1 min-w-0">
                <span className="text-sm text-foreground/80 truncate block">
                  {event.title}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground shrink-0">
                {date} {time}
              </div>
              
              <CheckCircle2 className="w-4 h-4 text-emerald-500/50 shrink-0" />
            </motion.div>
          );
        })}
      </div>
      
      {/* Show more hint */}
      {!isExpanded && pastEvents.length > 3 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          + {pastEvents.length - 3} weitere Events
        </p>
      )}
    </div>
  );
}
