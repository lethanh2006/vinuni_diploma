// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  IconMoon,
  IconSun,
  Logo,
  SidebarDock,
  SidebarDockBrand,
  SidebarDockFooter,
  SidebarDockSwitcher,
  SidebarDockSwitcherItem,
  SidebarDockThemeToggle,
  SidebarDockWordmark,
  Spinner,
  useUi,
} from "@vinuni/ui";
import axios from "axios";
import { useRouter } from "next/router";
import FormTraCuu from "components/Table/FormTraCuuVBCC";
import { clearLookupRecords, getDetailHash, getDetailId, getRecordId, readLookupRecords, saveLookupRecords } from "components/VanBangChungChi/detailNavigation";
import Container from "components/UI/Container";
import { ip } from "data/ip";
// import { ipProxy } from "data/ip";
import "rc-tabs/assets/index.css";
import React, { useEffect, useRef, useState } from "react";
import SectionWrapper from "../styles/vanbangchungchi.style";
import { useTranslation } from "components/Utils/useTranslation";
import ChiTietVanBang from "./vanbangchungchi/[idChiTiet]";

const previewResults = [1, 2].map((number) => ({
  DuLieu: {
    _id: `preview-${number}`,
    hoTen: "Song Song",
    ngaySinh: "2003-05-24",
    maSinhVien: "ABC1200",
    soHieuVanBang: "TS25",
    soVaoSoBang: "TS25/929",
    fileVanBang: "/assets/image/vanbangdemo.png",
    thongTinTrinhDoDaoTao: { ten: "Bachelor's Degree" },
    thongTinHinhThucDaoTao: { ten: "Full-time" },
    thongTinNganhDaoTao: { ten: "Information Systems" },
    chuyenNganh: "Information Systems",
    chuyenNganhPhu: "Information Systems",
    quyetDinh: {
      soQuyetDinh: "923802/SS",
      ngayBanHanh: "2025-04-24",
    },
  },
}));

