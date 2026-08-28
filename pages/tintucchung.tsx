// @ts-nocheck
/* eslint-disable react/jsx-indent */
/* eslint-disable no-tabs */
// import { navigate } from "@reach/router";
import { useRouter } from "next/router";
import { Pagination, Spin, Tabs } from "antd";
import axios from "axios";
import TinTuc from "components/CardTinTuc";
import Container from "components/UI/Container";
import { ip } from "data/ip";
import React, { useEffect, useState } from "react";
import Box from "components/Box";
import _ from "lodash";
const { TabPane } = Tabs;

export function Format(str) {
  // xóa hết dấu + đưa về chữ thường
  if (!str) return "";
  return str
    .toString()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/\s/g, "");
}

const TinTucVBCC = ({ loaiBaiViet = [] }) => {
  const router = useRouter();
  const firstLoai = loaiBaiViet?.[0];
  const [data, setData] = useState([]);
  const [key, setKey] = useState(firstLoai?.maLoai);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cond, setCond] = useState({
    maLoaiBaiViet: firstLoai?.maLoai,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  function callback(key) {
    loaiBaiViet.map((e) => {
      if (e.maLoai === key) {
        router.push(`tintucchung#${Format(e.maLoai)}`);
      }
    });
    setKey(key);
    setCond({
      maLoaiBaiViet: key,
    });
  }
  const fetchTinTuc = async (page, pageSize, cond) => {
    setLoading(true);
    const response = await axios.get(`${ip}/bai-viet`, {
      params: {
        page,
        limit: pageSize,
        cond,
      },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("response", response);
    setData(response?.data?.data ?? []);
    setTotal(response?.data?.total ?? 0);
    setLoading(false);
  };
  useEffect(() => {
    // (async function wrapFunc() {
    //   const response = await axios.get(`${ip}/sotay/loaitintuc`, {
    //     params: {
    //       page: 1,
    //       limit: 1000,
    //       cond: {},
    //     },
    //   });
    //   const data = _.get(response, "data.data", []);
    //   setLoaiTinTuc(data);
    // })();
    console.log(location.href, "href");
    const tmp = location.href.split("#");
    console.log(tmp, "tmp");
    let flag = false;
    tmp.map((item) => {
      loaiBaiViet.map((e) => {
        if (Format(e.maLoai) === item) {
          fetchTinTuc(page, pageSize, { maLoaiBaiViet: e.maLoai });
          setKey(e.maLoai);
          flag = true;
          return;
        }
      });
    });
    if (flag) return;
    fetchTinTuc(page, pageSize, cond);
  }, [page, pageSize, cond, key]);
  const handleChangePaging = (page, pageSize) => {
    console.log("page, pageSize", page, pageSize);
    fetchTinTuc(page, pageSize, cond);
    setPage(page);
  };
  return (
    <Box style={{ marginTop: 0, padding: 0 }}>
      <Container>
        <Tabs
          defaultActiveKey={key}
          activeKey={key}
          onChange={callback}
          style={{ fontSize: "16px" }}
        >
          {loaiBaiViet.map((item, index) => (
            <TabPane
              tab={
                <div style={{ fontSize: "16px" }}>
                  {_.get(item, "tenLoai", "")}
                </div>
              }
              key={_.get(item, "maLoai", "")}
              id={_.get(item, "_id", "")}
            >
              <Spin spinning={loading}>
                <TinTuc data={data} />
              </Spin>
              <Pagination
                onChange={handleChangePaging}
                current={page}
                total={total}
                pageSize={pageSize}
                style={{ float: "right", marginTop: 8 }}
                showLessItems
              />
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </Box>
  );
};

export default TinTucVBCC;

export async function getServerSideProps() {
  try {
    let response = await axios.get(`${ip}/loai-bai-viet`, {
      params: {
        cond: {
          $and: [
            { maLoai: { $regex: "DAO_TAO_TIN_TUC_" } },
            { maLoai: { $ne: "DAO_TAO_TIN_TUC_BA_CONG_KHAI" } },
            { maLoai: { $ne: "DAO_TAO_TIN_TUC_DINH_HUONG" } },
          ],
        },
      },
    });
    const loaiBaiViet = _.get(response, "data.data", []);
    return { props: { loaiBaiViet: Array.isArray(loaiBaiViet) ? loaiBaiViet : [] } };
  } catch (error) {
    console.error("tintucchung getServerSideProps", error?.message || error);
    return { props: { loaiBaiViet: [] } };
  }
}
