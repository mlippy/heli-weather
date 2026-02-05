"use client";

import { Location } from "@/lib/types";
import { LOCATIONS } from "@/services/weather";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix for default marker icon in React-Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

const DefaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const SelectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapController({ selectedLocation }: { selectedLocation: Location }) {
    const map = useMap();

    // Fit bounds to show all locations on mount
    useEffect(() => {
        if (LOCATIONS.length > 0) {
            const bounds = L.latLngBounds(LOCATIONS.map(l => [l.lat, l.lon]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map]);

    // Optional: Fly to selected location if desire, but user asked for "entire area visible"
    // So we might just keep the view or subtle pan. 
    // For now, let's prioritize showing the popup for the selected one.

    return null;
}

export function SatelliteMap({ location }: { location: Location }) {
    const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

    useEffect(() => {
        const marker = markerRefs.current[location.name];
        if (marker) {
            marker.openPopup();
        }
    }, [location]);

    return (
        <div className="glass-card rounded-3xl p-6 h-[600px] flex flex-col">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
                Satellite Recon
            </h3>
            <div className="flex-grow w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
                <MapContainer
                    center={[61, -149]}
                    zoom={6}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    <TileLayer
                        attribution=''
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                        opacity={0.6}
                    />

                    {LOCATIONS.map((loc) => (
                        <Marker
                            key={loc.name}
                            position={[loc.lat, loc.lon]}
                            icon={loc.name === location.name ? SelectedIcon : DefaultIcon}
                            ref={el => { markerRefs.current[loc.name] = el; }}
                            eventHandlers={{
                                click: () => {
                                    // In a real app we might want to trigger selection here, 
                                    // but we need to lift state up or just let it exist as a marker click for now.
                                }
                            }}
                            zIndexOffset={loc.name === location.name ? 1000 : 0}
                        >
                            <Popup>
                                <div className="text-slate-900 font-bold">{loc.name}</div>
                                <div className="text-slate-600 text-xs">Heli Zone</div>
                            </Popup>
                        </Marker>
                    ))}

                    <MapController selectedLocation={location} />
                </MapContainer>
            </div>
        </div>
    );
}
