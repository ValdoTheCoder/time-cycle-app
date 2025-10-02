import { create } from 'zustand';

export type TimerPhase = 'work' | 'rest' | 'idle';

export interface TimerConfig {
  workTime: number; // seconds
  restTime: number; // seconds
  rounds: number;
}

export interface TimerState {
  config: TimerConfig;
  currentRound: number;
  phase: TimerPhase;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  
  // Actions
  setConfig: (config: TimerConfig) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  skipPhase: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  config: {
    workTime: 30,
    restTime: 10,
    rounds: 5,
  },
  currentRound: 1,
  phase: 'idle',
  timeRemaining: 0,
  isRunning: false,
  isPaused: false,

  setConfig: (config) => set({ config }),

  startTimer: () => {
    const { config } = get();
    set({
      phase: 'work',
      currentRound: 1,
      timeRemaining: config.workTime,
      isRunning: true,
      isPaused: false,
    });
  },

  pauseTimer: () => set({ isPaused: true }),

  resumeTimer: () => set({ isPaused: false }),

  resetTimer: () => set({
    phase: 'idle',
    currentRound: 1,
    timeRemaining: 0,
    isRunning: false,
    isPaused: false,
  }),

  skipPhase: () => {
    const { phase, currentRound, config } = get();
    
    if (phase === 'work') {
      // Skip to rest phase
      set({
        phase: 'rest',
        timeRemaining: config.restTime,
      });
    } else if (phase === 'rest') {
      // Skip to next round
      if (currentRound < config.rounds) {
        set({
          phase: 'work',
          currentRound: currentRound + 1,
          timeRemaining: config.workTime,
        });
      } else {
        // Finished all rounds
        set({
          phase: 'idle',
          isRunning: false,
          timeRemaining: 0,
        });
      }
    }
  },

  tick: () => {
    const { timeRemaining, phase, currentRound, config, isPaused } = get();
    
    if (isPaused) return;

    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    } else {
      // Time's up, switch phase
      if (phase === 'work') {
        set({
          phase: 'rest',
          timeRemaining: config.restTime,
        });
      } else if (phase === 'rest') {
        if (currentRound < config.rounds) {
          set({
            phase: 'work',
            currentRound: currentRound + 1,
            timeRemaining: config.workTime,
          });
        } else {
          // Finished all rounds
          set({
            phase: 'idle',
            isRunning: false,
            timeRemaining: 0,
          });
        }
      }
    }
  },
}));
