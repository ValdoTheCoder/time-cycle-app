import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useTimerStore } from '@/store/timerStore';
import { vibrateLight } from '@/utils/haptics';

export const TimerSetup = () => {
  const { config, setConfig } = useTimerStore();
  const [workMinutes, setWorkMinutes] = useState(Math.floor(config.workTime / 60));
  const [workSeconds, setWorkSeconds] = useState(config.workTime % 60);
  const [restMinutes, setRestMinutes] = useState(Math.floor(config.restTime / 60));
  const [restSeconds, setRestSeconds] = useState(config.restTime % 60);
  const [rounds, setRounds] = useState(config.rounds);

  const handleSave = () => {
    vibrateLight();
    setConfig({
      workTime: workMinutes * 60 + workSeconds,
      restTime: restMinutes * 60 + restSeconds,
      rounds,
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Timer Setup</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-base mb-2 block">Work Time</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min="0"
                max="59"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="text-center text-lg"
                placeholder="Min"
              />
              <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min="0"
                max="59"
                value={workSeconds}
                onChange={(e) => setWorkSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="text-center text-lg"
                placeholder="Sec"
              />
              <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base mb-2 block">Rest Time</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min="0"
                max="59"
                value={restMinutes}
                onChange={(e) => setRestMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="text-center text-lg"
                placeholder="Min"
              />
              <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min="0"
                max="59"
                value={restSeconds}
                onChange={(e) => setRestSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="text-center text-lg"
                placeholder="Sec"
              />
              <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="rounds" className="text-base mb-2 block">Rounds</Label>
          <Input
            id="rounds"
            type="number"
            min="1"
            max="99"
            value={rounds}
            onChange={(e) => setRounds(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="text-center text-lg"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full" size="lg">
        Save Configuration
      </Button>
    </Card>
  );
};
