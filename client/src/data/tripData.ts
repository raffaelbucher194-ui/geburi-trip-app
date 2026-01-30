/**
 * DESIGN: Industrial Athlete - Trip Data
 * All events for the birthday trip with timestamps and details
 * 
 * SURPRISE MODE: Events are revealed one at a time based on their start time
 * Lugano/Tessin destination is hidden until arrival (Wed 04.02. 14:00)
 */

export interface TripEvent {
  id: string;
  date: Date;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  type: 'food' | 'workout' | 'travel' | 'wellness' | 'competition' | 'free' | 'work';
  status: 'confirmed' | 'pending' | 'flexible';
  details?: {
    address?: string;
    phone?: string;
    website?: string;
    notes?: string;
    price?: string;
  };
  image?: string;
  // Surprise mode fields
  isSecret?: boolean; // If true, location details are hidden until revealed
  secretTitle?: string; // Alternative title shown before reveal
  secretSubtitle?: string; // Alternative subtitle shown before reveal
  revealAt?: Date; // When to reveal the secret (defaults to event start time)
  coordinates?: { lat: number; lng: number }; // For map
}

export interface TripDay {
  date: Date;
  label: string;
  isHighlight?: boolean;
  events: TripEvent[];
}

// Birthday date for countdown
export const BIRTHDAY_DATE = new Date('2026-02-04T00:00:00');
export const BIRTHDAY_DATE_27 = new Date('2027-02-04T00:00:00');

// Competition dates for countdown
export const COMPETITION_START_DATE = new Date('2026-02-06T14:00:00');
export const COMPETITION_WOD1_DATE = new Date('2026-02-06T17:21:00'); 
export const COMPETITION_WOD2_DATE = new Date('2026-02-07T12:07:00');
export const COMPETITION_WOD3_DATE = new Date('2026-02-07T16:05:00');
export const COMPETITION_WOD4_DATE = new Date('2026-02-08T09:34:00');
export const COMPETITION_FINAL_DATE = new Date('2026-02-08T14:54:00');

// Secret reveal time for Lugano/Tessin (when they arrive)
export const LUGANO_REVEAL_TIME = new Date('2026-02-04T14:00:00');

// Map coordinates
export const LOCATIONS = {
  solothurn: { lat: 47.2088, lng: 7.5323, name: 'Solothurn' },
  zuchwil: { lat: 47.2067, lng: 7.5647, name: 'Zuchwil' },
  bern: { lat: 46.9480, lng: 7.4474, name: 'Bern' },
  cademario: { lat: 46.0489, lng: 8.9183, name: 'Cademario' },
  lugano: { lat: 46.0037, lng: 8.9511, name: 'Lugano' },
  modena: { lat: 44.6471, lng: 10.9252, name: 'Modena' },
};

