// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@vinuni/ui";
import moment from "moment";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "components/Utils/useTranslation";
import Link from "next/link";

const KetQuaVanBang = ({ thongTinTraCuu = [], onViewDetail }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const mobileColumnWidth = "max(124px, calc((100vw - 72px) / 2))";
  const desktopDataColumnWidth = "calc((100% - 100px) / 5)";

  const columns = [
    {
      title: t("index.table.book_no"),
      dataIndex: ["DuLieu", "soVaoSoBang"],
      key: "soVaoSoBang",
      width: isMobile ? mobileColumnWidth : desktopDataColumnWidth,
    },
    {
      title: t("index.table.diploma_no"),
      dataIndex: ["DuLieu", "soHieuVanBang"],
      key: "soHieuVanBang",
      width: isMobile ? mobileColumnWidth : desktopDataColumnWidth,
    },
    {
      title: t("index.table.fullname"),
      dataIndex: ["DuLieu", "hoTen"],
      key: "hoTen",
      width: desktopDataColumnWidth,
    },
    {
      title: t("index.table.dob"),
      key: "ngaySinh",
      width: desktopDataColumnWidth,
      render: (_, record) =>
        record?.DuLieu?.ngaySinh
          ? moment(record.DuLieu.ngaySinh).format("DD/MM/YYYY")
          : "",
    },
    {
      title: t("index.table.student_id"),
      dataIndex: ["DuLieu", "maSinhVien"],
      key: "maSinhVien",
      width: desktopDataColumnWidth,
    },
    {
      title: t("index.table.action"),
      key: "action",
      align: "center",
      width: 100,
      render: (val, rec) => (
        <Tooltip>
          <TooltipTrigger asChild>
            {onViewDetail ? (
              <a
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: rec?.DuLieu?._id ? "pointer" : "not-allowed",
                  opacity: rec?.DuLieu?._id ? 1 : 0.5,
                  width: "44px",
                  height: "44px",
                  background: "rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "1000px",
                  border: "none",
                  transition: "background 0.2s ease",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (rec?.DuLieu?._id) onViewDetail(rec);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="7"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
            ) : (
              <Link
                legacyBehavior
                href={
                  rec?.DuLieu?._id ? `/vanbangchungchi/${rec.DuLieu._id}` : "#"
                }
                passHref
              >
                <a
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: rec?.DuLieu?._id ? "pointer" : "not-allowed",
                    opacity: rec?.DuLieu?._id ? 1 : 0.5,
                    width: "44px",
                    height: "44px",
                    background: "rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "1000px",
                    border: "none",
                    transition: "background 0.2s ease",
                  }}
                  onClick={(e) => {
                    if (!rec?.DuLieu?._id) e.preventDefault();
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="10"
                      ry="7"
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {!rec?.DuLieu?._id
              ? t("index.table.no_info")
              : t("index.table.detail")}
          </TooltipContent>
        </Tooltip>
      ),
    },
  ];

  const hasError = Boolean(thongTinTraCuu?.Error);
  const isEmpty = !Array.isArray(thongTinTraCuu) || thongTinTraCuu.length === 0;
  const dataSource = !isEmpty
    ? thongTinTraCuu.map((item, index) => ({
        ...item,
        stt: index + 1,
        key: item?._id || index,
      }))
    : [];

  if (isEmpty && !hasError) {
    return null;
  }

  return (
    <div
      className="vbcc-result-section"
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: isMobile ? "32px 16px" : "40px clamp(24px, 5vw, 72px)",
        backgroundColor: "#F7F6FB",
        minHeight: isEmpty ? "216px" : "auto",
        borderTop: "1px solid #e8e8e8",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <div
        className="vbcc-result-container"
        style={{ width: "100%", maxWidth: "1296px", margin: "0 auto" }}
      >
        <div
          className="vbcc-result-header"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px",
            marginTop: 0,
            marginBottom: isEmpty ? "32px" : "24px",
          }}
        >
          <h3
            className="vbcc-result-heading"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              margin: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: isMobile ? "18px" : "24px",
                lineHeight: "135%",
                color: "#2E2E2E",
                whiteSpace: "nowrap",
              }}
            >
              {t("index.table.search_result_header")}
            </span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flex: "none", order: 1, flexGrow: 0 }}
            >
              <path
                d="M22.6666 22L28 27.3333"
                stroke="#134D8B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14.6667"
                cy="14.6667"
                r="10.6667"
                stroke="#134D8B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h3>
          {!isEmpty ? (
            <span className="vbcc-result-count">
              {dataSource.length}{" "}
              {t(dataSource.length === 1 ? "index.table.result" : "index.table.results")}
            </span>
          ) : null}
        </div>
        {isEmpty ? (
          <div
            className="vbcc-empty-result"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px",
              gap: "24px",
              minHeight: "88px",
            }}
          >
            <div
              className="vbcc-empty-image"
              style={{
                flex: "none",
                order: 0,
                flexGrow: 0,
                width: "256px",
                height: "256px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/assets/image/kqtc.png"
                alt="No data"
                style={{
                  width: "256px",
                  height: "256px",
                  objectFit: "contain",
                }}
              />
            </div>
            <span
              className="vbcc-empty-message"
              style={{
                flex: "none",
                flexGrow: 0,
                display: "block",
                width: "100%",
                maxWidth: isMobile ? "440px" : "none",
                boxSizing: "border-box",
                textAlign: "center",
                textWrap: "balance",
                fontStyle: hasError ? "italic" : "normal",
                lineHeight: "135%",
                letterSpacing: "0.03em",
                color: hasError ? "#FF0000" : "rgba(46, 46, 46, 0.5)",
                fontWeight: 400,
                fontSize: "16px",
              }}
            >
              {t(
                hasError
                  ? thongTinTraCuu.messageKey || "index.table.no_result_msg"
                  : "index.table.fill_info_prompt",
              )}
            </span>
          </div>
        ) : (
          <>
            <div
              className="vbcc-result-table-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                background: "#FFFFFF",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "22px",
                padding: "20px",
              }}
            >
              <div style={{ width: "100%", overflowX: "auto" }}>
                <Table density="compact" className="custom-table-vbcc">
                  <colgroup>
                    {columns.map((column) => (
                      <col key={column.key} style={{ width: column.width }} />
                    ))}
                  </colgroup>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead
                          key={column.key}
                          style={{
                            width: column.width,
                            textAlign: "left",
                          }}
                        >
                          {column.title}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataSource.map((record) => (
                      <TableRow key={record.key}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.key}
                            style={{ textAlign: column.align }}
                          >
                            {column.render
                              ? column.render(undefined, record)
                              : column.dataIndex.reduce(
                                  (current, key) => current?.[key],
                                  record,
                                )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="vbcc-result-mobile-list">
              {dataSource.map((record) => {
                const data = record?.DuLieu || {};
                const canView = Boolean(data._id);
                const fields = [
                  {
                    label: t("index.table.dob"),
                    value: data.ngaySinh
                      ? moment(data.ngaySinh).format("DD/MM/YYYY")
                      : "—",
                  },
                  { label: t("index.table.student_id"), value: data.maSinhVien },
                  { label: t("index.table.book_no"), value: data.soVaoSoBang },
                  { label: t("index.table.diploma_no"), value: data.soHieuVanBang },
                ];
                const content = (
                  <>
                    <span className="vbcc-result-mobile-name">
                      {data.hoTen || "—"}
                    </span>
                    <span
                      className="vbcc-result-mobile-divider"
                      aria-hidden="true"
                    />
                    <span className="vbcc-result-mobile-fields">
                      {fields.map((field) => (
                        <span
                          className="vbcc-result-mobile-field"
                          key={field.label}
                        >
                          <span className="vbcc-result-mobile-label">
                            {field.label}
                          </span>
                          <span className="vbcc-result-mobile-value">
                            {field.value || "—"}
                          </span>
                        </span>
                      ))}
                    </span>
                  </>
                );
                const label = canView
                  ? `${t("index.table.detail")}: ${data.hoTen || data.maSinhVien || data.soHieuVanBang || ""}`
                  : t("index.table.no_info");

                return onViewDetail || !canView ? (
                  <button
                    className="vbcc-result-mobile-card"
                    type="button"
                    key={record.key}
                    disabled={!canView}
                    aria-label={label}
                    onClick={() => onViewDetail?.(record)}
                  >
                    {content}
                  </button>
                ) : (
                  <Link
                    className="vbcc-result-mobile-card"
                    href={`/vanbangchungchi/${data._id}`}
                    key={record.key}
                    aria-label={label}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      <style jsx global>{`
        .vbcc-result-mobile-list {
          display: none;
        }
        .vbcc-result-count {
          color: #2e2e2e;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          white-space: nowrap;
        }
        .custom-table-vbcc {
          width: 100%;
          min-width: 900px;
          table-layout: fixed;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          background: #ffffff !important;
          border-collapse: separate !important;
          border-radius: 8px !important;
          border-spacing: 0 !important;
          overflow: hidden !important;
        }
        .vbcc-result-table-card [data-slot="table-container"] {
          border-radius: 8px !important;
        }
        .custom-table-vbcc
          [data-slot="table-header"]
          > [data-slot="table-row"] {
          height: 44px !important;
        }
        .custom-table-vbcc [data-slot="table-head"] {
          position: relative;
          box-sizing: border-box;
          font-family: "Inter", sans-serif !important;
          font-style: normal !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 20px !important;
          letter-spacing: 0 !important;
          text-align: left !important;
          color: rgba(0, 0, 0, 0.6) !important;
          background: rgba(0, 0, 0, 0.03) !important;
          padding: 12px 10px !important;
          height: 44px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-right: none !important;
          border-left: none !important;
          white-space: nowrap !important;
        }
        .custom-table-vbcc [data-slot="table-head"] * {
          font-family: "Inter", sans-serif !important;
          font-style: normal !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 20px !important;
          letter-spacing: 0 !important;
          color: rgba(0, 0, 0, 0.6) !important;
        }
        .custom-table-vbcc [data-slot="table-head"]:last-child {
          padding-right: 16px !important;
          padding-left: 16px !important;
        }
        .custom-table-vbcc [data-slot="table-head"]:not(:first-child)::before {
          position: absolute;
          top: 12px;
          bottom: 12px;
          left: 0;
          width: 1px;
          background: rgba(0, 0, 0, 0.06);
          content: "";
        }
        .custom-table-vbcc
          [data-slot="table-body"]
          > [data-slot="table-row"] {
          height: 64px !important;
        }
        .custom-table-vbcc [data-slot="table-cell"] {
          box-sizing: border-box;
          font-family: "Inter", sans-serif !important;
          font-style: normal !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 20px !important;
          letter-spacing: 0 !important;
          color: #000000 !important;
          background: #ffffff !important;
          padding: 0 10px !important;
          height: 64px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-right: none !important;
          border-left: none !important;
          white-space: nowrap !important;
        }
        .custom-table-vbcc [data-slot="table-cell"] * {
          font-family: "Inter", sans-serif !important;
          font-style: normal !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 20px !important;
          letter-spacing: 0 !important;
          color: #000000 !important;
        }
        .custom-table-vbcc [data-slot="table-cell"]:last-child {
          padding-right: 16px !important;
          padding-left: 16px !important;
          text-align: center !important;
        }
        .custom-table-vbcc
          [data-slot="table-body"]
          > [data-slot="table-row"]:last-child
          > [data-slot="table-cell"] {
          border-bottom: none !important;
        }
        .custom-table-vbcc
          [data-slot="table-body"]
          > [data-slot="table-row"]:hover
          > [data-slot="table-cell"] {
          background: #ffffff !important;
        }
        @media (max-width: 767px) {
          .vbcc-result-section {
            padding: 40px 20px !important;
            background-color: #f2f2f8 !important;
            border-top: none !important;
            border-bottom: none !important;
          }
          .vbcc-result-table-card {
            display: none !important;
          }
          .vbcc-empty-image,
          .vbcc-empty-image img {
            width: 200px !important;
            height: 192px !important;
          }
          .vbcc-result-mobile-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .vbcc-result-mobile-card {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            min-width: 0;
            padding: 16px;
            border: 1px solid #ffffff;
            border-radius: 22px;
            background: rgba(255, 255, 255, 0.4);
            color: #000000;
            box-sizing: border-box;
            font-family: "Inter", sans-serif;
            text-align: left;
            text-decoration: none;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          .vbcc-result-mobile-card:focus-visible {
            outline: 2px solid #2e548a;
            outline-offset: 3px;
          }
          .vbcc-result-mobile-card:disabled {
            cursor: default;
          }
          .vbcc-result-mobile-name {
            font-size: 18px;
            font-weight: 600;
            line-height: 28px;
            overflow-wrap: anywhere;
          }
          .vbcc-result-mobile-divider {
            display: block;
            width: 100%;
            height: 1px;
            background: rgba(0, 0, 0, 0.06);
          }
          .vbcc-result-mobile-fields {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }
          .vbcc-result-mobile-field {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 2px 4px;
          }
          .vbcc-result-mobile-label {
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          .vbcc-result-mobile-value {
            color: #000000;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            overflow-wrap: anywhere;
          }
          .vbcc-result-section,
          .vbcc-result-container,
          .vbcc-result-table-card,
          .custom-table-vbcc {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }
          .vbcc-result-header {
            align-items: flex-start !important;
            align-items: center !important;
            gap: 24px;
          }
          .vbcc-result-heading {
            justify-content: flex-start !important;
            text-align: left !important;
            gap: 12px !important;
          }
          .vbcc-result-heading > span {
            font-family: "Inter", sans-serif !important;
            font-size: 20px !important;
            line-height: 28px !important;
            color: #000000 !important;
          }
          .vbcc-result-heading > svg {
            width: 24px;
            height: 24px;
          }
          .vbcc-result-count {
            font-family: "Inter", sans-serif;
            font-size: 16px;
            line-height: 24px;
            color: #000000;
          }
          .vbcc-result-table-card [data-slot="table-container"] {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .vbcc-result-table-card
            [data-slot="table-container"]::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
        }
        @media (max-width: 360px) {
          .vbcc-result-section {
            padding-right: 16px !important;
            padding-left: 16px !important;
          }
          .vbcc-result-mobile-card {
            padding: 16px;
          }
          .custom-table-vbcc [data-slot="table-head"] {
            padding: 12px 8px !important;
            font-size: 11px !important;
          }
          .custom-table-vbcc [data-slot="table-head"] * {
            font-size: 11px !important;
          }
          .custom-table-vbcc [data-slot="table-cell"] {
            padding: 12px 8px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default KetQuaVanBang;
