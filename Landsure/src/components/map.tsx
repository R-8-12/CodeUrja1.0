// components/map.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapComponent() {
  // Indore, India coordinates (22.7196° N, 75.8577° E)
  const indorePosition: L.LatLngExpression = [22.7196, 75.8577];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={indorePosition}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={indorePosition}>
          <Popup>
            <div className="space-y-1">
              <h3 className="font-semibold">Indore, India</h3>
              <p className="text-sm">Land Registry Office</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}