export interface I18nData {
  common: {
    loading: string
    error: string
    notFound: string
    backToHome: string
  }
  home: {
    title: string
    description: string
    action: string
    welcome: string
    summary: {
      frameworks: string
      features: string
      possibilities: string
      openSource: string
    }
    guest: {
      title: string
      subTitle: string
    }
    main: {
      title: string
      subTitle: string
      description: string
    }
    table: {
      title: string
      features: string
      showAll: string
      showLess: string
    }
    why: {
      title: string
      description: string
      question: Array<{
        title: string
        description: string
        emoji: string
      }>
    }
    party: {
      title: string
      description: string
      action: string
      github: string
    }
    footer: {
      description: string
    }
  }
}
