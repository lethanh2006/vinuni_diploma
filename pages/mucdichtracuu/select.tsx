// @ts-nocheck
import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { ipVIN } from "data/ip";

const { Option } = Select;

const SelectMucDichTraCuuPublic = (props) => {
  const { value, onChange, multiple, allowClear, hasDefault, style, size } =
    props;
  const [danhSach, setDanhSach] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${ipVIN}qldt-test/muc-dich-tra-cuu-phu-luc/public/many`,
        );
        const data = res.data?.data || [];
        setDanhSach(data);
        if (hasDefault && onChange && data.length > 0) onChange(data[0]._id);
      } catch (error) {
        console.error("Lỗi khi tải danh sách mục đích tra cứu:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Select
      size={size}
      mode={multiple ? "multiple" : undefined}
      value={value}
      onChange={onChange}
      showSearch
      optionFilterProp="children"
      placeholder="Chọn mục đích tra cứu phụ lục"
      allowClear={allowClear ?? false}
      style={{ width: "100%", ...style }}
      showArrow
    >
      {danhSach
        ?.filter((item) => item?.active)
        ?.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.ten}
          </Option>
        ))}
    </Select>
  );
};

export default SelectMucDichTraCuuPublic;
