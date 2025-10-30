
import React from 'react';

interface TimerDisplayProps {
  secondsLeft: number;
  isWorkSession: boolean;
  progress: number;
  exerciseName: string;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ secondsLeft, isWorkSession, progress, exerciseName }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const progressColorClass = isWorkSession ? 'text-cyan-400' : 'text-green-400';

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="8"
          className="stroke-slate-700"
          fill="transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="8"
          className={`transition-all duration-500 ease-linear ${isWorkSession ? 'stroke-cyan-500' : 'stroke-green-500'}`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 text-center">
        <div className={`text-6xl font-mono font-bold ${progressColorClass}`}>
          {formatTime(secondsLeft)}
        </div>
        <div className="text-slate-400 tracking-widest uppercase text-sm mt-2">
          {isWorkSession ? '工作' : exerciseName}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;