// All trip events organized by day
export const tripDays: TripDay[] = [
  {
    date: new Date('2026-01-30'),
    label: 'Freitag, 30. Januar',
    events: [
      {
        id: 'fri-1',
        date: new Date('2026-01-30T16:45:00'),
        title: 'Abfahrt zum Essen',
        subtitle: 'Mit Bellabarbas',
        type: 'travel',
        status: 'confirmed',
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'fri-2',
        date: new Date('2026-01-30T17:15:00'),
        title: 'Essen im Nooch Bern',
        subtitle: 'Asiatische Küche',
        type: 'food',
        status: 'confirmed',
        location: 'Nooch Bern',
        coordinates: LOCATIONS.bern,
      },
    ],
  },
  {
    date: new Date('2026-01-31'),
    label: 'Samstag, 31. Januar',
    events: [
      {
        id: 'sat-1',
        date: new Date('2026-01-31T18:15:00'),
        title: 'Essen im Nooch Bern',
        subtitle: 'Mit Familie',
        type: 'food',
        status: 'confirmed',
        location: 'Nooch Bern',
        coordinates: LOCATIONS.bern,
      },
    ],
  },
  {
    date: new Date('2026-02-01'),
    label: 'Sonntag, 1. Februar',
    events: [
      {
        id: 'sun-1',
        date: new Date('2026-02-01T14:00:00'),
        title: 'Geburtstagsworkout',
        subtitle: 'Team/Partner WOD mit Freunden',
        type: 'workout',
        status: 'pending',
        location: 'CrossFit Öufi',
        details: {
          address: 'Industriestrasse 14, 4528 Zuchwil',
          phone: '+41 79 882 88 91',
          website: 'https://www.crossfit11.ch/',
          
        },
        image: '/images/hero-crossfit.jpg',
        coordinates: LOCATIONS.zuchwil,
      },
      {
        id: 'sun-2',
        date: new Date('2026-02-01T18:00:00'),
        title: 'Essen in der Aarebar',
        subtitle: 'ev. mit Malik und Jael',
        type: 'food',
        status: 'pending',
        location: 'Aarebar Solothurn',
        details: {
          address: 'Landhausquai 17, 4500 Solothurn',
          phone: '032 757 49 92',
          website: 'https://aarebar.com/reservation/',
          
        },
        coordinates: LOCATIONS.solothurn,
      },
    ],
  },
  {
    date: new Date('2026-02-02'),
    label: 'Montag, 2. Februar',
    events: [
      {
        id: 'mon-1',
        date: new Date('2026-02-02T08:00:00'),
        title: 'Normaler Arbeitstag',
        type: 'work',
        status: 'confirmed',
        coordinates: LOCATIONS.solothurn,
      },
    ],
  },
  {
    date: new Date('2026-02-03'),
    label: 'Dienstag, 3. Februar',
    events: [
      {
        id: 'tue-1',
        date: new Date('2026-02-03T08:00:00'),
        title: 'Arbeit bis ca. 16:00',
        type: 'work',
        status: 'confirmed',
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'tue-2',
        date: new Date('2026-02-03T16:00:00'),
        title: 'Packen & Ready machen',
        subtitle: 'Für den Geburtstag!',
        type: 'free',
        status: 'confirmed',
        coordinates: LOCATIONS.solothurn,
      },
    ],
  },
  {
    date: new Date('2026-02-04'),
    label: 'Mittwoch, 4. Februar',
    isHighlight: true,
    events: [
      {
        id: 'wed-1',
        date: new Date('2026-02-04T08:00:00'),
        title: 'GEBURTSTAG!',
        subtitle: 'Morgenprogramm nach dir',
        description: 'Was auch immer du willst!',
        type: 'free',
        status: 'flexible',
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'wed-2',
        date: new Date('2026-02-04T14:00:00'),
        title: 'Abfahrt ins Tessin',
        subtitle: 'Nach Cademario',
        type: 'travel',
        status: 'confirmed',
        // SECRET: Hide destination until this event starts
        isSecret: true,
        secretTitle: 'Überraschungs-Roadtrip!',
        secretSubtitle: 'Ziel wird enthüllt...',
        revealAt: new Date('2026-02-04T14:00:00'),
        image: '/images/lugano-lake.jpg',
        coordinates: LOCATIONS.cademario,
      },
      {
        id: 'wed-3',
        date: new Date('2026-02-04T17:00:00'),
        title: 'Check-in Kurhaus Cademario',
        subtitle: 'Classic with Lake View',
        type: 'wellness',
        status: 'confirmed',
        location: 'Kurhaus Cademario',
        details: {
          address: 'Via Kurhaus 12, 6936 Cademario',
          notes: 'Reservierungscode: 10146L101118 | Inkl. DOT SPA (2.200 m²)',
        },
        image: '/images/wellness-spa.jpg',
        // SECRET: Hide until Lugano reveal
        isSecret: true,
        secretTitle: 'Check-in Hotel',
        secretSubtitle: 'Überraschung!',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.cademario,
      },
      {
        id: 'wed-4',
        date: new Date('2026-02-04T18:00:00'),
        title: 'Geburtstags-Workout',
        subtitle: 'CrossFit Lugano – zu zweit',
        type: 'workout',
        status: 'pending',
        location: 'CrossFit Lugano',
        details: {
          address: 'Via Fola 11, 6900 Lugano',
          phone: '+41 79 198 84 20',
          website: 'https://www.crossfitlugano.com/',
          price: 'Drop-in: CHF 25/Person',
          
        },
        image: '/images/hero-crossfit.jpg',
        // SECRET: Hide until Lugano reveal
        isSecret: true,
        secretTitle: 'Geburtstags-Workout',
        secretSubtitle: 'Irgendwo Spezielles...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
      {
        id: 'wed-5',
        date: new Date('2026-02-04T20:00:00'),
        title: 'Geburtstagsessen',
        subtitle: 'Gutes italienisches Restaurant',
        type: 'food',
        status: 'pending',
        location: 'Lugano',
        details: {
          notes: 'Empfehlungen: Grotto Castagneto, Badalucci, La Cucina di Alice',
        },
        // SECRET: Hide until Lugano reveal
        isSecret: true,
        secretTitle: 'Geburtstagsessen',
        secretSubtitle: 'An einem besonderen Ort...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
    ],
  },
  {
    date: new Date('2026-02-05'),
    label: 'Donnerstag, 5. Februar',
    events: [
      {
        id: 'thu-1',
        date: new Date('2026-02-05T10:00:00'),
        title: 'Workout',
        subtitle: 'CrossFit Lugano',
        type: 'workout',
        status: 'pending',
        location: 'CrossFit Lugano',
        details: {
          address: 'Via Fola 11, 6900 Lugano',
          price: 'Drop-in: CHF 25/Person',
        },
        image: '/images/hero-crossfit.jpg',
        isSecret: true,
        secretTitle: 'Workout',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
      {
        id: 'thu-2',
        date: new Date('2026-02-05T13:00:00'),
        title: 'Mittagessen',
        subtitle: 'Nach deiner Wahl',
        type: 'food',
        status: 'flexible',
        isSecret: true,
        secretTitle: 'Mittagessen',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
      {
        id: 'thu-3',
        date: new Date('2026-02-05T15:00:00'),
        title: 'Wellness im DOT SPA',
        subtitle: 'Pool, Sauna & Chill',
        description: '2.200 m² Wellness mit Indoor/Outdoor Pool und Sauna-Welt',
        type: 'wellness',
        status: 'confirmed',
        location: 'Kurhaus Cademario',
        image: '/images/wellness-spa.jpg',
        isSecret: true,
        secretTitle: 'Wellness',
        secretSubtitle: 'Etwas Besonderes...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.cademario,
      },
      {
        id: 'thu-4',
        date: new Date('2026-02-05T19:00:00'),
        title: 'Abendessen & Chill',
        type: 'food',
        status: 'flexible',
        isSecret: true,
        secretTitle: 'Abendessen',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
    ],
  },
  {
    date: new Date('2026-02-06'),
    label: 'Freitag, 6. Februar',
    events: [
      {
        id: 'fri2-1',
        date: new Date('2026-02-06T10:00:00'),
        title: 'Abfahrt nach Modena',
        subtitle: 'Ca. 3h Fahrt',
        type: 'travel',
        status: 'confirmed',
        image: '/images/modena-italy.jpg',
        isSecret: true,
        secretTitle: 'Roadtrip!',
        secretSubtitle: 'Wohin wohl?',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
      {
        id: 'fri2-2',
        date: new Date('2026-02-06T13:00:00'),
        title: 'Mittagessen',
        subtitle: 'In Modena oder Umgebung',
        type: 'food',
        status: 'pending',
        location: 'Modena',
        details: {
          notes: 'Empfehlungen: Trattoria Pomposa, Hosteria Giusti, Antica Moka',
        },
        isSecret: true,
        secretTitle: 'Mittagessen',
        secretSubtitle: 'Italienisch...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
      {
        id: 'fri2-3',
        date: new Date('2026-02-06T15:00:00'),
        title: 'Warm Up für WOD 0',
        subtitle: 'Judge Rules',
        type: 'competition',
        status: 'confirmed',
        image: '/images/competition-crossfit.jpg',
        isSecret: true,
        secretTitle: 'Warm Up',
        secretSubtitle: 'Für etwas Grosses...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
      {
        id: 'fri2-4',
        date: new Date('2026-02-06T17:00:00'),
        title: 'Competition Start',
        subtitle: 'Modena Winter Team Challenge',
        type: 'competition',
        status: 'confirmed',
        location: 'Modena',
        image: '/images/competition-crossfit.jpg',
        isSecret: true,
        secretTitle: 'DAS HIGHLIGHT',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
    ],
  },
  {
    date: new Date('2026-02-07'),
    label: 'Samstag, 7. Februar',
    events: [
      {
        id: 'sat2-1',
        date: new Date('2026-02-07T09:00:00'),
        title: 'Competition Tag 2',
        subtitle: 'Modena Winter Team Challenge',
        type: 'competition',
        status: 'confirmed',
        location: 'Modena',
        image: '/images/competition-crossfit.jpg',
        isSecret: true,
        secretTitle: 'Tag 2',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
    ],
  },
  {
    date: new Date('2026-02-08'),
    label: 'Sonntag, 8. Februar',
    events: [
      {
        id: 'sun2-1',
        date: new Date('2026-02-08T09:00:00'),
        title: 'Competition Finale',
        subtitle: 'Falls noch Events',
        type: 'competition',
        status: 'confirmed',
        image: '/images/competition-crossfit.jpg',
        isSecret: true,
        secretTitle: 'Finale',
        secretSubtitle: 'Wird enthüllt...',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.modena,
      },
      {
        id: 'sun2-2',
        date: new Date('2026-02-08T19:00:00'),
        title: 'Rückfahrt',
        subtitle: 'Mit Partymusik im Auto! 🎉',
        type: 'travel',
        status: 'confirmed',
        isSecret: true,
        secretTitle: 'Heimreise',
        secretSubtitle: 'Party!',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.solothurn,
      },
    ],
  },
];

// Helper to check if an event's secret should be revealed
export function isEventRevealed(event: TripEvent): boolean {
  if (!event.isSecret) return true;
  const now = new Date(); // For testing purposes
  const revealTime = event.revealAt || event.date;
  return now >= revealTime;
}

// Helper to get the display version of an event (with secrets hidden if needed)
export function getDisplayEvent(event: TripEvent): TripEvent {
  if (!event.isSecret || isEventRevealed(event)) {
    return event;
  }
  
  // Return secret version
  return {
    ...event,
    title: event.secretTitle || '???',
    subtitle: event.secretSubtitle || 'Überraschung!',
    location: undefined,
    details: undefined,
    image: undefined,
    coordinates: undefined,
  };
}

// Helper to get current/next event (the one that should be shown)
export function getCurrentEvent(): TripEvent | null {
  const now = new Date(); // For testing purposes
  const allEvents = getAllEvents();
  
  // Find the first event that hasn't ended yet (assuming 2 hour duration)
  for (const event of allEvents) {
    const eventEnd = new Date(event.date.getTime() + 2 * 60 * 60 * 1000);
    if (now < eventEnd) {
      return event;
    }
  }
  
  return null;
}

// Helper to get all events as flat array sorted by date
export function getAllEvents(): TripEvent[] {
  return tripDays
    .flatMap(day => day.events)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Helper to get past events (already happened)
export function getPastEvents(): TripEvent[] {
  const now = new Date(); // For testing purposes
  return getAllEvents().filter(event => event.date < now);
}

// Helper to get revealed locations for the map
export function getRevealedLocations(): Array<{ lat: number; lng: number; name: string; type: string }> {
  const now = new Date(); // For testing purposes
  const revealed: Array<{ lat: number; lng: number; name: string; type: string }> = [];
  const seenCoords = new Set<string>();
  
  for (const event of getAllEvents()) {
    // Only show locations for events that have started
    if (event.date <= now && event.coordinates) {
      const key = `${event.coordinates.lat},${event.coordinates.lng}`;
      if (!seenCoords.has(key)) {
        seenCoords.add(key);
        
        // Check if this is a secret location that shouldn't be revealed yet
        if (event.isSecret && !isEventRevealed(event)) {
          continue;
        }
        
        revealed.push({
          ...event.coordinates,
          name: event.location || event.title,
          type: event.type,
        });
      }
    }
  }
  
  return revealed;
}

// Workout suggestion for birthday workout
export const birthdayWorkout = {
  name: '"Birthday Bash" – Partner WOD',
  description: 'For Time (25 min cap)',
  buyIn: '29 Synchro Burpees (Alter!)',
  rounds: 4,
  movements: [
    '29 Cal Row (split as needed)',
    '29 Wall Balls (20/14)',
    '29 KB Swings (24/16)',
  ],
  buyOut: '29 Synchro Burpees',
};
