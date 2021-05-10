const dhConfigMap = new Map();

const dhm = ({
  mass = 50,
  stiffness = 3000,
  damping = 350,
  initialDisplacement = 100,
  initialVelocity = 0,
  precision = 0.01
} = {}) => time => {
  const t = time / 1000;
  const b = damping;
  const m = mass;
  const k = stiffness;
  const x0 = initialDisplacement;
  const x1 = initialVelocity;

  let velocity = 0;
  let displacement = 0;

  const z = b / Math.sqrt(4 * k * m);
  if (z < 1) {
    // underdamped
    const w = Math.sqrt(Math.abs(Math.pow(b / m, 2) - (4 * k) / m));
    const B = -(x1 + (x0 * b) / (2 * m)) / w;
    const A = x0;
    displacement =
      Math.exp((-b * t) / (2 * m)) *
      (A * Math.cos(w * t) + B * Math.sin(w * t));
    velocity =
      (A * Math.cos(w * t) + B * Math.sin(w * t)) *
        (-1 * (b / (2 * m))) *
        Math.exp((-1 * b * t) / (2 * m)) +
      (A * w * Math.sin(w * t) + B * w * Math.cos(w * t)) *
        Math.exp((-1 * b * t) / (2 * m));
  } else if (z === 1) {
    // critically damped
    const r = -(b / (2 * m));
    const B = x1 - x0 * r;
    const A = x0;
    displacement = A * Math.exp(r * t) + B * t * Math.exp(r * t);
    velocity =
      A * r * Math.exp(r * t) + B * (Math.exp(r * t) + t * Math.exp(r * t));
  } else if (z > 1) {
    // overdamped
    const w = Math.sqrt(Math.abs(Math.pow(b / m, 2) - (4 * k) / m));
    const r1 = 0.5 * (-b / m + w);
    const r2 = 0.5 * (-b / m - w);
    const B = (x1 - r1 * x0) / (r2 - r1);
    const A = x0 - B;
    displacement = A * Math.exp(r1 * t) + B * Math.exp(r2 * t);
    velocity = A * r1 * Math.exp(r1 * t) + B * r2 * Math.exp(r2 * t);
  }

  if (Math.abs(velocity) <= precision || Math.abs(displacement) <= precision) {
    displacement = 0;
    velocity = 0;
  }

  return { displacement, velocity };
};

const dhd = ({
  mass = 50,
  stiffness = 3000,
  damping = 350,
  initialDisplacement = 100,
  initialVelocity = 0,
  precision = 0.01
} = {}) => {
  const key = [
    mass,
    stiffness,
    damping,
    initialDisplacement,
    initialVelocity,
    precision
  ].join(",");
  // memoize
  if (dhConfigMap.has(key)) return dhConfigMap.get(key);

  const b = damping;
  const m = mass;
  const k = stiffness;
  const x0 = initialDisplacement;

  const z = b / Math.sqrt(4 * k * m);

  if (z < 1) {
    return ((-2 * m * Math.log(precision / x0)) / b) * 1000;
  }

  let time = 0;
  while (true) {
    time += 100 / 6;
    const { displacement, velocity } = dhm(
      {
        mass,
        stiffness,
        damping,
        initialDisplacement,
        initialVelocity,
        precision
      },
      time
    );
    if (displacement === 0 && velocity === 0) break;
  }

  dhConfigMap.set(key, time);

  return time;
};

const shm = ({
  mass = 50,
  stiffness = 3000,
  initialDisplacement = 100
} = {}) => time =>
  initialDisplacement * Math.sin((Math.sqrt(stiffness / mass) * time) / 1000);

export { dhm, dhd, shm };
