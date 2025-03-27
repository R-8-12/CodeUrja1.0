'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from "@/components/properties-table";

// Configure default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  properties: Property[];
  selected: Property | null;
}

// Updated city areas with precise coordinates
const cityAreas = [
  {
    name: "Mira-Bhayandar, Mumbai",
    center: [19.2869, 72.8422] as [number, number],
    radius: 2000,
    description: "Prime residential area in Mumbai suburbs"
  },
  {
    name: "Central Delhi",
    center: [28.6139, 77.2090] as [number, number],
    radius: 5000,
    description: "Metropolitan hub in capital city"
  },
  {
    name: "Indore City",
    center: [22.7196, 75.8577] as [number, number],
    radius: 3000,
    description: "Developing commercial/residential zone"
  }
];

export function MapComponent1({ properties, selected }: MapComponentProps) {
  const position: [number, number] = [23.2599, 77.4126]; // Central India coordinates
  const zoomLevel = 6;

  // Circle styling
  const areaStyle = {
    color: "#ff7800",
    fillColor: "#ff7800",
    fillOpacity: 0.2,
    weight: 2
  };

  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* City area circles */}
      {cityAreas.map((area, index) => (
        <Circle
          key={`area-${index}`}
          center={area.center}
          radius={area.radius}
          pathOptions={areaStyle}
        >
          <Popup>
            <div className="font-bold text-sm mb-1">{area.name}</div>
            <div className="text-xs">{area.description}</div>
            <div className="text-xs text-gray-500">Radius: {area.radius/1000}km</div>
          </Popup>
        </Circle>
      ))}

      {/* Property markers */}
      {properties.map((property) => {
        const coordinates = propertyToCoordinates(property);
        if (!coordinates) return null;

        return (
          <Marker key={property.id} position={coordinates}>
            <Popup className="text-sm">
              <div className="font-medium">{property.name}</div>
              {property.address && (
                <div className="text-xs text-gray-600">{property.address}</div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

function propertyToCoordinates(property: Property): [number, number] | null {
  if (property.latitude && property.longitude) {
    return [property.latitude, property.longitude];
  }
  return null;
}