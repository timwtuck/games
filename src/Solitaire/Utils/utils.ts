export const format: (time: number) => string = (time) => {
  return `${time < 10 ? "0" : ""}${time}`;
};

export const buildTime: (
  hours: number,
  minutes: number,
  seconds: number
) => string = (hours, minutes, seconds) => {
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

// PRNG function
// Taken from: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
// Worth a read!: https://www.firstpr.com.au/dsp/rand31/p1192-park.pdf
export function splitmix32(seed: number): () => number {
  return function(): number {
    seed |= 0; seed = seed + 0x9e3779b9 | 0;
    var t = seed ^ seed >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
  }
};

export const seededShuffle: (array: any[], prng: (seed: number) => () => number, seed: number) => any[] = (
  array,
  prng,
  seed
) => {
  let rndIndex: number;

  const swapElements = (i: number, j: number) => {
    let tmp: any;
    tmp = array[j];
    array[j] = array[i];
    array[i] = tmp;
  };

  const length = array.length;

  for (let i = length -1; i > 0; i-= 1) {
    rndIndex = Math.floor((i + 1) * prng(seed + i)());
    swapElements(rndIndex, i);
  }

  return array;
};

export const generateSeed: () => string = () => {
  const date = Date.now();
  return date.valueOf().toString();
};