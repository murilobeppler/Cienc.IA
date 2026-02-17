"use client";

import { useEffect, useRef } from "react";

interface ProteinViewer3DProps {
    pdbData?: string;
    pdbId?: string;
}

export default function ProteinViewer3D({ pdbData, pdbId }: ProteinViewer3DProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Dynamically import 3Dmol to avoid SSR issues
        const load3Dmol = async () => {
            if (typeof window === "undefined") return;

            // @ts-ignore - 3Dmol doesn't have TypeScript definitions
            const $3Dmol = (window as any).$3Dmol;

            if (!$3Dmol || !viewerRef.current) return;

            // Initialize viewer
            const config = { backgroundColor: "rgba(0,0,0,0)" };
            const viewer = $3Dmol.createViewer(viewerRef.current, config);
            viewerInstanceRef.current = viewer;

            // Load structure
            if (pdbData) {
                viewer.addModel(pdbData, "pdb");
            } else if (pdbId) {
                // Fetch from RCSB PDB
                fetch(`https://files.rcsb.org/download/${pdbId}.pdb`)
                    .then((res) => res.text())
                    .then((data) => {
                        viewer.addModel(data, "pdb");
                        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
                        viewer.zoomTo();
                        viewer.render();
                    })
                    .catch((err) => console.error("Error loading PDB:", err));
            }

            viewer.setStyle({}, { cartoon: { color: "spectrum" } });
            viewer.zoomTo();
            viewer.render();
        };

        load3Dmol();

        return () => {
            if (viewerInstanceRef.current) {
                viewerInstanceRef.current.clear();
            }
        };
    }, [pdbData, pdbId]);

    useEffect(() => {
        // Load 3Dmol.js script
        const script = document.createElement("script");
        script.src = "https://3dmol.csb.pitt.edu/build/3Dmol-min.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[400px]">
            <div
                ref={viewerRef}
                className="w-full h-full rounded-xl overflow-hidden glass border border-white/10"
                style={{ position: "relative" }}
            />

            {/* Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                    onClick={() => {
                        if (viewerInstanceRef.current) {
                            viewerInstanceRef.current.setStyle({}, { cartoon: { color: "spectrum" } });
                            viewerInstanceRef.current.render();
                        }
                    }}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-medium border border-white/10"
                >
                    Cartoon
                </button>
                <button
                    onClick={() => {
                        if (viewerInstanceRef.current) {
                            viewerInstanceRef.current.setStyle({}, { stick: {} });
                            viewerInstanceRef.current.render();
                        }
                    }}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-medium border border-white/10"
                >
                    Stick
                </button>
                <button
                    onClick={() => {
                        if (viewerInstanceRef.current) {
                            viewerInstanceRef.current.setStyle({}, { sphere: {} });
                            viewerInstanceRef.current.render();
                        }
                    }}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-medium border border-white/10"
                >
                    Sphere
                </button>
            </div>
        </div>
    );
}
