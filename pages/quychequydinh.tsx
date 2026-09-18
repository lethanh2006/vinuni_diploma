// @ts-nocheck
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Row,
  Breadcrumb,
  Divider,
} from "antd";
import axios from "axios";
import Link from "next/link";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import _ from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import Sticky from "react-stickynode";
import Box from "components/Box";
import { NextSeo } from "next-seo";
import { TitleLinkWrapper } from "styles/baiviet.style";
import { sanitizeHtml, sanitizeInternalPathSegment } from "components/Utils/htmlSecurity";

// moment().locale('vi');

const TinTuc = ({ data, relate }) => {
  useEffect(() => {});
  // console.log(data, 'relate');
  // console.log(relate, 'relate');

  const ngayDang = _.get(data, "ngayDang", "");
  const tieuDe = _.get(data, "tieuDe", "");
  const moTa = _.get(data, "moTa", "");
  const noiDung = sanitizeHtml(_.get(data, "noiDung", ""));
  const nguoiDang = _.get(data, "nguoiDang.hoTen", "");
  const anhDaiDien = _.get(data, "anhDaiDien", "");
  const slug = _.get(data, "slug", "");
  const toTinTucHref = (rawSlug) => {
    const safeSlug = sanitizeInternalPathSegment(rawSlug);
    return safeSlug ? `/tintuc/${safeSlug}` : "#";
  };
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
            }}
          >
            <Col lg={17} xl={17} md={24} xs={24} sm={24}>
              <div id="content">
                <div>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href="/">Trang chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link href="/tintucchung">Tin tức</Link>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Divider />
                </div>
                <h4 style={{ fontSize: "24px", color: "#D10000" }}>
                  {tieuDe !== "" ? tieuDe : null}
                </h4>
                <p
                  style={{
                    color: "#727b88",
                    fontSize: "14px",
                    marginBottom: "12px",
                    marginTop: "-10px",
                    textTransform: "capitalize",
                  }}
                >
                  {ngayDang !== ""
                    ? moment(ngayDang)
                        .lang("vi")
                        .format("DD MMMM YYYY, HH:MM ")
                    : ""}
                </p>
                {moTa !== "" ? (
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{moTa}</p>
                ) : null}
                <div
                  style={{
                    marginTop: 20,
                    textAlign: "justify",
                    fontSize: "calc(0.8em + 0.4vw)",
                  }}
                  dangerouslySetInnerHTML={{ __html: noiDung }}
                />
                {/* {nguoiDang !== "" ? (
                          <p
                            style={{
                              color: "#222",
                              textAlign: "right",
                              fontWeight: "bold",
                            }}
                          >
                            {nguoiDang}
                          </p>
                        ) : null} */}
              </div>
            </Col>
            <Col lg={7} xl={7} md={24} xs={24} sm={24}>
              <Sticky top={160} bottomBoundary="#content">
                <Card
                  title={
                    <p
                      style={{
                        color: "#D10000",
                        margin: 0,
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      Liên quan
                    </p>
                  }
                  bordered={false}
                >
                  <List
                    dataSource={relate}
                    renderItem={(item) => (
                      <List.Item
                        key={item._id}
                        style={{ height: "100%", textAlign: "justify" }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar src={_.get(item, "anhDaiDien", "")} />
                          }
                          title={
                            <TitleLinkWrapper
                              href={toTinTucHref(_.get(item, "slug", ""))}
                              style={{ textAlign: "justify" }}
                            >
                              {renderTitle(_.get(item, "tieuDe", ""))}
                            </TitleLinkWrapper>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Sticky>
            </Col>
          </Row>
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    let response = await axios.get(`${ip}/bai-viet`, {
      params: {
        page: 1,
        limit: 4,
        cond: {
          maLoaiBaiViet: "DAO_TAO_TIN_TUC_ QUY_CHE_QUY_DINH",
        },
      },
    });
    const data = _.get(response, "data.data[0]", {});
    response = await axios.get(`${ip}/bai-viet`, {
      params: {
        page: 1,
        limit: 4,
        cond: {
          maLoaiBaiViet: "DAO_TAO_TIN_TUC_ QUY_CHE_QUY_DINH",
        },
      },
    });
    const relate = _.get(response, "data.data", []);
    return { props: { data, relate } };
  } catch (error) {
    console.error("quychequydinh getServerSideProps", error?.message || error);
    return { props: { data: {}, relate: [] } };
  }
}

export default TinTuc;
