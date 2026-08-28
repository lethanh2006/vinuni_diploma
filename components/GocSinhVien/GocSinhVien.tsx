// @ts-nocheck
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
// eslint-disable-next-line react/prefer-stateless-function
import { Col, Row, Spin } from 'antd';
import Box from 'components/Box';
import Container from 'components/UI/Container';
import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardTinTuc from './components/CardTinTuc';
import { ButtonDetailWrapper, ContainerCardDN, TinTucHover, TinTucWrapper, TitleContainer, TitleUnderWrapper } from './TinTuc.style';

const GocSinhVien = ({ data }) => {
  const [relate, setRelate] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line wrap-iife
    // (async function wrapFunc() {
    // 	const response = await axios.get(`${ip}/bai-viet`, {
    // 		params: {
    // 			page: 1,
    // 			limit: 4,
    // 			cond: {
    // 				maLoaiBaiViet: 'TIN_TUC_GOC_SINH_VIEN'
    // 			}
    // 		}
    // 	});
    // 	const data = _.get(response, 'data.data', []);
    // 	setRelate(data);
    // })();
    // return () => {
    // 	// cleanup;
    // };
    setRelate(data);
    setLoading(false);
  }, []);
  return (
    <div>
      <Box>
        <TinTucWrapper style={{backgroundColor: '#FFFFFF'}}>
          <Container style={{backgroundColor: '#FFFFFF'}}>
            {/* <Button onClick={() => test()}>AAAAA</Button> */}
            <TitleContainer>
              <p style={{ margin: 0 }}>GÓC SINH VIÊNnn</p>
            </TitleContainer>
            <TitleUnderWrapper />
            <Container>
              <Spin spinning={loading}>
                <Row gutter={[20, 20]} style={{ minHeight: 290 }}>
                  {relate.map((item, index) => (
                    <Col key={index} xl={6} lg={6} xs={24} sm={12} md={12}>
                      <TinTucHover>
                        <ContainerCardDN>
                          <CardTinTuc
                            href={_.get(item, 'slug', '')}
                            title={_.get(item, 'tieuDe', '')}
                            img={_.get(item, 'anhDaiDien', '')}
                            src={_.get(item, 'nguoiDang.hoTen', '')}
                            time={
                              _.get(item, 'ngayDang', '') !== '' ? (
                                moment(_.get(item, 'ngayDang', '')).format(
                                  'DD/MM/YYYY, h:mm',
                                )
                              ) : ('')
                            }
                          />
                        </ContainerCardDN>
                      </TinTucHover>
                    </Col>
                  ))}
                </Row>
              </Spin>
              {/* <div style={{ fontSize: 17, float: 'right', marginTop: 16 }}>
								<Link href="/tintucchung">
									<ButtonDetailWrapper
										type="button"
										style={{
											marginLeft: '0 auto'
										}}
									>
										<div
											style={{
												margin: '0 auto',
												fontWeight: 500,
												fontSize: '16px'
											}}
										>
											XEM THÊM
							</div>
									</ButtonDetailWrapper>
								</Link>
							</div> */}
              <div
                style={{
                  width: '135',
                  marginTop: 25,
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Link legacyBehavior href="tintucchung#dao_tao_tin_tuc_goc_sinh_vien">
                  <a
                    style={{
                      width: '135',
                      display: 'inline-flex',
                    }}
                    className="button-more"
                    href="tintucchung#dao_tao_tin_tuc_goc_sinh_vien"
                  >
                    <ButtonDetailWrapper
                      type="button"
                      style={{
                        margin: '0 auto',
                      }}
                    >
                      <div
                        style={{
                          margin: '0 auto',
                          fontWeight: 500,
                          fontSize: '16px',
                        }}
                      >
                        XEM CHI TIẾT
                      </div>
                    </ButtonDetailWrapper>
                  </a>
                </Link>
              </div>
            </Container>
          </Container>
        </TinTucWrapper>
        {/* <Carousel /> */}
        {/* </Container> */}
      </Box>
    </div>
  );
};

export default GocSinhVien;
