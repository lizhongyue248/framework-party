import { useEffect, useState } from "react"

interface Firework {
  id: number
  x: number
  y: number
  particles: Particle[]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  maxLife: number
}

export function FireworksEffect() {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]

    const createFirework = (x: number, y: number): Firework => {
      const particles: Particle[] = Array.from({ length: 30 }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 60,
          maxLife: 60
        }
      })

      return {
        id: Math.random(),
        x,
        y,
        particles
      }
    }

    const addFirework = () => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * (window.innerHeight * 0.6) + 100
      setFireworks((prev) => [...prev, createFirework(x, y)])
    }

    // Create initial fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(addFirework, i * 500)
    }

    const interval = setInterval(addFirework, 1500)

    const animateFireworks = () => {
      setFireworks((prevFireworks) =>
        prevFireworks
          .map((firework) => ({
            ...firework,
            particles: firework.particles
              .map((particle) => ({
                ...particle,
                x: particle.x + particle.vx,
                y: particle.y + particle.vy,
                vy: particle.vy + 0.1, // gravity
                life: particle.life - 1
              }))
              .filter((particle) => particle.life > 0)
          }))
          .filter((firework) => firework.particles.length > 0)
      )
    }

    const animationInterval = setInterval(animateFireworks, 16)

    return () => {
      clearInterval(interval)
      clearInterval(animationInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {fireworks.map((firework) =>
        firework.particles.map((particle, index) => (
          <div
            key={`${firework.id}-${index}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              backgroundColor: particle.color,
              opacity: particle.life / particle.maxLife,
              boxShadow: `0 0 6px ${particle.color}`
            }}
          />
        ))
      )}
    </div>
  )
}
