// @ts-nocheck
import { Button, Card, CardContent, DatePicker, IconRotateArrow, Input, Label } from "@vinuni/ui";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { useTranslation } from "components/Utils/useTranslation";

const Turnstile = dynamic(() => import("react-turnstile"), { ssr: false });
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const fieldStyle = {
	color: "#ffffff",
	borderColor: "#FFFFFF33",
};

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
	const turnstileTokenRef = useRef("");
	const boundTurnstileRef = useRef(null);

	const saveTurnstileToken = (token, bound) => {
		if (bound) {
			boundTurnstileRef.current = bound;
		}
		turnstileTokenRef.current = token || "";
	};

	const getTurnstileToken = () => {
		return (
			turnstileTokenRef.current ||
			boundTurnstileRef.current?.getResponse?.() ||
			(typeof document !== "undefined" ? document.querySelector('input[name="cf-turnstile-response"]')?.value : "") ||
			""
		);
	};

	const resetTurnstile = () => {
		turnstileTokenRef.current = "";
		boundTurnstileRef.current?.reset?.();
	};

	const setField = (name) => (event) => {
		setValues((current) => ({ ...current, [name]: event.target.value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const turnstileToken = TURNSTILE_SITE_KEY ? getTurnstileToken() : "";
		if (TURNSTILE_SITE_KEY && !turnstileToken) {
			props.onWarning?.(t("index.messages.turnstile_required"));
			return;
		}

		const submitted = await props.onSubmit(
			{
				hoTen: values.hoTen || undefined,
				ngaySinh: formatDob(values.ngaySinh),
				cccd: values.cccd || undefined,
				maSinhVien: values.maSinhVien || undefined,
				soHieuVanBang: values.soHieuVanBang || undefined,
				soVaoSoBang: values.soVaoSoBang || undefined,
				turnstileToken,
			},
			resetTurnstile,
		);

		if (submitted) {
			setValues(emptyValues);
		}
	};

	const handleReset = () => {
		setValues(emptyValues);
		resetTurnstile();
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
								style={fieldStyle}
							/>
						</Field>
						<Field label={t("index.form.dob")}>
							<DatePicker
								locale={dateLocale}
								value={values.ngaySinh}
								onChange={(ngaySinh) => setValues((current) => ({ ...current, ngaySinh }))}
								aria-label={t("index.form.dob")}
								style={fieldStyle}
							/>
						</Field>
						<Field label={t("index.form.cccd")}>
							<Input
								value={values.cccd}
								onChange={setField("cccd")}
								placeholder={t("index.form.enter_cccd")}
								style={fieldStyle}
							/>
						</Field>
						<Field label={t("index.form.student_id")}>
							<Input
								value={values.maSinhVien}
								onChange={setField("maSinhVien")}
								placeholder={t("index.form.enter_student_id")}
								style={fieldStyle}
							/>
						</Field>
						<Field label={t("index.form.diploma_no")}>
							<Input
								value={values.soHieuVanBang}
								onChange={setField("soHieuVanBang")}
								placeholder={t("index.form.enter_diploma_no")}
								style={fieldStyle}
							/>
						</Field>
						<Field label={t("index.form.book_no")}>
							<Input
								value={values.soVaoSoBang}
								onChange={setField("soVaoSoBang")}
								placeholder={t("index.form.example_book_no")}
								style={fieldStyle}
							/>
						</Field>
					</div>

					{TURNSTILE_SITE_KEY ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginTop: 16,
								minHeight: 65,
							}}
						>
							<Turnstile
								sitekey={TURNSTILE_SITE_KEY}
								action="tra-cuu-van-bang"
								theme="light"
								language={locale === "en-US" ? "en" : "vi"}
								refreshExpired="auto"
								onLoad={(_widgetId, bound) => {
									boundTurnstileRef.current = bound;
								}}
								onVerify={(token, bound) => {
									saveTurnstileToken(token, bound);
								}}
								onSuccess={(token, _preClearance, bound) => {
									saveTurnstileToken(token, bound);
								}}
								onExpire={() => {
									turnstileTokenRef.current = "";
								}}
								onError={() => {
									turnstileTokenRef.current = "";
								}}
							/>
						</div>
					) : null}

					<div className="vbcc-form-actions">
						<Button
							type="button"
							variant="secondary"
							size="icon"
							aria-label="reset"
							onClick={handleReset}
							style={{ backgroundColor: "#ffffff" }}
						>
							<IconRotateArrow size={24} color="#134D8B" />
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
					margin-top: 8px;
				}
				:global(.vbcc-form label) {
					color: #ffffff;
					font-family: "Montserrat", sans-serif;
					font-weight: 500;
					font-size: 14px;
					line-height: 170%;
					letter-spacing: 0.015em;
				}
				:global(.vbcc-form [data-slot="input"]),
				:global(.vbcc-form [data-slot="date-picker-field"]) {
					color: #ffffff;
					border-color: #ffffff33 !important;
				}
				:global(.vbcc-form [data-slot="input"]::placeholder) {
					color: #ffffff33;
					opacity: 1;
				}
				:global(.vbcc-form [data-slot="date-picker-field"] [role="spinbutton"]) {
					color: #ffffff;
				}
				:global(.vbcc-form [data-slot="date-picker-field"] [data-placeholder]),
				:global(.vbcc-form [data-slot="date-picker-field"] [data-type="literal"]) {
					color: #ffffff33;
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
