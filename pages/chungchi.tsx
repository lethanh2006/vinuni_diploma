// @ts-nocheck
import { Col, Modal, Row, Spin } from "antd";
import axios from "axios";
import Box from "components/Box";
import Heading from "components/Heading";
import FormTraCuu from "components/Table/FormTraCuuTOEIC";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import PropTypes from "prop-types";
import "rc-tabs/assets/index.css";
import React, { useState } from "react";
import { HeadingWrapper } from "../components/Table/Heading.style";
import SectionWrapper from "../styles/vanbangchungchi.style";
// import { VBCC } from '../components/Data';
import { TitleUnderWrapper } from "components/DoiNguCanBo/TinTuc.style";
import VanBangTable from "components/Table/VanBang";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "components/Utils/useTranslation";

const VBChungChi = (props) => {
	const { t } = useTranslation();
	const { secTitleWrapper, secText, secHeading, dataBlock } = props;
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isValue = (val) => {
		// check xem nếu bị undefined, null, xâu rỗng -> false
		if (!val && val !== 0) return false; // undefined, null
		if (val && val.length === 0) return false; // ""
		return true;
	};
	const [ds, setds] = useState([]);
	const [loading, setloading] = useState(false);
	const [id, setid] = useState(false);
	const traCuu = async ({ hoDem, ten, cmtCccd, testDate, dateOfBirth }) => {
		if (!isValue(hoDem) && !isValue(ten) && !isValue(cmtCccd) && !isValue(testDate) && !isValue(dateOfBirth)) {
			Modal.warning({
				title: t("index.messages.warning"),
				content: t("index.messages.no_query_info"),
			});
			return;
		}
		if (
			isValue(cmtCccd) &&
			isValue(testDate) &&
			isValue(hoDem) &&
			isValue(ten) &&
			isValue(dateOfBirth) &&
			isValue(testDate)
		) {
			Modal.warning({
				title: t("index.messages.warning"),
				content: t("index.messages.search_one_way"),
				onOk() {},
			});
			return;
		} else if (
			(!isValue(hoDem) && !isValue(ten) && !isValue(dateOfBirth) && !isValue(testDate) && !isValue(cmtCccd)) ||
			(!isValue(cmtCccd) && !isValue(testDate))
		) {
			Modal.error({
				title: t("index.messages.warning"),
				content: t("index.messages.fill_all_info"),
				onOk() {},
			});
			return;
		}
		setloading(true);
		const data = await axios.post(`${ip}/dich-vu-slink/dang-ky-thi-chung-chi-ngoai-ngu/public/tra-cuu`, {
			hoDem,
			ten,
			cmtCccd,
			testDate: testDate || undefined,
			dateOfBirth,
		});
		// console.log(data.data.data, 'tra cuu vb')
		const arr = data?.data?.data ?? [];
		if (arr.length === 0) {
			Modal.error({
				title: t("index.messages.warning"),
				content: t("index.messages.no_exam_info"),
				onOk() {},
			});
			setloading(false);
			setds([]);
			return;
		}
		setds(data?.data?.data ?? []);
		setloading(false);
	};

	// const traCuuTheoId = async (id) => {
	//   setloading(true);
	//   const data = await axios.get(`${ip}/phu-luc-van-bang/tra-cuu/${id}`, {});
	//   // console.log('data', data);
	//   let tmp = data?.data?.data ?? [];

	//   if (typeof tmp === "object") tmp = [tmp];
	//   setds(tmp);
	//   setid(id);
	//   setloading(false);
	// };
	// const router = useRouter();

	// useEffect(() => {
	//   // console.log('router.query', router.query);
	//   // traCuu('Syamphay Sataphone', '1992-08-04T17:00:00.000Z');
	//   const id = router.query?.id;
	//   if (id) traCuuTheoId(id);
	//   return () => {
	//     setid(false);
	//   };
	// }, [router.query]);

	const tieuDeKQ = props.tieuDe;

	return (
		<Row>
			<Spin spinning={!!loading}>
				<SectionWrapper id="daotao">
					{isMobile && (
						<>
							<Box style={{ padding: 0 }}>
								<Col lg={24} style={{}}>
									<Box {...secTitleWrapper}>
										<HeadingWrapper>
											<Heading content={tieuDeKQ} />
											<TitleUnderWrapper />
										</HeadingWrapper>
									</Box>
								</Col>
							</Box>
							<div>
								<FormTraCuu onSubmit={(values) => traCuu(values)} />
							</div>
							<VanBangTable data={ds} id={id} />
						</>
					)}
					{!isMobile && (
						<Container>
							<Box style={{ padding: 0 }}>
								<Col lg={24} style={{}}>
									<Box {...secTitleWrapper}>
										<HeadingWrapper>
											<Heading content={tieuDeKQ} />
											<TitleUnderWrapper />
										</HeadingWrapper>
									</Box>
								</Col>
							</Box>
							<div>
								<FormTraCuu onSubmit={(values) => traCuu(values)} />
							</div>
							<VanBangTable data={ds} id={id} />
						</Container>
					)}
				</SectionWrapper>
			</Spin>
		</Row>
	);
};

VBChungChi.propTypes = {
	secTitleWrapper: PropTypes.object,
	secText: PropTypes.object,
	secHeading: PropTypes.object,
};

VBChungChi.defaultProps = {
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

export default VBChungChi;
