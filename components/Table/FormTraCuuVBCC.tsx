// @ts-nocheck
import { Button, Card, Col, ConfigProvider, DatePicker, Form, Input, notification, Row } from "antd";
import enUS from "antd/lib/locale/en_US";
import viVN from "antd/lib/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";
import React from "react";
import { useTranslation } from "components/Utils/useTranslation";

const FormTraCuuVBCC = (props) => {
	const [form] = Form.useForm();
	const { t, locale } = useTranslation();
	const datePickerLocale = locale === "en-US" ? enUS : viVN;

	const handleFinish = (values) => {
		values.ngaySinh = values.ngaySinh ? moment(values?.ngaySinh).format("DD/MM/YYYY") : undefined;

		props.onSubmit(values);
		form.resetFields();
	};

	return (
		<Row>
			<Col lg={24}>
				<ConfigProvider key={locale} locale={datePickerLocale}>
					<Form form={form} onFinish={handleFinish} colon={false} layout="vertical" className="vbcc-form">
						<Card
							style={{
								borderRadius: 16,
								backgroundColor: "rgba(255, 255, 255, 0.15)",
								border: "2px solid rgba(255, 255, 255, 0.15)",
								backdropFilter: "blur(6px)",
								WebkitBackdropFilter: "blur(6px)",
							}}
							bodyStyle={{ padding: "24px" }}
						>
							<Row gutter={[12, 2]}>
								<Col xs={24} md={8}>
									<Form.Item name="hoTen" label={<span>{t("index.form.fullname")}</span>}>
										<Input style={{ fontSize: "14px" }} size="large" placeholder={t("index.form.enter_fullname")} />
									</Form.Item>
								</Col>
								<Col xs={24} md={8}>
									<Form.Item name="ngaySinh" label={<span>{t("index.form.dob")}</span>}>
										<DatePicker
											size="large"
											style={{ width: "100%", fontSize: "14px" }}
											format={"DD/MM/YYYY"}
											placeholder={t("index.form.select_dob")}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={8}>
									<Form.Item name="cccd" label={<span>{t("index.form.cccd")}</span>}>
										<Input style={{ fontSize: "14px" }} size="large" placeholder={t("index.form.enter_cccd")} />
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[12, 2]}>
								<Col xs={24} md={8}>
									<Form.Item name="maSinhVien" label={<span>{t("index.form.student_id")}</span>}>
										<Input style={{ fontSize: "14px" }} size="large" placeholder={t("index.form.enter_student_id")} />
									</Form.Item>
								</Col>
								<Col xs={24} md={8}>
									<Form.Item name="soHieuVanBang" label={<span>{t("index.form.diploma_no")}</span>}>
										<Input style={{ fontSize: "14px" }} size="large" placeholder={t("index.form.enter_diploma_no")} />
									</Form.Item>
								</Col>
								<Col xs={24} md={8}>
									<Form.Item name="soVaoSoBang" label={<span>{t("index.form.book_no")}</span>}>
										<Input style={{ fontSize: "14px" }} size="large" placeholder={t("index.form.example_book_no")} />
									</Form.Item>
								</Col>
							</Row>

							<Form.Item style={{ marginTop: "32px", marginBottom: "0px", textAlign: "center" }}>
								<div
									style={{
										display: "inline-flex",
										flexDirection: "row",
										alignItems: "flex-start",
										gap: "16px",
										padding: "0px",
									}}
								>
									<Button
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											padding: "6px",
											width: "36px",
											height: "36px",
											background: "#F4F4F4",
											borderRadius: "4px",
											border: "none",
										}}
										onClick={() => {
											form.resetFields();
											if (props.onReset) {
												props.onReset();
											}
										}}
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{ flex: "none", order: 0, flexGrow: 0 }}
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
									<Button
										type="primary"
										htmlType="submit"
										style={{
											display: "inline-flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											padding: "7px 24px 6px",
											gap: "10px",
											height: "36px",
											background: "#134D8B",
											borderColor: "#134D8B",
											borderRadius: "4px",
											fontSize: "14px",
											fontWeight: "600",
											lineHeight: "170%",
											textTransform: "uppercase",
											color: "#FFFFFF",
										}}
									>
										{t("index.form.search_button")}
									</Button>
								</div>
							</Form.Item>
						</Card>
					</Form>
				</ConfigProvider>
				<style jsx>{`
					:global(.vbcc-form .ant-form-item) {
						margin-bottom: 5px;
					}
					:global(.vbcc-form .ant-form-item-row) {
						display: flex !important;
						flex-direction: column !important;
						align-items: stretch !important;
						flex-wrap: nowrap !important;
					}
					:global(.vbcc-form .ant-form-item-label) {
						display: block !important;
						width: 100% !important;
						max-width: 100% !important;
						padding: 0 0 4px !important;
						text-align: left !important;
						flex: none !important;
					}
					:global(.vbcc-form .ant-form-item-control) {
						width: 100% !important;
						max-width: 100% !important;
						flex: none !important;
					}
					:global(.vbcc-form .ant-form-item-label > label),
					:global(.vbcc-form .ant-form-item-label span) {
						color: #ffffff !important;
						font-family: "Montserrat", sans-serif !important;
						font-style: normal;
						font-weight: 500 !important;
						font-size: 14px !important;
						line-height: 170% !important;
						letter-spacing: 0.015em !important;
						height: auto !important;
					}
					:global(.vbcc-form .ant-input),
					:global(.vbcc-form .ant-picker-input > input) {
						font-family: "Montserrat", sans-serif !important;
						font-style: normal;
						font-weight: 400;
						font-size: 14px !important;
						line-height: 170% !important;
						letter-spacing: 0.015em !important;
					}
					:global(.vbcc-form .ant-picker) {
						height: 36px !important;
						border-radius: 4px;
						border: 1px solid #d2d3d5;
						width: 100%;
					}
					:global(.vbcc-form .ant-input) {
						height: 36px !important;
						border-radius: 4px;
						border: 1px solid #d2d3d5;
					}
					:global(.vbcc-form .ant-input::placeholder),
					:global(.vbcc-form .ant-picker-input > input::placeholder) {
						color: #d2d3d5 !important;
					}
				`}</style>
			</Col>
		</Row>
	);
};

export default FormTraCuuVBCC;
