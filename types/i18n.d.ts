export interface I18nData {
  common: {
    error: {
      notFound: string
      serverError: string
      404: {
        title: string
        description: string
        suggestion: string
      }
      500: {
        title: string
        description: string
        suggestion: string
      }
      navigation: {
        backHome: string
        goBack: string
        refreshPage: string
        searchSite: string
        viewDocs: string
        github: string
      }
      quickLinks: string
      errorCode: string
    }
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
