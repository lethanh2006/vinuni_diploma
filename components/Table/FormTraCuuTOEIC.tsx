// @ts-nocheck
import { Button, Card, Col, Form, Input, Row, Tabs } from "antd";
import capbangdiemsohieu from "assets/image/sohieuvb.png";
import React from "react";

const { TabPane } = Tabs;

const TraCuuVB = (props) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    values.dateOfBirth = values?.dateOfBirth;
    values.testDate = values?.testDate || values?.testDatee;
    values.hoDem = values?.hoDem;
    values.ten = values?.ten;
    values.maSvOrCccd = values?.maSvOrCccd;
    props.onSubmit(values);
    form.resetFields();
  };

  return (
    <Row>
      <Col lg={24}>
        <Form form={form} onFinish={handleFinish} colon={false}>
          <Tabs
            defaultActiveKey="1"
            onChange={() => {
              form.resetFields();
            }}
          >
            <TabPane
              tab="Tra cứu kết quả theo CMND hoặc thẻ căn cước"
              key="2"
              destroyInactiveTabPane
            >
              <Card
                style={{ borderRadius: 8 }}
                title={
                  <center>
                    <span>
                      <img src={capbangdiemsohieu} style={{ padding: 8 }} />
                      <b>Tra cứu kết quả theo CMND hoặc thẻ căn cước</b>
                    </span>
                  </center>
                }
              >
                <Row gutter={12}>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item name="cmtCccd" label="CMND hoặc thẻ căn cước">
                      <Input
                        style={{ maxWidth: 500 }}
                        placeholder="Nhập CMND hoặc thẻ căn cước"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <p style={{ color: "red" }}>
                    <i>Lưu ý: Số CMND hoặc thẻ căn cước</i>
                  </p>
                </Row>
              </Card>
            </TabPane>
          </Tabs>

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
