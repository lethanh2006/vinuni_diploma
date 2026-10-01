const pdfFilename = (record) => {
  const reference = String(record?.soHieuVanBang || record?.maSinhVien || "chi-tiet")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `van-bang-${reference || "chi-tiet"}.pdf`;
};

const saveBlob = (blob, filename) => {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Some mobile browsers start the download after the click handler returns.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
};

const downloadOriginalPdf = async (documentUrl, filename) => {
  if (typeof documentUrl !== "string" || !documentUrl.trim()) return false;

  let url;
  try {
    url = new URL(documentUrl, window.location.href);
  } catch {
    return false;
  }
  if (!(["http:", "https:"].includes(url.protocol))) return false;
  if (/\.(png|jpe?g|gif|webp|svg)(?:$|[?#])/i.test(url.pathname)) return false;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url.href, { signal: controller.signal });
    if (!response.ok) return false;

    const blob = await response.blob();
    // Some storage providers return application/octet-stream for PDFs.
    if ((await blob.slice(0, 5).text()) !== "%PDF-") return false;

    saveBlob(blob, filename);
    return true;
  } catch {
    // A remote host may block cross-origin reads. Export the visible details then.
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
};

const downloadVisibleDetails = async (card, filename) => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const scale = window.innerWidth <= 767 ? 1.5 : 2;
  const protectedBlocks: Array<{ top: number; bottom: number }> = [];
  const canvas = await html2canvas(card, {
    backgroundColor: "#fff",
    scale,
    useCORS: true,
    windowWidth: 1200,
    scrollX: 0,
    scrollY: 0,
    logging: false,
    onclone: (clonedDocument, clonedCard) => {
      // Render only the card with light theme styles, even when the page is dark.
      clonedDocument.body.replaceChildren(clonedCard);
      clonedDocument.body.setAttribute("data-vinuni-ui", "true");
      clonedDocument.body.setAttribute("data-vinuni-theme", "light");
      Object.assign(clonedDocument.documentElement.style, {
        backgroundColor: "#fff", colorScheme: "light",
      });
      Object.assign(clonedDocument.body.style, {
        margin: "0", padding: "0", width: "960px", backgroundColor: "#fff", color: "#000",
      });
      Object.assign(clonedCard.style, {
        width: "960px", maxWidth: "960px", margin: "0", boxShadow: "none",
      });
      clonedCard.querySelector(".vbcc-detail-actions")?.remove();
      clonedCard.querySelector(".vbcc-detail-download-error")?.remove();
      const cardTop = clonedCard.getBoundingClientRect().top;
      clonedCard.querySelectorAll(".vbcc-detail-field, .vbcc-detail-section-title, .vbcc-detail-student-heading").forEach((element) => {
        const rect = element.getBoundingClientRect();
        protectedBlocks.push({
          top: Math.floor((rect.top - cardTop) * scale),
          bottom: Math.ceil((rect.bottom - cardTop) * scale),
        });
      });
    },
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const margin = 10;
  const contentWidth = 210 - margin * 2;
  const contentHeight = 297 - margin * 2;
  const pageHeightPixels = Math.floor((canvas.width * contentHeight) / contentWidth);

  for (let top = 0; top < canvas.height;) {
    if (top) pdf.addPage();
    let bottom = Math.min(top + pageHeightPixels, canvas.height);
    const crossingBlocks = protectedBlocks.filter((block) =>
      block.top > top && block.top < bottom && block.bottom > bottom,
    );
    if (crossingBlocks.length) bottom = Math.min(...crossingBlocks.map((block) => block.top));
    const sliceHeight = bottom - top;
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const context = pageCanvas.getContext("2d");
    if (!context) throw new Error("Could not create the PDF canvas");
    context.drawImage(
      canvas, 0, top, canvas.width, sliceHeight,
      0, 0, canvas.width, sliceHeight,
    );
    pdf.addImage(
      pageCanvas.toDataURL("image/jpeg", .92), "JPEG", margin, margin,
      contentWidth, (sliceHeight * contentWidth) / canvas.width,
    );
    pageCanvas.width = 0;
    pageCanvas.height = 0;
    top = bottom;
  }

  saveBlob(pdf.output("blob"), filename);
  canvas.width = 0;
  canvas.height = 0;
};

export const downloadDetailPdf = async ({ card, record, documentUrl }) => {
  const filename = pdfFilename(record);
  if (await downloadOriginalPdf(documentUrl, filename)) return;
  await downloadVisibleDetails(card, filename);
};
