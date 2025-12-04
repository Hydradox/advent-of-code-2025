import logger from '@/lib/logger';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const turnLeft = (current: number, movements: number, clicks: { value: number }): number => {
  let position = current - movements;

  if (position < 0) {
    clicks.value += 1;
    position += 100;
  }

  return position < 0
    ? turnLeft(position, 0, clicks)
    : position;
};

const turnRight = (current: number, movements: number, clicks: { value: number }): number => {

  let position = current + movements;

  if (position >= 100) {
    clicks.value += 1;
    position -= 100;
  }

  return position >= 100
    ? turnRight(position, 0, clicks)
    : position;
};

// Read files
const inputs: string[] = readFileSync(path.join(process.cwd(), 'src', 'challenges', 'day-01', 'inputs.txt'), { encoding: 'utf8' })
  .split('\n')
  .filter(line => line.trim().length > 0);

// Variables
let zeroCount = 0;
const clicks = { value: 0 };
let dial = 50;

// Parse inputs
for (const input of inputs) {
  const operation = input.charAt(0);
  const movements = Number.parseInt(input.slice(1), 10);

  // Left turn
  if (operation === 'L') {
    dial = turnLeft(dial, movements, clicks);
  }

  // Right turn
  if (operation === 'R') {
    dial = turnRight(dial, movements, clicks);
  }

  if (dial === 0) {
    zeroCount += 1;
    clicks.value += 1;
  }
}

logger.info('Zero count:', zeroCount);
logger.info('Clicks count:', clicks.value);
