
import React from 'react';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);

interface ForcedRestOverlayProps {
  exercise: { name: string; instruction: string; };
  secondsLeft: number;
}

const ForcedRestOverlay: React.FC<ForcedRestOverlayProps> = ({ exercise, secondsLeft }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-95 flex flex-col items-center justify-center z-[100] text-white p-4 animate-fade-in">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-slate-800 mb-6">
            <EyeIcon className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">{exercise.name}</h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-8">{exercise.instruction}</p>
        <div className="text-7xl md:text-8xl font-mono font-bold text-green-400">
          {formatTime(secondsLeft)}
        </div>
        <p className="text-slate-400 tracking-widest uppercase text-sm mt-4">休息时间</p>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ForcedRestOverlay;
