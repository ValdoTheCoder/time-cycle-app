import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/store/timerStore';
import { playPhaseChangeSound, playCompletionSound } from '@/utils/audio';
import { vibrateHeavy, vibratePattern } from '@/utils/haptics';

export const useTimer = () => {
  const { isRunning, isPaused, tick, phase, timeRemaining } = useTimerStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevPhaseRef = useRef(phase);
  const prevTimeRef = useRef(timeRemaining);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning, isPaused, tick]);

  // Detect phase changes and play alerts
  useEffect(() => {
    if (prevPhaseRef.current !== phase && phase !== 'idle') {
      playPhaseChangeSound();
      vibrateHeavy();
    }
    prevPhaseRef.current = phase;
  }, [phase]);

  // Detect completion
  useEffect(() => {
    if (prevTimeRef.current > 0 && timeRemaining === 0 && phase === 'idle' && !isRunning) {
      playCompletionSound();
      vibratePattern([200, 100, 200, 100, 200]);
    }
    prevTimeRef.current = timeRemaining;
  }, [timeRemaining, phase, isRunning]);
};
