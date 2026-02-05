"use client";

import { Location } from "@/lib/types";

export function LocationMap({ location }: { location: Location }) {
    // Calculate a rough bounding box for the map view
    const delta = 0.1; // roughly 10km view
    const bbox = `${location.lon - delta},${location.lat - delta},${location.lon + delta},${location.lat + delta}`;

    return (
        <div className="glass-card rounded-3xl p-6 h-full flex flex-col">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
                Location Tracker
            </h3>
            <div className="flex-grow w-full rounded-xl overflow-hidden border border-white/10 relative min-h-[300px]">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lon}`}
                    className="absolute inset-0"
                ></iframe>
            </div>
            <div className="mt-2 text-right">
                <a
                    href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=12/${location.lat}/${location.lon}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-arctic-400 hover:text-arctic-300 transition-colors"
                >
                    View Larger Map
                </a>
            </div>
        </div>
    );
}
