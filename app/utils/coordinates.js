export const getHashKey = (x, y) => `${x}:${y}`

export const parseHashKey = (coordinates) => coordinates.split(':').map(Number)
