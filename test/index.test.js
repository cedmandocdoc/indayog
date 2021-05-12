const { dhm, dhd, shm } = require("../dist/indayog.cjs");
const data = require("./data.json");

jest.useFakeTimers();

const frameLoop = (cb, duration) => {
  let time = 0;
  const id = setInterval(() => {
    time += 20;
    cb(time);
    if (time >= duration) clearInterval(id);
  }, 20);
};

describe("dhm: damped harmonic motion", () => {
  it("should compute correct displacement and velocity using default config", () => {
    const values = [];
    const computeDHM = dhm();

    frameLoop(time => values.push(computeDHM(time)), 3000);

    jest.advanceTimersByTime(3000);

    expect(values).toEqual(data.dhmDefault);
  });

  it("should compute correct displacement and velocity using custom config", () => {
    const values = [];
    const computeDHM = dhm({
      mass: 100,
      stiffness: 2000,
      damping: 500,
      initialDisplacement: 200,
      initialVelocity: 100
    });

    frameLoop(time => values.push(computeDHM(time)), 4000);

    jest.advanceTimersByTime(4000);

    expect(values).toEqual(data.dhmCustom);
  });
});

describe("dhd: damped harmonic duration", () => {
  it("should compute correct time on a given config", () => {
    expect(dhd()).toEqual(2631.5258205646232);
    expect(
      dhd({
        mass: 100,
        stiffness: 2000,
        damping: 500,
        initialDisplacement: 200,
        initialVelocity: 100
      })
    ).toEqual(3961.395021014451);
    expect(
      dhd({
        mass: 100,
        stiffness: 2100,
        damping: 1000,
        initialDisplacement: 200,
        initialVelocity: 100
      })
    ).toEqual(3516.666666666657);
  });
});

describe("shm: simple harmonic motion", () => {
  it("should compute the correct displacement using default config", () => {
    const values = [];
    const computeSHM = shm();

    frameLoop(time => values.push(computeSHM(time)), 3000);

    jest.advanceTimersByTime(3000);

    expect(values).toEqual(data.shmDefault);
  });

  it("should compute the correct displacement using custom config", () => {
    const values = [];
    const computeSHM = shm({
      mass: 100,
      stiffness: 2000,
      initialDisplacement: 200
    });

    frameLoop(time => values.push(computeSHM(time)), 4000);

    jest.advanceTimersByTime(3000);

    expect(values).toEqual(data.shmCustom);
  });
});
