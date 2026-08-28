// @ts-nocheck
import { Button, Descriptions, Empty, Modal, Table, Tag } from "antd";
import axios from "axios";
import { ip } from "data/ip";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
moment.locale("vi");

export default function VanBangTable(props) {
  const [show, setshow] = useState(false);
  const [record, setrecord] = useState({});
  const handleView = async (record) => {
    // setshow(true);
    console.log(record);
    let arr = [];
    arr.push(record._id);
    const response = await axios.post(`${ip}/phu-luc-van-bang/exports-by-list-id-unauth`, arr);
    console.log(response, "exportSingle");
    window.open(response?.data?.data?.url ?? "");
  };

  const columns = [
    // {
    //   title: "STT",
    //   dataIndex: "index",
    //   align: "center",
    //   width: "90px",
    // },
    {
      title: "Đối tượng thi",
      dataIndex: "loaiDoiTuong",
      width: 180,
    },
    {
      title: "Họ và tên",
      dataIndex: "hoDem",
      align: "center",
      width: "120px",
      search: "search",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      align: "center",
      width: "90px",
      search: "search",
    },
    {
      title: "Số thẻ cmt/cccd",
      dataIndex: "cmtCccd",
      align: "center",
      width: "150px",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      align: "center",
      width: "150px",
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },
    {
      title: "Mã sinh viên",
      dataIndex: "maSinhVien",
      align: "center",
      width: "150px",
      search: "search",
    },
    {
      title: "Ngày thi",
      align: "center",
      width: "200px",
      render: (val, rec) =>
        rec?.dotDangKy?.thoiGianThi ? moment(rec?.dotDangKy?.thoiGianThi).format("DD/MM/YYYY") : null,
    },
    {
      title: "Cơ sở thi",
      align: "center",
      width: "250px",
      render: (val, rec) => rec?.dotDangKy?.diaDiem,
    },
    {
      title: "Điểm nghe",
      dataIndex: "nghe",
      align: "center",
      width: "100px",
      render: (val) => (val ? <Tag color="red">{val}</Tag> : ""),
      search: "sort",
    },
    {
      title: "Điểm đọc",
      dataIndex: "doc",
      align: "center",
      width: "100px",
      render: (val) => (val ? <Tag color="red">{val}</Tag> : ""),
      search: "sort",
    },
    {
      title: "Tổng điểm",
      dataIndex: "tongDiem",
      align: "center",
      width: "100px",
      render: (val) => (val ? <Tag color="blue">{val}</Tag> : ""),
      search: "sort",
    },
    {
      title: "Trình độ",
      dataIndex: "level",
      width: "150px",
      align: "center",
      render: (val) => (val ? <p>{val}</p> : ""),
    },
    {
      title: "Trạng thái hồ sơ",
      dataIndex: "trangThai",
      align: "center",
      width: 180,
      render: (val, rec) =>
        val === "Hồ sơ chưa được tiếp nhận" ? <Tag color="green">{val}</Tag> : <Tag color="blue">{val}</Tag>,
    },
    {
      title: "Kết quả",
      align: "center",
      width: 150,
      render: (val, rec) =>
        rec?.tongDiem ? <Tag color="green">Đã có kết quả</Tag> : <Tag color="red">Chưa có kết quả</Tag>,
      fixed: "right",
    },
    {
      title: "Thao tác",
      align: "center",
      render: (value, record) => (
        <Button
          type="primary"
          shape="circle"
          icon="eye"
          onClick={() => window.open(`https://slink.ptit.edu.vn/ho-so-thi-sinh/${record?.maHoSoChung}`, "_blank")}
          title="Chi tiết"
        />
      ),
      fixed: "right",
      width: 150,
    },
  ];

  useEffect(() => {
    if (props?.id) {
      console.log("props", props);
      console.log("props?.data?.[0]", props?.data?.[0]);
      setrecord(props?.data?.[0] ?? {});
      setshow(true);
    }
    return () => {
      setrecord({});
      setshow(false);
    };
  }, [props.id]);

  const onCloseModal = () => setshow(false);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const ngayNhap = record?.ngayNhapHoc ?? "";
  return (
    <div>
      <Table
        dataSource={props?.data ?? []}
        columns={columns}
        scroll={{ x: 1800 }}
        destroyOnClose
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Trống" />,
        }}
      />
      <Modal
        title="Thông tin chi tiết"
        open={show}
        onOk={onCloseModal}
        onCancel={onCloseModal}
        cancelText="Đóng"
        {...(!isTabletOrMobile ? { width: "80%" } : {})}
        centered
        zIndex={1000}
      >
        <div style={{ maxHeight: "80vh", overflow: "auto" }}>
          {" "}
          <Descriptions
            bordered
            column={{
              xxl: 3,
              xl: 3,
              lg: 3,
              md: 3,
              sm: 2,
              xs: 1,
            }}
          >
            <Descriptions.Item label="Mã SV">{record?.maSv}</Descriptions.Item>
            <Descriptions.Item label="Họ tên">{record?.hoTen}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {moment(new Date(record?.ngaySinh)).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">{record?.gioiTinh === 0 ? "Nam" : "Nữ"}</Descriptions.Item>
            <Descriptions.Item label="Nơi sinh">{record?.noiSinh}</Descriptions.Item>
            <Descriptions.Item label="Lớp">{record?.lop}</Descriptions.Item>
            <Descriptions.Item label="Hồ sơ" span={24}>
              Trình độ: {record?.trinhDoDT}
              <br />
              Hình thức đào tạo: {record?.hinhThucDT}
              <br />
              Ngành: {record?.nganh}
              <br />
              Chuyên ngành: {record?.chuyenNganh}
              <br />
              Niên khóa: {record?.nienKhoa ?? ""}
              <br />
              Thời gian đào tạo: {record?.thoiGianDT ?? ""}
              <br />
              Ngày nhập học: {ngayNhap !== "" && moment(record?.ngayNhapHoc ?? "").format("DD/MM/YYYY")}
              <br />
              Đợt tốt nghiệp: {record?.dotTN?.tenDot ?? ""}
              <br />
              Xếp loại: {record?.xepLoai ?? ""}
              <br />
              Quyết định tốt nghiệp: {record?.quyetDinhTN ?? ""}
              <br />
              {/* Số vào sổ: {record?.soVaoSo ?? ''}
              <br /> */}
              Số hiệu VB: {record?.soHieuVB ?? ""}
              <br />
              Thời gian đào tạo: {record?.thoiGianDT ?? ""}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </div>
  );
}
