import { useEffect, useState } from "react";
import {
  getCurrentEvent,
  getNextEvent,
  getEventProgress,
  getEventEnd,
  getNow,
} from "@/data/tripEngine";

export function EventStatus() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const current = getCurrentEvent();
  const next = getNextEvent();

  function format(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow">
      {current && (
        <div>
          <h2 className="font-bold text-lg">🔥 Current Event</h2>
          <p>{current.title}</p>
          <progress
            value={getEventProgress(current)}
            max={1}
            className="w-full"
          />
          <p className="text-sm text-gray-500">
            ends in {format(getEventEnd(current).getTime() - getNow().getTime())}
          </p>
        </div>
      )}

      {next && (
        <div>
          <h2 className="font-bold text-lg">⏭️ Next Event</h2>
          <p>{next.title}</p>
          <p className="text-sm text-gray-500">
            starts in {format(next.date.getTime() - getNow().getTime())}
          </p>
        </div>
      )}
    </div>
  );
}
