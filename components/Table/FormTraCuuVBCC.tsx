// @ts-nocheck
import {
  Button,
  Card,
  CardContent,
  DatePicker,
  Input,
  Label,
} from "@vinuni/ui";
import React, { useState } from "react";
import { useTranslation } from "components/Utils/useTranslation";

const emptyValues = {
  hoTen: "",
  ngaySinh: null,
  cccd: "",
  maSinhVien: "",
  soHieuVanBang: "",
  soVaoSoBang: "",
};

const formatDob = (value) => {
  if (!value) return undefined;
  const iso = typeof value.toString === "function" ? value.toString() : "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return undefined;
  return `${day}/${month}/${year}`;
};

const FormTraCuuVBCC = (props) => {
  const { t, locale } = useTranslation();
  const [values, setValues] = useState(emptyValues);
  const dateLocale = locale === "en-US" ? "en-GB" : "vi-VN";

  const setField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      hoTen: values.hoTen || undefined,
      ngaySinh: formatDob(values.ngaySinh),
      cccd: values.cccd || undefined,
      maSinhVien: values.maSinhVien || undefined,
      soHieuVanBang: values.soHieuVanBang || undefined,
      soVaoSoBang: values.soVaoSoBang || undefined,
    });
    setValues(emptyValues);
  };

  const handleReset = () => {
    setValues(emptyValues);
    if (props.onReset) props.onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="vbcc-form">
      <Card
        style={{
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <CardContent style={{ padding: 24 }}>
          <div className="vbcc-form-grid">
            <Field label={t("index.form.fullname")}>
              <Input
                value={values.hoTen}
                onChange={setField("hoTen")}
                placeholder={t("index.form.enter_fullname")}
                style={{ color: "#ffffff" }}
              />
            </Field>
            <Field label={t("index.form.dob")}>
              <DatePicker
                locale={dateLocale}
                value={values.ngaySinh}
                onChange={(ngaySinh) =>
                  setValues((current) => ({ ...current, ngaySinh }))
                }
                aria-label={t("index.form.dob")}
                style={{ color: "#ffffff" }}
              />
            </Field>
            <Field label={t("index.form.cccd")}>
              <Input
                value={values.cccd}
                onChange={setField("cccd")}
                placeholder={t("index.form.enter_cccd")}
                style={{ color: "#ffffff" }}
              />
            </Field>
            <Field label={t("index.form.student_id")}>
              <Input
                value={values.maSinhVien}
                onChange={setField("maSinhVien")}
                placeholder={t("index.form.enter_student_id")}
                style={{ color: "#ffffff" }}
              />
            </Field>
            <Field label={t("index.form.diploma_no")}>
              <Input
                value={values.soHieuVanBang}
                onChange={setField("soHieuVanBang")}
                placeholder={t("index.form.enter_diploma_no")}
                style={{ color: "#ffffff" }}
              />
            </Field>
            <Field label={t("index.form.book_no")}>
              <Input
                value={values.soVaoSoBang}
                onChange={setField("soVaoSoBang")}
                placeholder={t("index.form.example_book_no")}
                style={{ color: "#ffffff" }}
              />
            </Field>
          </div>

          <div className="vbcc-form-actions">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="reset"
              onClick={handleReset}
              style={{ backgroundColor: "#ffffff" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.4 19.8215C8.20264 19.8215 4.8 16.4093 4.8 12.2C4.8 8.87077 6.92859 6.04011 9.89541 5.00202M12.4 19.8215L10.7905 18.2075M12.4 19.8215L10.826 21.4M12.4 4.57847C16.5974 4.57847 20 7.99074 20 12.2C20 15.5292 17.8714 18.3599 14.9046 19.398M12.4 4.57847L13.974 3M12.4 4.57847L14.0095 6.19254"
                  stroke="#051A53"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button type="submit" style={{ color: "#ffffff" }}>
              {t("index.form.search_button")}
            </Button>
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        .vbcc-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .vbcc-form-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }
        :global(.vbcc-form label) {
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 170%;
          letter-spacing: 0.015em;
        }
        @media (min-width: 768px) {
          .vbcc-form-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </form>
  );
};

const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <Label>{label}</Label>
    {children}
  </div>
);

export default FormTraCuuVBCC;
