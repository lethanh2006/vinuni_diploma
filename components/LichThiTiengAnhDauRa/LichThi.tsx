// @ts-nocheck
/* eslint-disable react/prefer-stateless-function */
import { Col, Row } from "antd";
import axios from "axios";
import Box from "components/Box";
import CNDPT from "components/ChucNangDangPhatTrien/ChucNangĐangPt";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  BaCongKhaiWrapper,
  BckLogoWrapper,
  ButtonDetailWrapper,
  ContentButtonWrapper,
  ContentWrapper,
  Group94Wrapper,
  Group96Wrapper,
  Title,
} from "./index.style";

const toeicResult = () => {
  window.open("/chungchi/", "_self");
};

const LichThi = ({}) => {
  const ellipse = (text) => {
    let s = "";
    for (let i = 0; i < 100; i++) {
      s += text[i];
    }
    s += "...";
    return s;
  };
  const data = {
    name: "bck-logo",
    title: {
      first: "LỊCH THI",
      last: " - TIẾNG ANH",
    },
    content:
      "Do ảnh hưởng của đại dịch Covid - 19 đã khiến cho quá trình đăng ký và thi chứng chỉ tiếng anh TOEIC bị gián đoạn.Học viện Công nghệ Bưu chính Viễn thông thông báo điều chỉnh thời gian thi Chuẩn đầu ra Tiếng Anh Đợt 2 năm 2020 như sau:",
  };
  // const { data } = this.props;
  const { name, content, title } = data;
  const { first, last } = title;
  const [relate, setRelate] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line wrap-iife
    (async function wrapFunc() {
      const response = await axios.get(`${ip}/bai-viet`, {
        params: {
          page: 1,
          //   limit: 4,
          cond: {
            maLoaiBaiViet: "DAO_TAO_TIN_TUC_LICH_THI_TA",
          },
        },
      });
      const data = _.get(response, "data.data", []);
      setRelate(data);
    })();
    // return () => {
    //   cleanup
    // }
  }, []);
  return (
    <Box>
      <BaCongKhaiWrapper>
        <Container>
          <Row>
            <Col xs={6} sm={4} lg={2} xl={2}>
              <div>
                <BckLogoWrapper />
              </div>
            </Col>
            <Col xs={18} sm={20} lg={22} xl={22}>
              <div>
                <Row>
                  <Col xs={22}>
                    <Title>
                      <span
                        style={{
                          fontSize: "calc(0.8em + 0.4vw)",
                          fontWeight: "bold",
                        }}
                      >
                        {first}
                      </span>
                      <span
                        style={{
                          color: "#C01718",
                          fontSize: "calc(0.8em + 0.4vw)",
                          fontWeight: "bold",
                        }}
                      >
                        {last}
                      </span>
                    </Title>
                  </Col>
                </Row>
                <Row>
                  {relate.map((item, index) => {
                    if (index === 0) {
                      return (
                        <ContentButtonWrapper>
                          <Col xs={18}>
                            <ContentWrapper>
                              <span style={{ fontSize: "calc(0.9em + 0.2vw)" }}>
                                {_.get(item, "moTa", "").length < 100
                                  ? _.get(item, "moTa", "")
                                  : ellipse(_.get(item, "moTa", ""))}
                                {/* {_.get(item, "moTa", "")} */}
                              </span>
                              <br />
                            </ContentWrapper>
                          </Col>
                          <div style={{ position: "relative" }}>
                            {/* <Link legacyBehavior href="chucnangdangpt">
															<a
																className="button-more"
																// href="tintucchung"
																target="blank"
																id="thiTA"
															> */}
                            {/* <div style={{ position: 'relative' }}> */}

                            {/* <ButtonDetailWrapper
                  type="button"
                  style={{
                    margin: "0 auto",
                  }}
                  onClick={CNDPT}
                >
                  <Group94Wrapper />
                              <Group96Wrapper />
                  <div
                    style={{
                      margin: "0 auto",
                      fontWeight: 500,
                      fontSize: "16px",
                    }}
                  >
                    XEM CHI TIẾT
                  </div>
                </ButtonDetailWrapper> */}

                            <ButtonDetailWrapper
                              type="button"
                              onClick={toeicResult}
                            >
                              <Group94Wrapper />
                              <Group96Wrapper />
                              <div
                                style={{
                                  margin: "0 auto",
                                  fontWeight: 500,
                                  fontSize: "16px",
                                  width: 300,
                                }}
                              >
                                TRA CỨU KẾT QUẢ
                              </div>
                            </ButtonDetailWrapper>
                            {/* </Popover> */}
                            {/* </div> */}
                          </div>
                        </ContentButtonWrapper>
                      );
                    }
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </BaCongKhaiWrapper>
    </Box>
  );
};

export default LichThi;
