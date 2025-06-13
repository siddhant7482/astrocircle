"use client";

import React from 'react';

interface Planet {
  symbol: string;
  x: number;
  y: number;
}

interface ChartData {
  planets: Planet[];
}

interface AstroChartProps {
  data: ChartData;
}

const AstroChart: React.FC<AstroChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 border rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#4F46E5" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#7C3AED" strokeWidth="1" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#8B5CF6" strokeWidth="1" />
        
        {data.planets.map((planet, index) => (
          <text
            key={index}
            x={planet.x}
            y={planet.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fill="#1F2937"
          >
            {planet.symbol}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default AstroChart; 