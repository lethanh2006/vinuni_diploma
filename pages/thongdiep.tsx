// @ts-nocheck
import { Row, Tabs, Spin } from "antd";
import axios from "axios";
import Container from "components/UI/Container";
import { ip3 } from "data/ip";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Box from "components/Box";
import { sanitizeHtml } from "components/Utils/htmlSecurity";

const ThongDiep = ({}) => {
  const [relate, setRelate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function wrapFunc() {
      setLoading(true);
      const response = await axios.get(`${ip3}/bai-viet`, {
        params: {
          page: 1,
          limit: 1,
          cond: {
            maLoaiBaiViet: "DAO_TAO_THONG-DIEP",
          },
        },
      });
      console.log("response", response);
      setRelate(response?.data?.data ?? []);
      setLoading(false);
    })();
  }, []);
  return (
    <Spin spinning={loading}>
      <Box style={{ marginTop: 0 }}>
        <Container>
          <div>
            <Row>
              {relate.map((item, index) => (
                <div id="Subheader">
                  <div class="container">
                    <div class="column one">
                      <p
                        style={{
                          marginTop: "60",
                          fontSize: "calc(0.8em + 0.4vw)",
                          textAlign: "center",
                          color: "#D13E32",
                        }}
                      >
                        {_.get(item, "tieuDe", "")}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(_.get(item, "noiDung", "")) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </div>
        </Container>
      </Box>
    </Spin>
  );
};
export default ThongDiep;
