// @ts-nocheck
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-indent */
// eslint-disable-next-line react/prefer-stateless-function
import { Card, Col, Row, Spin } from "antd";
import Box from "components/Box";
import Container from "components/UI/Container";
import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./doingu.less";
import { BoxCard, ButtonDetailWrapper } from "./index.style";
import {
  ContainerCardDN,
  TinTucWrapper,
  TitleContainer,
  TitleUnderWrapper,
} from "./TinTuc.style";

const DoiNgu = ({ button, buttonWrapper, data }) => {
  const [relate, setRelate] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // (async function wrapFunc() {
    // 	setLoading(true);
    // 	const response = await axios.get(`${ip}/can-bo`, {
    // 		params: {
    // 			page: 1,
    // 			limit: 3,
    // 			cond: {
    // 				hienThi: 'true'
    // 			},
    // 			sort: 'thuTu',
    // 			order: 1
    // 		}
    // 	});
    // 	console.log('response', response);
    // 	setRelate(response?.data?.data ?? []);
    // 	setLoading(false);
    // })();
    // return () => { };
    setRelate(data);
    setLoading(false);
  }, []);
  return (
    // <div id="doingu">
    <Box>
      <TinTucWrapper
        style={{ backgroundColor: "#ffffff", padding: 0, marginBottom: 36 }}
      >
        <Container>
          <TitleContainer>
            <p style={{ marginTop: "32px" }}>ĐỘI NGŨ CÁN BỘ</p>
            <TitleUnderWrapper />
          </TitleContainer>
          <BoxCard>
            <Spin spinning={loading}>
              <Row gutter={[20, 20]} style={{ minHeight: 290 }}>
                {relate.map((item, index) => {
                  if (index < 3) {
                    return (
                      <Col
                        className={style.cardd}
                        xl={8}
                        lg={8}
                        xs={24}
                        sm={24}
                        md={24}
                        // style={{ padding: '10px 40px', alignItems: 'center center' }}
                      >
                        <ContainerCardDN>
                          {/* <MiniCardWrapper> */}
                          <Card
                            // className={style.card}
                            style={{
                              textAlign: "center",
                              borderRadius: "20px",
                              paddingTop: "10px",
                              // height: '310px',
                              // width: '280px',
                            }}
                            // hoverable
                            bodyStyle={{ width: "100%" }}
                          >
                            <Row style={{ marginBottom: "25px" }}>
                              <Col span={24} style={{ alignItems: "center" }}>
                                <img
                                  alt=""
                                  src={_.get(item, "anhDaiDien", "")}
                                  height="150px"
                                  width="150px"
                                  style={{ borderRadius: "50%" }}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                }}
                                className={style.name}
                              >
                                {_.get(item, "hocHam", "")}{" "}
                                {_.get(item, "hocVi", "")}{" "}
                                {_.get(item, "hoTen", "")}
                              </p>
                              <p
                                style={{ marginTop: "20", fontSize: "16px" }}
                                className={style.khoa}
                              >
                                {_.get(item, "chucVu", "")}
                              </p>
                            </Row>
                          </Card>
                          {/* </MiniCardWrapper> */}
                        </ContainerCardDN>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Spin>
          </BoxCard>

          <div
            style={{
              width: "135",
              marginTop: 25,
              textAlign: "center",
            }}
          >
            <Link legacyBehavior href="doinguchitiet">
              <a
                style={{
                  width: "135",
                  display: "inline-flex",
                }}
                className="button-more"
                href="doinguchitiet"
              >
                <ButtonDetailWrapper
                  type="button"
                  style={{
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      margin: "0 auto",
                      fontWeight: 500,
                      fontSize: "16px",
                    }}
                  >
                    XEM CHI TIẾT
                  </div>
                </ButtonDetailWrapper>
              </a>
            </Link>
          </div>
        </Container>
      </TinTucWrapper>
    </Box>
  );
};

export default DoiNgu;
