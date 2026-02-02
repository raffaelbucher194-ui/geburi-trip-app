import { TripEvent, getAllEvents, getNow } from "./tripData";

// ⏱️ Event durations in minutes
const EVENT_DURATIONS: Record<TripEvent["type"], number> = {
  travel: 30,
  workout: 30,
  food: 90,
  wellness: 120,
  competition: 60,
  free: 90,
  work: 480,
  geburi: 12*60, // 13 hours for birthday event
};

export function getEventDuration(event: TripEvent): number {
  return EVENT_DURATIONS[event.type] ?? 60;
}

export function getEventEnd(event: TripEvent): Date {
  return new Date(event.date.getTime() + getEventDuration(event) * 60 * 1000);
}

// 🟢 Current event = event that is happening NOW
export function getCurrentEvent(): TripEvent | null {
  const now = getNow();

  return getAllEvents().find(event => {
    const start = event.date;
    const end = getEventEnd(event);
    return now >= start && now < end;
  }) ?? null;
}

// 🔵 Next event = first event in the future
export function getNextEvent(): TripEvent | null {
  const now = getNow();
  return getAllEvents().find(event => event.date > now) ?? null;
}

// 📊 Progress (0–1)
export function getEventProgress(event: TripEvent): number {
  const now = getNow().getTime();
  const start = event.date.getTime();
  const end = getEventEnd(event).getTime();

  if (now <= start) return 0;
  if (now >= end) return 1;

  return (now - start) / (end - start);
}
