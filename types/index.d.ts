export interface File {
  path: string
  language: string
  content?: string
  startLine?: number
  endLine?: number
}

export interface DetailItem {
  name: string
  description: string
  file: File[]
}

export interface Feature {
  type: string
  description: string
  detail: DetailItem[]
}

export interface Framework {
  name: string
  description: string
  version: string
  repository: string
  website: string
  license: string
  logo: string
  feature: Feature[]
}

export interface Content {
  name: string
  repository: string
  framework: Framework[]
}

export type TaskContext = {}
