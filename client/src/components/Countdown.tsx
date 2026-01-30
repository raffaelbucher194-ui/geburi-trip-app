/**
 * DESIGN: Industrial Athlete - Countdown Component
 * Big gym-clock style countdown to the birthday
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATE } from '@/data/tripData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = BIRTHDAY_DATE.getTime() - now.getTime();
  
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
}

function CountdownDigit({ value, label, showColon }: CountdownDigitProps) {
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
          <span className="countdown-digit text-[#FF3B30] font-display tracking-wider">
            {formattedValue}
          </span>
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-[#FF3B30]/20 -z-10" />
        </motion.div>
        <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-2 font-medium">
          {label}
        </span>
      </div>
      {showColon && (
        <span className="countdown-digit text-muted-foreground/50 mx-1 sm:mx-3 self-start">:</span>
      )}
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isBirthday, setIsBirthday] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        setIsBirthday(true);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isBirthday) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-[#FF3B30] glow-red mb-4">
          HAPPY BIRTHDAY!
        </h2>
        <p className="text-xl sm:text-2xl text-foreground/80">
          Zeit für das Abenteuer! 🎉
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm sm:text-base uppercase tracking-[0.4em] text-muted-foreground mb-6 font-medium"
      >
        Countdown zum Geburtstag
      </motion.p>
      
      <div className="flex items-start justify-center flex-wrap gap-2 sm:gap-0">
        <CountdownDigit value={timeLeft.days} label="Tage" showColon />
        <CountdownDigit value={timeLeft.hours} label="Std" showColon />
        <CountdownDigit value={timeLeft.minutes} label="Min" showColon />
        <CountdownDigit value={timeLeft.seconds} label="Sek" />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-lg sm:text-xl font-display tracking-wide text-foreground/90">
          04. FEBRUAR 2026
        </p>
      </motion.div>
    </div>
  );
}
