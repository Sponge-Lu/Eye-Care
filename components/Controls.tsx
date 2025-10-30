
import React from 'react';

// Define Icon components outside of the main component to prevent re-creation on re-renders.
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
);

interface ControlsProps {
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isActive, toggleTimer, resetTimer }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={toggleTimer}
        className={`flex items-center justify-center w-36 h-14 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
          isActive
            ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400'
            : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-400'
        }`}
      >
        {isActive ? <PauseIcon className="w-6 h-6 mr-2" /> : <PlayIcon className="w-6 h-6 mr-2" />}
        <span>{isActive ? '暂停' : '开始'}</span>
      </button>
      <button
        onClick={resetTimer}
        className="flex items-center justify-center w-14 h-14 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500"
        aria-label="Reset Timer"
      >
        <ResetIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Controls;
