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

const saveBlob = (blob: Blob, filename: string) => {
  const objectUrl = URL.createObjectURL(blob);
  downloadLink(objectUrl, filename);
  // Mobile browsers may start reading the file after the click handler returns.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
};

const downloadOriginalFile = async (documentUrl: string) => {
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

  saveBlob(blob, filename);
};

type PdfBlock = { top: number; bottom: number };

const exportDetails = async (element: HTMLElement, filename: string) => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  if (document.fonts) await document.fonts.ready;

  const scale = window.innerWidth <= 767 ? 1.5 : 2;
  const blocks: PdfBlock[] = [];
  const lines: PdfBlock[] = [];
  const canvas = await html2canvas(element, {
    backgroundColor: "#fff",
    scale,
    useCORS: true,
    logging: false,
    windowWidth: 1200,
    scrollX: 0,
    scrollY: 0,
    onclone: (clonedDocument, clonedCard) => {
      // This document belongs to the export; the visible page is never changed.
      // Moving the card out of its ancestors gives dark/mobile pages the same PDF.
      clonedDocument.body.replaceChildren(clonedCard);
      clonedDocument.body.className = "";
      clonedDocument.body.setAttribute("data-vinuni-theme", "light");
      Object.assign(clonedDocument.body.style, {
        margin: "0", padding: "0", width: "960px", background: "#fff",
      });
      Object.assign(clonedCard.style, {
        width: "960px", maxWidth: "960px", margin: "0", color: "#000",
        backgroundColor: "#fff", boxShadow: "none", overflow: "visible",
      });
      clonedCard.style.setProperty("--vbcc-detail-border", "rgba(0, 0, 0, .1)");
      clonedCard.querySelectorAll("[data-pdf-ignore], .vbcc-detail-actions, .vbcc-detail-download-error")
        .forEach((node) => node.remove());

      const cardTop = clonedCard.getBoundingClientRect().top;
      const addBlock = (rect: DOMRect, target: PdfBlock[]) => {
        if (rect.height > 0) target.push({
          top: Math.floor((rect.top - cardTop) * scale),
          bottom: Math.ceil((rect.bottom - cardTop) * scale),
        });
      };
      clonedCard.querySelectorAll(".vbcc-detail-field, .vbcc-detail-student-heading")
        .forEach((node) => addBlock(node.getBoundingClientRect(), blocks));
      clonedCard.querySelectorAll(".vbcc-detail-section-title").forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const firstField = heading.nextElementSibling?.querySelector(".vbcc-detail-field");
        const firstFieldBottom = firstField?.getBoundingClientRect().bottom ?? rect.bottom;
        blocks.push({ top: Math.floor((rect.top - cardTop) * scale), bottom: Math.ceil((firstFieldBottom - cardTop) * scale) });
      });

      // Extremely long values can span a page. Preserve their text lines when an
      // entire field cannot fit, while keeping ordinary label/value pairs together.
      const walker = clonedDocument.createTreeWalker(clonedCard, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const range = clonedDocument.createRange();
        range.selectNodeContents(node);
        Array.from(range.getClientRects()).forEach((rect) => addBlock(rect, lines));
      }
    },
  });

  try {
    if (!canvas.width || !canvas.height) throw new Error("Could not render diploma details");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const margin = 10;
    const width = pdf.internal.pageSize.getWidth() - margin * 2;
    const height = pdf.internal.pageSize.getHeight() - margin * 2;
    const pageHeightPixels = Math.floor((canvas.width * height) / width);

    for (let top = 0; top < canvas.height;) {
      let bottom = Math.min(top + pageHeightPixels, canvas.height);
      if (bottom < canvas.height) {
        // Recheck after moving a boundary: overlapping blocks in adjacent columns
        // can otherwise push the new boundary through a different field.
        let previousBottom;
        do {
          previousBottom = bottom;
          const crossing = [...blocks, ...lines].filter((block) =>
            block.top > top && block.top < bottom && block.bottom > bottom &&
            block.bottom - block.top <= pageHeightPixels,
          );
          if (crossing.length) bottom = Math.min(...crossing.map((block) => block.top));
        } while (bottom < previousBottom);
      }
      const sliceHeight = bottom - top;
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;
      const context = pageCanvas.getContext("2d");
      if (!context) throw new Error("Could not create the PDF canvas");
      context.drawImage(canvas, 0, top, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
      if (top) pdf.addPage();
      pdf.addImage(pageCanvas.toDataURL("image/jpeg", .94), "JPEG", margin, margin, width, (sliceHeight * width) / canvas.width);
      pageCanvas.width = 0;
      pageCanvas.height = 0;
      top = bottom;
    }
    saveBlob(pdf.output("blob"), filename);
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
};

type DownloadDetailOptions = {
  documentUrl?: string;
  element?: HTMLElement | null;
  filename?: string;
};

export const downloadDetailPdf = async ({ documentUrl, element, filename = "van-bang-chi-tiet.pdf" }: DownloadDetailOptions) => {
  if (documentUrl?.trim()) {
    await downloadOriginalFile(documentUrl);
    return;
  }
  if (!element?.isConnected) throw new Error("Diploma details are not available for export");
  const safeFilename = filename.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "-").trim() || "van-bang-chi-tiet";
  await exportDetails(element, /\.pdf$/i.test(safeFilename) ? safeFilename : `${safeFilename}.pdf`);
};
