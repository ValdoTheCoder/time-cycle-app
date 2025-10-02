import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useTimerStore } from '@/store/timerStore';
import { vibrateLight } from '@/utils/haptics';

export const TimerControls = () => {
  const { isRunning, isPaused, startTimer, pauseTimer, resumeTimer, resetTimer, skipPhase, phase } = useTimerStore();

  const handleStart = () => {
    vibrateLight();
    startTimer();
  };

  const handlePause = () => {
    vibrateLight();
    pauseTimer();
  };

  const handleResume = () => {
    vibrateLight();
    resumeTimer();
  };

  const handleReset = () => {
    vibrateLight();
    resetTimer();
  };

  const handleSkip = () => {
    vibrateLight();
    skipPhase();
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {!isRunning ? (
        <Button
          size="lg"
          onClick={handleStart}
          className="w-32 h-32 rounded-full text-xl font-semibold shadow-lg"
        >
          <Play className="mr-2 h-8 w-8" />
          Start
        </Button>
      ) : (
        <>
          <Button
            size="lg"
            variant="outline"
            onClick={handleReset}
            className="w-16 h-16 rounded-full"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>

          <Button
            size="lg"
            onClick={isPaused ? handleResume : handlePause}
            className="w-28 h-28 rounded-full text-lg font-semibold shadow-lg"
          >
            {isPaused ? (
              <>
                <Play className="mr-2 h-7 w-7" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 h-7 w-7" />
                Pause
              </>
            )}
          </Button>

          {phase !== 'idle' && (
            <Button
              size="lg"
              variant="outline"
              onClick={handleSkip}
              className="w-16 h-16 rounded-full"
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
