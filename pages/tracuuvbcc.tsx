// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Spinner,
} from "@vinuni/ui";
import axios from "axios";
import FormTraCuu from "components/Table/FormTraCuuVBCC";
import TableTraCuuVBCC from "components/Table/TableTraCuuVBCC";
import Container from "components/UI/Container";
import { ipProxy } from "data/ip";
import PropTypes from "prop-types";
import "rc-tabs/assets/index.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SectionWrapper from "../styles/vanbangchungchi.style";
import { useTranslation } from "components/Utils/useTranslation";
import ChiTietVanBang from "./vanbangchungchi/[idChiTiet]";

const TraCuuVanBangChungChi = (props) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 }) === true;

  const [ds, setds] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [dialogReady, setDialogReady] = useState(false);

  useEffect(() => {
    setDialogReady(true);
  }, []);

  const showWarning = (message) => {
    setWarningMessage(message);
    setWarningOpen(true);
  };

  const traCuu = async (values, resetTurnstile) => {
    const { turnstileToken, ...searchValues } = values;
    const filledFields = Object.entries(searchValues).filter(
      ([key, value]) => key !== "mucDichTraCuuId" && !!value,
    ).length;

    if (filledFields < 2) {
      showWarning(t("index.messages.warning_2_fields"));
      return false;
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      showWarning(t("index.messages.turnstile_required"));
      return false;
    }

    setloading(true);
    setSelectedRecord(null);
    try {
      const data = await axios.post(
        `${ipProxy}/qldt/phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`,
        {
          ...searchValues,
          ...(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
            ? { turnstileToken }
            : {}),
        },
      );
      const arr = data?.data?.data?.result ?? [];
      if (!Array.isArray(arr) || arr.length === 0) {
        setds({ Error: true });
      } else {
        setds(arr);
      }
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
        if (errorCode === "error-turnstile-token-required") {
          showWarning(t("index.messages.turnstile_required"));
        } else if (errorCode === "error-turnstile-invalid") {
          showWarning(t("index.messages.turnstile_invalid"));
        }
      }
      setds({ Error: true });
    } finally {
      setloading(false);
      resetTurnstile?.();
    }

    return true;
  };

  const tieuDeKQ = props.tieuDe;
  const heroBackgroundStyle = {
    background: `
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.075) 100%),
      url('/assets/image/bgtracuu.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "0px",
    maxWidth: "none",
    width: "100%",
    minHeight: "700px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {dialogReady ? (
        <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("index.messages.warning")}</DialogTitle>
              <DialogDescription>
                {warningMessage || t("index.messages.warning_2_fields")}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
      {loading ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.45)",
          }}
        >
          <Spinner size="lg" label={t("index.messages.warning")} />
        </div>
      ) : null}
      <div>
        <SectionWrapper id="daotao" className="vbcc-montserrat">
          <Container fullWidth noGutter>
            <div
              style={{
                ...heroBackgroundStyle,
                padding: isMobile ? "124px 16px 24px" : "205px 24px 93px 24px",
              }}
            >
              <div
                style={{
                  maxWidth: isMobile ? "100%" : "1100px",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <div style={{ marginBottom: isMobile ? 12 : 50 }}>
                  {tieuDeKQ}
                </div>
                <div style={{ width: "100%" }}>
                  <FormTraCuu
                    onSubmit={traCuu}
                    onWarning={showWarning}
                    onReset={() => {
                      setds([]);
                      setSelectedRecord(null);
                    }}
                  />
                </div>
              </div>
            </div>
            {selectedRecord ? (
              <ChiTietVanBang
                record={selectedRecord}
                onBack={() => setSelectedRecord(null)}
              />
            ) : (
              <TableTraCuuVBCC
                thongTinTraCuu={ds}
                onViewDetail={(record) => setSelectedRecord(record)}
              />
            )}
          </Container>
        </SectionWrapper>
      </div>
    </div>
  );
};

TraCuuVanBangChungChi.propTypes = {
  secTitleWrapper: PropTypes.object,
  secText: PropTypes.object,
  secHeading: PropTypes.object,
};

TraCuuVanBangChungChi.defaultProps = {
  secTitleWrapper: {
    mb: ["100px", "40px"],
  },
  secText: {
    as: "span",
    display: "block",
    textAlign: "center",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontWeight: "700",
    color: "#ff4362",
    mb: "12px",
  },
  secHeading: {
    fontStyle: "normal",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#202124",
    letterSpacing: "0.04em",
    mb: "0",
    ml: "auto",
    mr: "auto",
    lineHeight: "40px",
    width: "600px",
    maxWidth: "100%",
  },
};

export default TraCuuVanBangChungChi;
