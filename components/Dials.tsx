import React from 'react';

interface DialProps {
  value: number;
  label: string;
  color?: string;
}

const Dial: React.FC<DialProps> = ({ value, label, color = "bg-sys-black" }) => {
  // Calculate rotation: -135deg (0%) to 135deg (100%)
  const rotation = -135 + (value / 100) * 270;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative w-16 h-16 rounded-full bg-sys-black flex items-center justify-center shadow-inner">
        {/* Tick marks simulation */}
        <div className="absolute inset-0 rounded-full border border-gray-700 opacity-50"></div>
        
        {/* Needle */}
        <div 
          className="absolute w-1 h-7 bg-white origin-bottom bottom-1/2 rounded-full transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
        
        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-gray-500 rounded-full"></div>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600 font-bold">{label}</span>
        <span className={`font-mono text-xs font-bold ${label === 'DANGER' ? 'text-red-600' : 'text-accent-orange'}`}>
          {Math.round(value)}
        </span>
      </div>
    </div>
  );
};

interface MetricsDisplayProps {
  metrics: {
    danger_level: number;
    cringe_factor: number;
    simp_level: number;
  };
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  return (
    <div className="flex justify-between w-full px-2 py-4">
      <Dial value={metrics.danger_level} label="DANGER" />
      <Dial value={metrics.cringe_factor} label="CRINGE" />
      <Dial value={metrics.simp_level} label="SIMP" />
    </div>
  );
};