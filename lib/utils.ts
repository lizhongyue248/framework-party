// Only client

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFileName = (path: string): string => {
  return path.split("/").pop() || path
}

const configs: Record<string, { color: string; bgColor: string }> = {
  React: {
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  Vue: {
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  Svelte: {
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20"
  },
  Lit: {
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
  },
  Solid: {
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  Qwik: {
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20"
  },
  "Spring Boot": {
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  Quarkus: {
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  },
  Micronaut: {
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  "React Native": {
    color: "from-blue-400 to-purple-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  Flutter: {
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
  },
  Ionic: {
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
  }
}

export const getFrameworkConfig = (name: string) => {
  return (
    configs[name] || {
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    }
  )
}
