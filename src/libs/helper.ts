import crypto from 'crypto';

export const sleep = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms); });

export const isDefined = <T>(argument: T | null | undefined): argument is T => argument !== null && argument !== undefined;

export const getEnv = () => process.env.NODE_ENV || 'development';

export const getUniqueArray = <T>(arr: T[]) => [...new Set(arr)];

export const getUnix = (targetDate?: number) => {
  const time = (targetDate ? new Date(targetDate) : new Date()).getTime();
  return parseInt((time / 1000).toString(), 10);
};

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
export const getRandStr = (limit: number) => crypto.randomBytes(20).toString('hex').substring(0, limit);

export const getQueue = <T>(arr: T[], limiter: number) => {
  const queues = [];
  const lArr = arr.length;

  let targetIndex = 0;
  const numberIterations = Math.ceil(lArr / limiter);

  for (let i = 0; i < numberIterations; i += 1) {
    const newQueue = [];

    let conditionValue = limiter;

    if (i === (numberIterations - 1)) {
      conditionValue = lArr - targetIndex;
    }

    for (let j = 0; j < conditionValue; j += 1) {
      newQueue.push(arr[targetIndex]);
      targetIndex += 1;
    }

    queues.push(newQueue);
  }

  return queues;
};
