// @ts-nocheck
import React from "react";
import TraCuuVanBangChungChi from "./tracuuvbcc";
import { useTranslation } from "components/Utils/useTranslation";

const VBChungChi = () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
      <TraCuuVanBangChungChi
        tieuDe={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
              gap: "8px",
              width: "100%",
              maxWidth: "100%",
              minHeight: "84px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(24px, 6vw, 36px)",
                lineHeight: "135%",
                color: "#FFFFFF",
              }}
            >
              {t("index.question")}
            </div>

            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px, 4vw, 20px)",
                lineHeight: "135%",
                color: "#FFFFFF",
              }}
            >
              {t("index.prompt")}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default VBChungChi;
