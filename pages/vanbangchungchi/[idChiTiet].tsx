// @ts-nocheck
import { LecxeEmptyNoData } from "@vinuni/ui";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "./style.less";
import { useTranslation } from "components/Utils/useTranslation";

const PDFViewerV2 = dynamic(() => import("../../components/PDFViewerV2"), {
  ssr: false,
});

const normalizeLocalizedText = (value) =>
  typeof value === "string" ? value.trim().toLocaleLowerCase("vi") : "";

const dynamicHeaderKeys = {
  "chuyên ngành": "detail.appendix_major",
  "chuyên ngành đào tạo": "detail.appendix_major",
  major: "detail.appendix_major",
  "ngôn ngữ đào tạo": "detail.language_of_instruction",
  "language of instruction": "detail.language_of_instruction",
  "dân tộc": "detail.ethnicity",
  ethnicity: "detail.ethnicity",
  "số qđtn": "detail.graduation_decision_no",
  "số quyết định tốt nghiệp": "detail.graduation_decision_no",
  "graduation decision number": "detail.graduation_decision_no",
  "ngày qđtn": "detail.graduation_decision_date",
  "ngày quyết định tốt nghiệp": "detail.graduation_decision_date",
  "graduation decision date": "detail.graduation_decision_date",
};

const dynamicValueKeys = {
  "hệ thống thông tin": "detail.value_information_systems",
  "information systems": "detail.value_information_systems",
  "tiếng việt": "detail.value_vietnamese",
  vietnamese: "detail.value_vietnamese",
  kinh: "detail.value_kinh",
  "cử nhân": "detail.value_bachelor",
  "bachelor's degree": "detail.value_bachelor",
  "tiến sĩ": "detail.value_doctorate",
  "doctoral degree": "detail.value_doctorate",
  "chính quy": "detail.value_full_time",
  "full-time": "detail.value_full_time",
};

const translateDynamicHeader = (value, t) => {
  const translationKey = dynamicHeaderKeys[normalizeLocalizedText(value)];
  return translationKey ? t(translationKey) : value;
};

const translateDynamicValue = (value, t) => {
  const translationKey = dynamicValueKeys[normalizeLocalizedText(value)];
  return translationKey ? t(translationKey) : value;
};

const renderField = (item, t) => {
  if (item.type === "Date") {
    return item.value ? moment(item.value).format("DD/MM/YYYY") : "---";
  }
  if (item.type === "Number") {
    return item.value ?? "---";
  }
  if (typeof item.value === "object") {
    return JSON.stringify(item.value);
  }
  return translateDynamicValue(item.value, t) || "---";
};

