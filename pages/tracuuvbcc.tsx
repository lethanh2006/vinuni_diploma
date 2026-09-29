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
import { ip } from "data/ip";
// import { ipProxy } from "data/ip";
import PropTypes from "prop-types";
import "rc-tabs/assets/index.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SectionWrapper from "../styles/vanbangchungchi.style";
import { useTranslation } from "components/Utils/useTranslation";
import ChiTietVanBang from "./vanbangchungchi/[idChiTiet]";

const TraCuuVanBangChungChi = (props) => {
  // const { t } = useTranslation();
  const { t, locale, changeLocale } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 }) === true;

  const [ds, setds] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [dialogReady, setDialogReady] = useState(false);

  useEffect(() => {
    setDialogReady(true);
    document.body.classList.add("vbcc-lookup-active");

    return () => {
      document.body.classList.remove("vbcc-lookup-active");
    };
  }, []);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const traCuu = async (values, resetTurnstile) => {
    const { turnstileToken, ...searchValues } = values;
    const filledFields = Object.entries(searchValues).filter(
      ([key, value]) => key !== "mucDichTraCuuId" && !!value,
    ).length;

    if (filledFields < 2) {
      showNotification(t("index.messages.warning_2_fields"));
      return false;
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      showNotification(t("index.messages.turnstile_required"));
      return false;
    }

    setloading(true);
    setSelectedRecord(null);
    setNotificationOpen(false);
    try {
      const data = await axios.post(
        // `${ipProxy}/qldt/phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`,
        // `${ip}/qldt/phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`,
        `${ip}/vbcc/phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`,
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
        showNotification(t("index.table.no_result_msg"));
      } else {
        setds(arr);
      }
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      let messageKey = "index.messages.lookup_failed";
      if (errorCode === "error-turnstile-token-required") {
        messageKey = "index.messages.turnstile_required";
      } else if (errorCode === "error-turnstile-invalid") {
        messageKey = "index.messages.turnstile_invalid";
      } else if (error?.response?.status === 404) {
        messageKey = "index.table.no_result_msg";
      }
      showNotification(t(messageKey));
      setds({ Error: true, messageKey });
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
        <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("index.messages.warning")}</DialogTitle>
              <DialogDescription>
                {notificationMessage || t("index.messages.warning_2_fields")}
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
        <SectionWrapper
          id="daotao"
          className="vbcc-inter vbcc-lookup-page"
        >
          <Container fullWidth noGutter>
            <div
              className="vbcc-hero"
              style={{
                ...heroBackgroundStyle,
                padding: isMobile ? "124px 16px 24px" : "205px 24px 93px 24px",
              }}
            >
              <div
                className="vbcc-page-language-switch"
                aria-label="Language"
              >
                <button
                  type="button"
                  className={locale === "en-US" ? "active" : ""}
                  onClick={() => changeLocale("en-US")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={locale === "vi-VN" ? "active" : ""}
                  onClick={() => changeLocale("vi-VN")}
                >
                  VI
                </button>
              </div>
              <div
                className="vbcc-hero-layout"
                style={{
                  maxWidth: isMobile ? "100%" : "1100px",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <img
                  className="vbcc-hero-logo"
                  src="/assets/image/textngang.svg"
                  alt="VinUniversity Diploma Verification Portal"
                />
                <div
                  className="vbcc-hero-heading"
                  style={{ marginBottom: isMobile ? 12 : 50 }}
                >
                  {tieuDeKQ}
                </div>
                <div className="vbcc-hero-form" style={{ width: "100%" }}>
                  <FormTraCuu
                    onSubmit={traCuu}
                    onWarning={showNotification}
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
            <div className="vbcc-accreditation-strip">
              <img
                src="/assets/image/bgfooter2.png"
                alt="VinUniversity accreditations and rankings"
              />
              <div
                className="vbcc-mobile-accreditations"
                role="img"
                aria-label="VinUniversity accreditations and rankings"
              >
                <span className="vbcc-accreditation-logo vbcc-accreditation-logo--gptw" />
                <span className="vbcc-accreditation-logo vbcc-accreditation-logo--fibaa" />
                <span className="vbcc-accreditation-logo vbcc-accreditation-logo--qs" />
                <span className="vbcc-accreditation-logo vbcc-accreditation-logo--stars" />
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </div>
      <style jsx global>{`
        body.vbcc-lookup-active,
        body.vbcc-lookup-active *:not(.anticon) {
          font-family: "Inter", sans-serif !important;
        }

        body.vbcc-lookup-active header {
          display: none !important;
        }

        .vbcc-lookup-page {
          margin: 0 !important;
          padding: 0 !important;
        }

        .vbcc-lookup-page .vbcc-hero {
          position: relative !important;
          width: 100% !important;
          height: 720px !important;
          min-height: 720px !important;
          padding: 0 !important;
          overflow: hidden;
          background:
            linear-gradient(
              270deg,
              rgba(0, 0, 0, 0.25) 0%,
              rgba(0, 0, 0, 0.125) 52.96%,
              rgba(255, 255, 255, 0) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(255, 255, 255, 0.075) 24.59%,
              rgba(255, 255, 255, 0.075) 85.79%,
              rgba(0, 0, 0, 0.035) 100%
            ),
            url("/assets/image/bgtracuu.png") !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
        }

        .vbcc-lookup-page .vbcc-page-language-switch {
          position: absolute;
          top: 32px;
          left: 72px;
          z-index: 3;
          display: flex;
          width: 64px;
          height: 24px;
          padding: 0;
          overflow: hidden;
          background: #ffffff;
          border-radius: 22px;
        }

        .vbcc-lookup-page .vbcc-page-language-switch button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 24px;
          padding: 4px 8px;
          color: #2e548a;
          font-family: "Inter", sans-serif !important;
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          background: transparent;
          border: 0;
          border-radius: 22px;
          cursor: pointer;
        }

        .vbcc-lookup-page .vbcc-page-language-switch button.active {
          color: #ffffff;
          background: #c83538;
        }

        .vbcc-lookup-page .vbcc-hero-layout {
          position: absolute;
          top: 50%;
          right: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 650px !important;
          max-width: 650px !important;
          margin: 0 !important;
          gap: 28px;
          transform: translateY(-50%);
        }

        .vbcc-lookup-page .vbcc-hero-logo {
          display: block;
          flex: none;
          width: 244px;
          height: 50px;
          object-fit: contain;
        }

        .vbcc-lookup-page .vbcc-hero-heading {
          width: 580px;
          max-width: 100%;
          margin: 0 !important;
        }

        .vbcc-lookup-page .vbcc-hero-heading > div {
          min-height: 64px !important;
          gap: 4px !important;
        }

        .vbcc-lookup-page .vbcc-hero-heading > div > div:first-child {
          font-family: "Inter", sans-serif !important;
          font-size: 28px !important;
          font-weight: 600 !important;
          line-height: 36px !important;
          white-space: nowrap;
        }

        .vbcc-lookup-page .vbcc-hero-heading > div > div:last-child {
          font-family: "Inter", sans-serif !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 24px !important;
        }

        .vbcc-lookup-page .vbcc-hero-form {
          width: 650px !important;
          max-width: 100%;
        }

        .vbcc-lookup-page .vbcc-accreditation-strip {
          width: 100%;
          overflow: hidden;
          background: #ffffff;
        }

        .vbcc-lookup-page .vbcc-accreditation-strip img {
          display: block;
          width: 100%;
          height: auto;
        }

        .vbcc-lookup-page .vbcc-mobile-accreditations {
          display: none;
        }

        @media (max-width: 900px) {
          .vbcc-lookup-page .vbcc-page-language-switch {
            left: 24px;
          }

          .vbcc-lookup-page .vbcc-hero-layout {
            right: 24px;
            width: min(650px, calc(100% - 48px)) !important;
          }
        }

        @media (max-width: 767px) {
          .vbcc-lookup-page .vbcc-hero {
            height: 920px !important;
            min-height: 920px !important;
            padding: 0 !important;
            overflow: hidden;
            background-position: 38% center !important;
          }

          .vbcc-lookup-page .vbcc-page-language-switch {
            top: 56px;
            right: 20px;
            left: auto;
          }

          .vbcc-lookup-page .vbcc-hero-layout {
            position: absolute;
            top: 126px;
            right: auto;
            left: 20px;
            width: calc(100% - 40px) !important;
            gap: 16px;
            transform: none;
          }

          .vbcc-lookup-page .vbcc-hero-logo {
            position: absolute;
            top: -74px;
            left: 0;
            width: 156.16px;
            height: 32px;
          }

          .vbcc-lookup-page .vbcc-hero-heading {
            width: 100%;
          }

          .vbcc-lookup-page .vbcc-hero-heading > div {
            min-height: 72px !important;
          }

          .vbcc-lookup-page .vbcc-hero-heading > div > div:first-child {
            font-family: "Inter", sans-serif !important;
            font-size: 18px !important;
            line-height: 28px !important;
            letter-spacing: -0.5px;
            white-space: normal;
          }

          .vbcc-lookup-page .vbcc-hero-heading > div > div:last-child {
            font-family: "Inter", sans-serif !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }

          .vbcc-lookup-page .vbcc-hero-form {
            width: 100% !important;
          }

          .vbcc-lookup-page .vbcc-accreditation-strip {
            height: 348px;
            background:
              url("/assets/image/bgfooter2.png") -135px 0 / 1384.35px 220.55px
                no-repeat,
              url("/assets/image/bgfooter2.png") -245px 221px / 797.89px 127px
                no-repeat,
              #ffffff;
            background: #ffffff;
          }

          .vbcc-lookup-page .vbcc-accreditation-strip img {
            display: none;
          }

          .vbcc-lookup-page .vbcc-mobile-accreditations {
            display: grid;
            width: 100%;
            height: 348px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: 221px 127px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo {
            align-self: center;
            justify-self: center;
            background-image: url("/assets/image/bgfooter2.png");
            background-repeat: no-repeat;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--gptw {
            width: 87px;
            height: 178px;
            background-position: -329px -50px;
            background-size: 1600px 255px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--fibaa {
            width: 98px;
            height: 162px;
            background-position: -519px -58px;
            background-size: 1600px 255px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--qs {
            width: 70px;
            height: 70px;
            background-position: -291px -23px;
            background-size: 650px 104px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--stars {
            width: 125px;
            height: 70px;
            background-position: -381px -23px;
            background-size: 650px 104px;
          }

          body.vbcc-lookup-active .footer-container {
            display: block;
            box-sizing: border-box;
            height: 696px;
            min-height: 696px;
            padding: 200px 20px 40px;
            font-family: "Inter", sans-serif;
          }

          body.vbcc-lookup-active .footer-trapezoid {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            max-width: none;
            height: 245px;
            background: transparent;
            border-radius: 0;
          }

          body.vbcc-lookup-active .trapezoid-svg {
            display: block;
          }

          body.vbcc-lookup-active .logo-container {
            position: absolute;
            top: 31px;
            left: 20px;
            width: 160px;
            height: 119px;
          }

          body.vbcc-lookup-active .footer-content-wrapper {
            position: relative;
            top: auto;
            left: auto;
            align-items: flex-start;
            width: 100%;
            gap: 32px;
          }

          body.vbcc-lookup-active .footer-column {
            align-items: flex-start;
            width: 100%;
            max-width: none;
            gap: 16px;
            text-align: left;
          }

          body.vbcc-lookup-active .footer-column-title {
            width: 100%;
            font-family: "Inter", sans-serif;
            font-size: 18px;
            line-height: 28px;
            text-align: left;
          }

          body.vbcc-lookup-active .footer-links-list {
            align-items: flex-start;
            width: 100%;
            gap: 12px;
          }

          body.vbcc-lookup-active .footer-link-item,
          body.vbcc-lookup-active .footer-link-item.align-start {
            justify-content: flex-start;
            width: 100%;
          }

          body.vbcc-lookup-active .footer-link,
          body.vbcc-lookup-active .footer-text-content {
            justify-content: flex-start;
            max-width: calc(100% - 12px);
            font-family: "Inter", sans-serif;
            font-size: 16px;
            line-height: 24px;
            text-align: left;
          }

          body.vbcc-lookup-active .social-icons-row {
            justify-content: flex-start;
            margin-left: 0;
          }
        }

        @media (max-width: 392px) {
          .vbcc-lookup-page .vbcc-hero-layout {
            right: 20px;
            left: 20px;
          }
        }
      `}</style>
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
