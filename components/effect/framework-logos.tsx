import { Card } from "@/components/ui/card"

const frameworks = [
  { name: "React", color: "from-blue-400 to-blue-600", emoji: "⚛️", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Vue", color: "from-green-400 to-green-600", emoji: "💚", bgColor: "bg-green-50 dark:bg-green-900/20" },
  { name: "Svelte", color: "from-orange-400 to-red-500", emoji: "🔥", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { name: "Lit", color: "from-yellow-400 to-orange-500", emoji: "💡", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
  { name: "Solid", color: "from-blue-500 to-purple-600", emoji: "🗿", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "Qwik", color: "from-purple-400 to-pink-500", emoji: "⚡", bgColor: "bg-pink-50 dark:bg-pink-900/20" }
]

export function FrameworkLogos() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-2 mb-8 shadow-xl">
            <span className="text-2xl animate-spin">🎪</span>
            <span className="font-bold text-lg">PARTY GUESTS</span>
            <span className="text-2xl animate-spin">🎪</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Meet the Party</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {frameworks.map((framework, index) => (
            <Card
              key={framework.name}
              className={`group ${framework.bgColor} backdrop-blur-sm border-3 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 hover:scale-125 hover:shadow-2xl cursor-pointer transform hover:-translate-y-4`}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.8s ease-out forwards"
              }}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-6 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">{framework.emoji}</div>
                <div className={`text-2xl font-black bg-gradient-to-r ${framework.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {framework.name}
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`h-1 bg-gradient-to-r ${framework.color} rounded-full`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating framework icons */}
        <div className="relative mt-16 h-32">
          {frameworks.map((framework, index) => (
            <div
              key={`floating-${framework.name}`}
              className="absolute text-4xl opacity-20 dark:opacity-10 animate-bounce"
              style={{
                left: `${10 + index * 15}%`,
                top: `${Math.sin(index) * 20 + 50}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: "3s"
              }}
            >
              {framework.emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
