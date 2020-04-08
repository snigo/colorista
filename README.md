# Colorista

Helper functions to work with [Color](https://github.com/snigo/color).

## Usage

In the terminal:
```

% npm install @lost-types/colorista

```

Then in the module:
```js

// JavaScript modules
import Colorista from '@lost-types/colorista';

// CommonJS
const Colorista = require('@lost-types/colorista');

const backgroundColor = Colorista.mix('gray', 'white', 0.5);
const primaryColor = Colorista.findByContrast(294, 0.8, backgroundColor, 4.5);

```

## Motivation

Motivation is fairly simple, I’ve created a Color type and rather than keep methods directly on the class, decided to extract them into a separate tree-shakable library called Colorista. The main purpose at the moment revolves around the contrast, I wanted to be able to find colors with specific hue values that have certain contrast relative to the base color, as well as the ability to generate random colors with certain contrast value:

```js

const targetContrast = 4.5;
const randomColor = Colorista.randomByContrast(targetContrast, '#fafefd');

randomColor.toHexString(); // #b45c41
Colorista.contrast(randomColor, '#fafefd'); // 4.54

```

## API

### Methods

#### `Colorista.contrast()`

Calcurates absolute contrast factor of 1 between two colors. Returns number in [1...21] range, **regardless of the order** of arguments. Output will be rounded to 2 decimal point digits.

| **Parameter** | **Type**   | **Default value** | **Notes**                                      |
|---------------|------------|-------------------|------------------------------------------------|
| `color`       | `AnyColor` |                   | Color to be compared                           |
| `base`        | `AnyColor` |                   | Base color to be compared against              |

NOTE: `AnyColor` here means string in rgb, hsl, #-hex notation or named color, RGB(A) array or Color instance.

```js

Colorista.contrast('white', 'hsl(0, 0%, 0%)'); // 21
Colorista.contrast('black', 'rgb(255, 255, 255)'); // 21

Colorista.contrast('blue', 'salmon'); // 3.43
```

***

#### `Colorista.cooler()`

Returns cooler version of the provided color with given intensity and optional filter color. Does not modify input color. Returns Color instance.

| **Parameter** | **Type**   | **Default value**        | **Notes**                            |
|---------------|------------|--------------------------|--------------------------------------|
| `color`       | `AnyColor` |                          | Any color to transform               |
| `intensity`   | `number`   | 0.2                      | Intensity (opacity) of the filter    |
| `filter`      | `AnyColor` | RGBArray<[67, 162, 237]> | Optional cool filter                 |

```js

const coolOrange = cooler('orange');
const coolerOrange = cooler('orange', 0.35);
const coolestOrange = cooler('orange', 0.45, 'blue');

coolOrange.toHexString(); // #fba505
coolerOrange.toRgbString(); // rgb(249, 165, 7)
coolestOrange.toHslString(); // hsl(38, 90%, 50%)

```

***

#### `Colorista.getHueByOffset()`

Returns hue value by provided hue group and hue group offset. Number in [0...359] range, representing hue angle on the color wheel, where 0 is red. More information about hue groups here: https://github.com/snigo/color#colorhuegroup

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `hueGroup`       | `number`   |                   | Desired hue group                           |
| `hueGroupOffset` | `number`   | 0                 | Hue offset within provided hue group        |

```js

Colorista.getHueByOffset(10, 5); // 300
Colorista.getHueByOffset(1, 15); // 0
Colorista.getHueByOffset(9, 0); // 225

```

***

#### `Colorista.getTone()`

Returns Color instance representing the tone of the color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Any color                                   |

```js

Colorista.getTone('hsl(34, 80%, 12%)').toHslString(); // hsl(34, 80%, 50%)
Colorista.getTone('lightblue').toHslString(); // hsl(195, 53%, 50%)
Colorista.getTone('rgb(0% 0% 0%)').name; // gray

```

***

#### `Colorista.findByContrast()`

Tries best to find and return Color instance with provided hue and saturation and given contrast ratio relative to given base color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `hue`            | `number`   |                   | Hue value of the output color               |
| `saturation`     | `number`   |                   | Saturation value of the output color        |
| `baseColor`      | `AnyColor` |                   | Base / Background color                     |
| `targetContrast` | `number`   |                   | Contrast between output and base colors     |

```js

const hue = 294;
const saturation = 0.85;
const myColor = Colorista.findByContrast(hue, saturation, 'white', 6);

myColor.toHslString(); // hsl(294, 85%, 39%)
Colorista.contrast(myColor, 'white'); // 6.17

```

NOTE: Due to the fact there is no formula to achive the result in mathematical way, at least to my knowledge, method uses binary search (aka divide and conquer) to match the closest color. Matching criteria is 0.05 delta and if it's not met algorithm outputs the last color it tries, even if semi-last was actually closer. For example, considering the code above, contrast between `white` and `hsl(294, 85%, 40%)` is 5.94 which is closer to 6, but still out of matching criteria.


***

#### `Colorista.hueShift()`

Shifts the hue of the with provided angle and returns new instance of Color woth shifted hue.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                |
| `angle`          | `number`   |                   | Angle the hue to be shifted by              |

```js

const shifted = Colorista.hueShift('yellow', 90);
shifted.toHslString(); // hsl(150, 100%, 50%)

Colorista.hueShift('hsl(0, 45%, 50%)', -100).hue; // 260

```


***

#### `Colorista.invert()`

Inverts color. Returns new instance of Color representing inverted color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                |

```js

Colorista.invert('white').toHexString(); // #000000

const invertedPink = Colorista.invert('pink');
invertedPink.toRgbString(); // rgb(0, 63, 52)

Colorista.invert(invertedPink).name; // pink

```