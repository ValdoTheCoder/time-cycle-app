import { useEffect, useState } from 'react';
import { useTimerStore } from '@/store/timerStore';
import { useTimer } from '@/hooks/useTimer';
import { CircularTimer } from '@/components/Timer/CircularTimer';
import { TimerControls } from '@/components/Timer/TimerControls';
import { TimerSetup } from '@/components/Timer/TimerSetup';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';
import { vibrateLight } from '@/utils/haptics';

const Index = () => {
  useTimer();
  const { phase, timeRemaining, config, currentRound, isRunning } = useTimerStore();
  const [showSetup, setShowSetup] = useState(false);

  const totalTime = phase === 'work' ? config.workTime : config.restTime;

  const handleToggleSetup = () => {
    vibrateLight();
    setShowSetup(!showSetup);
  };

  // Keep screen awake during active timer
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator && isRunning) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {
        console.log('Wake Lock error:', err);
      }
    };

    if (isRunning) {
      requestWakeLock();
    }

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Interval Timer
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleSetup}
          disabled={isRunning}
        >
          {showSetup ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md space-y-8 mt-16 mb-8">
        {showSetup ? (
          <TimerSetup />
        ) : (
          <>
            {/* Round Counter */}
            {(isRunning || currentRound > 1) && (
              <div className="text-center">
                <div className="text-lg text-muted-foreground">Round</div>
                <div className="text-4xl font-bold">
                  {currentRound} / {config.rounds}
                </div>
              </div>
            )}

            {/* Circular Timer */}
            <CircularTimer
              timeRemaining={timeRemaining}
              totalTime={totalTime}
              phase={phase}
            />

            {/* Controls */}
            <TimerControls />

            {/* Quick Config Display */}
            {!isRunning && (
              <div className="text-center space-y-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-semibold text-work">Work:</span> {Math.floor(config.workTime / 60)}:{(config.workTime % 60).toString().padStart(2, '0')}
                  {' • '}
                  <span className="font-semibold text-rest">Rest:</span> {Math.floor(config.restTime / 60)}:{(config.restTime % 60).toString().padStart(2, '0')}
                  {' • '}
                  <span className="font-semibold">Rounds:</span> {config.rounds}
                </div>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={handleToggleSetup}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Tap settings to configure
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