const TraCuuVanBangChungChi = () => {
  const { t, locale, changeLocale } = useTranslation();
  const { resolvedTheme, setTheme } = useUi();
  const router = useRouter();
  const initialized = useRef(false);

  const [ds, setds] = useState([]);
  const [loading, setloading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [dialogReady, setDialogReady] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewEmpty, setPreviewEmpty] = useState(false);
  const detailId = router.isReady ? getDetailId(router.asPath) : "";
  const selectedRecord = Array.isArray(ds)
    ? ds.find((record) => detailId && getRecordId(record) === detailId)
    : null;

  useEffect(() => {
    setDialogReady(true);
    document.body.classList.add("vbcc-lookup-active");

    return () => {
      document.body.classList.remove("vbcc-lookup-active");
    };
  }, []);

  useEffect(() => {
    if (!router.isReady || initialized.current) return;
    initialized.current = true;
    const preview = router.query.preview;
    if (process.env.NODE_ENV === "development" && ["results", "detail", "empty"].includes(preview)) {
      setPreviewMode(true);
      setPreviewEmpty(preview === "empty");
      setds(preview === "empty" ? { Error: true } : previewResults);
      if (preview === "detail" && !getDetailId(router.asPath)) {
        router.replace(`${router.asPath.split("#")[0]}${getDetailHash(getRecordId(previewResults[0]))}`, undefined, { shallow: true, scroll: false });
      }
    } else {
      setds(readLookupRecords());
    }
  }, [router.isReady, router]);

  const viewDetail = async (record) => {
    const id = getRecordId(record);
    if (!id || id === detailId) return;
    if (!previewMode) saveLookupRecords(ds);
    await router.push(`${router.asPath.split("#")[0]}${getDetailHash(id)}`, undefined, { shallow: true, scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const traCuu = async (values, resetTurnstile) => {
    if (previewMode) {
      setds(previewEmpty ? { Error: true } : previewResults);
      setNotificationOpen(false);
      return true;
    }

    const { turnstileToken, ...searchValues } = values;
    const filledFields = Object.entries(searchValues).filter(
      ([key, value]) =>
        key !== "mucDichTraCuuId" &&
        (typeof value === "string" ? value.trim().length > 0 : Boolean(value)),
    ).length;

    if (filledFields < 2) {
      return false;
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      showNotification(t("index.messages.turnstile_required"));
      return false;
    }

    setloading(true);
    setds([]);
    clearLookupRecords();
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
      } else {
        setds(arr);
        saveLookupRecords(arr);
      }
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      let messageKey = "index.messages.lookup_failed";
      if (errorCode === "error-turnstile-token-required") {
        messageKey = "index.messages.turnstile_required";
      } else if (errorCode === "error-turnstile-invalid") {
        messageKey = "index.messages.turnstile_invalid";
      } else if (error?.response?.status === 404) {
        setds({ Error: true });
        return true;
      }
      showNotification(t(messageKey));
      setds([]);
    } finally {
      setloading(false);
      resetTurnstile?.();
    }

    return true;
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
            <div className="vbcc-page-shell" style={{ "--sidebar-dock-width": "52px" }}>
              <SidebarDock className="vbcc-dockbar">
                <SidebarDockBrand className="vbcc-dockbar-brand" />
                <SidebarDockWordmark className="vbcc-dockbar-wordmark" />
                <SidebarDockFooter>
                  <SidebarDockThemeToggle className="vbcc-dockbar-theme" lightLabel="Light theme" darkLabel="Dark theme" />
                  <SidebarDockSwitcher className="vbcc-dockbar-language" value={locale} onValueChange={(value) => value && changeLocale(value)} aria-label="Language">
                    <SidebarDockSwitcherItem value="vi-VN" aria-label="Tiếng Việt">VI</SidebarDockSwitcherItem>
                    <SidebarDockSwitcherItem value="en-US" aria-label="English">EN</SidebarDockSwitcherItem>
                  </SidebarDockSwitcher>
                </SidebarDockFooter>
              </SidebarDock>
              <div className="vbcc-mobile-dockbar">
                <img
                  className="vbcc-mobile-dockbar-logo"
                  src="/assets/image/logomobile.png"
                  alt="VinUniversity"
                  width="127"
                  height="24"
                />
                <div className="vbcc-mobile-dockbar-controls">
                  <button
                    type="button"
                    className="vbcc-mobile-dockbar-theme"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    aria-label={resolvedTheme === "dark" ? "Light theme" : "Dark theme"}
                  >
                    {resolvedTheme === "dark" ? (
                      <IconMoon size={24} aria-hidden="true" />
                    ) : (
                      <IconSun size={24} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="vbcc-mobile-dockbar-language"
                    onClick={() => changeLocale(locale === "en-US" ? "vi-VN" : "en-US")}
                    aria-label={locale === "en-US" ? "Switch to Vietnamese" : "Switch to English"}
                  >
                    {locale === "en-US" ? "EN" : "VI"}
                  </button>
                </div>
              </div>
              <div className="vbcc-page-content">
                <div className={`vbcc-hero vbcc-theme-${resolvedTheme}${(Array.isArray(ds) ? ds.length > 0 : Boolean(ds?.Error)) ? " vbcc-hero--has-results" : ""}${selectedRecord ? " vbcc-hero--detail" : ""}`}>
                  <div className="vbcc-hero-background" aria-hidden="true" />
                  <div className="vbcc-hero-header">
                    <Logo layout="horizontal" theme="color" tagline="Diploma Verification Portal" className="vbcc-hero-logo" />
                  </div>
                  <div className="vbcc-hero-area">
                    <div className="vbcc-hero-form">
                      {selectedRecord ? (
                        <ChiTietVanBang record={selectedRecord} />
                      ) : (
                        <>
                          {detailId ? <p className="vbcc-detail-link-message" role="status">{t("detail.linked_record_lookup")}</p> : null}
                          <FormTraCuu
                            onSubmit={traCuu}
                            onWarning={showNotification}
                            results={ds}
                            previewMode={previewMode}
                            onViewDetail={viewDetail}
                            onReset={() => {
                              setds([]);
                              clearLookupRecords();
                              if (detailId) router.replace(router.asPath.split("#")[0], undefined, { shallow: true, scroll: false });
                              setNotificationOpen(false);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                    <svg className="vbcc-accreditation-logo vbcc-accreditation-logo--work" viewBox="490 70 195 300" aria-hidden="true">
                      <image href="/assets/image/bgfooter2.png" width="2517" height="401" />
                    </svg>
                    <svg className="vbcc-accreditation-logo vbcc-accreditation-logo--fibaa" viewBox="780 70 235 300" aria-hidden="true">
                      <image href="/assets/image/bgfooter2.png" width="2517" height="401" />
                    </svg>
                    <svg className="vbcc-accreditation-logo vbcc-accreditation-logo--qs" viewBox="1140 75 250 260" aria-hidden="true">
                      <image href="/assets/image/bgfooter2.png" width="2517" height="401" />
                    </svg>
                    <svg className="vbcc-accreditation-logo vbcc-accreditation-logo--stars" viewBox="1530 80 680 240" aria-hidden="true">
                      <image href="/assets/image/bgfooter2.png" width="2517" height="401" />
                    </svg>
                  </div>
                </div>
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

        .vbcc-lookup-page .vbcc-page-shell {
          display: flex;
          width: 100%;
          min-width: 0;
        }

        .vbcc-lookup-page .vbcc-page-content {
          flex: 1;
          min-width: 0;
        }

        .vbcc-lookup-page .vbcc-dockbar {
          width: 52px !important;
          padding: 0 !important;
          color: rgba(255, 255, 255, .6);
          background: linear-gradient(142.53deg, #134d8b 43.4%, #2e548a 100%) !important;
          border-radius: 0;
        }

        .vbcc-lookup-page .vbcc-dockbar-brand {
          position: absolute;
          top: 18px;
          left: 6px;
          width: 40px;
          height: 40px;
        }

        .vbcc-lookup-page .vbcc-dockbar-brand [data-slot="logo-mark"] {
          width: 40px;
          height: 40px;
        }

        .vbcc-lookup-page .vbcc-dockbar-wordmark {
          position: absolute;
          top: calc(50% - 100px);
          left: 16px;
          width: 20px;
          height: 200px;
          min-height: 200px;
          flex: none;
          color: rgba(255, 255, 255, .4);
        }

        .vbcc-lookup-page .vbcc-dockbar [data-slot="sidebar-dock-footer"] {
          display: contents;
        }

        .vbcc-lookup-page .vbcc-dockbar-theme,
        .vbcc-lookup-page .vbcc-dockbar-language {
          position: absolute;
          left: 8px;
          width: 36px;
          height: 68px;
          padding: 4px;
          gap: 4px;
          background: rgba(0, 0, 0, .25);
          border-radius: 999px;
        }

        .vbcc-lookup-page .vbcc-dockbar-theme {
          bottom: 100px;
        }

        .vbcc-lookup-page .vbcc-dockbar-language {
          bottom: 16px;
        }

        .vbcc-lookup-page .vbcc-dockbar [data-slot="sidebar-dock-switcher-item"] {
          width: 28px;
          height: 28px;
          padding: 4px;
          color: rgba(255, 255, 255, .6);
          font-size: 11px;
          font-weight: 600;
          border-radius: 999px;
        }

        .vbcc-lookup-page .vbcc-dockbar [data-slot="sidebar-dock-switcher-item"][data-state="on"] {
          color: #fff;
          background: #134d8b;
        }

        .vbcc-lookup-page .vbcc-hero {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          min-height: max(720px, 100svh);
        }

        .vbcc-lookup-page .vbcc-hero-background {
          position: sticky;
          top: 0;
          z-index: -1;
          flex: none;
          width: 100%;
          height: 100svh;
          margin-bottom: -100svh;
          background: url("/assets/image/bgtracuu.png") center / cover no-repeat;
          pointer-events: none;
        }

        .vbcc-lookup-page .vbcc-detail-link-message {
          margin: 0 0 12px;
          padding: 12px 16px;
          color: #134d8b;
          font-size: 14px;
          background: #fff;
          border-radius: 8px;
        }

        .vbcc-lookup-page .vbcc-hero-header {
          display: flex;
          flex: none;
          align-items: flex-start;
          justify-content: space-between;
          box-sizing: border-box;
          height: 128px;
          padding: 32px;
        }

        .vbcc-lookup-page .vbcc-hero-logo {
          transform: scale(1.25);
          transform-origin: left top;
        }

        .vbcc-lookup-page .vbcc-hero-logo span {
          color: #111 !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark {
          --vbcc-dark-card: #22242a;
          --vbcc-dark-text: #f6f7f9;
          --vbcc-dark-muted: #a9abb4;
          --vbcc-dark-border: rgba(255, 255, 255, .14);
          --vbcc-dark-control: #2b2d34;
          --vbcc-dark-control-hover: #383b44;
          --vbcc-dark-primary: #244998;
          --vbcc-dark-primary-hover: #315cba;
          --vbcc-dark-focus: #8cbcff;
        }

        .vbcc-lookup-page .vbcc-hero-area {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          min-height: 0;
          padding: 0 24px 24px;
        }

        .vbcc-lookup-page .vbcc-hero--has-results .vbcc-hero-area {
          min-height: max-content;
        }

        .vbcc-lookup-page .vbcc-hero--detail .vbcc-hero-area {
          align-items: flex-start;
          padding-top: 0;
          padding-bottom: 48px;
        }

        .vbcc-lookup-page .vbcc-hero-form {
          width: 100%;
          max-width: 960px;
        }

        .vbcc-lookup-page .vbcc-mobile-dockbar {
          display: none;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form-card {
          color: var(--vbcc-dark-text);
          background: var(--vbcc-dark-card) !important;
          border: 0 !important;
          box-shadow: 0 4px 48px rgba(0, 0, 0, .3) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form-heading h1,
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form label {
          color: var(--vbcc-dark-text) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form-heading p {
          color: var(--vbcc-dark-muted) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form-heading p.vbcc-form-prompt-error {
          color: #fca5a5 !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="input"],
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-field"] {
          color: var(--vbcc-dark-text) !important;
          background: var(--vbcc-dark-control) !important;
          border-color: rgba(255, 255, 255, .24) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="input"]::placeholder,
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-field"] [data-placeholder],
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-field"] [data-type="literal"] {
          color: var(--vbcc-dark-muted) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-field"] [role="spinbutton"],
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-trigger"] {
          color: var(--vbcc-dark-text) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-reset-button {
          color: var(--vbcc-dark-text) !important;
          background: var(--vbcc-dark-control) !important;
          border-color: var(--vbcc-dark-border) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-reset-button:hover:not(:disabled) {
          background: var(--vbcc-dark-control-hover) !important;
          border-color: var(--vbcc-dark-focus) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-search-button {
          background: var(--vbcc-dark-primary) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-search-button:hover:not(:disabled) {
          background: var(--vbcc-dark-primary-hover) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="input"]:focus-visible,
        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form [data-slot="date-picker-field"]:focus-within {
          border-color: var(--vbcc-dark-focus) !important;
        }

        .vbcc-lookup-page .vbcc-theme-dark .vbcc-form-action-buttons button:focus-visible {
          outline: 2px solid var(--vbcc-dark-focus);
          outline-offset: 2px;
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

        @media (max-width: 767px) {
          .vbcc-lookup-page .vbcc-page-shell {
            flex-direction: column;
            --sidebar-dock-width: 0px !important;
          }

          .vbcc-lookup-page [data-slot="sidebar-dock-gap"],
          .vbcc-lookup-page [data-slot="sidebar-dock"] {
            display: none !important;
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar {
            display: block;
            position: relative;
            z-index: 2;
            flex: none;
            width: 100%;
            height: 44px;
            background: linear-gradient(142.53deg, #134d8b 43.4%, #2e548a 100%);
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-logo {
            position: absolute;
            top: 10px;
            left: 4px;
            display: block;
            width: 127px;
            height: 24px;
            object-fit: contain;
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-controls {
            position: absolute;
            top: 4px;
            right: 4px;
            display: flex;
            width: 72px;
            height: 36px;
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-controls button {
            display: flex;
            flex: none;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            padding: 4px;
            color: rgba(255, 255, 255, .7);
            background: transparent;
            border: 0;
            border-radius: 999px;
            cursor: pointer;
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-controls button:hover {
            color: #fff;
            background: rgba(255, 255, 255, .12);
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-controls button:focus-visible {
            outline: 2px solid #fff;
            outline-offset: -2px;
          }

          .vbcc-lookup-page .vbcc-mobile-dockbar-language {
            font-size: 14px;
            font-weight: 500;
          }

          .vbcc-lookup-page .vbcc-hero {
            min-height: max(776px, calc(100svh - 44px));
          }

          .vbcc-lookup-page .vbcc-hero-header {
            height: 76px;
            padding: 20px 16px;
          }

          .vbcc-lookup-page .vbcc-hero-logo {
            transform: scale(.9);
          }

          .vbcc-lookup-page .vbcc-hero-area {
            align-items: flex-start;
            padding: 12px 16px 48px;
          }

          .vbcc-lookup-page .vbcc-hero--detail .vbcc-hero-area {
            padding-top: 24px;
          }

          .vbcc-lookup-page .vbcc-accreditation-strip {
            height: 348px;
            background: #ffffff;
          }

          .vbcc-lookup-page .vbcc-accreditation-strip img {
            display: none;
          }

          .vbcc-lookup-page .vbcc-mobile-accreditations {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-template-rows: 184px 148px;
            align-items: center;
            justify-items: center;
            width: 100%;
            height: 348px;
            max-width: 440px;
            margin: 0 auto;
            padding: 8px 12px;
            box-sizing: border-box;
            background: #ffffff;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo {
            width: 100%;
            max-height: 100%;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--work,
          .vbcc-lookup-page .vbcc-accreditation-logo--fibaa {
            grid-column: span 3;
            height: 174px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--qs {
            grid-column: span 2;
            height: 130px;
          }

          .vbcc-lookup-page .vbcc-accreditation-logo--stars {
            grid-column: span 4;
            height: 130px;
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

        @media print {
          .vbcc-lookup-page .vbcc-hero-background {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TraCuuVanBangChungChi;
