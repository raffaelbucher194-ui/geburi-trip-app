/**
 * DESIGN: Industrial Athlete - Multi-Phase Countdown Component
 * Big gym-clock style countdowns for all competition events
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATE } from '@/data/tripData';

// Event dates (can be imported from your data file)
export const COMPETITION_START_DATE = new Date('2026-02-06T14:00:00');
export const COMPETITION_WOD1_DATE = new Date('2026-02-06T17:21:00'); 
export const COMPETITION_WOD2_DATE = new Date('2026-02-07T12:07:00');
export const COMPETITION_WOD3_DATE = new Date('2026-02-07T16:05:00');
export const COMPETITION_WOD4_DATE = new Date('2026-02-08T09:34:00');
export const COMPETITION_FINAL_DATE = new Date('2026-02-08T14:54:00');
export const BIRTHDAY_DATE_27 = new Date('2027-02-04T00:00:00');

interface CountdownEvent {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  isActive: boolean;
  nextEvent?: string;
  color: string;
  emoji: string;
}

const EVENTS: CountdownEvent[] = [
  {
    id: 'birthday',
    name: 'Geburtstag',
    description: 'Countdown zum 29. Geburtstag',
    targetDate: BIRTHDAY_DATE,
    isActive: true,
    nextEvent: 'competition_start',
    color: '#FF3B30',
    emoji: '🎂'
  },
  {
    id: 'competition_start',
    name: 'Wettkampfstart',
    description: 'Countdown zum Wettkampfbeginn',
    targetDate: COMPETITION_START_DATE,
    isActive: false,
    nextEvent: 'wod1',
    color: '#3B82F6',
    emoji: '🏁'
  },
  {
    id: 'wod1',
    name: 'WOD 1',
    description: 'Countdown zum ersten Workout',
    targetDate: COMPETITION_WOD1_DATE,
    isActive: false,
    nextEvent: 'wod2',
    color: '#10B981',
    emoji: '💪'
  },
  {
    id: 'wod2',
    name: 'WOD 2',
    description: 'Countdown zum zweiten Workout',
    targetDate: COMPETITION_WOD2_DATE,
    isActive: false,
    nextEvent: 'wod3',
    color: '#F59E0B',
    emoji: '🔥'
  },
  {
    id: 'wod3',
    name: 'WOD 3',
    description: 'Countdown zum dritten Workout',
    targetDate: COMPETITION_WOD3_DATE,
    isActive: false,
    nextEvent: 'wod4',
    color: '#8B5CF6',
    emoji: '⚡'
  },
  {
    id: 'wod4',
    name: 'WOD 4',
    description: 'Countdown zum vierten Workout',
    targetDate: COMPETITION_WOD4_DATE,
    isActive: false,
    nextEvent: 'final',
    color: '#EC4899',
    emoji: '🏋️'
  },
  {
    id: 'final',
    name: 'Finale',
    description: 'Countdown zum großen Finale',
    targetDate: COMPETITION_FINAL_DATE,
    isActive: false,
    nextEvent: 'next_birthday',
    color: '#EF4444',
    emoji: '🏆'
  },
  {
    id: 'next_birthday',
    name: '29. Geburtstag',
    description: 'Countdown zum nächsten Geburtstag',
    targetDate: BIRTHDAY_DATE_27,
    isActive: false,
    nextEvent: undefined,
    color: '#FF3B30',
    emoji: '🎉'
  }
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();  // For testing purposes
  const difference = targetDate.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

interface CountdownDigitProps {
  value: number;
  label: string;
  showColon?: boolean;
  color: string;
}

function CountdownDigit({ value, label, showColon, color }: CountdownDigitProps) {
  const formattedValue = value.toString().padStart(2, '0');
  
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          <span 
            className="countdown-digit font-display tracking-wider text-4xl sm:text-5xl md:text-7xl"
            style={{ color }}
          >
            {formattedValue}
          </span>
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-xl -z-10 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          />
        </motion.div>
        <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-2 font-medium">
          {label}
        </span>
      </div>
      {showColon && (
        <span className="text-4xl sm:text-5xl md:text-7xl text-muted-foreground/50 mx-1 sm:mx-3 self-start">:</span>
      )}
    </div>
  );
}

interface CelebrationScreenProps {
  title: string;
  message: string;
  emoji: string;
  color: string;
  nextEvent?: string;
  onContinue?: () => void;
}

function CelebrationScreen({ title, message, emoji, color, nextEvent, onContinue }: CelebrationScreenProps) {
  const [showContinue, setShowContinue] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 3000); // Show continue button after 3 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center space-y-6 max-w-2xl mx-auto"
    >
      <div className="text-6xl sm:text-8xl mb-4">{emoji}</div>
      
      <h2 
        className="font-display text-4xl sm:text-6xl md:text-7xl glow mb-4 leading-tight"
        style={{ color }}
      >
        {title}
      </h2>
      
      <p className="text-xl sm:text-2xl text-foreground/80 mb-8">
        {message}
      </p>
      
      <AnimatePresence>
        {showContinue && nextEvent && onContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-8"
          >
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 group"
            >
              <span className="flex items-center gap-3">
                <span>Weiter zu: {nextEvent}</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getEventMessages(eventId: string): { title: string; message: string } {
  const messages: Record<string, { title: string; message: string }> = {
    birthday: {
      title: "ALLES GUTE ZUM GEBURTSTAG!",
      message: "Herzlichen Glückwunsch zum 28. Geburtstag! 🎉 Das Abenteuer kann beginnen!"
    },
    competition_start: {
      title: "WETTKAMPF BEGINNT!",
      message: "Es geht los! Viel Erfolg und starke Nerven! 🏁"
    },
    wod1: {
      title: "WOD 1 STARTET!",
      message: "Zeig was du drauf hast! Gib alles im ersten Workout! 💪"
    },
    wod2: {
      title: "WOD 2 STARTET!",
      message: "Bereit für die nächste Herausforderung? Feuer frei! 🔥"
    },
    wod3: {
      title: "WOD 3 STARTET!",
      message: "Durchhalten! Du schaffst das! ⚡"
    },
    wod4: {
      title: "WOD 4 STARTET!",
      message: "Fast geschafft! Letzter Push vor dem Finale! 🏋️"
    },
    final: {
      title: "FINALE STARTET!",
      message: "Das große Finale! Alles geben, nichts bereuen! 🏆"
    },
    next_birthday: {
      title: "COUNTDOWN FÜR NÄCHSTES JAHR!",
      message: "Bis zum nächsten Abenteuer! Das war erst der Anfang... 🎉"
    }
  };
  
  return messages[eventId] || { title: "EVENT STARTET!", message: "Zeit für Action!" };
}

export default function Countdown() {
  const [activeEvent, setActiveEvent] = useState<CountdownEvent>(EVENTS[0]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(activeEvent.targetDate));
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on client side for date calculations
  useEffect(() => {
    setIsClient(true);
    
    // Check if current event has already passed on mount
    const now = new Date(); // For testing purposes
    let currentActiveEvent = EVENTS[0];
    
    // Find the first upcoming event
    for (const event of EVENTS) {
      if (event.targetDate > now) {
        currentActiveEvent = event;
        break;
      }
    }
    
    setActiveEvent(currentActiveEvent);
    setTimeLeft(calculateTimeLeft(currentActiveEvent.targetDate));
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(activeEvent.targetDate);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0 && !isCelebrating) {
        setIsCelebrating(true);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [activeEvent, isCelebrating, isClient]);
  
  const handleNextEvent = () => {
    if (activeEvent.nextEvent) {
      const nextEvent = EVENTS.find(e => e.id === activeEvent.nextEvent);
      if (nextEvent) {
        setActiveEvent(nextEvent);
        setIsCelebrating(false);
        setTimeLeft(calculateTimeLeft(nextEvent.targetDate));
      }
    }
  };
  
  const eventMessages = getEventMessages(activeEvent.id);
  
  if (!isClient) {
    return <div className="h-64 flex items-center justify-center">Lädt Countdown...</div>;
  }
  
  if (isCelebrating) {
    return (
      <CelebrationScreen
        title={eventMessages.title}
        message={eventMessages.message}
        emoji={activeEvent.emoji}
        color={activeEvent.color}
        nextEvent={activeEvent.nextEvent ? EVENTS.find(e => e.id === activeEvent.nextEvent)?.name : undefined}
        onContinue={activeEvent.nextEvent ? handleNextEvent : undefined}
      />
    );
  }
  
  const showDays = timeLeft.days > 0;
  
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center w-full"
        >
          {/* Event Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{activeEvent.emoji}</span>
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base uppercase tracking-[0.4em] text-muted-foreground font-medium"
                style={{ color: activeEvent.color }}
              >
                {activeEvent.description}
              </motion.p>
              <h3 
                className="text-2xl sm:text-3xl font-display mt-2"
                style={{ color: activeEvent.color }}
              >
                {activeEvent.name}
              </h3>
            </div>
            <span className="text-2xl">{activeEvent.emoji}</span>
          </div>
          
          {/* Countdown Digits */}
          <div className="flex items-start justify-center flex-wrap gap-2 sm:gap-0 mb-8">
            {showDays && (
              <CountdownDigit 
                value={timeLeft.days} 
                label="Tage" 
                showColon 
                color={activeEvent.color}
              />
            )}
            <CountdownDigit 
              value={timeLeft.hours} 
              label="Stunden" 
              showColon={showDays || timeLeft.minutes > 0}
              color={activeEvent.color}
            />
            <CountdownDigit 
              value={timeLeft.minutes} 
              label="Minuten" 
              showColon={timeLeft.seconds > 0}
              color={activeEvent.color}
            />
            <CountdownDigit 
              value={timeLeft.seconds} 
              label="Sekunden" 
              color={activeEvent.color}
            />
          </div>
          
          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center space-y-4"
          >
            <div>
              <p className="text-lg sm:text-xl font-display tracking-wide text-foreground/90 mb-1">
                {activeEvent.targetDate.toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-lg sm:text-xl font-mono tracking-wider text-foreground/80">
                {activeEvent.targetDate.toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} Uhr
              </p>
            </div>
            
            {activeEvent.nextEvent && (
              <div className="pt-4 border-t border-foreground/10">
                <p className="text-sm text-muted-foreground">
                  Nächstes Event: <span className="font-medium">{EVENTS.find(e => e.id === activeEvent.nextEvent)?.name}</span>
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {EVENTS.find(e => e.id === activeEvent.nextEvent)?.description}
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Progress Indicator */}
          <div className="mt-12 w-full max-w-md">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Event {EVENTS.findIndex(e => e.id === activeEvent.id) + 1} von {EVENTS.length}</span>
              <span>{Math.round((EVENTS.findIndex(e => e.id === activeEvent.id) + 1) / EVENTS.length * 100)}%</span>
            </div>
            <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((EVENTS.findIndex(e => e.id === activeEvent.id) + 1) / EVENTS.length) * 100}%` 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: activeEvent.color }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}