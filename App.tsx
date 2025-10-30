import React, { useState, useEffect, useRef, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Settings from './components/Settings';
import ForcedRestOverlay from './components/ForcedRestOverlay';

const eyeExercises = [
  { name: '20-20-20 法则', instruction: '看20英尺（约6米）外的物体至少20秒。' },
  { name: '远近调焦', instruction: '伸出你的食指，先看指尖几秒钟，然后望向远处的物体几秒钟。重复几次。' },
  { name: '眼球转动', instruction: '保持头部不动，慢慢地顺时针转动眼球5圈，然后逆时针转动5圈。' },
  { name: '快速眨眼', instruction: '快速眨眼20次，然后闭上眼睛，深呼吸，放松一下。' },
  { name: '掌心捂眼', instruction: '搓热双手，然后用掌心轻轻盖住眼睛，在黑暗中放松。' }
];


const App: React.FC = () => {
  const [workMinutes, setWorkMinutes] = useState(20);
  const [restSeconds, setRestSeconds] = useState(20);

  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(eyeExercises[0]);


  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
        // Use a base64 data URI to avoid external network requests and potential errors.
        notificationSoundRef.current = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-');
        notificationSoundRef.current.volume = 0.5;
    }
  }, []);

  const resetTimer = useCallback((isWork: boolean) => {
    setIsWorkSession(isWork);
    const newTotal = isWork ? workMinutes * 60 : restSeconds;
    setSecondsLeft(newTotal);
  }, [workMinutes, restSeconds]);
  
  useEffect(() => {
    if (!isActive) {
      resetTimer(isWorkSession);
    }
  }, [workMinutes, restSeconds, resetTimer, isActive, isWorkSession]);


  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
        if (notificationSoundRef.current) {
            notificationSoundRef.current.play().catch(e => console.error("Error playing sound:", e));
        }

        if (isWorkSession) {
            // Work session ended. Start a forced rest session automatically.
            const randomIndex = Math.floor(Math.random() * eyeExercises.length);
            setCurrentExercise(eyeExercises[randomIndex]);
            resetTimer(false); // Switch to rest session parameters
        } else {
            // Rest session ended. Automatically start the next work session.
            resetTimer(true); // Switch to work session parameters
        }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, secondsLeft, isWorkSession, resetTimer]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    resetTimer(true);
  };
  
  const handleSettingsChange = (newWorkMinutes: number, newRestSeconds: number) => {
    setWorkMinutes(newWorkMinutes);
    setRestSeconds(newRestSeconds);
  };

  const totalSeconds = isWorkSession ? workMinutes * 60 : restSeconds;
  const progress = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;


  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans transition-colors duration-500">
      <div className="w-full max-w-md mx-auto text-center">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">护眼小助手</h1>
          <p className="text-slate-400 mt-2">使用 20-20-20 法则和眼部锻炼，关爱您的眼睛</p>
        </header>

        <main className="mb-8">
          <TimerDisplay 
            secondsLeft={secondsLeft} 
            isWorkSession={isWorkSession} 
            progress={progress}
            exerciseName={currentExercise.name}
          />
        </main>

        <footer className="space-y-6">
          <Controls 
            isActive={isActive} 
            toggleTimer={toggleTimer} 
            resetTimer={handleReset} 
          />
          <Settings 
            workMinutes={workMinutes}
            restSeconds={restSeconds}
            onSettingsChange={handleSettingsChange}
            isTimerActive={isActive}
          />
        </footer>
      </div>

      {isActive && !isWorkSession && (
        <ForcedRestOverlay 
          exercise={currentExercise}
          secondsLeft={secondsLeft}
        />
      )}
    </div>
  );
};

export default App;