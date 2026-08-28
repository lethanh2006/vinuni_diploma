// @ts-nocheck
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Spin } from 'antd';
import Container from 'components/UI/Container';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Box from 'components/Box';
import TestimonialSecWrapper, {
  CarouselSlide,
  ContainerContent,
  ContainerInformation,
  FontBackground,
  TestimonialItem
} from '../index.style';
import styles from './Carousel.less';
import Information from './Information';
import TextCarousel from './TextCarousel';

const TestimonialSection = ({
  res,
}) => {
  // const dataCarousel = _.get(res, 'data.data', []);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState(undefined);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  useEffect(() => {
    setDataCarousel(res);
    setLoading(false);
  });

  // const res = useRequestCarousel({
  //   url: `${ip}/sliders/all`,
  // });
  console.log(res, 'carousel');
  return (
    <Spin spinning={loading}>
      <div style={{ position: 'relative', minHeight: isDesktopOrLaptop ? 600 : 400 }}>
        {isDesktopOrLaptop && (
          <div className={styles.main}>
            <TestimonialSecWrapper id="testimonial_section">
              <Container fullWidth noGutter>
                <Carousel
                  autoplay
                  // {...settings}
                  ref={(refLast) => {
                    setRef(refLast);
                  }}
                >
                  {res.map((item, index) => (
                    <TestimonialItem className="testimonial_item">
                      <Box>
                        <CarouselSlide
                          style={{
                            backgroundImage: `url("${item.banner}")`,
                          }}
                        >
                          {/* <FontBackground>
                            <Container fullHeight>
                              <ContainerContent> */}
                                {/* <TextCarousel
                                  title1={item.noiDung[0].tieuDe}
                                  des1={item.noiDung[0].moTa}
                                  title2={item.noiDung[1].tieuDe}
                                  des2={item.noiDung[1].moTa}
                                /> */}
                                <div
                                  style={{
                                    left: 15,
                                    top: '50%',
                                    position: 'absolute',
                                  }}
                                  className={styles.buttonCarousel}
                                  onClick={() => ref.prev()}
                                >
                                  <LeftOutlined
                                    style={{ fontSize: 40, color: 'white' }}
                                  />
                                </div>
                                <div
                                  style={{
                                    right: 15,
                                    top: '50%',
                                    position: 'absolute',
                                  }}
                                  className={styles.buttonCarousel}
                                  onClick={() => ref.next()}
                                >
                                  <RightOutlined
                                    style={{ fontSize: 40, color: 'white' }}
                                  />
                                </div>
                              {/* </ContainerContent>
                            </Container>
                          </FontBackground> */}
                        </CarouselSlide>
                      </Box>
                    </TestimonialItem>
                  ))}
                </Carousel>
              </Container>
            </TestimonialSecWrapper>

            <ContainerInformation>
              <Information />
            </ContainerInformation>
          </div>
        )}
        {isTabletOrMobileDevice && (
          <div className={styles.main}>
            <TestimonialSecWrapper id="testimonial_section">
              <Container fullWidth noGutter>
                <Carousel
                  autoplay
                  // {...settings}
                  ref={(refLast) => {
                    setRef(refLast);
                  }}
                >
                  {dataCarousel.map((item, index) => (
                    <TestimonialItem className="testimonial_item">
                      <Box>
                        <CarouselSlide
                          style={{
                            backgroundImage: `url("${item.banner}")`,
                          }}
                        >
                          {/* <FontBackground>
                            <Container fullHeight>
                              <ContainerContent> */}
                                {/* <TextCarousel
                                  title1={item.noiDung[0].tieuDe}
                                  des1={item.noiDung[0].moTa}
                                  title2={item.noiDung[1].tieuDe}
                                  des2={item.noiDung[1].moTa}
                                /> */}
                                {/* <div
                                style={{ left: 15, top: '50%', position: 'absolute' }}
                                className={styles.buttonCarousel}
                                onClick={() => ref.prev()}
                              >
                                <Icon type="left" style={{ fontSize: 40, color: 'white' }} />
                              </div>
                              <div
                                style={{ right: 15, top: '50%', position: 'absolute' }}
                                className={styles.buttonCarousel}
                                onClick={() => ref.next()}
                              >
                                <Icon type="right" style={{ fontSize: 40, color: 'white' }} />
                              </div> */}
                              {/* </ContainerContent>
                            </Container>
                          </FontBackground> */}
                        </CarouselSlide>
                      </Box>
                    </TestimonialItem>
                  ))}
                </Carousel>
              </Container>
            </TestimonialSecWrapper>

            <ContainerInformation>
              <Information />
            </ContainerInformation>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default TestimonialSection;
