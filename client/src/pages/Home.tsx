/**
 * DESIGN: Industrial Athlete - Home Page
 * Main page with countdown, next event, and full timeline
 * Neo-Brutalist CrossFit aesthetic with raw, powerful design
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Countdown from '@/components/Countdown';
import NextUp from '@/components/NextUp';
import Timeline from '@/components/Timeline';
import { ChevronDown, Dumbbell, MapPin, Calendar } from 'lucide-react';
import { BIRTHDAY_DATE, tripDays } from '@/data/tripData';

export default function Home() {
  const [showTimeline, setShowTimeline] = useState(false);
  const isBirthday = new Date() >= BIRTHDAY_DATE;
  
  // Calculate trip stats
  const totalEvents = tripDays.reduce((acc, day) => acc + day.events.length, 0);
  const workoutEvents = tripDays.reduce((acc, day) => 
    acc + day.events.filter(e => e.type === 'workout' || e.type === 'competition').length, 0
  );
  const totalDays = tripDays.length;
  
  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-crossfit.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF3B30]" />
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-wider text-foreground">
                GEBURTSTAGSTRIP
              </h1>
              <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF3B30]" />
            </div>
            <p className="text-sm sm:text-base uppercase tracking-[0.4em] text-muted-foreground">
              Solothurn → Lugano → Modena
            </p>
          </motion.div>
          
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <Countdown />
          </motion.div>
          
          {/* Trip stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3B30]" />
              <span className="text-sm sm:text-base">{totalDays} Tage</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3B30]" />
              <span className="text-sm sm:text-base">{workoutEvents} Workouts</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3B30]" />
              <span className="text-sm sm:text-base">{totalEvents} Events</span>
            </div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => {
              setShowTimeline(true);
              document.getElementById('next-up')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-[#FF3B30] transition-colors"
          >
            <span className="text-xs sm:text-sm uppercase tracking-widest">Zum Plan</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </motion.button>
        </div>
      </section>
      
      {/* Next Up Section */}
      <section id="next-up" className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NextUp />
          </motion.div>
        </div>
      </section>
      
      {/* Destination Preview */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl text-center mb-6 sm:mb-8 tracking-wide"
          >
            DIE REISE
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lugano */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-48 sm:h-64 rounded-sm overflow-hidden group"
            >
              <img 
                src="/images/lugano-lake.jpg" 
                alt="Lugano" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">LUGANO</h3>
                <p className="text-sm text-white/70">Kurhaus Cademario & CrossFit</p>
              </div>
            </motion.div>
            
            {/* Wellness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-48 sm:h-64 rounded-sm overflow-hidden group"
            >
              <img 
                src="/images/wellness-spa.jpg" 
                alt="Wellness" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">DOT SPA</h3>
                <p className="text-sm text-white/70">2.200 m² Wellness</p>
              </div>
            </motion.div>
            
            {/* Modena */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative h-48 sm:h-64 rounded-sm overflow-hidden group"
            >
              <img 
                src="/images/modena-italy.jpg" 
                alt="Modena" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">MODENA</h3>
                <p className="text-sm text-white/70">Winter Team Challenge</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Competition Highlight */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden"
          >
            <img 
              src="/images/competition-crossfit.jpg" 
              alt="Competition" 
              className="w-full h-48 sm:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 flex items-center p-6 sm:p-10">
              <div>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-2 block">
                  Das Highlight
                </span>
                <h3 className="font-display text-2xl sm:text-4xl text-white tracking-wide mb-2">
                  MODENA WINTER
                </h3>
                <h3 className="font-display text-2xl sm:text-4xl text-[#FF3B30] tracking-wide mb-4">
                  TEAM CHALLENGE
                </h3>
                <p className="text-sm sm:text-base text-white/70 max-w-md">
                  6. - 8. Februar 2026 • Master/Elite Division
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide mb-2">
              DER PLAN
            </h2>
            <p className="text-muted-foreground">
              Alle Events auf einen Blick
            </p>
          </motion.div>
          
          <Timeline />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            Made with ❤️ für den besten Geburtstag ever
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            🏋️ Train Hard • Eat Well • Travel Far
          </p>
        </div>
      </footer>
    </div>
  );
}
