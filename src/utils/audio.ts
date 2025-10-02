// Simple beep sound using Web Audio API
export const playBeep = (duration: number = 200, frequency: number = 800) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.error('Error playing beep:', error);
  }
};

export const playPhaseChangeSound = () => {
  playBeep(300, 1000);
};

export const playCompletionSound = () => {
  playBeep(150, 800);
  setTimeout(() => playBeep(150, 1000), 200);
  setTimeout(() => playBeep(150, 1200), 400);
};
