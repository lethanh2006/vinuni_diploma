// @ts-nocheck
import { IconCheckCircle, IconDownload, IconGraduationScroll, IconInfoCircle, IconNotebook01, LecxeEmptyNoData } from "@vinuni/ui";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "components/Utils/useTranslation";
import { downloadDetailPdf } from "components/Utils/downloadDetailPdf";
import "./style.less";

const normalizeText = (value) =>
  typeof value === "string" ? value.trim().toLocaleLowerCase("vi") : "";

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

const displayValue = (value, t, fallback = "--") => {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "object") return JSON.stringify(value);
  const translationKey = dynamicValueKeys[normalizeText(value)];
  return translationKey ? t(translationKey) : value;
};
const displayDate = (value) =>
  value && moment(value).isValid() ? moment(value).format("DD/MM/YYYY") : "--";

const InfoGrid = ({ items }) => (
  <dl className="vbcc-detail-fields">
    {items.map(([label, value]) => (
      <div className="vbcc-detail-field" key={label}>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);

const DetailSection = ({ title, Icon, items }) => (
  <section className="vbcc-detail-section">
    <h2 className="vbcc-detail-section-title">
      <Icon size={24} aria-hidden="true" />
      {title}
    </h2>
    <InfoGrid items={items} />
  </section>
);

const PrintIcon = () => (
  <svg className="vbcc-detail-action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 15h12v6H6zM18 12h.01" />
  </svg>
);

const ChiTietVanBang = ({ record: item = {}, onBack }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const record = item?.DuLieu ? { ...item, ...item.DuLieu } : item;
  const documentUrl = record?.fileVanBang || record?.urlIpfs;
  const dataElements = record?.templateData ?? [];
  const getDataElementValue = (headers, fallback = "--") => {
    const normalizedHeaders = headers.map(normalizeText);
    const element = dataElements.find((entry) =>
      normalizedHeaders.includes(normalizeText(entry?.headerName)),
    );
    if (!element) return fallback;
    if (element.type === "Date") return displayDate(element.value);
    return displayValue(element.value, t, fallback);
  };

  useEffect(() => {
    if (!onBack) router.replace("/");
  }, [onBack, router]);
  if (!onBack) return null;

  const handleDownload = async () => {
    if (downloading || !cardRef.current) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      await downloadDetailPdf({ card: cardRef.current, record, documentUrl });
    } catch (error) {
      console.error("Could not download diploma PDF", error);
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  };

  const trainingLevel = displayValue(
    record?.thongTinTrinhDoDaoTao?.ten ?? record?.trinhDoDaoTao, t,
  );
  const fieldOfStudy = displayValue(
    record?.thongTinNganhDaoTao?.ten ?? record?.nganhDaoTao, t,
  );
  const issueDate = displayDate(record?.quyetDinh?.ngayBanHanh ?? record?.ngayCapVanBang);
  const diplomaItems = [
    [t("detail.fullname"), displayValue(record?.hoTen, t)],
    [t("detail.student_id"), displayValue(record?.maSinhVien, t)],
    [t("detail.dob"), displayDate(record?.ngaySinh)],
    [t("detail.education_level"), trainingLevel],
    [t("detail.education_form"), displayValue(record?.thongTinHinhThucDaoTao?.ten ?? record?.hinhThucDaoTao, t)],
    [t("detail.major"), fieldOfStudy],
    [t("detail.specialization"), displayValue(record?.chuyenNganh ?? getDataElementValue(["Chuyên ngành", "Concentration", "Specialization"]), t)],
    [t("detail.minor_specialization"), displayValue(record?.chuyenNganhPhu ?? getDataElementValue(["Chuyên ngành phụ", "Minor", "Minor specialization"]), t)],
    [t("detail.diploma_no"), displayValue(record?.soHieuVanBang, t)],
    [t("detail.book_no"), displayValue(record?.soVaoSoBang, t)],
    [t("detail.book_no_en"), displayValue(record?.bookEntryNumberFormat, t, "---")],
  ];
  const decisionItems = [
    [t("detail.decision_no"), displayValue(record?.quyetDinh?.soQuyetDinh, t)],
    [t("detail.issue_date"), issueDate],
    [t("detail.summary"), displayValue(record?.quyetDinh?.noiDung, t)],
  ];
  const supplementaryItems = [
    [t("detail.appendix_major"), getDataElementValue(["Chuyên ngành đào tạo", "Major"])],
    [t("detail.language_of_instruction"), getDataElementValue(["Ngôn ngữ đào tạo", "Language of Instruction"])],
    [t("detail.ethnicity"), getDataElementValue(["Dân tộc", "Ethnicity"])],
    [t("detail.graduation_decision_no"), getDataElementValue(["Số QĐTN", "Số quyết định tốt nghiệp", "Graduation decision number"])],
    [t("detail.graduation_decision_date"), getDataElementValue(["Ngày QĐTN", "Ngày quyết định tốt nghiệp", "Graduation decision date"])],
  ];

  return (
    <div className="vbcc-detail-card" ref={cardRef}>
      <div className="vbcc-detail-toolbar">
        <button type="button" className="vbcc-detail-title" onClick={onBack} title={t("detail.back")}>
          {t("detail.page_title")}
        </button>
        <div className="vbcc-detail-actions">
          <button type="button" className="vbcc-detail-toolbar-button vbcc-detail-print" onClick={() => window.print()} aria-label={t("detail.print")}>
            <PrintIcon /><span className="vbcc-detail-action-label">{t("detail.print")}</span>
          </button>
          <button type="button" className="vbcc-detail-toolbar-button vbcc-detail-download" onClick={handleDownload} disabled={downloading || !record?._id} aria-busy={downloading} aria-label={downloading ? t("detail.downloading") : t("detail.download")}>
            <IconDownload className="vbcc-detail-action-icon" size={24} aria-hidden="true" /><span className="vbcc-detail-action-label">{downloading ? t("detail.downloading") : t("detail.download")}</span>
          </button>
        </div>
      </div>
      {downloadError ? <p className="vbcc-detail-download-error" role="alert">{t("detail.download_failed")}</p> : null}

      {record?._id ? (
        <div className="vbcc-detail-body">
          <section className="vbcc-detail-student">
            <div className="vbcc-detail-student-primary">
              <div className="vbcc-detail-student-heading">
                <h1>{displayValue(record?.hoTen, t)}</h1>
                <span className="vbcc-detail-verified"><IconCheckCircle size={20} aria-hidden="true" />{t("detail.verified")}</span>
              </div>
              <InfoGrid items={[
                [t("detail.student_id"), displayValue(record?.maSinhVien, t)],
                [t("detail.dob"), displayDate(record?.ngaySinh)],
              ]} />
            </div>
            <div className="vbcc-detail-student-summary">
              <InfoGrid items={[
                [t("detail.education_level"), trainingLevel],
                [t("detail.major"), fieldOfStudy],
                [t("detail.issue_date"), issueDate],
              ]} />
            </div>
          </section>

          <div className="vbcc-detail-information">
            <DetailSection title={t("detail.diploma_info")} Icon={IconInfoCircle} items={diplomaItems} />
            <DetailSection title={t("detail.decision_info")} Icon={IconGraduationScroll} items={decisionItems} />
            <DetailSection title={t("detail.appendix_info")} Icon={IconNotebook01} items={supplementaryItems} />
          </div>
        </div>
      ) : (
        <div className="vbcc-detail-empty"><LecxeEmptyNoData /><p>{t("detail.no_appendix_error")}</p></div>
      )}
    </div>
  );
};

export default ChiTietVanBang;
