/**
 * DESIGN: Industrial Athlete - Multi-Phase Countdown Component
 * Big gym-clock style countdowns for all competition events
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BIRTHDAY_DATE,
  BIRTHDAY_DATE_27,
  COMPETITION_START_DATE,
  COMPETITION_WOD1_DATE,
  COMPETITION_WOD2_DATE,
  COMPETITION_WOD3_DATE,
  COMPETITION_WOD4_DATE,
  COMPETITION_FINAL_DATE
} from '@/data/tripData';

interface CountdownEvent {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  nextEvent?: string;
  color: string;
  emoji: string;
}

const EVENTS: CountdownEvent[] = [
  { id: 'birthday', name: 'Geburtstag', description: 'Countdown zum 29. Geburtstag', targetDate: BIRTHDAY_DATE, nextEvent: 'competition_start', color: '#FF3B30', emoji: '🎂' },
  { id: 'competition_start', name: 'Wettkampfstart', description: 'Countdown zum Wettkampfbeginn', targetDate: COMPETITION_START_DATE, nextEvent: 'wod1', color: '#3B82F6', emoji: '🏁' },
  { id: 'wod1', name: 'WOD 1', description: 'Countdown zum ersten Workout', targetDate: COMPETITION_WOD1_DATE, nextEvent: 'wod2', color: '#10B981', emoji: '💪' },
  { id: 'wod2', name: 'WOD 2', description: 'Countdown zum zweiten Workout', targetDate: COMPETITION_WOD2_DATE, nextEvent: 'wod3', color: '#F59E0B', emoji: '🔥' },
  { id: 'wod3', name: 'WOD 3', description: 'Countdown zum dritten Workout', targetDate: COMPETITION_WOD3_DATE, nextEvent: 'wod4', color: '#8B5CF6', emoji: '⚡' },
  { id: 'wod4', name: 'WOD 4', description: 'Countdown zum vierten Workout', targetDate: COMPETITION_WOD4_DATE, nextEvent: 'final', color: '#EC4899', emoji: '🏋️' },
  { id: 'final', name: 'Finale', description: 'Countdown zum großen Finale', targetDate: COMPETITION_FINAL_DATE, nextEvent: 'next_birthday', color: '#EF4444', emoji: '🏆' },
  { id: 'next_birthday', name: '29. Geburtstag', description: 'Countdown zum nächsten Geburtstag', targetDate: BIRTHDAY_DATE_27, nextEvent: undefined, color: '#FF3B30', emoji: '🎉' }
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff
  };
}

interface CountdownDigitProps {
  value: number;
  label: string;
  showColon?: boolean;
  color: string;
}

function CountdownDigit({ value, label, showColon, color }: CountdownDigitProps) {
  const formatted = value.toString().padStart(2, '0');
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <motion.div key={value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
          <span className="countdown-digit font-display tracking-wider text-4xl sm:text-5xl md:text-7xl" style={{ color }}>
            {formatted}
          </span>
          <div className="absolute inset-0 blur-xl -z-10 rounded-lg" style={{ backgroundColor: `${color}20` }} />
        </motion.div>
        <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-2 font-medium">{label}</span>
      </div>
      {showColon && <span className="text-4xl sm:text-5xl md:text-7xl text-muted-foreground/50 mx-1 sm:mx-3 self-start">:</span>}
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
    const t = setTimeout(() => setShowContinue(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 max-w-2xl mx-auto">
      <div className="text-6xl sm:text-8xl mb-4">{emoji}</div>
      <h2 className="font-display text-4xl sm:text-6xl md:text-7xl glow mb-4 leading-tight" style={{ color }}>{title}</h2>
      <p className="text-xl sm:text-2xl text-foreground/80 mb-8">{message}</p>
      <AnimatePresence>
        {showContinue && nextEvent && onContinue && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8">
            <button onClick={onContinue} className="px-8 py-4 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 group">
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

function getEventMessages(eventId: string) {
  const msgs: Record<string, { title: string; message: string }> = {
    birthday: { title: "ALLES GUTE ZUM GEBURTSTAG!", message: "Herzlichen Glückwunsch zum 28. Geburtstag! 🎉 Das Abenteuer kann beginnen!" },
    competition_start: { title: "WETTKAMPF BEGINNT!", message: "Es geht los! Viel Erfolg und starke Nerven! 🏁" },
    wod1: { title: "WOD 1 STARTET!", message: "Zeig was du drauf hast! Gib alles im ersten Workout! 💪" },
    wod2: { title: "WOD 2 STARTET!", message: "Bereit für die nächste Herausforderung? Feuer frei! 🔥" },
    wod3: { title: "WOD 3 STARTET!", message: "Durchhalten! Du schaffst das! ⚡" },
    wod4: { title: "WOD 4 STARTET!", message: "Fast geschafft! Letzter Push vor dem Finale! 🏋️" },
    final: { title: "FINALE STARTET!", message: "Das große Finale! Alles geben, nichts bereuen! 🏆" },
    next_birthday: { title: "COUNTDOWN FÜR NÄCHSTES JAHR!", message: "Bis zum nächsten Abenteuer! Das war erst der Anfang... 🎉" }
  };
  return msgs[eventId] || { title: "EVENT STARTET!", message: "Zeit für Action!" };
}

export default function Countdown() {
  const [activeEvent, setActiveEvent] = useState<CountdownEvent>(EVENTS[0]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(activeEvent.targetDate));
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    const next = EVENTS.find(e => e.targetDate > now) || EVENTS[EVENTS.length - 1];
    setActiveEvent(next);
    setTimeLeft(calculateTimeLeft(next.targetDate));
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft(activeEvent.targetDate);
      setTimeLeft(newTime);
      if (newTime.total <= 0 && !isCelebrating) {
        setIsCelebrating(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeEvent, isCelebrating, isClient]);

  const handleNextEvent = () => {
    if (activeEvent.nextEvent) {
      const next = EVENTS.find(e => e.id === activeEvent.nextEvent);
      if (next) {
        setActiveEvent(next);
        setIsCelebrating(false);
        setTimeLeft(calculateTimeLeft(next.targetDate));
      }
    }
  };

  const msgs = getEventMessages(activeEvent.id);

  if (!isClient) return <div className="h-64 flex items-center justify-center">Lädt Countdown...</div>;
  if (isCelebrating) return <CelebrationScreen {...msgs} emoji={activeEvent.emoji} color={activeEvent.color} nextEvent={activeEvent.nextEvent ? EVENTS.find(e => e.id === activeEvent.nextEvent)?.name : undefined} onContinue={activeEvent.nextEvent ? handleNextEvent : undefined} />;

  const showDays = timeLeft.days > 0;

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div key={activeEvent.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center w-full">
          {/* Event Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{activeEvent.emoji}</span>
            <div className="text-center">
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm sm:text-base uppercase tracking-[0.4em] text-muted-foreground font-medium" style={{ color: activeEvent.color }}>
                {activeEvent.description}
              </motion.p>
              <h3 className="text-2xl sm:text-3xl font-display mt-2" style={{ color: activeEvent.color }}>{activeEvent.name}</h3>
            </div>
            <span className="text-2xl">{activeEvent.emoji}</span>
          </div>

          {/* Countdown Digits */}
          <div className="flex items-start justify-center flex-wrap gap-2 sm:gap-0 mb-8">
            {showDays && <CountdownDigit value={timeLeft.days} label="Tage" showColon color={activeEvent.color} />}
            <CountdownDigit value={timeLeft.hours} label="Stunden" showColon={showDays || timeLeft.minutes > 0} color={activeEvent.color} />
            <CountdownDigit value={timeLeft.minutes} label="Minuten" showColon={timeLeft.seconds > 0} color={activeEvent.color} />
            <CountdownDigit value={timeLeft.seconds} label="Sekunden" color={activeEvent.color} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
