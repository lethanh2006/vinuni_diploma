// @ts-nocheck
import { Button, Card, CardContent, DatePicker, Input, Label } from "@vinuni/ui";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "components/Utils/useTranslation";
import {
	clearLookupFormValues,
	emptyLookupFormValues as emptyValues,
	readLookupFormValues,
	saveLookupFormValues,
} from "components/VanBangChungChi/lookupFormState";
import ResultTraCuuVBCC from "./ResultTraCuuVBCC";

const Turnstile = dynamic(() => import("react-turnstile"), { ssr: false });
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const DEFAULT_LOOKUP_PURPOSE_ID = "69450705c63d2c9bb1ed80a7";

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
	const [minimumFieldsError, setMinimumFieldsError] = useState(false);
	const filledFields = Object.values(values).filter((value) =>
		typeof value === "string" ? value.trim().length > 0 : Boolean(value),
	).length;
	const hasResults = Array.isArray(props.results)
		? props.results.length > 0
		: Boolean(props.results?.Error);
	const showTurnstile = Boolean(TURNSTILE_SITE_KEY && !props.previewMode);
	const dateLocale = locale === "en-US" ? "en-GB" : "vi-VN";
	const turnstileTokenRef = useRef("");
	const boundTurnstileRef = useRef(null);
	const minimumFieldsTimeoutRef = useRef(null);

	const clearMinimumFieldsError = () => {
		clearTimeout(minimumFieldsTimeoutRef.current);
		minimumFieldsTimeoutRef.current = null;
		setMinimumFieldsError(false);
	};

	useEffect(() => {
		if (props.previewMode) {
			setValues({ ...emptyValues, hoTen: "Song Song", maSinhVien: "ABC1200" });
		} else {
			setValues(readLookupFormValues());
		}
	}, [props.previewMode]);

	useEffect(() => {
		if (filledFields >= 2) clearMinimumFieldsError();
	}, [filledFields]);

	useEffect(() => () => clearTimeout(minimumFieldsTimeoutRef.current), []);

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

	const handleReset = () => {
		setValues(emptyValues);
		clearMinimumFieldsError();
		if (!props.previewMode) {
			clearLookupFormValues();
			resetTurnstile();
		}
		props.onReset?.();
	};

	const setValue = (name, value) => {
		const nextValues = { ...values, [name]: value };
		setValues(nextValues);
		if (!props.previewMode) saveLookupFormValues(nextValues);
	};

	const setField = (name) => (event) => {
		setValue(name, event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearMinimumFieldsError();
		if (filledFields < 2) {
			setMinimumFieldsError(true);
			minimumFieldsTimeoutRef.current = setTimeout(() => {
				minimumFieldsTimeoutRef.current = null;
				setMinimumFieldsError(false);
			}, 5000);
			return;
		}
		const turnstileToken = TURNSTILE_SITE_KEY && !props.previewMode ? getTurnstileToken() : "";
		if (TURNSTILE_SITE_KEY && !props.previewMode && !turnstileToken) {
			props.onWarning?.(t("index.messages.turnstile_required"));
			return;
		}

		await props.onSubmit(
			{
				hoTen: values.hoTen || undefined,
				ngaySinh: formatDob(values.ngaySinh),
				cccd: values.cccd || undefined,
				maSinhVien: values.maSinhVien || undefined,
				soHieuVanBang: values.soHieuVanBang || undefined,
				soVaoSoBang: values.soVaoSoBang || undefined,
				mucDichTraCuuId: DEFAULT_LOOKUP_PURPOSE_ID,
				turnstileToken,
			},
			resetTurnstile,
		);

	};

	return (
		<Card className={`vbcc-form-card${hasResults ? " vbcc-form-card--with-results" : ""}${showTurnstile ? " vbcc-form-card--with-turnstile" : ""}`}>
			<form onSubmit={handleSubmit} className="vbcc-form">
				<CardContent className={`vbcc-form-card-content${showTurnstile ? " vbcc-form-card-content--with-turnstile" : ""}`}>
					<div className="vbcc-form-heading">
						<h1>{t("index.question")}</h1>
						<p
							className={minimumFieldsError ? "vbcc-form-prompt-error" : undefined}
							role={minimumFieldsError ? "alert" : undefined}
						>
							{t("index.prompt")}
						</p>
					</div>
					<div className="vbcc-form-grid">
						<Field label={t("index.form.fullname")}>
							<Input
								value={values.hoTen}
								onChange={setField("hoTen")}
								placeholder={t("index.form.enter_fullname")}
							/>
						</Field>
						<Field label={t("index.form.dob")}>
							<DatePicker
								locale={dateLocale}
								value={values.ngaySinh}
								onChange={(ngaySinh) => setValue("ngaySinh", ngaySinh)}
								aria-label={t("index.form.dob")}
							/>
						</Field>
						<Field label={t("index.form.cccd")}>
							<Input
								value={values.cccd}
								onChange={setField("cccd")}
								placeholder={t("index.form.enter_cccd")}
							/>
						</Field>
						<Field label={t("index.form.student_id")}>
							<Input
								value={values.maSinhVien}
								onChange={setField("maSinhVien")}
								placeholder={t("index.form.enter_student_id")}
							/>
						</Field>
						<Field label={t("index.form.diploma_no")}>
							<Input
								value={values.soHieuVanBang}
								onChange={setField("soHieuVanBang")}
								placeholder={t("index.form.enter_diploma_no")}
							/>
						</Field>
						<Field label={t("index.form.book_no")}>
							<Input
								value={values.soVaoSoBang}
								onChange={setField("soVaoSoBang")}
								placeholder={t("index.form.example_book_no")}
							/>
						</Field>
					</div>

					<div className={`vbcc-form-actions${showTurnstile ? " vbcc-form-actions--with-turnstile" : ""}`}>
						{showTurnstile ? (
							<div className="vbcc-turnstile">
								<Turnstile
									sitekey={TURNSTILE_SITE_KEY}
									action="tra-cuu-van-bang"
									theme="light"
									language={locale === "en-US" ? "en" : "vi"}
									size="normal"
									fixedSize
									appearance="always"
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
						<div className="vbcc-form-action-buttons">
							<Button
								className="vbcc-reset-button"
								variant="secondary"
								type="button"
								onClick={handleReset}
							>
								{t("index.form.reset_button")}
							</Button>
							<Button
								className="vbcc-search-button"
								type="submit"
							>
								{t("index.form.search_button")}
							</Button>
						</div>
					</div>
				</CardContent>
			</form>
			{hasResults ? (
				<ResultTraCuuVBCC
					thongTinTraCuu={props.results}
					onViewDetail={props.onViewDetail}
				/>
			) : null}
			<style jsx>{`
                .vbcc-form { width: 100%; flex: none; }
                .vbcc-form-heading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    width: 100%;
                    max-width: 720px;
                    text-align: center;
                }
                .vbcc-form-heading h1 {
                    margin: 0;
                    color: #000;
                    font-family: "Inter", sans-serif;
                    font-size: 28px;
                    font-weight: 600;
                    line-height: 36px;
                    white-space: nowrap;
                }
                .vbcc-form-heading p {
                    margin: 0;
                    width: 100%;
                    max-width: 580px;
                    color: rgba(0, 0, 0, .6);
                    font-family: "Inter", sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                }
                .vbcc-form-heading p.vbcc-form-prompt-error {
                    color: #dc2626;
                }
                .vbcc-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    column-gap: 16px;
                    row-gap: 16px;
                    width: 100%;
                }
                .vbcc-turnstile {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 300px;
                    height: 65px;
                    transform: translate(-50%, -50%);
                }
                .vbcc-form-actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 16px;
                    position: relative;
                    width: 100%;
                    height: 44px;
                }
                .vbcc-form-actions--with-turnstile {
                    height: 65px;
                }
                .vbcc-form-action-buttons {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-left: auto;
                }
                :global(.vbcc-form-card) {
                    display: flex !important;
                    flex-direction: column;
                    gap: 0 !important;
                    position: relative;
                    box-sizing: border-box;
                    width: 100% !important;
                    height: 440px;
                    min-height: 440px;
                    padding: 0 !important;
                    overflow: visible !important;
                    background: rgba(255, 255, 255, .95) !important;
                    border: 0 !important;
                    border-radius: 22px !important;
                    box-shadow: 0 4px 48px rgba(0, 0, 0, .1) !important;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                :global(.vbcc-form-card--with-results) {
                    height: auto;
                }
                :global(.vbcc-form-card--with-turnstile) {
                    height: auto;
                    min-height: 461px;
                }
                :global(.vbcc-form-card-content) {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-sizing: border-box;
                    width: 100%;
                    min-height: 440px;
                    padding: 24px !important;
                    gap: 24px;
                }
                :global(.vbcc-form-card-content--with-turnstile) {
                    min-height: 461px;
                }
                :global(.vbcc-form label) {
                    color: #000 !important;
                    font-family: "Inter", sans-serif !important;
                    font-size: 14px !important;
                    font-weight: 400 !important;
                    line-height: 20px !important;
                    letter-spacing: 0 !important;
                }
                :global(.vbcc-form [data-slot="date-picker"]) {
                    width: 100%;
                    max-width: none;
                    gap: 4px;
                }
                :global(.vbcc-form [data-slot="input"]),
                :global(.vbcc-form [data-slot="date-picker-field"]) {
                    box-sizing: border-box;
                    width: 100%;
                    height: 44px !important;
                    min-height: 44px !important;
                    padding: 0 16px !important;
                    color: #000 !important;
                    font-family: "Inter", sans-serif !important;
                    font-size: 16px !important;
                    line-height: 24px !important;
                    background: rgba(255, 255, 255, .08) !important;
                    border: 1px solid rgba(0, 0, 0, .1) !important;
                    border-radius: 22px !important;
                }
                :global(.vbcc-form [data-slot="date-picker-field"]) {
                    gap: 8px !important;
                    padding: 0 0 0 16px !important;
                }
                :global(.vbcc-form [data-slot="date-picker-trigger"]) {
                    flex: none;
                    width: 56px;
                    height: 44px;
                }
                :global(.vbcc-form [data-slot="date-picker-trigger"] svg) {
                    width: 24px;
                    height: 24px;
                }
                :global(.vbcc-form [data-slot="input"]::placeholder),
                :global(.vbcc-form [data-slot="date-picker-field"] [data-placeholder]),
                :global(.vbcc-form [data-slot="date-picker-field"] [data-type="literal"]) {
                    color: rgba(0, 0, 0, .6) !important;
                    opacity: 1;
                }
                :global(.vbcc-form [data-slot="date-picker-field"] [role="spinbutton"]:not([data-placeholder])) {
                    color: #000 !important;
                }
                :global(.vbcc-reset-button) {
                    min-width: 76px !important;
                    height: 44px !important;
                    padding: 0 16px !important;
                    font-family: "Inter", sans-serif !important;
                    font-size: 16px !important;
                    font-weight: 500 !important;
                    line-height: 24px !important;
                    border-radius: 999px !important;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                :global(.vbcc-search-button) {
                    min-width: 178px !important;
                    height: 44px !important;
                    padding: 0 16px !important;
                    color: #fff !important;
                    font-family: "Inter", sans-serif !important;
                    font-size: 16px !important;
                    font-weight: 500 !important;
                    line-height: 24px !important;
                    background: rgba(19, 77, 139, .9) !important;
                    border: 0 !important;
                    border-radius: 999px !important;
                    box-shadow: none !important;
                }
                @media (max-width: 1019px) {
                    .vbcc-form-actions--with-turnstile {
                        justify-content: space-between;
                    }
                    .vbcc-turnstile {
                        position: static;
                        flex: none;
                        transform: none;
                    }
                }
                @media (max-width: 767px) {
                    .vbcc-form-heading h1 { font-size: 22px; line-height: 30px; white-space: normal; }
                    .vbcc-form-heading p { font-size: 14px; line-height: 20px; }
                    .vbcc-form-grid { grid-template-columns: 1fr; row-gap: 12px; }
                    .vbcc-turnstile {
                        position: static;
                        transform: none;
                    }
                    :global(.vbcc-form-card) { height: auto; min-height: 0; }
                    :global(.vbcc-form-card-content) {
                        min-height: 0;
                        padding: 20px !important;
                        gap: 20px;
                    }
                    .vbcc-form-actions--with-turnstile {
                        flex-direction: column;
                        height: auto;
                        gap: 16px;
                    }
                    .vbcc-turnstile {
                        max-width: 100%;
                    }
                    .vbcc-form-action-buttons {
                        justify-content: flex-end;
                        width: 100%;
                    }
                }
            `}</style>
		</Card>
	);
};

const Field = ({ label, children }) => (
	<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
		<Label>{label}</Label>
		{children}
	</div>
);

export default FormTraCuuVBCC;
