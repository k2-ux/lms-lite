export async function retryRequest(fn: () => Promise<any>, retries = 3) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    return retryRequest(fn, retries - 1);
  }
}
