/**
 * DESIGN: Industrial Athlete - Home Page (Surprise Mode)
 * Shows ONLY the current event - everything else is hidden
 * Locations are revealed as the trip progresses
 * Lugano/Tessin stays secret until arrival
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Countdown from '@/components/Countdown';
import CurrentEvent from '@/components/CurrentEvent';
import PastEvents from '@/components/PastEvents';
import TripMap from '@/components/TripMap';
import { Dumbbell, Map, History, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATE, getPastEvents } from '@/data/tripData';

type ViewMode = 'current' | 'map' | 'history';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('current');
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasPastEvents, setHasPastEvents] = useState(false);
  
  useEffect(() => {
    const checkState = () => {
      setIsBirthday(new Date() >= BIRTHDAY_DATE);
      setHasPastEvents(getPastEvents().length > 0);
    };
    
    checkState();
    const interval = setInterval(checkState, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Hero Section with Countdown */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-crossfit.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF3B30]" />
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl tracking-wider text-foreground">
                GEBURTSTAGSTRIP
              </h1>
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF3B30]" />
            </div>
            
            {/* Surprise hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Überraschungen warten auf dich...</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
          </motion.div>
          
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Countdown />
          </motion.div>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-3">
            <button
              onClick={() => setViewMode('current')}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                viewMode === 'current'
                  ? 'bg-[#FF3B30] text-white'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Aktuell</span>
            </button>
            
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#FF3B30] text-white'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Karte</span>
            </button>
            
            {hasPastEvents && (
              <button
                onClick={() => setViewMode('history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                  viewMode === 'history'
                    ? 'bg-[#FF3B30] text-white'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Erledigt</span>
              </button>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {viewMode === 'current' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="current"
            >
              <CurrentEvent />
              
              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs sm:text-sm text-muted-foreground mt-6"
              >
                Das nächste Event wird automatisch freigeschaltet, wenn es soweit ist.
              </motion.p>
            </motion.div>
          )}
          
          {viewMode === 'map' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="map"
            >
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl tracking-wide mb-2">
                  DEINE REISE
                </h2>
                <p className="text-sm text-muted-foreground">
                  Orte werden enthüllt, sobald du dort ankommst
                </p>
              </div>
              
              <TripMap />
            </motion.div>
          )}
          
          {viewMode === 'history' && hasPastEvents && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="history"
            >
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl tracking-wide mb-2">
                  ERLEBTES
                </h2>
                <p className="text-sm text-muted-foreground">
                  Was du schon alles gemacht hast
                </p>
              </div>
              
              <PastEvents />
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border mt-8">
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
