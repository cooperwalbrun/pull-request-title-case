/* eslint-disable @typescript-eslint/no-explicit-any */

export const LOGGER = {
  info: (message: any) => console.info(`[prtc] ${message}`),
  warn: (message: any) => console.warn(`[prtc] ${message}`),
  error: (message: any) => console.error(`[prtc] ${message}`)
};
