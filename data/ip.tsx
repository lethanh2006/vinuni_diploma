const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

/** Base URL for the public education/news API. Configure with NEXT_PUBLIC_API_URL. */
export const ip = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);

export const ipProxy = normalizeBaseUrl(process.env.NEXT_PUBLIC_PROXY_URL);
