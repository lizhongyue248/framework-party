import { useEffect, useState } from "react"

export function PartyEffects({ line = true }) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      emoji: string
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const emojis = ["🎉", "🎊", "✨", "🌟", "💫", "🎈", "🎁", "🎀", "🎵", "🎶", "💝", "🌈"]
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 8,
      duration: Math.random() * 3 + 2
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-3xl animate-bounce opacity-30 dark:opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Enhanced floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 " />
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 "
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 "
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-96 h-96 bg-yellow-400 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 "
        style={{ animationDelay: "6s" }}
      />

      {/* Animated light rays */}
      {line && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-400/20 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-pink-400/20 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-400/20 to-transparent animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      )}
    </div>
  )
}
