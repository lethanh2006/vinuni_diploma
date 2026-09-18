const DOMPurify = require("isomorphic-dompurify");

const SAFE_URL_PROTOCOLS = new Set(["http:", "https:"]);
const SAFE_INTERNAL_SEGMENT = /^[A-Za-z0-9._~%-]+$/;

export const sanitizeHtml = (rawHtml: unknown): string => {
	const html = typeof rawHtml === "string" ? rawHtml : "";

	return DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true },
		FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
	});
};

export const sanitizeExternalHttpUrl = (rawUrl: unknown): string => {
	if (typeof rawUrl !== "string" || rawUrl.trim() === "") {
		return "";
	}

	try {
		const parsedUrl = new URL(rawUrl);
		return SAFE_URL_PROTOCOLS.has(parsedUrl.protocol) ? parsedUrl.toString() : "";
	} catch {
		return "";
	}
};

export const sanitizeInternalPathSegment = (rawSegment: unknown): string => {
	if (typeof rawSegment !== "string") {
		return "";
	}

	const normalized = rawSegment.trim().replace(/^\/+|\/+$/g, "");
	return SAFE_INTERNAL_SEGMENT.test(normalized) ? normalized : "";
};
