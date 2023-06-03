export function reduceHashString(
  address?: string,
  reduceStart?: number,
  reduceEnd?: number,
) {
  return `${address?.slice(0, reduceStart || 5)}...${address?.slice(
    (reduceEnd || 3) * -1,
  )}`;
}
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const baseUri = String(process.env.NEXT_PUBLIC_BASE_URI);
