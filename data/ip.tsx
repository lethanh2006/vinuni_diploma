const normalizeBaseUrl = (value: string | undefined, fallback: string) =>
  (value?.trim() || fallback).replace(/\/+$/, "");

/** Public API URL. Use the default when no build-time override is configured. */
export const ip = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL,
  "https://gwdu.ptit.edu.vn",
);

export const ipProxy = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_PROXY_URL,
  "https://proxy.apigw-vinuni.ript.vn",
);
