
import React from 'react';

const CoffeeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
    </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);


interface NotificationProps {
  show: boolean;
  isWorkSession: boolean;
  onDismiss: () => void;
  restSeconds: number;
  workMinutes: number;
  exercise: { name: string; instruction: string; };
}

const Notification: React.FC<NotificationProps> = ({ show, isWorkSession, onDismiss, restSeconds, workMinutes, exercise }) => {
  if (!show) {
    return null;
  }

  const isRestStarting = !isWorkSession;
  const title = isRestStarting ? `休息时间: ${exercise.name}` : '准备工作！';
  const description = isRestStarting
    ? exercise.instruction
    : `休息结束了，准备开始下一个${workMinutes}分钟的工作吧！`;
  const buttonText = isRestStarting ? `开始 ${restSeconds} 秒休息` : '开始工作';
  const buttonColor = isRestStarting ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-400';
  const Icon = isRestStarting ? EyeIcon : CoffeeIcon;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center transform transition-all animate-fade-in-up">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-700 mb-4">
          <Icon className={`h-8 w-8 ${isRestStarting ? 'text-green-400' : 'text-cyan-400'}`} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 mb-6">{description}</p>
        <button
          onClick={onDismiss}
          className={`w-full px-4 py-3 font-bold text-white rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 ${buttonColor}`}
        >
          {buttonText}
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Notification;