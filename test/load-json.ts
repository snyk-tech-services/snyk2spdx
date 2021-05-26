import { readFileSync } from 'fs';

export function loadJson<JsonFormat>(filename: string): JsonFormat {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}
