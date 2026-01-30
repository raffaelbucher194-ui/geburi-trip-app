/**
 * DESIGN: Industrial Athlete - Trip Data
 * All events for the birthday trip with timestamps and details
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
}

export interface TripDay {
  date: Date;
  label: string;
  isHighlight?: boolean;
  events: TripEvent[];
}

// Birthday date for countdown
export const BIRTHDAY_DATE = new Date('2026-02-04T00:00:00');

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
      },
      {
        id: 'fri-2',
        date: new Date('2026-01-30T17:15:00'),
        title: 'Essen im Nooch Bern',
        subtitle: 'Asiatische Küche',
        type: 'food',
        status: 'confirmed',
        location: 'Nooch Bern',
        image: '/images/lugano-lake.jpg',
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
          notes: 'Noch zu organisieren!',
        },
        image: '/images/hero-crossfit.jpg',
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
          notes: 'Reservation nötig!',
        },
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
      },
      {
        id: 'tue-2',
        date: new Date('2026-02-03T16:00:00'),
        title: 'Packen & Ready machen',
        subtitle: 'Für den Geburtstag!',
        type: 'free',
        status: 'confirmed',
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
      },
      {
        id: 'wed-2',
        date: new Date('2026-02-04T14:00:00'),
        title: 'Abfahrt ins Tessin',
        subtitle: 'Nach Cademario',
        type: 'travel',
        status: 'confirmed',
        image: '/images/lugano-lake.jpg',
      },
      {
        id: 'wed-3',
        date: new Date('2026-02-04T15:00:00'),
        title: 'Check-in Kurhaus Cademario',
        subtitle: 'Classic with Lake View',
        type: 'wellness',
        status: 'confirmed',
        location: 'Kurhaus Cademario',
        details: {
          address: 'Via Kurhaus 12, 6936 Cademario',
          notes: 'Reservierungscode: 10146L101118 | Inkl. DOT SPA (2.200 m²)',
          price: '494.80 CHF (2 Nächte)',
        },
        image: '/images/wellness-spa.jpg',
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
          notes: 'Noch zu organisieren!',
        },
        image: '/images/hero-crossfit.jpg',
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
      },
      {
        id: 'thu-2',
        date: new Date('2026-02-05T13:00:00'),
        title: 'Mittagessen',
        subtitle: 'Nach deiner Wahl',
        type: 'food',
        status: 'flexible',
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
      },
      {
        id: 'thu-4',
        date: new Date('2026-02-05T19:00:00'),
        title: 'Abendessen & Chill',
        type: 'food',
        status: 'flexible',
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
      },
      {
        id: 'fri2-3',
        date: new Date('2026-02-06T15:00:00'),
        title: 'Warm Up für WOD 0',
        subtitle: 'Judge Rules',
        type: 'competition',
        status: 'confirmed',
        image: '/images/competition-crossfit.jpg',
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
      },
      {
        id: 'sun2-2',
        date: new Date('2026-02-08T19:00:00'),
        title: 'Rückfahrt',
        subtitle: 'Mit Partymusik im Auto! 🎉',
        type: 'travel',
        status: 'confirmed',
      },
    ],
  },
];

// Helper to get current/next event
export function getCurrentEvent(): TripEvent | null {
  const now = new Date();
  let nextEvent: TripEvent | null = null;
  
  for (const day of tripDays) {
    for (const event of day.events) {
      if (event.date > now) {
        if (!nextEvent || event.date < nextEvent.date) {
          nextEvent = event;
        }
      }
    }
  }
  
  return nextEvent;
}

// Helper to get all events as flat array
export function getAllEvents(): TripEvent[] {
  return tripDays.flatMap(day => day.events);
}

// Workout suggestion for birthday workout
export const birthdayWorkout = {
  name: '"Birthday Bash" – Partner WOD',
  description: 'For Time (25 min cap)',
  buyIn: '26 Synchro Burpees (Alter!)',
  rounds: 4,
  movements: [
    '26 Cal Row (split as needed)',
    '26 Wall Balls (20/14)',
    '26 KB Swings (24/16)',
  ],
  buyOut: '26 Synchro Burpees',
};
