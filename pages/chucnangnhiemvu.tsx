// @ts-nocheck
import { Row, Spin } from "antd";
import axios from "axios";
import Box from "components/Box";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import { enquireScreen } from "enquire-js";
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { sanitizeHtml } from "components/Utils/htmlSecurity";

export const TitleUnderWrapper = styled.div`
  background-color: #d50000;
  height: 4px;
  width: 64px;
  margin: 0px auto;
  margin-top: 2px;
  margin-bottom: 48px;
`;


const ChucNangNhiemVu = () => {
  let isMobile;
  enquireScreen((b) => {
    isMobile = b;
  });
  const [loading, setLoading] = useState(true);
  const [relate, setRelate] = useState([]);
  useEffect(() => {
    (async function wrapFunc() {
      setLoading(true);
      const response = await axios.get(`${ip}/bai-viet`, {
        params: {
          page: 1,
          limit: 1,
          cond: {
            maLoaiBaiViet: "DAO_TAO_CHUC_NANG_NHIEM_VU",
          },
        },
      });
      console.log("response", response);
      setRelate(response?.data?.data ?? []);
      setLoading(false);
    })();
  }, []);
  console.log(relate, "cnvn");
  return (
    <Spin spinning={loading}>
      <Box style={{ marginTop: 0 }}>
        <Container>
          <div>
            <Row>
              {/* <h2 style={{ color: '#D13E32', textAlign: 'center', fontsize: '22px' }}>
              HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
            </h2>
            <h2 style={{ color: '##1D1F21', textAlign: 'center', fontsize: '22px' }}>
              PHÒNG ĐÀO TẠO
            </h2> */}
              <p
                style={{
                  marginTop: "60",
                  fontSize: "30px",
                  textAlign: "center",
                  color: "#D13E32",
                  margin: "0 0 10px",
                }}
              >
                HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
              </p>
              <p
                style={{
                  color: "#1E1E1E",
                  fontSize: "26px",
                  textAlign: "center",
                  margin: "0 0 10px",
                }}
              >
                PHÒNG ĐÀO TẠO
              </p>
              <TitleUnderWrapper />
            </Row>
            <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {relate.map((item) => (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.noiDung) }} />
              ))}
            </div>
          </div>
        </Container>
      </Box>
    </Spin>
  );
};
ChucNangNhiemVu.defaultProps = {};
export default ChucNangNhiemVu;
