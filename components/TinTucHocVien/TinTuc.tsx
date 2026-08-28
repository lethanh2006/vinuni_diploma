// @ts-nocheck
// eslint-disable-next-line react/prefer-stateless-function
import { Col, Row } from "antd";
import axios from "axios";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "components/Box";
import AwardsSection from "./Awards/index";
import {
  ContainerCardDN, TinTucHover,
  TinTucWrapper,
  TitleUnderWrapper
} from "./TinTuc.style";

export const ButtonWrapper = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const TinTuc = ({ }) => {
  const [relate, setRelate] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line wrap-iife
    (async function wrapFunc() {
      const response = await axios.get(`${ip}/bai-viet`, {
        params: {
          page: 1,
          limit: 8,
          cond: {
            maLoaiBaiViet: "DAO_TAO_TIN_TUC_HOC_VIEN",
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
    <div>
      <Box>
        <TinTucWrapper>
          {/* <Button onClick={() => test()}>AAAAA</Button> */}
          <p>TIN TỨC</p>
          <TitleUnderWrapper />
          <Container>
            {/* <Carousel autoplay> */}
            <Row
              style={{ margin: "0px auto", marginTop: 40 }}
              gutter={[15, 15]}
            >
              {/* {relate.map((item, index) => ( */}
              <Col key={index} xl={6} lg={6} xs={24} sm={12} md={12}>
                <TinTucHover>
                  <ContainerCardDN>
                    <AwardsSection />
                    {/* <CardTinTuc
                          href={_.get(item, 'slug', '')}
                          title={_.get(item, 'tieuDe', '')}
                          img={_.get(item, 'anhDaiDien', '')}
                          src={_.get(item, 'nguoiDang.hoTen', '')}
                          time={
                            _.get(item, 'ngayDang', '') !== ''
                              ? moment(_.get(item, 'ngayDang', '')).format('DD/MM/YYYY, h:mm')
                              : ''
                          }
                        >
                        </CardTinTuc> */}
                  </ContainerCardDN>
                </TinTucHover>
              </Col>
              {/* ))} */}
            </Row>
            {/* </Carousel> */}
            <div
              style={{
                width: "135",
                marginTop: 40,
                textAlign: "center",
              }}
            >
              <Link legacyBehavior href="/tintuc/[pid]">
                <a
                  style={{
                    width: "135",
                    display: "inline-flex",
                  }}
                  className="button-more"
                  href="/tintuc/[pid]"
                  target="blank"
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
                      XEM THÊM
                    </div>
                  </ButtonDetailWrapper>
                </a>
              </Link>
            </div>
          </Container>
        </TinTucWrapper>
        {/* <Carousel /> */}
        {/* </Container> */}
      </Box>
    </div>
  );
};

export default TinTuc;
