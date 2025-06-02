"use client";

import React from 'react';

interface AstroChartProps {
  chartData: {
    houses: any[];
    planets: any[];
  };
}

const AstroChart: React.FC<AstroChartProps> = ({ chartData }) => {
  // House numbers and their positions (adjusted to match image)
  const houses = [
    { number: "1", x: "50%", y: "50%" },
    { number: "2", x: "30%", y: "30%" },
    { number: "3", x: "20%", y: "50%" },
    { number: "4", x: "30%", y: "70%" },
    { number: "5", x: "50%", y: "80%" },
    { number: "6", x: "70%", y: "70%" },
    { number: "7", x: "80%", y: "50%" },
    { number: "8", x: "70%", y: "30%" },
    { number: "9", x: "50%", y: "20%" },
    { number: "10", x: "30%", y: "30%" },
    { number: "11", x: "20%", y: "50%" },
    { number: "12", x: "30%", y: "70%" }
  ];

  // Planet symbols and their positions (adjusted to match image)
  const planets = [
    { symbol: "As", x: "45%", y: "35%" },
    { symbol: "Ke", x: "75%", y: "25%" },
    { symbol: "Gu", x: "75%", y: "45%" },
    { symbol: "Ch", x: "75%", y: "55%" },
    { symbol: "Sa", x: "50%", y: "65%" },
    { symbol: "Ra", x: "25%", y: "65%" },
    { symbol: "Sy", x: "25%", y: "45%" },
    { symbol: "Sk", x: "75%", y: "75%" }
  ];

  return (
    <div className="relative w-full aspect-square max-w-[400px]">
      {/* Greek pattern border */}
      <div className="absolute inset-0 border-[3px] border-orange-400 rounded-lg p-1">
        <div className="absolute inset-0 border-[3px] border-orange-400 rounded-lg">
          {/* Greek key pattern - top */}
          <div className="absolute top-0 left-4 right-4 h-2 bg-orange-400 flex">
            {[...Array(20)].map((_, i) => (
              <div key={`top-${i}`} className="w-2 h-2 border-r border-white"></div>
            ))}
          </div>
          {/* Greek key pattern - bottom */}
          <div className="absolute bottom-0 left-4 right-4 h-2 bg-orange-400 flex">
            {[...Array(20)].map((_, i) => (
              <div key={`bottom-${i}`} className="w-2 h-2 border-r border-white"></div>
            ))}
          </div>
          {/* Greek key pattern - left */}
          <div className="absolute left-0 top-4 bottom-4 w-2 bg-orange-400 flex flex-col">
            {[...Array(20)].map((_, i) => (
              <div key={`left-${i}`} className="w-2 h-2 border-b border-white"></div>
            ))}
          </div>
          {/* Greek key pattern - right */}
          <div className="absolute right-0 top-4 bottom-4 w-2 bg-orange-400 flex flex-col">
            {[...Array(20)].map((_, i) => (
              <div key={`right-${i}`} className="w-2 h-2 border-b border-white"></div>
            ))}
          </div>

          {/* Main chart content */}
          <div className="absolute inset-4">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-orange-400"></div>
              <div className="border-l border-b border-orange-400"></div>
              <div className="border-r border-t border-orange-400"></div>
              <div className="border-l border-t border-orange-400"></div>
            </div>
            
            {/* Diagonal lines */}
            <div className="absolute inset-0">
              <div className="absolute w-full h-0.5 bg-orange-400 top-1/2 left-0 transform -rotate-45"></div>
              <div className="absolute w-full h-0.5 bg-orange-400 top-1/2 left-0 transform rotate-45"></div>
            </div>

            {/* House numbers */}
            {houses.map((house, index) => (
              <div
                key={index}
                className="absolute text-sm font-medium text-gray-800"
                style={{
                  left: house.x,
                  top: house.y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {house.number}
              </div>
            ))}

            {/* Planet symbols */}
            {planets.map((planet, index) => (
              <div
                key={index}
                className="absolute text-sm font-medium text-orange-700"
                style={{
                  left: planet.x,
                  top: planet.y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {planet.symbol}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroChart; 