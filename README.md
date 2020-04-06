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
