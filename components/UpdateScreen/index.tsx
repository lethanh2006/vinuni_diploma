// @ts-nocheck
import { Col, Row } from 'antd';
import Rectangle78 from 'assets/image/Rectangle78.png';
import _ from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import React, { useEffect, useState } from 'react';
import Box from 'components/Box';
import Container from 'components/UI/Container';
import { TitleContainer } from './TinTuc.style';
import SectionWrapper from './updateScreen.style';
import Rotate from './updateScreenCopy.style';
import capbangdiemsohieu from 'assets/image/GroupNew.png';

const UpdateScreen = ({
  secTitleWrapper,
  secText,
  secHeading,
  href,
  data,
}) => {
  const [relate, setRelate] = useState([]);
  useEffect(() => {
    // (async function wrapFunc() {
    //   const response = await axios.get(`${ip}/he-dao-tao`, {
    //     params: {
    //       page: 1,
    //       limit: 1000,
    //       // cond: {
    //       //   maLoaiBaiViet: 'THONG-DIEP'
    //       // }
    //     }
    //   });
    //   const data = _.get(response, 'data.data', []);
    //   setRelate(data);
    // })();
    setRelate(data);
  }, []);
  console.log(relate, 'ac');
  return (
    <>
      <SectionWrapper id='daotao'>
        <Container>
          <Box {...secTitleWrapper}>
            {/* <Text {...secText} content="PRODUCT SCREENSHOT" /> */}
            {/* <Heading {...secHeading} content="CHƯƠNG TRÌNH ĐÀO TẠO" />  */}
            <TitleContainer>CHƯƠNG TRÌNH ĐÀO TẠO</TitleContainer>
            <div style={{ textAlign: 'center' }}>
              <img
                alt=''
                src={Rectangle78}
                style={{ width: '64px', height: '4px' }}
              />
            </div>
          </Box>
          <Tabs
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent animated />}
            className='update-screen-tab'
            // activeKey="ĐÀO TẠO SAU ĐẠI HỌC"
          >
            {relate.map((element, index) => (
              <TabPane
                style={{}}
                tab={<>{_.get(element, 'tenHeDaoTao', '')}</>}
                key={_.get(element, 'tenHeDaoTao', '')}
              >
                <div style={{ padding: '32px' }}>
                  <Row gutter={[16, 16]}>
                    {element.nganhDaoTao.map((item, index) => (
                      <Col Col xl={8} md={12} xs={24} key={index + 1}>
                        <Row>
                          <Link
                            href='/nganhhoc/[idMaNganh]'
                            as={
                              '/nganhhoc/' +
                              `${_.get(item, 'maNganh', '')}`
                            }
                          >
                            {item?.tenNganh ===
                            'Ngành Công nghệ tài chính - Fintech' ? (
                              <a
                                style={{ color: '#000' }}
                                target='_blank'
                              >
                                <Rotate>
                                  <Col md={6} xs={8}>
                                    <img
                                      style={{
                                        width: '64px',
                                        heigth: '64px',
                                        marginRight: '16px',
                                      }}
                                      alt=''
                                      src={item.urlAnhDaiDien}
                                    />
                                  </Col>
                                  <Col
                                    style={{
                                      paddingTop: '10px',
                                      position: 'relative',
                                    }}
                                  >
                                    <span>
                                      <img
                                        style={{
                                          width: '32px',
                                          heigth: '32px',
                                          position: 'absolute',
                                          top: 10,
                                          right: -10,
                                          // marginRight: "16px",
                                        }}
                                        alt=''
                                        src={capbangdiemsohieu}
                                      />
                                      Ngành Công nghệ tài chính
                                      -Fintech
                                      {/* {_.get(item, "tenNganh", "")} */}
                                    </span>
                                  </Col>
                                </Rotate>
                              </a>
                            ) : (
                              <a
                                style={{ color: '#fff' }}
                                target='_blank'
                              >
                                <Col md={6} xs={8}>
                                  <img
                                    style={{
                                      width: '64px',
                                      heigth: '64px',
                                      marginRight: '16px',
                                    }}
                                    alt=''
                                    src={item.urlAnhDaiDien}
                                  />
                                </Col>

                                <Col style={{ paddingTop: '10px' }}>
                                  {_.get(item, 'tenNganh', '')}
                                </Col>
                              </a>
                            )}
                          </Link>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </div>
              </TabPane>
            ))}
            {/* <TabPane style={{}} tab="ĐẠI HỌC" key="ĐẠI HỌC">
              <div style={{ padding: "32px" }}>
                <Row gutter={[16, 16]}>
                  {relate.map((item, index) => (
                    <Col Col xl={8} md={12} xs={24} key={index + 1}>
                      <Row>
                        <Link legacyBehavior href="/nganhhoc/[idMaNganh]" as={'/nganhhoc/' + `${_.get(item, 'maNganh', '')}`} >
                          <a style={{ color: '#fff' }} target="_blank" >
                            <Col md={6} xs={8}  >
                              <img
                                style={{
                                  width: "64px",
                                  heigth: "64px",
                                  marginRight: "16px",
                                }}
                                alt=""
                                src={item.urlAnhDaiDien}
                              />
                            </Col>
                            <Col style={{ paddingTop: '10px' }}>
                              {_.get(item, 'tenNganh', '')}
                            </Col>
                          </a>
                        </Link>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </div>
            </TabPane>
            <TabPane style={{}} tab="SAU ĐẠI HỌC" key="SAU ĐẠI HỌC">
              <div style={{ padding: "32px" }}>
                <Row gutter={[16, 16]}>
                </Row>
              </div>
            </TabPane>
            <TabPane style={{}} tab="LIÊN KÊT QUỐC TẾ" key="LIÊN KẾT QUỐC TÊ">
              <div style={{ padding: "32px" }}>
                <Row gutter={[16, 16]}>
                </Row>
              </div>
            </TabPane>
            <TabPane style={{}} tab="ĐÀO TẠO NGẮN HẠN" key="ĐÀO TẠO NGẮN HẠN">
              <div style={{ padding: "32px" }}>
                <Row gutter={[16, 16]}>
                </Row>
              </div>
            </TabPane> */}
          </Tabs>
        </Container>
      </SectionWrapper>
    </>
  );
};
UpdateScreen.propTypes = {
  secTitleWrapper: PropTypes.object,
  secText: PropTypes.object,
  secHeading: PropTypes.object,
};

UpdateScreen.defaultProps = {
  secTitleWrapper: {
    mb: ['60px', '40px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '16px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#ff4362',
    mb: '12px',
  },
  secHeading: {
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#202124',
    letterSpacing: '0.04em',
    mb: '0',
    ml: 'auto',
    mr: 'auto',
    lineHeight: '40px',
    width: '400px',
    maxWidth: '100%',
  },
};

export default UpdateScreen;
