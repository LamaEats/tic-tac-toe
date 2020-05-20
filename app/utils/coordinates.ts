export const getHashKey = (x: number, y: number): string => `${x}:${y}`;

export const parseHashKey = (coordinates: string): number[] => coordinates.split(':').map(Number);
