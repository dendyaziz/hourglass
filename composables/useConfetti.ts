import { confetti as confettiFunction } from '@tsparticles/confetti'

/**
 * Composable for confetti functionality.
 */
export function useConfetti() {
  /**
   * Start the firework animation.
   * @param duration - Duration of the confetti animation in milliseconds.
   */
  function startFirework(duration = 7000): void {
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 20 }

    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 35 * (timeLeft / duration)

      confettiFunction(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        }),
      )

      confettiFunction(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)
  }

  return {
    startFirework,
  }
}
