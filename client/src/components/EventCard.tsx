/**
 * DESIGN: Industrial Athlete - Event Card Component
 * Whiteboard/chalkboard style cards for trip events
 */

import { motion } from 'framer-motion';
import { getEventDuration } from "@/data/tripEngine";

import { 
  Utensils, 
  Dumbbell, 
  Car, 
  Sparkles, 
  Trophy, 
  Coffee,
  Briefcase,
  MapPin,
  Phone,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import type { TripEvent } from '@/data/tripData';

interface EventCardProps {
  event: TripEvent;
  index: number;
  isNext?: boolean;
}

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

export default function EventCard({ event, index, isNext }: EventCardProps) {
  const Icon = typeIcons[event.type];
  const iconColor = typeColors[event.type];
  const status = statusConfig[event.status];
  const StatusIcon = status.icon;
  
  const time = event.date.toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative chalk-board rounded-sm p-4 sm:p-5
        ${isNext ? 'ring-2 ring-[#FF3B30] glow-red' : ''}
        hover:bg-card/80 transition-colors
      `}
    >
      {/* Next indicator */}
      {isNext && (
        <div className="absolute -top-3 -right-2 bg-[#FF3B30] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          Next Up
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-2.5 bg-secondary rounded-sm ${iconColor}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Time */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono-tight text-sm text-[#FF3B30] font-medium">
              {time}
            </span>
            <div className={`flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span className="text-xs">{status.label}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="font-display text-lg sm:text-xl tracking-wide text-foreground mb-1">
            {event.title}
          </h3>
          
          {/* Subtitle */}
          {event.subtitle && (
            <p className="text-sm text-muted-foreground">
              {event.subtitle}
            </p>
          )}
          
          {/* Description */}
          {event.description && (
            <p className="text-sm text-foreground/70 mt-2">
              {event.description}
            </p>
          )}
          
          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.location}</span>
            </div>
          )}
          
          {/* Details */}
          {event.details && (
            <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
              {event.details.address && (
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{event.details.address}</span>
                </div>
              )}
              {event.details.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <a href={`tel:${event.details.phone}`} className="hover:text-[#FF3B30] transition-colors">
                    {event.details.phone}
                  </a>
                </div>
              )}
              {event.details.website && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <a 
                    href={event.details.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#FF3B30] transition-colors truncate"
                  >
                    Website
                  </a>
                </div>
              )}
              {event.details.price && (
                <div className="text-xs text-emerald-400 font-medium mt-1">
                  {event.details.price}
                </div>
              )}
              {event.details.notes && (
                <div className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-sm mt-2">
                  ⚠️ {event.details.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Image preview */}
      {event.image && (
        <div className="mt-4 -mx-1 sm:-mx-2">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-24 sm:h-32 object-cover rounded-sm opacity-60 hover:opacity-80 transition-opacity"
          />
        </div>
      )}
    </motion.div>
  );
}
