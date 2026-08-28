// @ts-nocheck
import {
  Button, Card, Col, DatePicker, Form, Input, Row,
} from 'antd';
import Container from 'components/UI/Container';
import rules from 'components/Utils/rules';
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Box from 'components/Box';

const DangKi = () => {
  const [form] = Form.useForm();
  const recaptchaRef = useRef(null);

  const handleFinish = (values) => {
    const recapchaValue = recaptchaRef.current?.getValue();
    console.log('recapchaValue', recapchaValue);
    console.log('Received values of form: ', values);
  };

  return (
    <Box style={{ marginTop: '120px' }}>
      <Container>
        <Row>
          <Col lg={18} style={{ marginLeft: '40px' }}>
            <Card title="Tra cứu kết quả thi Tiếng Anh">
              <Form form={form} onFinish={handleFinish}>
                <Row>
                  <Col lg={20}>
                    <Form.Item
                      name="hoTen"
                      label="Họ và Tên"
                      rules={[...rules.length(50), ...rules.text]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={20}>
                    <Form.Item name="ngaySinh" label="Ngày Sinh">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col lg={20}>
                    <Form.Item
                      name="soHieuVB"
                      label="Số hiệu VB"
                      rules={[...rules.length(20), ...rules.text]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                    lg: { span: 12, offset: 10 },
                  }}
                >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcTyrcZAAAAAPp--P8E1xuz9SpJGsypdEX8vAk-"
                  />
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default DangKi;
