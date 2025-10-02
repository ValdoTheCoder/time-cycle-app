import { TimerPhase } from '@/store/timerStore';

interface CircularTimerProps {
  timeRemaining: number;
  totalTime: number;
  phase: TimerPhase;
}

export const CircularTimer = ({ timeRemaining, totalTime, phase }: CircularTimerProps) => {
  const progress = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const phaseColor = phase === 'work' ? 'hsl(var(--work-phase))' : 'hsl(var(--rest-phase))';
  const phaseText = phase === 'work' ? 'WORK' : phase === 'rest' ? 'REST' : 'READY';

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-80 h-80">
        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke={phaseColor}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_var(--timer-glow)]"
          style={{
            filter: `drop-shadow(0 0 8px ${phaseColor})`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-7xl font-bold tabular-nums tracking-tight">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <div 
          className="text-lg font-semibold mt-2 tracking-widest"
          style={{ color: phaseColor }}
        >
          {phaseText}
        </div>
      </div>
    </div>
  );
};
