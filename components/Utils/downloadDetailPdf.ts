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

  try {
    const response = await fetch(url.href);
    if (!response.ok) return false;

    const blob = await response.blob();
    // Some storage providers return application/octet-stream for PDFs.
    if ((await blob.slice(0, 5).text()) !== "%PDF-") return false;

    saveBlob(blob, filename);
    return true;
  } catch {
    // A remote host may block cross-origin reads. Export the visible details then.
    return false;
  }
};

const downloadVisibleDetails = async (card, filename) => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(card, {
    backgroundColor: "#fff",
    scale: window.innerWidth <= 767 ? 1.5 : 2,
    useCORS: true,
    windowWidth: 1200,
    onclone: (clonedDocument) => {
      const clonedCard = clonedDocument.querySelector<HTMLElement>(".vbcc-detail-card");
      if (clonedCard) {
        clonedCard.style.width = "960px";
        clonedCard.style.maxWidth = "960px";
        clonedCard.closest(".vbcc-theme-dark")?.classList.remove("vbcc-theme-dark");
      }
      const actions = clonedCard?.querySelector<HTMLElement>(".vbcc-detail-actions");
      if (actions) actions.style.display = "none";
      const error = clonedCard?.querySelector<HTMLElement>(".vbcc-detail-download-error");
      if (error) error.style.display = "none";
    },
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const margin = 10;
  const contentWidth = 210 - margin * 2;
  const contentHeight = 297 - margin * 2;
  const pageHeightPixels = Math.floor((canvas.width * contentHeight) / contentWidth);

  for (let top = 0; top < canvas.height; top += pageHeightPixels) {
    if (top) pdf.addPage();
    const sliceHeight = Math.min(pageHeightPixels, canvas.height - top);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    pageCanvas.getContext("2d").drawImage(
      canvas, 0, top, canvas.width, sliceHeight,
      0, 0, canvas.width, sliceHeight,
    );
    pdf.addImage(
      pageCanvas.toDataURL("image/png"), "PNG", margin, margin,
      contentWidth, (sliceHeight * contentWidth) / canvas.width,
    );
  }

  pdf.save(filename);
};

export const downloadDetailPdf = async ({ card, record, documentUrl }) => {
  const filename = pdfFilename(record);
  if (await downloadOriginalPdf(documentUrl, filename)) return;
  await downloadVisibleDetails(card, filename);
};
