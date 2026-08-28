// @ts-nocheck
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Card,
} from "antd";
import rules from "components/Utils/rules";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import capbangdiem from "assets/image/capbangdiem.png";
import capbangdiemsohieu from "assets/image/sohieuvb.png";

const TraCuuVB = (props) => {
  const [form] = Form.useForm();
  const [capcha, setcapcha] = useState(false);
  const recaptchaRef = useRef(null);

  const handleFinish = (values) => {
    const recapchaValue = recaptchaRef.current?.getValue();
    if (recapchaValue && recapchaValue?.length) {
      values.ngaySinh = values?.ngaySinh?.toISOString();
      recaptchaRef.current.reset();
      setcapcha(false);
      props.onSubmit(values);
      form.resetFields();
    }
  };

  function handleChange(value) {
    setcapcha(value);
  }

  return (
    <Row>
      <Col lg={24}>
        <Form form={form} onFinish={handleFinish} colon={false}>
          <Row gutter={[12, 10]}>
            <Col xs={24} md={24} lg={12}>
              <Card
                style={{ borderRadius: 8 }}
                title={
                  <span>
                    <img src={capbangdiem} style={{ padding: 8 }} />
                    <b>Tra cứu kết quả theo họ tên và ngày sinh</b>
                  </span>
                }
              >
                <Row>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      name="hoTen"
                      label="Họ và Tên"
                      rules={[...rules.length(50), ...rules.text]}
                    >
                      <Input
                        style={{ maxWidth: 500 }}
                        placeholder="Họ và tên"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12} style={{ paddingLeft: 8 }}>
                    <Form.Item name="ngaySinh" label="Ngày Sinh">
                      <DatePicker
                        placeholder="VD: 12/04/1999"
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <p style={{ color: "red" }}>
                    <i>
                      Lưu ý: chỉ nhập họ tên và ngày tháng năm sinh hoặc nhập số
                      hiệu Văn bằng để tra cứu{" "}
                    </i>
                  </p>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Card
                style={{ borderRadius: 8 }}
                title={
                  <span>
                    <img src={capbangdiemsohieu} style={{ padding: 8 }} />
                    <b>Tra cứu kết quả theo số hiệu văn bằng</b>
                  </span>
                }
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={20}>
                    <Form.Item
                      name="soHieuVB"
                      label="Số hiệu VB"
                      rules={[...rules.length(20), ...rules.text]}
                    >
                      <Input
                        style={{ maxWidth: 500 }}
                        placeholder="Số hiệu văn bằng"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <p style={{ color: "red" }}>
                    <i>
                      Lưu ý: chỉ nhập họ tên và ngày tháng năm sinh hoặc nhập số
                      hiệu Văn bằng để tra cứu{" "}
                    </i>
                  </p>
                </Row>
              </Card>
            </Col>
          </Row>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
              lg: { span: 12, offset: 10 },
            }}
            style={{ margin: 20 }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LcTyrcZAAAAAPp--P8E1xuz9SpJGsypdEX8vAk-"
              onChange={handleChange}
            />
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default TraCuuVB;
