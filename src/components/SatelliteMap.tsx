"use client";

import { Location } from "@/lib/types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon in React-Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapRecenter({ lat, lon }: { lat: number, lon: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lon]);
    }, [lat, lon, map]);
    return null;
}

export function SatelliteMap({ location }: { location: Location }) {
    return (
        <div className="glass-card rounded-3xl p-6 h-[500px] flex flex-col">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
                Satellite Recon
            </h3>
            <div className="flex-grow w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
                <MapContainer
                    center={[location.lat, location.lon]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    {/* Esri World Imagery (Satellite) */}
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    {/* Optional: Add labels on top */}
                    <TileLayer
                        attribution=''
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                        opacity={0.6}
                    />

                    <Marker position={[location.lat, location.lon]}>
                        <Popup>
                            {location.name} <br /> Heli LZ
                        </Popup>
                    </Marker>
                    <MapRecenter lat={location.lat} lon={location.lon} />
                </MapContainer>
            </div>
        </div>
    );
}
