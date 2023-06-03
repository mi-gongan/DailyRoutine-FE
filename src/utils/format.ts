import { utils } from 'near-api-js';

export const nearFormat = (amount: string) => {
  return String(
    Math.floor(Number(utils.format.formatNearAmount(amount)) * 100) / 100,
  );
};
