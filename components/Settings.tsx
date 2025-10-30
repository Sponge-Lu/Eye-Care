
import React, { useState } from 'react';

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
);

interface SettingsProps {
    workMinutes: number;
    restSeconds: number;
    onSettingsChange: (workMinutes: number, restSeconds: number) => void;
    isTimerActive: boolean;
}

const Settings: React.FC<SettingsProps> = ({ workMinutes, restSeconds, onSettingsChange, isTimerActive }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) onSettingsChange(value, restSeconds);
    };

    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) onSettingsChange(workMinutes, value);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center mx-auto text-slate-400 hover:text-cyan-400 transition-colors"
            >
                <SettingsIcon className="w-5 h-5 mr-2" />
                <span>{isOpen ? '关闭设置' : '设置'}</span>
            </button>

            {isOpen && (
                <div className={`mt-4 p-4 bg-slate-800 rounded-lg transition-all duration-300 ease-in-out ${isTimerActive ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <fieldset disabled={isTimerActive} className="space-y-4">
                        <legend className="sr-only">Timer Settings</legend>
                        <div>
                            <label htmlFor="work-duration" className="block text-sm font-medium text-slate-300">
                                工作时长 (分钟)
                            </label>
                            <input
                                type="number"
                                id="work-duration"
                                value={workMinutes}
                                onChange={handleWorkChange}
                                className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                min="1"
                            />
                        </div>
                        <div>
                            <label htmlFor="rest-duration" className="block text-sm font-medium text-slate-300">
                                休息时长 (秒)
                            </label>
                            <input
                                type="number"
                                id="rest-duration"
                                value={restSeconds}
                                onChange={handleRestChange}
                                className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                min="1"
                            />
                        </div>
                         {isTimerActive && <p className="text-xs text-amber-400 text-center">请先暂停计时器以修改设置。</p>}
                    </fieldset>
                </div>
            )}
        </div>
    );
};

export default Settings;
