// @ts-nocheck
import { Modal, Spin } from "antd";
import axios from "axios";
import FormTraCuu from "components/Table/FormTraCuuVBCC";
import TableTraCuuVBCC from "components/Table/TableTraCuuVBCC";
import Container from "components/UI/Container";
import { ipVIN } from "data/ip";
import PropTypes from "prop-types";
import "rc-tabs/assets/index.css";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SectionWrapper from "../styles/vanbangchungchi.style";
import { useTranslation } from "components/Utils/useTranslation";
import ChiTietVanBang from "./vanbangchungchi/[idChiTiet]";

const TraCuuVanBangChungChi = (props) => {
	const { t } = useTranslation();
	const isMobile = useMediaQuery({ maxWidth: 767 }) === true;

	const [ds, setds] = useState([]);
	const [loading, setloading] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);

	const traCuu = async (values) => {
		const filledFields = Object.entries(values).filter(([key, value]) => key !== "mucDichTraCuuId" && !!value).length;

		if (filledFields < 2) {
			Modal.warning({
				title: t("index.messages.warning"),
				content: t("index.messages.warning_2_fields"),
			});
			return;
		}

		setloading(true);
		setSelectedRecord(null);
		try {
			const data = await axios.post(`${ipVIN}phu-luc-van-bang/public/tra-cuu-phu-luc-van-bang`, values, {
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			});
			const arr = data?.data?.data?.result ?? [];
			if (!Array.isArray(arr) || arr.length === 0) {
				setds({ Error: true });
				return;
			}
			setds(arr);
		} catch (error) {
			setds({ Error: true });
		} finally {
			setloading(false);
		}
	};

	const tieuDeKQ = props.tieuDe;
	const heroBackgroundStyle = {
		background: `
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.075) 100%),
      url('/assets/image/bgtracuu.png')
    `,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		borderRadius: "0px",
		maxWidth: "none",
		width: "100%",
		minHeight: "700px",
		boxSizing: "border-box",
	};

	return (
		<div style={{ width: "100%" }}>
			<Spin spinning={!!loading}>
				<SectionWrapper id="daotao" className="vbcc-montserrat">
					<Container fullWidth noGutter>
						<div
							style={{
								...heroBackgroundStyle,
								padding: isMobile ? "124px 16px 24px" : "205px 24px 93px 24px",
							}}
						>
							<div
								style={{
									maxWidth: isMobile ? "100%" : "1100px",
									width: "100%",
									margin: "0 auto",
								}}
							>
								<div style={{ marginBottom: isMobile ? 12 : 50 }}>{tieuDeKQ}</div>
								<div style={{ width: "100%" }}>
									<FormTraCuu
										onSubmit={(values) => traCuu(values)}
										onReset={() => {
											setds([]);
											setSelectedRecord(null);
										}}
									/>
								</div>
							</div>
						</div>
						{selectedRecord ? (
							<ChiTietVanBang record={selectedRecord} onBack={() => setSelectedRecord(null)} />
						) : (
							<TableTraCuuVBCC thongTinTraCuu={ds} onViewDetail={(record) => setSelectedRecord(record)} />
						)}
					</Container>
				</SectionWrapper>
			</Spin>
		</div>
	);
};

TraCuuVanBangChungChi.propTypes = {
	secTitleWrapper: PropTypes.object,
	secText: PropTypes.object,
	secHeading: PropTypes.object,
};

TraCuuVanBangChungChi.defaultProps = {
	secTitleWrapper: {
		mb: ["100px", "40px"],
	},
	secText: {
		as: "span",
		display: "block",
		textAlign: "center",
		fontSize: "14px",
		letterSpacing: "0.15em",
		fontWeight: "700",
		color: "#ff4362",
		mb: "12px",
	},
	secHeading: {
		fontStyle: "normal",
		textAlign: "center",
		fontSize: "30px",
		fontWeight: "bold",
		color: "#202124",
		letterSpacing: "0.04em",
		mb: "0",
		ml: "auto",
		mr: "auto",
		lineHeight: "40px",
		width: "600px",
		maxWidth: "100%",
	},
};

export default TraCuuVanBangChungChi;
