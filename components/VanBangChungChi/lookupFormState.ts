import { CalendarDate, parseDate } from "@internationalized/date";

export type LookupFormValues = {
  hoTen: string;
  ngaySinh: CalendarDate | null;
  cccd: string;
  maSinhVien: string;
  soHieuVanBang: string;
  soVaoSoBang: string;
};

export const emptyLookupFormValues: LookupFormValues = {
  hoTen: "",
  ngaySinh: null,
  cccd: "",
  maSinhVien: "",
  soHieuVanBang: "",
  soVaoSoBang: "",
};

const LOOKUP_FORM_STORAGE_KEY = "vinuni.vbcc.lookup-form";

export const readLookupFormValues = (): LookupFormValues => {
  const values = { ...emptyLookupFormValues };
  if (typeof window === "undefined") return values;
  try {
    const stored = window.sessionStorage.getItem(LOOKUP_FORM_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return values;

    for (const key of Object.keys(values)) {
      if (key !== "ngaySinh" && typeof parsed[key] === "string") {
        values[key] = parsed[key];
      }
    }
    if (typeof parsed.ngaySinh === "string" && parsed.ngaySinh) {
      try {
        values.ngaySinh = parseDate(parsed.ngaySinh);
      } catch {
        // Keep other fields when a saved date is invalid.
      }
    }
  } catch {
    // An unavailable session store must not prevent entering lookup fields.
  }
  return values;
};

export const saveLookupFormValues = (values: LookupFormValues): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      LOOKUP_FORM_STORAGE_KEY,
      JSON.stringify({ ...values, ngaySinh: values.ngaySinh?.toString() ?? null }),
    );
  } catch {
    // Lookup still works when session storage is unavailable.
  }
};

export const clearLookupFormValues = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(LOOKUP_FORM_STORAGE_KEY);
  } catch {
    // Storage can be blocked by browser settings.
  }
};
