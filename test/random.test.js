import Range from '@lost-types/range';
import Color from '@lost-types/color';
import { contrast } from '../src/contrast';
import { randomRgbColor, randomHslColor, randomByContrast } from '../src/random';

test('randomRgbColor gererates random color', () => {
  const totallyRandom = randomRgbColor();
  const rgbRange = new Range(255);

  expect(totallyRandom).toBeInstanceOf(Color);
  expect(rgbRange.has(totallyRandom.red)).toBe(true);
  expect(rgbRange.has(totallyRandom.green)).toBe(true);
  expect(rgbRange.has(totallyRandom.blue)).toBe(true);

  const rangedAndFixed = randomRgbColor([5, 35], 0);
  const redRange = new Range(5, 35);

  expect(redRange.has(rangedAndFixed.red)).toBe(true);
  expect(rangedAndFixed.green).toBe(0);
  expect(rgbRange.has(rangedAndFixed.blue)).toBe(true);
});

test('randomHslColor gererates random color', () => {
  const totallyRandom = randomHslColor();
  const hueRange = new Range(359);
  const hslRange = new Range(100);

  expect(totallyRandom).toBeInstanceOf(Color);
  expect(hueRange.has(totallyRandom.hue)).toBe(true);
  expect(hslRange.has(totallyRandom.saturation)).toBe(true);
  expect(hslRange.has(totallyRandom.lightness)).toBe(true);

  const rangedAndFixed = randomRgbColor([0, 359], [75, 95], 50);
  const saturationRange = new Range(75, 95);

  expect(hueRange.has(rangedAndFixed.hue)).toBe(true);
  expect(saturationRange.has(rangedAndFixed.saturation)).toBe(true);
  expect(rangedAndFixed.lightness).toBe(0);
});

test('randomByContrast function should generate random color', () => {
  const randomColor = randomByContrast(4.5, 'white', [60, 100]);
  const saturationRange = new Range(60, 100);

  expect(randomColor).toBeInstanceOf(Color);
  expect(saturationRange.has(randomColor.saturation)).toBe(true);
  expect(contrast(randomColor, 'white')).toBeCloseTo(4.5, 0);
});
