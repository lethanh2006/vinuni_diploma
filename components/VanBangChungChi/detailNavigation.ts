export type LookupRecord = {
  _id?: string | number;
  DuLieu?: {
    _id?: string | number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

const DETAIL_HASH_PREFIX = "#/vanbangchungchi/";
const LOOKUP_STORAGE_KEY = "vinuni.vbcc.lookup-records";

export const getRecordId = (record: LookupRecord | null | undefined): string => {
  const id = record?.DuLieu?._id ?? record?._id;
  return typeof id === "string" || typeof id === "number" ? String(id) : "";
};

export const getDetailHash = (id: string): string =>
  `${DETAIL_HASH_PREFIX}${encodeURIComponent(id)}`;

export const getDetailId = (asPath: string): string => {
  const hashStart = asPath.indexOf("#");
  if (hashStart < 0) return "";
  const hash = asPath.slice(hashStart);
  if (!hash.startsWith(DETAIL_HASH_PREFIX)) return "";

  try {
    return decodeURIComponent(hash.slice(DETAIL_HASH_PREFIX.length));
  } catch {
    return "";
  }
};

export const readLookupRecords = (): LookupRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.sessionStorage.getItem(LOOKUP_STORAGE_KEY);
    const records: unknown = stored ? JSON.parse(stored) : null;
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
};

export const saveLookupRecords = (records: LookupRecord[]): void => {
  if (typeof window === "undefined" || !Array.isArray(records)) return;
  try {
    window.sessionStorage.setItem(LOOKUP_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Lookup and navigation still work when session storage is unavailable.
  }
};

export const clearLookupRecords = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(LOOKUP_STORAGE_KEY);
  } catch {
    // Storage can be blocked by browser settings.
  }
};
