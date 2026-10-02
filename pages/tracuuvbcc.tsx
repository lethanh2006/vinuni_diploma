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
import {
  clearLookupRecords,
  getDetailPath,
  getDetailId,
  getRecordId,
  readLookupRecords,
  saveLookupRecords,
} from "components/VanBangChungChi/detailNavigation";
import ChiTietVanBang from "components/VanBangChungChi/ChiTietVanBang";
import Container from "components/UI/Container";
import { ip } from "data/ip";
// import { ipProxy } from "data/ip";
import "rc-tabs/assets/index.css";
import React, { useEffect, useRef, useState } from "react";
import SectionWrapper from "../styles/vanbangchungchi.style";
import { useTranslation } from "components/Utils/useTranslation";
import "./vanbangchungchi/style.less";

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
  const queryString = router.asPath.split("#")[0].split("?")[1];
  const querySuffix = queryString ? `?${queryString}` : "";
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
    if (!router.isReady) return;
    if (detailId && router.asPath.includes("#/vanbangchungchi/")) {
      router.replace(`${getDetailPath(detailId)}${querySuffix}`, undefined, {
        scroll: false,
      });
    }
  }, [router.isReady, router.asPath, detailId, querySuffix, router]);

  useEffect(() => {
    if (!router.isReady || initialized.current) return;
    initialized.current = true;
    const preview = router.query.preview;
    if (
      process.env.NODE_ENV === "development" &&
      ["results", "detail", "empty"].includes(preview)
    ) {
      setPreviewMode(true);
      setPreviewEmpty(preview === "empty");
      setds(preview === "empty" ? { Error: true } : previewResults);
      if (preview === "detail" && !getDetailId(router.asPath)) {
        router.replace(
          `${getDetailPath(getRecordId(previewResults[0]))}${querySuffix}`,
          undefined,
          { scroll: false },
        );
      }
    } else {
      setds(readLookupRecords());
    }
  }, [router.isReady, router]);

  const viewDetail = async (record) => {
    const id = getRecordId(record);
    if (!id || id === detailId) return;
    if (!previewMode) saveLookupRecords(ds);
    await router.push(`${getDetailPath(id)}${querySuffix}`, undefined, {
      scroll: false,
    });
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
        `${ip}/phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`,
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
        <SectionWrapper id="daotao" className="vbcc-inter vbcc-lookup-page">
          <Container fullWidth noGutter>
            <div
              className="vbcc-page-shell"
              style={{ "--sidebar-dock-width": "52px" }}
            >
              <SidebarDock className="vbcc-dockbar">
                <SidebarDockBrand className="vbcc-dockbar-brand" />
                <SidebarDockWordmark className="vbcc-dockbar-wordmark" />
                <SidebarDockFooter>
                  <SidebarDockThemeToggle
                    className="vbcc-dockbar-theme"
                    lightLabel="Light theme"
                    darkLabel="Dark theme"
                  />
                  <SidebarDockSwitcher
                    className="vbcc-dockbar-language"
                    value={locale}
                    onValueChange={(value) => value && changeLocale(value)}
                    aria-label="Language"
                  >
                    <SidebarDockSwitcherItem
                      value="vi-VN"
                      aria-label="Tiếng Việt"
                    >
                      VI
                    </SidebarDockSwitcherItem>
                    <SidebarDockSwitcherItem value="en-US" aria-label="English">
                      EN
                    </SidebarDockSwitcherItem>
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
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    aria-label={
                      resolvedTheme === "dark" ? "Light theme" : "Dark theme"
                    }
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
                    onClick={() =>
                      changeLocale(locale === "en-US" ? "vi-VN" : "en-US")
                    }
                    aria-label={
                      locale === "en-US"
                        ? "Switch to Vietnamese"
                        : "Switch to English"
                    }
                  >
                    {locale === "en-US" ? "EN" : "VI"}
                  </button>
                </div>
              </div>
              <div className="vbcc-page-content">
                <div
                  className={`vbcc-hero vbcc-theme-${resolvedTheme}${(Array.isArray(ds) ? ds.length > 0 : Boolean(ds?.Error)) ? " vbcc-hero--has-results" : ""}${selectedRecord ? " vbcc-hero--detail" : ""}`}
                >
                  <div className="vbcc-hero-background" aria-hidden="true" />
                  <div className="vbcc-hero-header">
                    <a
                      className="vbcc-home-link"
                      href="/"
                      aria-label={t("index.home_link")}
                    >
                      <Logo
                        layout="horizontal"
                        theme="color"
                        tagline="Diploma Verification Portal"
                        className="vbcc-hero-logo"
                      />
                    </a>
                  </div>
                  <div className="vbcc-hero-area">
                    <div className="vbcc-hero-form">
                      {selectedRecord ? (
                        <ChiTietVanBang record={selectedRecord} />
                      ) : (
                        <>
                          {detailId ? (
                            <p
                              className="vbcc-detail-link-message"
                              role="status"
                            >
                              {t("detail.linked_record_lookup")}
                            </p>
                          ) : null}
                          <FormTraCuu
                            onSubmit={traCuu}
                            onWarning={showNotification}
                            results={ds}
                            previewMode={previewMode}
                            onViewDetail={viewDetail}
                            onReset={() => {
                              setds([]);
                              clearLookupRecords();
                              if (detailId)
                                router.replace(`/${querySuffix}`, undefined, {
                                  scroll: false,
                                });
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
                    <svg
                      className="vbcc-accreditation-logo vbcc-accreditation-logo--work"
                      viewBox="490 70 195 300"
                      aria-hidden="true"
                    >
                      <image
                        href="/assets/image/bgfooter2.png"
                        width="2517"
                        height="401"
                      />
                    </svg>
                    <svg
                      className="vbcc-accreditation-logo vbcc-accreditation-logo--fibaa"
                      viewBox="780 70 235 300"
                      aria-hidden="true"
                    >
                      <image
                        href="/assets/image/bgfooter2.png"
                        width="2517"
                        height="401"
                      />
                    </svg>
                    <svg
                      className="vbcc-accreditation-logo vbcc-accreditation-logo--qs"
                      viewBox="1140 75 250 260"
                      aria-hidden="true"
                    >
                      <image
                        href="/assets/image/bgfooter2.png"
                        width="2517"
                        height="401"
                      />
                    </svg>
                    <svg
                      className="vbcc-accreditation-logo vbcc-accreditation-logo--stars"
                      viewBox="1530 80 680 240"
                      aria-hidden="true"
                    >
                      <image
                        href="/assets/image/bgfooter2.png"
                        width="2517"
                        height="401"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default TraCuuVanBangChungChi;
