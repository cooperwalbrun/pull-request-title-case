declare global {
  const EXTENSION_NAME: string;
  const EXTENSION_VERSION: string;
}

export type JSONObject<T> = { [k: string]: T };
