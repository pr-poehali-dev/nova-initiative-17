import type { ReactNode } from "react"

export interface PhotoItem {
  src: string
  caption: string
  fullSrc?: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  type?: 'default' | 'photo' | 'text'
  photos?: PhotoItem[]
  year?: string
  quote?: string
}

export interface SectionProps extends Section {
  isActive: boolean
}
