// @ts-nocheck
import { IconCheckCircle, IconGraduationScroll, IconInfoCircle, IconNotebook01, LecxeEmptyNoData, LiquidButton } from "@vinuni/ui";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useTranslation } from "components/Utils/useTranslation";
import { downloadDetailPdf } from "components/Utils/downloadDetailPdf";
import "../../pages/vanbangchungchi/style.less";

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

const ChiTietVanBang = ({ record: item }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const record = item?.DuLieu ? { ...item, ...item.DuLieu } : item ?? {};
  const documentUrl = [record?.fileVanBang, record?.urlIpfs]
    .find((url) => typeof url === "string" && url.trim());
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

  if (!item) return null;

  const handleDownload = async () => {
    if (downloading || !record?._id || !cardRef.current) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      await downloadDetailPdf({
        documentUrl,
        element: cardRef.current,
        filename: `thong-tin-van-bang-${record.maSinhVien || record._id}.pdf`,
      });
    } catch (error) {
      console.error("Could not download diploma file", error);
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
        <h2 className="vbcc-detail-title">
          {t("detail.page_title")}
        </h2>
        <div className="vbcc-detail-actions" data-pdf-ignore>
          <LiquidButton theme="primary" size="default" type="button" className="vbcc-detail-print" onClick={() => window.print()} aria-label={t("detail.print")}>
            <span className="vbcc-detail-action-label">{t("detail.print")}</span>
          </LiquidButton>
          <LiquidButton theme="primary" size="default" type="button" className="vbcc-detail-download" onClick={handleDownload} disabled={downloading || !record?._id} aria-busy={downloading} aria-label={downloading ? t("detail.downloading") : t("detail.download")} title={t("detail.download")}>
            <span className="vbcc-detail-action-label">{downloading ? t("detail.downloading") : t("detail.download")}</span>
          </LiquidButton>
        </div>
      </div>
      {downloadError ? <p className="vbcc-detail-download-error" role="alert" data-pdf-ignore>{t("detail.download_failed")}</p> : null}

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
