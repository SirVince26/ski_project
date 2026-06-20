"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Resort } from "@/lib/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  resorts: Resort[];
  center?: [number, number];
  zoom?: number;
}

export default function ResortMap({ resorts, center, zoom }: Props) {
  // Default to central East Coast if no center provided
  const mapCenter = center || [42.5, -74.0];
  const mapZoom = zoom || 6;

  // Fix for React-Leaflet hydration mismatch and icon issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Manually fix the Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ height: "100%", width: "100%", minHeight: "400px" }}>
      <MapContainer 
        center={mapCenter as any} 
        zoom={mapZoom} 
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {resorts.map((resort) => (
          <Marker key={resort.id} position={[resort.latitude, resort.longitude]}>
            <Popup>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <h3 className="font-bold text-lg leading-tight">{resort.name}</h3>
                <div className="flex gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{resort.state}</Badge>
                  <span className="text-xs text-muted-foreground self-center capitalize">
                    {resort.difficulty_level?.replace('-', ' ')}
                  </span>
                </div>
                {resort.lift_ticket_price_usd && (
                  <p className="text-sm font-medium m-0">Lift Ticket: ${resort.lift_ticket_price_usd}</p>
                )}
                <Link 
                  href={`/resorts/${resort.slug}`}
                  className="text-blue-600 hover:underline text-sm font-medium mt-1 inline-block"
                >
                  View Details &rarr;
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
