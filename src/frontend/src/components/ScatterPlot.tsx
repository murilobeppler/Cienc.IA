"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ScatterPlotProps {
    data?: { x: number[]; y: number[]; labels?: string[] };
    title?: string;
}

export default function ScatterPlot({
    data = { x: [], y: [], labels: [] },
    title = "Scatter Plot"
}: ScatterPlotProps) {
    const plotData = [
        {
            x: data.x,
            y: data.y,
            mode: "markers",
            type: "scatter",
            text: data.labels,
            marker: {
                size: 8,
                color: data.x.map((_, i) => i),
                colorscale: "Viridis",
                showscale: true,
            },
        },
    ];

    const layout = {
        title: {
            text: title,
            font: { color: "#f8fafc", size: 16 },
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(255,255,255,0.03)",
        font: { color: "#94a3b8" },
        xaxis: {
            gridcolor: "rgba(255,255,255,0.1)",
            zerolinecolor: "rgba(255,255,255,0.2)",
        },
        yaxis: {
            gridcolor: "rgba(255,255,255,0.1)",
            zerolinecolor: "rgba(255,255,255,0.2)",
        },
        hovermode: "closest",
    };

    return (
        <div className="w-full h-full">
            <Plot
                data={plotData as any}
                layout={layout as any}
                config={{ responsive: true }}
                className="w-full h-full"
            />
        </div>
    );
}
