import type { AxisValue } from '../types/app'

export const getHashKey = (x: AxisValue, y: AxisValue): string => `${x}:${y}`

export const parseHashKey = (coordinates: string): number[] => coordinates.split(':').map(Number)
