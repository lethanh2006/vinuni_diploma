// @ts-nocheck
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumb, Col } from "antd";
import bgNganhHOc from "assets/image/imageHocVien.png";
import axios from "axios";
import Navbar from "components/NavbarNganhHoc/index";
import { ip } from "data/ip";
import ThongTinCoBan from "components/CardThongTinNganhHoc/Card";
import CardCauTruc from "components/CardThongTinNganhHoc/CardCauTruc";
import {
  ChuanDauRa,
  DieuienTuyenSinh,
  HocPhi,
  TongQuan,
  TrienVongNgheNghiep,
} from "components/CardThongTinNganhHoc/CardHTML";
import QuyTrinhNhapHoc from "components/CardThongTinNganhHoc/QuyTrinhNhapHoc";
import Container from "components/UI/Container";
import _ from "lodash";
// moment.locale('vi');
import { NextSeo } from "next-seo";
// import moment from 'moment';
import React from "react";
import Box from "components/Box";
import { BackGR, Title } from "../../styles/nganhhoc.style";

const dataBreadCrumb = [
  { name: "Trang chủ", url: "/" },
  { name: "Chương trình đào tạo", url: "#" },
  { name: "Đào tạo đại học", url: "#" },
  // { name: 'Ngành công nghệ thông tin', url: '#' },
];

const dataNav = [
  { name: "Tổng quan", url: "#tongquan" },
  { name: "Chuẩn đầu ra", url: "#chuandaura" },
  { name: "Cấu trúc chương trình", url: "#cautrucchuongtrinh" },
  { name: "Nghề nghiệp", url: "#nghenghiep" },
  { name: "Học phí", url: "#hocphi" },
  { name: "Điều kiện tuyển sinh", url: "#dieukientuyensinh" },
  { name: "Quy trình nhập học", url: "#quytrinhnhaphoc" },
];

const NganhHoc = ({ dataFetch, params }) => {
  const Format = (str) => {
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
  };
  console.log(params, "data");
  let data;
  if (dataFetch === undefined || dataFetch.length === 0 || dataFetch === null) {
    data = [
      {
        maNganh: "",
        thoiGianDaoTao: "",
        kyNhapHoc: "",
        hanNopHoSo: "",
        coSo: "",
        tongQuan: "",
        chuanDauRa: "",
        cauTrucChuongTrinh: [],
        hocPhanTuChon: [],
        ngheNghiep: "",
        hocPhi: "",
        dieuKienTuyenSinh: "",
        tenChuyenNganh: "",
      },
    ];
  } else {
    data = dataFetch;
  }
  const namO = {
    maNganh: _.get(data[0], "maNganh", ""),
    thoiGianDaoTao: _.get(data[0], "thoiGianDaoTao", ""),
    kyNhapHoc: _.get(data[0], "kyNhapHoc", ""),
    hanNopHoSo: _.get(data[0], "hanNopHoSo", ""),
    coSo: _.get(data[0], "coSo", ""),
  };
  const tongQuan = _.get(data[0], "tongQuan", "");
  const chuanDauRa = _.get(data[0], "chuanDauRa", "");
  let monTinChi = _.get(data[0], "cauTrucChuongTrinh", []);
  const tenChuyenNganh = _.get(data[0], "tenChuyenNganh", []);
  const ngheNghiep = _.get(data[0], "ngheNghiep", "");
  const hocPhi = _.get(data[0], "hocPhi", "");
  const dieuKienTuyenSinh = _.get(data[0], "dieuKienTuyenSinh", "");
  console.log(Format("Chuyên ngành tiếng anh"), "data idnganh");
  monTinChi = monTinChi.map((item) => ({
    ...item,
    anchor: Format(item.tenChuyenNganh),
  }));
  console.log(monTinChi, "data idnganh");
  return (
    <>
      <NextSeo
        title={data[0]?.tenNganh}
        description="Thông tin chi tiết về các ngành học tại Học viện Công nghệ Bưu chính Viễn thông"
        canonical="https://daotao.aisenote.com/"
        openGraph={{
          url: `https://daotao.aisenote.com/nganhhoc/${namO?.maNganh}`,
          title: data[0]?.tenNganh,
          description:
            "Thông tin chi tiết về các ngành học tại Học viện Công nghệ Bưu chính Viễn thông",
          images: [
            {
              url: bgNganhHOc,
              width: 800,
              height: 600,
              alt: "Tin tức",
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
        <div
          gutter={15}
          style={{
            width: "100%",
            margin: "0px auto",
            padding: "30px 0",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {data &&
            data.map((item, index) => (
              <Col lg={24} xl={24} md={24} xs={24} sm={24}>
                <div id="content" style={{ listStyleType: "unset" }}>
                  <BackGR
                    style={{
                      backgroundImage: `url("${_.get(item, "banner", "")}")`,
                    }}
                  >
                    <Title
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        fontWeight: 650,
                        backgroundColor: "red",
                        color: "white",
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                    >
                      {_.get(item, "tenNganh", "")}
                    </Title>
                    <div id="gioiThieu" />
                  </BackGR>
                  <Container>
                    <div
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        height: 72,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 16,
                      }}
                    >
                      <Breadcrumb
                        style={{
                          // backgroundColor: "red",
                          // color: "white",
                          fontSize: 16,
                        }}
                      >
                        {dataBreadCrumb?.map(({ name, url }) => {
                          if (name === "Trang chủ") {
                            return (
                              <Breadcrumb.Item>
                                <a href={url}>{name}</a>
                              </Breadcrumb.Item>
                            );
                          } else {
                            return <Breadcrumb.Item>{name}</Breadcrumb.Item>;
                          }
                        })}
                        <Breadcrumb.Item>
                          {/* <a href={'#'}>{_.get(item, 'tenNganh', '')}</a> */}
                          {_.get(item, "tenNganh", "")}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </Container>
                  <ThongTinCoBan namO={namO} />
                  <Navbar
                    data={dataNav}
                    maNganh={_.get(data[0], "maNganh", "")}
                    monTinChi={monTinChi}
                  />
                  <TongQuan tongQuan={tongQuan} />
                  <ChuanDauRa chuanDauRa={chuanDauRa} />
                  <CardCauTruc data={monTinChi} />
                  <TrienVongNgheNghiep ngheNghiep={ngheNghiep} />
                  <HocPhi hocPhi={hocPhi} />
                  <DieuienTuyenSinh dieuKienTuyenSinh={dieuKienTuyenSinh} />
                  <QuyTrinhNhapHoc />
                </div>
              </Col>
            ))}
        </div>
      </Box>
    </>
  );
};

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   // Get the paths we want to pre-render based on posts
//   const response = await axios.get(`${ip}/nganh-hoc`, {
//     // params: {
//     //   cond: {
//     //     toHop: ['A00', 'A01'],
//     //   },
//     // },
//   });
//   const listPath = _.get(response, 'data.data', []);
//   const paths = [];
//   listPath &&
//     listPath.map(item => {
//       paths.push({
//         params: { idMaNganh: item.maNganh },
//       });
//     });
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// }

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`${ip}/dao-tao/nganh-hoc`, {
      params: {
        cond: {
          maNganh: params.idMaNganh,
        },
      },
    });
    const dataFetch = _.get(response, "data.data", {});
    return { props: { dataFetch, params } };
  } catch (error) {
    console.error("nganhhoc getServerSideProps", error?.message || error);
    return { props: { dataFetch: {}, params } };
  }
}

export default NganhHoc;
