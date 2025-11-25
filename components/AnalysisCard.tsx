import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalysisCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  delay?: number;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ icon: Icon, title, content, delay = 0 }) => {
  return (
    <div 
      className="bg-card-bg border border-gray-200 p-6 flex flex-col space-y-3 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center space-x-2 border-b border-gray-300 pb-2 mb-2 border-dashed">
        <Icon size={16} className="text-accent-red" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-sys-black">
          {title}
        </h3>
      </div>
      <p className="text-sm font-sans text-gray-700 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default AnalysisCard;