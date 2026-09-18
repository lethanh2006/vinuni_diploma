// @ts-nocheck
import { Col, Descriptions, Divider, Empty, Row, Table } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "./style.less";
import { useTranslation } from "components/Utils/useTranslation";

const PDFViewerV2 = dynamic(() => import("../../components/PDFViewerV2"), {
	ssr: false,
});

const normalizeLocalizedText = (value) => (typeof value === "string" ? value.trim().toLocaleLowerCase("vi") : "");

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
									<button type="button" className="vbcc-back-button" onClick={onBack}>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
										<line x1="0.5" y1="0" x2="0.500001" y2="20" stroke="black" strokeOpacity="0.25" />
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
						<Row gutter={[0, 0]} className="vbcc-detail-content">
							<Col span={24}>
								<div className="vbcc-info-card">
									<div className="vbcc-info-title">{t("detail.diploma_info")}</div>
									<Descriptions
										column={{ xs: 1, sm: 1, md: 2 }}
										bordered
										size="small"
										className="vbcc-custom-descriptions"
									>
										<Descriptions.Item label={t("detail.fullname")}>{record?.hoTen ?? "--"}</Descriptions.Item>
										<Descriptions.Item label={t("detail.student_id")}>{record?.maSinhVien ?? "--"}</Descriptions.Item>
										<Descriptions.Item label={t("detail.dob")}>
											{record?.ngaySinh ? moment(record.ngaySinh).format("DD/MM/YYYY") : "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.education_level")}>
											{translateDynamicValue(record?.thongTinTrinhDoDaoTao?.ten ?? record?.trinhDoDaoTao, t) ?? "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.education_form")}>
											{translateDynamicValue(record?.thongTinHinhThucDaoTao?.ten ?? record?.hinhThucDaoTao, t) ?? "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.major")}>
											{translateDynamicValue(record?.thongTinNganhDaoTao?.ten ?? record?.nganhDaoTao, t) ?? "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.book_no")}>{record?.soVaoSoBang ?? "--"}</Descriptions.Item>
										<Descriptions.Item label={t("detail.diploma_no")}>
											{record?.soHieuVanBang ?? "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.book_no_en")}>
											{record?.bookEntryNumberFormat ?? "---"}
										</Descriptions.Item>
									</Descriptions>
								</div>
							</Col>

							<Col span={24}>
								<div className="vbcc-info-card">
									<div className="vbcc-info-title">{t("detail.decision_info")}</div>
									<Descriptions
										column={{ xs: 1, sm: 1, md: 2 }}
										bordered
										size="small"
										className="vbcc-custom-descriptions"
									>
										<Descriptions.Item label={t("detail.decision_no")}>
											{record?.quyetDinh?.soQuyetDinh ?? "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.issue_date")}>
											{record?.quyetDinh?.ngayBanHanh
												? moment(record.quyetDinh.ngayBanHanh).format("DD/MM/YYYY")
												: "--"}
										</Descriptions.Item>
										<Descriptions.Item label={t("detail.summary")} span={2}>
											{record?.quyetDinh?.noiDung ?? "--"}
										</Descriptions.Item>
									</Descriptions>
								</div>
							</Col>

							{(() => {
								const templateElements = record?.quyetDinh?.bieuMau?.elements ?? [];
								const dataElements = record?.templateData ?? [];

								const elements = templateElements.length
									? templateElements.map((e) => ({
											...e,
											value: dataElements.find((d) => d.headerName === e.headerName)?.value,
										}))
									: dataElements;

								const valuedElements = elements
									?.filter((item) => item.type !== "Table")
									?.filter((item) => !!item.value);

								return (
									<>
										{!!valuedElements.length && (
											<Col span={24}>
												<div className="vbcc-info-card">
													<div className="vbcc-info-title">{t("detail.appendix_info")}</div>
													<Descriptions
														bordered
														column={{ xs: 1, sm: 1, md: 2 }}
														size="small"
														className="vbcc-custom-descriptions"
													>
														{valuedElements.map((item, index) => (
															<Descriptions.Item label={translateDynamicHeader(item.headerName, t)} key={index}>
																{renderField(item, t)}
															</Descriptions.Item>
														))}
													</Descriptions>
												</div>
											</Col>
										)}

										{elements
											?.filter((item) => item.type === "Table")
											?.map((item, index) => {
												const columns =
													item?.cot?.map((i) => ({
														title: translateDynamicHeader(i.headerName, t),
														dataIndex: i.headerName,
														key: i.headerName,
														width: i.type === "Text" ? 150 : 120,
														render: (val) => (i.type === "Text" ? <span>{val}</span> : val),
													})) ?? [];

												if (Array.isArray(item.value) && item.value.length > 0) {
													return (
														<Col span={24} key={index}>
															<div className="vbcc-info-card">
																<div className="vbcc-info-title">{item.headerName}</div>
																<Table
																	size="middle"
																	columns={columns}
																	dataSource={item.value}
																	pagination={false}
																	rowKey={(r, idx) => idx}
																	bordered
																	scroll={{ x: "max-content" }}
																	style={{
																		maxWidth: "100%",
																		overflowX: "auto",
																	}}
																/>
															</div>
														</Col>
													);
												}
												return null;
											})}
									</>
								);
							})()}

							{!!record?.fileVanBang && (
								<Col span={24}>
									<Divider orientation="left">{t("detail.diploma_file")}</Divider>
									<PDFViewerV2 url={record.fileVanBang} height={"650px"} />
								</Col>
							)}

							{record?.urlIpfs && (
								<Col span={24}>
									<Divider orientation="left">{t("detail.ipfs_file")}</Divider>
									<PDFViewerV2 url={record.urlIpfs} height={"650px"} />
								</Col>
							)}

							{record?.signature && (
								<Col span={24}>
									<div className="vbcc-signature">
										<img src="/images/tick.svg" alt="" width={24} height={24} />
										<span style={{ fontWeight: 600 }}>{t("detail.signed_info")}</span>
										<a
											href={`https://jwt.io/#debugger-io?token=${record.signature}`}
											target="_blank"
											className="text-primary"
											rel="noreferrer"
										>
											{t("detail.check_signature")}
										</a>
									</div>
								</Col>
							)}
						</Row>
					) : (
						<div className="vbcc-empty">
							<Empty description={t("detail.no_appendix_error")} />
						</div>
					)}
				</div>
			</div>
	);
};

export default ChiTietVanBang;
