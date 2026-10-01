const downloadLink = (href: string, filename: string, openInNewTab = false) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  if (openInNewTab) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const downloadDetailPdf = async ({ documentUrl }: { documentUrl: string }) => {
  if (!documentUrl?.trim()) throw new Error("No diploma file available");
  const url = new URL(documentUrl.trim(), window.location.href);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Invalid diploma file URL");
  }

  let filename = url.pathname.split("/").pop() || "van-bang";
  try {
    filename = decodeURIComponent(filename);
  } catch {
    // Keep the original filename when the URL contains an invalid escape.
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  let response: Response;
  try {
    response = await fetch(url.href, { signal: controller.signal });
  } catch (error) {
    if (url.origin === window.location.origin) throw error;
    // Storage without CORS must serve the original file directly to the browser.
    downloadLink(url.href, filename, true);
    return;
  } finally {
    window.clearTimeout(timeout);
  }
  if (!response.ok) throw new Error(`Could not download diploma file (${response.status})`);

  const blob = await response.blob();
  if (!blob.size || /^(text\/html|application\/json)\b/i.test(blob.type)) {
    throw new Error("The server did not return a diploma file");
  }
  if (!/\.[a-z0-9]+$/i.test(filename) && (await blob.slice(0, 5).text()) === "%PDF-") {
    filename += ".pdf";
  }

  const objectUrl = URL.createObjectURL(blob);
  downloadLink(objectUrl, filename);
  // Mobile browsers may start reading the file after the click handler returns.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
};
