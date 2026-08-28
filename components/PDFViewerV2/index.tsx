// @ts-nocheck
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useRef, useState } from "react";

const PDFViewerV2 = ({
  url,
  data,
  uint8Array,
  base64,
  height: heightProps,
  plugins,
  defaultScale = SpecialZoomLevel.PageWidth,
  ...viewerProps
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const viewerRef = useRef(null);
  const [height, setHeight] = useState("100%");

  let fileUrl = "";
  if (url) {
    fileUrl = url;
  } else if (uint8Array) {
    fileUrl = uint8Array;
  } else if (data) {
    fileUrl = new Uint8Array(data);
  } else if (base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    fileUrl = bytes;
  }

  useEffect(() => {
    const updateHeight = () => {
      if (viewerRef.current) {
        const parentHeight = viewerRef.current.parentElement?.offsetHeight;
        if (parentHeight) {
          setHeight(`${parentHeight}px`);
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div ref={viewerRef} style={{ height: heightProps ?? height }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs">
        <Viewer
          fileUrl={fileUrl}
          defaultScale={defaultScale}
          plugins={plugins ?? [defaultLayoutPluginInstance]}
          {...viewerProps}
        />
      </Worker>
    </div>
  );
};

export default PDFViewerV2;
