import { test, expect } from '@playwright/test';

function defineEvenNumbers(val: number): string {
  return val % 2 === 0 ? `${val} is even number` : `${val} is odd number`;
}

function compareNumbers(val1: number, val2: number): string {
  if (val1 !== val2) {
    return val1 > val2
      ? `${val1} is greater than ${val2}`
      : `${val1} is less than ${val2}`;
  } else {
    return `${val1} is equal to ${val2}`;
  }
}

// Pos/neg: positive, negative, zero
// Boundary values: 1, 0, -1, (1.7976931348623157e308), (-1.7976931348623157e308)

///////////////////// defineEvenNumbers() ////////////////////////

test('TS-1 is positive odd', async () => {
  expect(defineEvenNumbers(1)).toContain('is odd number');
});

test('TS-2 is zero', async () => {
  expect(defineEvenNumbers(0)).toContain('is even number');
});

test('TS-3 is negative odd', async () => {
  expect(defineEvenNumbers(-1)).toContain('is odd number');
});

test('TS-4 is positive max', async () => {
  expect(defineEvenNumbers(1.7976931348623157e308)).toContain('is even number');
});

test('TS-5 is negative max', async () => {
  expect(defineEvenNumbers(-1.7976931348623157e308)).toContain(
    'is even number',
  );
});

///////////////////// compareNumbers() ////////////////////////

test('TS-1 equal values', async () => {
  expect(compareNumbers(0, 0)).toContain('is equal to');
});

test('TS-2 (1 > 0)', async () => {
  expect(compareNumbers(1, 0)).toContain('is greater');
});

test('TS-3 (-1 > 0)', async () => {
  expect(compareNumbers(-1, 0)).toContain('is less');
});

test('TS-4 (max > min)', async () => {
  expect(
    compareNumbers(1.7976931348623157e308, -1.7976931348623157e308),
  ).toContain('is greater');
});

test('TS-5 (equal max values)', async () => {
  expect(
    compareNumbers(1.7976931348623157e308, 1.7976931348623157e308),
  ).toContain('is equal');
});