const ChiTietVanBang = ({ record: item = {}, onBack }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const record = item?.DuLieu ? { ...item, ...item.DuLieu } : item;
  const documentUrl = record?.fileVanBang || record?.urlIpfs;
  const dataElements = record?.templateData ?? [];
  const findDataElement = (...headerNames) => {
    const normalizedHeaders = headerNames.map(normalizeLocalizedText);

    return dataElements.find((element) =>
      normalizedHeaders.includes(normalizeLocalizedText(element?.headerName)),
    );
  };
  const getDataElementValue = (headerNames, fallback = "--") => {
    const element = findDataElement(...headerNames);
    return element ? renderField(element, t) : fallback;
  };
  const specialization =
    record?.chuyenNganh ??
    getDataElementValue([
      "Chuyên ngành",
      "Chuyên ngành đào tạo",
      "Specialization",
    ]);
  const minorSpecialization =
    record?.chuyenNganhPhu ??
    getDataElementValue([
      "Chuyên ngành phụ",
      "Minor specialization",
      "Minor",
    ]);

  useEffect(() => {
    if (!onBack) {
      router.replace("/");
    }
  }, [onBack]);

  if (!onBack) {
    return null;
  }

  return (
    <div className="vbcc-container">
      <div className="vbcc-detail-layout">
        <div className="vbcc-detail-header">
          <div className="vbcc-detail-header-left">
            {onBack && (
              <div className="vbcc-back-group">
                <button
                  type="button"
                  className="vbcc-back-button"
                  onClick={onBack}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 10H5M5 10L8.5 6.5M5 10L8.5 13.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("detail.back")}</span>
                </button>
                <svg
                  className="vbcc-header-divider"
                  width="1"
                  height="20"
                  viewBox="0 0 1 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.500001"
                    y2="20"
                    stroke="black"
                    strokeOpacity="0.25"
                  />
                </svg>
              </div>
            )}
            <div className="vbcc-detail-title">
              <span>{t("detail.title")}</span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M22.667 22L28.0003 27.3333"
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
            </div>
          </div>

          {record?._id && (
            <div className="vbcc-verified">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72602 25.8995 6.10051C23.274 3.475 19.713 2 16 2ZM14 21.5908L9.00001 16.5908L10.5906 15L14 18.4092L21.41 11L23.0057 12.5859L14 21.5908Z"
                  fill="#24A148"
                />
              </svg>

              <span>{t("detail.verified")}</span>
            </div>
          )}
        </div>

        {record?._id ? (
          <div className="vbcc-detail-content">
            <div className="vbcc-detail-main-grid">
              <div className="vbcc-document-card">
                <div className="vbcc-document-preview">
                  {documentUrl ? (
                    <PDFViewerV2
                      url={documentUrl}
                      height="100%"
                      plugins={[]}
                    />
                  ) : (
                    <img
                      className="vbcc-document-demo"
                      src="/assets/image/vanbangdemo.png"
                      alt={t("detail.diploma_copy")}
                    />
                  )}
                </div>
                <div className="vbcc-document-actions">
                  <a
                    className={`vbcc-document-action ${
                      documentUrl ? "" : "is-disabled"
                    }`}
                    href={documentUrl || undefined}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("detail.diploma_file")}
                    aria-disabled={!documentUrl}
                  >
                    <img
                      className="vbcc-pdf-icon"
                      src="/assets/image/iconpdf.png"
                      alt=""
                    />
                  </a>
                  <button
                    className="vbcc-document-action"
                    type="button"
                    onClick={() => window.print()}
                    aria-label={t("detail.print")}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 1.25C16.5188 1.25 17.75 2.48122 17.75 4V6.25H19.5C21.2949 6.25 22.75 7.70507 22.75 9.5L22.75 16C22.75 16.9665 21.9665 17.75 21 17.75H17.75V20C17.75 20.9665 16.9665 21.75 16 21.75L8 21.75C7.0335 21.75 6.25 20.9665 6.25 20V17.75H3C2.0335 17.75 1.25 16.9665 1.25 16L1.25 9.5C1.25 7.70507 2.70507 6.25 4.5 6.25H6.25L6.25 4C6.25 2.48122 7.48122 1.25 9 1.25L15 1.25ZM8 15.75C7.86193 15.75 7.75 15.8619 7.75 16V20C7.75 20.1381 7.86193 20.25 8 20.25L16 20.25C16.1381 20.25 16.25 20.1381 16.25 20L16.25 16C16.25 15.8619 16.1381 15.75 16 15.75H8ZM4.5 7.75C3.5335 7.75 2.75 8.5335 2.75 9.5L2.75 16C2.75 16.1381 2.86193 16.25 3 16.25H6.25V16C6.25 15.0335 7.0335 14.25 8 14.25H16C16.9665 14.25 17.75 15.0335 17.75 16V16.25L21 16.25C21.1381 16.25 21.25 16.1381 21.25 16L21.25 9.5C21.25 8.5335 20.4665 7.75 19.5 7.75L4.5 7.75ZM19.0088 10C19.5611 10 20.0088 10.4477 20.0088 11C20.0088 11.5523 19.5611 12 19.0088 12H19C18.4477 12 18 11.5523 18 11C18 10.4477 18.4477 10 19 10H19.0088ZM9 2.75C8.30964 2.75 7.75 3.30964 7.75 4L7.75 6.25L16.25 6.25V4C16.25 3.30964 15.6904 2.75 15 2.75L9 2.75Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="vbcc-info-stack">
                <div className="vbcc-info-card">
                  <div className="vbcc-info-title">
                    {t("detail.diploma_info")}
                  </div>
                  <InfoGrid
                    items={[
                      [t("detail.fullname"), record?.hoTen ?? "--"],
                      [t("detail.student_id"), record?.maSinhVien ?? "--"],
                      [
                        t("detail.dob"),
                        record?.ngaySinh
                          ? moment(record.ngaySinh).format("DD/MM/YYYY")
                          : "--",
                      ],
                      [
                        t("detail.education_level"),
                        translateDynamicValue(
                          record?.thongTinTrinhDoDaoTao?.ten ??
                            record?.trinhDoDaoTao,
                          t,
                        ) ?? "--",
                      ],
                      [
                        t("detail.education_form"),
                        translateDynamicValue(
                          record?.thongTinHinhThucDaoTao?.ten ??
                            record?.hinhThucDaoTao,
                          t,
                        ) ?? "--",
                      ],
                      [
                        t("detail.major"),
                        translateDynamicValue(
                          record?.thongTinNganhDaoTao?.ten ??
                            record?.nganhDaoTao,
                          t,
                        ) ?? "--",
                      ],
                      [t("detail.specialization"), specialization],
                      [t("detail.minor_specialization"), minorSpecialization],
                      [t("detail.diploma_no"), record?.soHieuVanBang ?? "--"],
                      [t("detail.book_no"), record?.soVaoSoBang ?? "--"],
                      [
                        t("detail.book_no_en"),
                        record?.bookEntryNumberFormat ?? "---",
                      ],
                    ]}
                  />
                </div>

                <div className="vbcc-info-card">
                  <div className="vbcc-info-title">
                    {t("detail.decision_info")}
                  </div>
                  <InfoGrid
                    wideLast
                    items={[
                      [
                        t("detail.decision_no"),
                        record?.quyetDinh?.soQuyetDinh ?? "--",
                      ],
                      [
                        t("detail.issue_date"),
                        record?.quyetDinh?.ngayBanHanh
                          ? moment(record.quyetDinh.ngayBanHanh).format(
                              "DD/MM/YYYY",
                            )
                          : "--",
                      ],
                      [t("detail.summary"), record?.quyetDinh?.noiDung ?? "--"],
                    ]}
                  />
                </div>

                <div className="vbcc-info-card">
                  <div className="vbcc-info-title">
                    {t("detail.appendix_info")}
                  </div>
                  <InfoGrid
                    items={[
                      [
                        t("detail.appendix_major"),
                        getDataElementValue([
                          "Chuyên ngành đào tạo",
                          "Major",
                        ]),
                      ],
                      [
                        t("detail.language_of_instruction"),
                        getDataElementValue([
                          "Ngôn ngữ đào tạo",
                          "Language of Instruction",
                        ]),
                      ],
                      [
                        t("detail.ethnicity"),
                        getDataElementValue(["Dân tộc", "Ethnicity"]),
                      ],
                      [
                        t("detail.graduation_decision_no"),
                        getDataElementValue([
                          "Số QĐTN",
                          "Số quyết định tốt nghiệp",
                          "Graduation decision number",
                        ]),
                      ],
                      [
                        t("detail.graduation_decision_date"),
                        getDataElementValue([
                          "Ngày QĐTN",
                          "Ngày quyết định tốt nghiệp",
                          "Graduation decision date",
                        ]),
                      ],
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="vbcc-empty">
            <LecxeEmptyNoData />
            <p>{t("detail.no_appendix_error")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoGrid = ({ items, wideLast = false }) => (
  <dl className="vbcc-info-grid">
    {items.map(([label, value], index) => (
      <div
        className={
          wideLast && index === items.length - 1
            ? "vbcc-info-item is-wide"
            : "vbcc-info-item"
        }
        key={`${label}-${index}`}
      >
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);

export default ChiTietVanBang;
