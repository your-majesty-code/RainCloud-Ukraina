'use client';

import { useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Member } from '@/lib/database.types';
import { CITY_COORDS } from '@/lib/networkFilters';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// Google's public demo map id enables vector maps + Advanced Markers in dev.
// Set NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID to your own styled map for production.
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

interface CityGroup {
  city: string;
  lat: number;
  lng: number;
  members: Member[];
}

function groupByCity(members: Member[]): CityGroup[] {
  const byCity: Record<string, CityGroup> = {};
  for (const m of members) {
    const coords = CITY_COORDS[m.city];
    if (!coords) continue;
    const existing = byCity[m.city];
    if (existing) existing.members.push(m);
    else byCity[m.city] = { city: m.city, ...coords, members: [m] };
  }
  return Object.values(byCity);
}

export function NetworkMap({ members }: { members: Member[] }) {
  const groups = useMemo(() => groupByCity(members), [members]);

  if (!API_KEY) {
    return (
      <div className="nm-map">
        <div className="nm-map__placeholder">
          <strong>Map integration ready</strong>
          <p>
            Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to <code>.env.local</code> to
            enable the live Google Map. Members are still listed on the left.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nm-map">
      <APIProvider apiKey={API_KEY}>
        <Map
          className="nm-map__canvas"
          mapId={MAP_ID}
          defaultCenter={{ lat: 50.0, lng: 25.0 }}
          defaultZoom={5}
          gestureHandling="greedy"
          disableDefaultUI={false}
          clickableIcons={false}
        >
          {groups.map((g) => (
            <AdvancedMarker key={g.city} position={{ lat: g.lat, lng: g.lng }} title={g.city}>
              <span className="nm-mappin">{g.members.length}</span>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
