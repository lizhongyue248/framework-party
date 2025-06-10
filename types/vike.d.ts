declare global {
  namespace Vike {
    interface PageContext {
      nav?: NavData[]
      Page: () => React.ReactElement
    }
  }
}

export {}
