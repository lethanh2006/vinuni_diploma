// @ts-nocheck
import { Breadcrumb, Card, Col, Collapse, Divider, List, Row } from "antd";
import Box from "components/Box";
import { fetchAPI } from "components/lib/api";
import Container from "components/UI/Container";
import moment from "moment";
import axios from "axios";
import Link from "next/link";
import React from "react";
import Sticky from "react-stickynode";
import { TitleLinkWrapper } from "styles/baiviet.style";
import { ip } from "data/ip";
import _ from "lodash";
import bgNganhHOc from "assets/image/DeAnTSPTIT2021.jpg";
import { NextSeo } from "next-seo";
import { sanitizeHtml } from "components/Utils/htmlSecurity";

// moment().locale('vi');

const TinTuc = ({ dataDeAn, dataMucLuc }) => {
  console.log("dean", dataDeAn);
  console.log("thumuc", dataMucLuc);
  const { Panel } = Collapse;

  const renderTitle = (title) => {
    if (title <= 105) {
      return title;
    }
    let s = "";
    const len = title.length >= 105 ? 105 : title.length;
    for (let i = 0; i < len; i++) {
      s += title[i];
    }
    if (title.length > 105) {
      s += "...";
    }
    return s;
  };

  return (
    <>
      <NextSeo
        title="Đề án tuyển sinh học viện công nghệ bưu chính viễn ghông năm 2021"
        description="Thông tin chi tiết về đề án tuyển sinh Học viện Công nghệ Bưu chính Viễn thông"
        canonical="https://daotao.aisenote.com/"
        openGraph={{
          url: `https://daotao.aisenote.com/`,
          title:
            "Đề án tuyển sinh Học viện Công nghệ Bưu chính Viễn thông năm 2021",
          description:
            "Thông tin chi tiết về đề án tuyển sinh Học viện Công nghệ Bưu chính Viễn thông",
          images: [
            {
              url: bgNganhHOc,
              width: 800,
              height: 600,
              alt: "Đề Án",
            },
          ],
          site_name:
            "HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG CỔNG THÔNG TIN ĐÀO TẠO",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Box style={{ marginTop: 0 }}>
        <Container>
          {/* <Button onClick={() => test()}>AAAAA</Button> */}

          <Row
            gutter={15}
            style={{
              width: "90%",
              margin: "0px auto",
              padding: "30px 0",
              fontFamily: "Montserrat, sans-serif",
              //   scrollBehavior: "smooth",
            }}
          >
            <Col lg={24} xl={24} md={24} xs={24} sm={24}>
              <div id="content">
                <div>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href="/">Trang chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link href="/tintucchung">Tin tức</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link href="">Đề án tuyển sinh</Link>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Divider />
                </div>
                <h4 style={{ fontSize: "calc(1vw + 10px)", color: "#D10000" }}>
                  "Đề án tuyển sinh Học viện Công nghệ bưu chính viễn thông năm
                  2021"
                </h4>

                <Card
                  bordered={false}
                  title={
                    <span
                      style={{
                        fontSize: "18px",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      <b>MỤC LỤC</b>
                    </span>
                  }
                >
                  <List
                    dataSource={dataMucLuc}
                    renderItem={(item) => (
                      //     <a href={`#${item?._id}`}>
                      <List.Item
                        key={item._id}
                        style={{ height: "100%", textAlign: "justify" }}
                        onClick={() => {
                          const itemScroll = document.getElementById(item?.id);
                          itemScroll.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <List.Item.Meta
                          title={
                            <TitleLinkWrapper
                              style={{
                                textAlign: "justify",
                                fontSize: "18px",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {item?.heading}
                            </TitleLinkWrapper>
                          }
                        />
                      </List.Item>
                      //     </a>
                    )}
                  />
                </Card>

                {dataDeAn
                  .filter((item, index) => index > 0)
                  .map((item, index) => (
                    <>
                      <div id={item?.id} style={{ marginBottom: 6 }}>
                        <b
                          style={{
                            fontSize: "18px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {item?.heading}
                        </b>
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item?.content) }} />
                      </div>
                    </>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps({}) {
  try {
    let response = await axios.get(
      `${ip}/hdsd/content-structure/606aec55e9bd5ae27358f96d/?hasContent=1`
    );
    const dataDeAn = _.get(response, "data.data", {});

    let responseMucLuc = await axios.get(
      `${ip}/hdsd/content-structure/606aec55e9bd5ae27358f96d`
    );
    const dataMucLuc = (_.get(responseMucLuc, "data.data", {}) || []).filter(
      (item) => item.depth < 3 && item?.depth > 0
    );

    return { props: { dataDeAn, dataMucLuc } };
  } catch (error) {
    console.error("deantuyensinh getServerSideProps", error?.message || error);
    return { props: { dataDeAn: {}, dataMucLuc: [] } };
  }
}

export default TinTuc;
