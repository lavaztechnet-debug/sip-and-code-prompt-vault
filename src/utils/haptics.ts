export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'selection' = 'light') => {
  if (typeof window !== 'undefined' && navigator && navigator.vibrate) {
    try {
      switch (type) {
        case 'selection':
        case 'light': navigator.vibrate(10); break;
        case 'medium': navigator.vibrate(20); break;
        case 'heavy': navigator.vibrate(40); break;
        case 'success': navigator.vibrate([15, 30, 20]); break;
        case 'error': navigator.vibrate([20, 40, 20, 40, 30]); break;
      }
    } catch (e) {
      // Ignore if blocked by browser policy
    }
  }
};
