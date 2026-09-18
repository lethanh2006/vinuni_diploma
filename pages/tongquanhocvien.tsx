// @ts-nocheck
import {
  Card,
  Col,
  Menu, Row
} from "antd";
import axios from "axios";
import Container from "components/UI/Container";
import { ip3 } from "data/ip";
import { enquireScreen } from "enquire-js";
import React, { useEffect, useState } from "react";
import Sticky from "react-stickynode";
import Box from "components/Box";
import { sanitizeHtml } from "components/Utils/htmlSecurity";
// import { enquireScreen } from 'enquire-js';

const { Item } = Menu;

const TinTuc = ({}) => {
  const [relate, setRelate] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function wrapFunc() {
      setLoading(true);
      const response = await axios.get(`${ip3}/bai-viet`, {
        params: {
          // page: 1,
          // limit: 1,
          cond: {
            maLoaiBaiViet: "DAO_TAO_TONG_QUAN_HOC_VIEN",
          },
        },
      });
      console.log("response", response);
      setRelate(response?.data?.data ?? []);
      setContent(response?.data?.data?.[0]?.noiDung ?? "");
      setLoading(false);
    })();
  }, []);
  const renderContent = (content) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setContent(content);
  };
  console.log(relate, "relate tong quan");
  const callback = () => {};
  let isMobile;
  enquireScreen((b) => {
    isMobile = b;
  });
  return (
    <>
      <Box style={{ marginTop: 0 }}>
        <Container>
          {/* <Button onClick={() => test()}>AAAAA</Button> */}
          <Row
            gutter={15}
            style={{
              width: "100%",
              // margin: '0px auto',
              padding: "30px 0",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {isMobile ? (
              <Col lg={7} xl={7} md={24} xs={24} sm={24}>
                {/* <Sticky top={80} bottomBoundary="#content"> */}
                <Card
                  title={
                    <p
                      style={{
                        color: "#D10000",
                        backgroundColor: "white",
                        margin: 0,
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      Tổng quan Học viện
                    </p>
                  }
                  bordered={false}
                >
                  <Menu defaultSelectedKeys="0">
                    {relate.map((item, index) => (
                      <Item
                        key={index}
                        title={item.moTa}
                        onClick={() => renderContent(item.noiDung)}
                      >
                        {item.moTa}
                      </Item>
                    ))}
                  </Menu>
                </Card>
                {/* </Sticky> */}
              </Col>
            ) : (
              <Col lg={7} xl={7} md={24} xs={24} sm={24}>
                <Sticky top={130} bottomBoundary="#content">
                  <Card
                    title={
                      <p
                        style={{
                          color: "#D10000",
                          backgroundColor: "white",
                          margin: 0,
                          fontSize: 22,
                          fontWeight: "bold",
                        }}
                      >
                        Tổng quan Học viện
                      </p>
                    }
                    bordered={false}
                  >
                    <Menu defaultSelectedKeys="0">
                      {relate.map((item, index) => (
                        <Item
                          key={index}
                          title={item.moTa}
                          onClick={() => renderContent(item.noiDung)}
                        >
                          {item.moTa}
                        </Item>
                      ))}
                    </Menu>
                  </Card>
                </Sticky>
              </Col>
            )}
            <Col lg={17} xl={17} md={24} xs={24} sm={24}>
              <div id="content">
                <div
                  style={{
                    marginTop: 20,
                    textAlign: "justify",
                    fontSize: "calc(0.8em + 0.4vw)",
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
                />
              </div>
            </Col>
            {/* <Col lg={7} xl={7} md={24} xs={24} sm={24}>
              <Sticky top={130} bottomBoundary="#content">
                <Card
                  title={
                    <p
                      style={{
                        color: '#D10000',
                        backgroundColor: 'white',
                        margin: 0,
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}
                    >
                      Tổng quan Học viện
                    </p>
                  }
                  bordered={false}
                >
                  <Menu
                    defaultSelectedKeys="0"
                  >
                    {relate.map((item, index) =>
                      <Item key={index} title={item.moTa} onClick={() => renderContent(item.noiDung)}>{item.moTa}</Item>
                    )}
                  </Menu>
                </Card>
              </Sticky>
            </Col> */}
          </Row>
        </Container>
      </Box>
    </>
  );
};

export default TinTuc;
