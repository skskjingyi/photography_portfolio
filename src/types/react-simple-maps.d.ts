declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, CSSProperties } from 'react'

  interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    [key: string]: unknown
  }

  interface GeographiesChildProps {
    geographies: Geography[]
  }

  export const ComposableMap: ComponentType<{
    projection?: string
    projectionConfig?: Record<string, unknown>
    style?: CSSProperties
    [key: string]: unknown
  }>

  export const ZoomableGroup: ComponentType<{
    center?: [number, number]
    zoom?: number
    children?: ReactNode
    [key: string]: unknown
  }>

  export const Geographies: ComponentType<{
    geography: string
    children: (props: GeographiesChildProps) => ReactNode
  }>

  export const Geography: ComponentType<{
    geography: Geography
    key?: string
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
    onClick?: () => void
    title?: string
    [key: string]: unknown
  }>
}
