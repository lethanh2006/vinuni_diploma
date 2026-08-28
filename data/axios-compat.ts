// @ts-nocheck
import axios from "axios";

/** Match axios 0.19: nested objects in query params are JSON.stringify'd. */
function serializeParams(params) {
  if (!params) return "";
  const parts = [];
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (val === null || typeof val === "undefined") {
      return;
    }
    if (Array.isArray(val)) {
      val.forEach((item) => {
        const encoded =
          typeof item === "object" && item !== null
            ? JSON.stringify(item)
            : String(item);
        parts.push(
          `${encodeURIComponent(key)}[]=${encodeURIComponent(encoded)}`,
        );
      });
      return;
    }
    if (val instanceof Date) {
      parts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(val.toISOString())}`,
      );
      return;
    }
    if (typeof val === "object") {
      parts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`,
      );
      return;
    }
    parts.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`,
    );
  });
  return parts.join("&");
}

axios.defaults.paramsSerializer = { serialize: serializeParams };

export default axios;
