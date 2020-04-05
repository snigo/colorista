import { contrast, findByContrast } from './contrast';
import {
  getHueByOffset,
  getTone,
  hueShift,
  invert,
  offsetHue,
  opposite,
} from './hue';
import mix from './mix';
import {
  randomRgbColor,
  randomHslColor,
  randomByContrast,
} from './random';
import { warmer, cooler } from './temperature';

const Colorista = {
  contrast,
  cooler,
  getHueByOffset,
  getTone,
  findByContrast,
  hueShift,
  invert,
  mix,
  offsetHue,
  opposite,
  randomByContrast,
  randomHslColor,
  randomRgbColor,
  warmer,
};

export default Colorista;
