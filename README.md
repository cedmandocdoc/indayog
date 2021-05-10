# Indayog

JavaScript implementation of oscillation functions

## Overview

Indayog `(Filipino term for movement that oscillates)` is a library that simulates oscillation like simple and damped harmonic motion as a function of time.

## Installation

Install it using [npm](https://www.npmjs.com/package/indayog) or [yarn](https://yarnpkg.com/package/indayog).

```bash
npm install indayog
```

## Example

```js
import { shm, dhm } from "indayog";

// Simple Harmonic Motion
const computeSHM = shm();

// call to calculate displacement
// given a time in milliseconds
computeSHM(0);   // 0
computeSHM(50);  // 37.76882
computeSHM(100); // 69.94279

// Damped Harmonic Motion
const computeDHM = dhm();

// call to calculate displacement and velocity
// given a time in milliseconds
computeDHM(0);    // { displacement: 100, velocity: -700 }
computeDHM(1500); // { displacement: -0.28667, velocity: 8.47011 }
computeDHM(3000); // { displacement: 0, velocity: 0 }
```

## Configuration

```js
// Default config for SHM
shm({
  mass: 50,
  stiffness: 3000,
  initialDisplacement: 100
});

// Default config for DHM
dhm({
  mass: 50,
  stiffness: 3000,
  damping: 350,
  initialDisplacement: 100,
  initialVelocity: 0,
  precision: 0.01
});

// Note: In damped harmonic precision
// config pertains to how precise
// the simulation would stop since
// some motion may require longer time
// but the frequency difference is so
// little that it won't matter
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/cedmandocdoc/indayog/blob/master/LICENSE) file for details.
