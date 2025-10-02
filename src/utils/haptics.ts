import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const vibrateLight = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (error) {
    // Fallback to Web Vibration API
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
};

export const vibrateMedium = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (error) {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }
};

export const vibrateHeavy = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch (error) {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }
};

export const vibratePattern = async (pattern: number[]) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
