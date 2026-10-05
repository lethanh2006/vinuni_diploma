// @ts-nocheck
import { Badge, IconChervolRight, LecxeEmptyNoData } from "@vinuni/ui";
import moment from "moment";
import React, { useId } from "react";
import { useTranslation } from "components/Utils/useTranslation";

const ResultTraCuuVBCC = ({ thongTinTraCuu, onViewDetail }) => {
  const { t } = useTranslation();
  const resultId = useId();
  const records = Array.isArray(thongTinTraCuu) ? thongTinTraCuu : [];
  const hasError = Boolean(thongTinTraCuu?.Error);

  if (!records.length && !hasError) return null;

  return (
    <section
      className={hasError ? "vbcc-results-empty-state" : "vbcc-results"}
      aria-label={hasError ? t("index.table.no_records_title") : t("index.table.search_result_header")}
      aria-live="polite"
    >
      {hasError ? (
        <div className="vbcc-empty-body">
          <LecxeEmptyNoData className="vbcc-empty-illustration" alt="" />
          <div className="vbcc-empty-copy">
            <h2>{t("index.table.no_records_title")}</h2>
            <p>{t("index.table.no_records_caption")}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="vbcc-results-header">
            <h2>{t("index.table.search_result_header")}</h2>
            <Badge className="vbcc-results-count">{records.length}</Badge>
          </div>
          <div className="vbcc-results-list">
            {records.map((record, index) => {
            const data = record?.DuLieu || {};
            const date = data.ngaySinh ? moment(data.ngaySinh) : null;
            const fields = [
              { label: t("index.table.dob"), value: date?.isValid() ? date.format("DD/MM/YYYY") : "—" },
              { label: t("index.table.student_id"), value: data.maSinhVien },
              { label: t("index.table.diploma_no"), value: data.soHieuVanBang },
              { label: t("index.table.book_no"), value: data.soVaoSoBang },
            ];

            return (
              <button
                className="vbcc-results-item"
                key={record?._id || data._id || index}
                type="button"
                disabled={!data._id || typeof onViewDetail !== "function"}
                aria-label={`${t("index.table.view_detail")}: ${data.hoTen || "—"}`}
                aria-describedby={`${resultId}-fields-${index}`}
                onClick={() => onViewDetail?.(record)}
              >
                <span className="vbcc-results-item-top">
                  <span className="vbcc-results-name">{data.hoTen || "—"}</span>
                  <span className="vbcc-results-detail" aria-hidden="true">
                    {t("index.table.view_detail")}
                    <IconChervolRight size={20} aria-hidden="true" />
                  </span>
                </span>
                <span className="vbcc-results-fields" id={`${resultId}-fields-${index}`}>
                  {fields.map((field) => (
                    <span className="vbcc-results-field" key={field.label}>
                      <span className="vbcc-results-label">{field.label}</span>
                      <span className="vbcc-results-value">{field.value || "—"}</span>
                    </span>
                  ))}
                </span>
              </button>
            );
            })}
          </div>
        </>
      )}
      <style jsx>{`
        .vbcc-results-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
          height: 197px;
          border-top: 1px solid rgba(0, 0, 0, .1);
        }
        .vbcc-empty-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          max-width: 480px;
          height: 196px;
          padding: 24px 16px;
          gap: 12px;
        }
        :global(.vbcc-empty-illustration) {
          flex: none;
          width: 96px !important;
          height: 96px !important;
        }
        .vbcc-empty-copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          width: 100%;
          height: 40px;
        }
        .vbcc-empty-copy h2,
        .vbcc-empty-copy p {
          width: 100%;
          margin: 0;
          text-align: center;
        }
        .vbcc-empty-copy h2 {
          color: #000;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }
        .vbcc-empty-copy p {
          color: rgba(0, 0, 0, .6);
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }
        .vbcc-results {
          --result-text: #000;
          --result-muted: rgba(0, 0, 0, .6);
          --result-tile: rgba(0, 0, 0, .03);
          --result-tile-hover: rgba(0, 0, 0, .06);
          --result-tile-press: rgba(0, 0, 0, .1);
          --result-focus: #134d8b;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, .1);
          font-family: "Inter", sans-serif;
        }
        .vbcc-results-header {
          display: flex;
          align-items: center;
          gap: 8px;
          box-sizing: border-box;
          width: 100%;
          height: 56px;
          padding: 16px 24px;
        }
        .vbcc-results-header h2 {
          margin: 0;
          color: var(--result-text);
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
        }
        :global(.vbcc-results-count) {
          min-width: 20px;
          height: 20px;
          padding: 0 4px;
          color: #fff !important;
          background: rgba(0, 0, 0, .8) !important;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
        }
        .vbcc-results-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
          width: 100%;
          padding: 0 24px 24px;
        }
        .vbcc-results-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          box-sizing: border-box;
          width: 100%;
          min-height: 100px;
          padding: 12px 16px;
          color: var(--result-text);
          font: inherit;
          text-align: left;
          background: var(--result-tile);
          border: 0;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color .16s ease-out;
        }
        @media (hover: hover) {
          .vbcc-results-item:hover:not(:disabled) {
            background: var(--result-tile-hover);
          }
        }
        .vbcc-results-item:active:not(:disabled) {
          background: var(--result-tile-press);
        }
        .vbcc-results-item:focus-visible {
          outline: 2px solid var(--result-focus);
          outline-offset: 2px;
        }
        .vbcc-results-item:disabled {
          cursor: default;
        }
        .vbcc-results-item:disabled .vbcc-results-detail {
          opacity: .5;
        }
        .vbcc-results-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 24px;
        }
        .vbcc-results-name {
          min-width: 0;
          color: var(--result-text);
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          overflow-wrap: anywhere;
        }
        .vbcc-results-detail {
          display: inline-flex;
          align-items: center;
          flex: none;
          height: 20px;
          gap: 4px;
          color: var(--result-focus);
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          white-space: nowrap;
        }
        .vbcc-results-fields {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
        }
        .vbcc-results-field {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 4px;
        }
        .vbcc-results-label,
        .vbcc-results-value {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          line-height: 20px;
        }
        .vbcc-results-label {
          color: var(--result-muted);
          font-weight: 400;
        }
        .vbcc-results-value {
          color: var(--result-text);
          font-weight: 500;
        }
        :global(.vbcc-theme-dark) .vbcc-results-empty-state {
          border-top-color: var(--vbcc-dark-border);
        }
        :global(.vbcc-theme-dark) .vbcc-empty-copy h2 {
          color: var(--vbcc-dark-text);
        }
        :global(.vbcc-theme-dark) .vbcc-empty-copy p {
          color: var(--vbcc-dark-muted);
        }
        :global(.vbcc-theme-dark) .vbcc-results {
          --result-text: var(--vbcc-dark-text);
          --result-muted: var(--vbcc-dark-muted);
          --result-tile: var(--vbcc-dark-control);
          --result-tile-hover: var(--vbcc-dark-control-hover, #383b44);
          --result-tile-press: #42454d;
          --result-focus: var(--vbcc-dark-focus, #8cbcff);
          border-top-color: var(--vbcc-dark-border);
        }
        @media (prefers-reduced-motion: reduce) {
          .vbcc-results-item { transition: none; }
        }
        @media (max-width: 767px) {
          .vbcc-results-header { padding: 16px; }
          .vbcc-results-list { padding: 0 16px 20px; }
          .vbcc-results-item {
            align-items: flex-start;
            min-height: 268px;
          }
          .vbcc-results-item-top { width: 100%; }
          .vbcc-results-fields {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .vbcc-results-field { width: 100%; }
          .vbcc-results-label,
          .vbcc-results-value {
            overflow: visible;
            text-overflow: clip;
            white-space: normal;
            overflow-wrap: anywhere;
          }
        }
        @media (max-width: 440px) {
          .vbcc-results-empty-state { height: auto; min-height: 197px; }
          .vbcc-empty-body { height: auto; min-height: 196px; }
          .vbcc-empty-copy { height: auto; min-height: 40px; }
        }
      `}</style>
    </section>
  );
};

export default ResultTraCuuVBCC;
