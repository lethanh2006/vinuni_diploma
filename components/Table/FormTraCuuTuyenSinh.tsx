// @ts-nocheck
import { Button, Card, Col, Form, Input, Row } from "antd";
import capbangdiemsohieu from "assets/image/sohieuvb.png";
import React from "react";

const TraCuuVB = (props) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    values.ngaySinh = values?.ngaySinh;
    values.hoTen = values?.hoTen;
    values.cmtCccd = values?.cmtCccd;
    values.namTuyenSinh = 2021;
    props.onSubmit(values);
    form.resetFields();
  };

  return (
    <Row>
      <Col lg={24}>
        <Form form={form} onFinish={handleFinish} colon={false}>
          <Card
            style={{ borderRadius: 8 }}
            title={
              <center>
                <span>
                  <img src={capbangdiemsohieu} style={{ padding: 8 }} />
                  <b>Tra cứu theo số CMND/CCCD</b>
                </span>
              </center>
            }
          >
            <Row>
              <Col xs={24} sm={24} md={24}>
                <Form.Item name="cmtCccd">
                  <Input
                    style={{ maxWidth: 1500 }}
                    placeholder="Nhập số CCCD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <p style={{ color: "red" }}>
                <i>Lưu ý: chỉ nhập số CCCD để tra cứu</i>
              </p>
            </Row>
          </Card>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
              lg: { span: 12, offset: 10 },
            }}
            style={{ margin: 20 }}
          >
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
