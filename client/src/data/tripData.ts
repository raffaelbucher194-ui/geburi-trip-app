/**
 * DESIGN: Industrial Athlete - Trip Data
 * All events for the birthday trip with timestamps and details
 * 
 * SURPRISE MODE: Events are revealed one at a time based on their start time
 * Lugano/Tessin destination is hidden until arrival (Wed 04.02. 14:00)
 */


// 🧪 DEBUG MODE (set to null for real time)
export const DEBUG_TIME: string | null = null;
//export const DEBUG_TIME: string = "2026-02-04T18:30:00";
// example: "2026-02-01T13S:05:00"

export function getNow(): Date {
  return DEBUG_TIME ? new Date(DEBUG_TIME) : new Date();
}



export interface TripEvent {
  id: string;
  date: Date;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  type: 'food' | 'workout' | 'travel' | 'wellness' | 'competition' | 'free' | 'work' | 'geburi';
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
export const LUGANO_REVEAL_TIME = new Date('2026-02-04T17:00:00');

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
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'fri-2',
        date: new Date('2026-01-30T17:15:00'),
        title: 'Essen im Nooch Bern',
        subtitle: 'Asiatische Küche',
        type: 'food',
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
        date: new Date('2026-01-31T16:45:00'),
        title: 'Abfahrt zum Essen',
        subtitle: 'Mit Familie',
        type: 'travel',
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'sat-2',
        date: new Date('2026-01-31T18:15:00'),
        title: 'Essen im Nooch Bern',
        subtitle: 'Mit Familie',
        type: 'food',
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
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'tue-2',
        date: new Date('2026-02-03T20:00:00'),
        title: 'Packen & Ready machen',
        subtitle: 'Für den Geburtstag!',
        type: 'free',
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
        date: new Date('2026-02-04T01:00:00'),
        title: 'GEBURTSTAG!',
        subtitle: 'Morgenprogramm nach dir',
        description: 'Was auch immer du willst!',
        type: 'geburi',
        coordinates: LOCATIONS.solothurn,
      },
      {
        id: 'wed-2',
        date: new Date('2026-02-04T14:00:00'),
        title: 'Abfahrt ins Tessin',
        subtitle: 'Nach Cademario',
        type: 'travel',
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
        secretSubtitle: '18:00 Klasse in Lugano',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.lugano,
      },
      {
        id: 'wed-5',
        date: new Date('2026-02-04T20:00:00'),
        title: 'Geburtstagsessen',
        subtitle: 'Gutes italienisches Restaurant',
        type: 'food',
        location: 'Lugano',
        details: {
          notes: 'Empfehlungen: Grotto Castagneto, Badalucci, La Cucina di Alice',
        },
        // SECRET: Hide until Lugano reveal
        isSecret: true,
        secretTitle: 'Geburtstagsessen',
        secretSubtitle: 'An einem besonderen Ort, wird enthüllt...',
        revealAt: new Date('2026-02-04T19:30:00'),
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
        image: '/images/modena-italy.jpg',
        isSecret: false,
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
        location: 'Modena',
        details: {
          notes: 'Empfehlungen: Trattoria Pomposa, Hosteria Giusti, Antica Moka',
        },
        isSecret: false,
        secretTitle: 'Mittagessen',
        secretSubtitle: 'Italienisch... Empfehlungen: Trattoria Pomposa, Hosteria Giusti, Antica Moka',
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
        isSecret: false,
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
        isSecret: false,
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
        isSecret: false,
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
        isSecret: false,
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
        isSecret: true,
        secretTitle: 'Heimreise',
        secretSubtitle: 'Party!',
        revealAt: LUGANO_REVEAL_TIME,
        coordinates: LOCATIONS.solothurn,
      },
    ],
  },
];

// ... keep all the previous definitions (DEBUG_TIME, TripEvent, TripDay, tripDays, etc.)

// Helper to get all events as flat array sorted by date
export function getAllEvents(): TripEvent[] {
  return tripDays
    .flatMap(day => day.events)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Helper to check if an event's secret should be revealed
export function isEventRevealed(event: TripEvent): boolean {
  if (!event.isSecret) return true;
  const now = getNow();
  const revealTime = event.revealAt || event.date;
  return now >= revealTime;
}

// Helper to get display version of event
export function getDisplayEvent(event: TripEvent): TripEvent {
  if (isEventRevealed(event)) return event;

  return {
    ...event,
    title: event.secretTitle || "???",
    subtitle: event.secretSubtitle || "Überraschung!",
    location: undefined,
    details: undefined,
    image: undefined,
    coordinates: undefined,
  };
}

// Returns all events that are in the past
export function getPastEvents(): TripEvent[] {
  const now = getNow();
  return getAllEvents().filter(event => event.date < now);
}


// Map reveal logic
export function getRevealedLocations(): Array<{ lat: number; lng: number; name: string; type: string }> {
  const now = getNow();
  const revealed = [];
  const seen = new Set<string>();

  for (const event of getAllEvents()) {
    if (!event.coordinates) continue;
    if (event.date > now) continue;
    if (event.isSecret && !isEventRevealed(event)) continue;

    const key = `${event.coordinates.lat},${event.coordinates.lng}`;
    if (seen.has(key)) continue;
    seen.add(key);

    revealed.push({
      ...event.coordinates,
      name: event.location || event.title,
      type: event.type,
    });
  }

  return revealed;
}

// Workout suggestion for birthday workout
export const birthdayWorkout = {
  name: "Birthday Bash - 29 Rounds for 29 Years",
  description: 'For Time',
  rounds: 29,
  buyIn: '29, 28, 27, etc Wall Balls',
  movements: [
    '1 Handstand Walk (7.5m)',
    '9 strict Handstand Push-ups to share',
    '9 synchro BB Thruster (53kg/35kg)',
    '7 Sandbag Cleans to share (90kg/70kg)',
  ],
  buyOut: '1,2,3, etc. Synchro Burpees',
};

