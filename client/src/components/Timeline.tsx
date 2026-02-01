/**
 * DESIGN: Industrial Athlete - Timeline Component
 * Vertical timeline like a barbell with weight plates as events
 * Handles current + next event highlighting and secret events
 */

import { motion } from 'framer-motion';
import { tripDays, getCurrentEvent, getNextEvent, getDisplayEvent } from '@/data/tripData';
import EventCard from './EventCard';
import { Calendar, PartyPopper } from 'lucide-react';

export default function Timeline() {
  const currentEvent = getCurrentEvent();
  const nextEvent = getNextEvent();

  return (
    <div className="relative">
      {/* Vertical line (barbell bar) */}
      <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF3B30] via-border to-border rounded-full" />

      <div className="space-y-8 sm:space-y-12">
        {tripDays.map((day, dayIndex) => (
          <motion.div
            key={day.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.15 }}
            className="relative"
          >
            {/* Day header (weight plate) */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                  ${day.isHighlight ? 'bg-[#FF3B30] glow-red' : 'bg-secondary border-2 border-border'}`}
              >
                {day.isHighlight ? (
                  <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                )}
              </div>

              {/* Day label */}
              <div>
                <h2
                  className={`font-display text-lg sm:text-2xl tracking-wide ${
                    day.isHighlight ? 'text-[#FF3B30]' : 'text-foreground'
                  }`}
                >
                  {day.label}
                </h2>
                {day.isHighlight && (
                  <span className="text-xs sm:text-sm text-[#FF3B30]/80 uppercase tracking-wider">
                    🎂 Geburtstag!
                  </span>
                )}
              </div>
            </div>

            {/* Events */}
            <div className="ml-10 sm:ml-16 space-y-3 sm:space-y-4">
              {day.events.map((event, eventIndex) => {
                const displayEvent = getDisplayEvent(event); // hides secrets if needed
                const isNext = displayEvent === nextEvent && displayEvent !== currentEvent;
                const isCurrent = displayEvent === currentEvent;

                return (
                  <EventCard
                    key={event.id}
                    event={displayEvent}
                    index={eventIndex}
                    isNext={isNext}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* End marker */}
      <div className="flex items-center gap-4 mt-8 sm:mt-12">
        <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-lg sm:text-xl">🏁</span>
        </div>
        <span className="font-display text-lg sm:text-xl text-emerald-500 tracking-wide">
          MISSION COMPLETE
        </span>
      </div>
    </div>
  );
}
