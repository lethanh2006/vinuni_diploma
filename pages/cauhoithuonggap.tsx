// @ts-nocheck
/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import {
 Card, Col, Collapse, List, Row,
} from 'antd';
import {
    Accordion,
    AccordionBody, AccordionItem,
    AccordionTitle,
    CloseIcon, IconWrapper,
    OpenIcon,
} from 'components/Accordion';
import Container from 'components/UI/Container';
import { faq } from 'data/faq';
import { enquireScreen } from 'enquire-js';
import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { minus } from 'react-icons-kit/entypo/minus';
import { plus } from 'react-icons-kit/entypo/plus';
import Sticky from 'react-stickynode';
import Box from 'components/Box';
import Heading from 'components/Heading';
import { SideBar } from '../styles/faq.style';
import { sanitizeHtml } from "components/Utils/htmlSecurity";

const { Panel } = Collapse;

const CauHoi = () => {
    const [content, setContent] = useState(faq[0].content);
    const [active, setActive] = useState(0);
    const changeFAQ = (content, index) => {
        setContent(content);
        setActive(index);
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    };
    const callback = () => {

    };
    let isMobile;
    enquireScreen((b) => {
        isMobile = b;
    });
    console.log(isMobile, 'faq');
    return (
        <Box style={{ marginTop: 0 }}>
            <Container>
                <Row>
                    {isMobile
                        ? <Col lg={8} xl={8} xs={24} sm={24} style={{ padding: 0 }}>
                            <Sticky top={98} bottomBoundary="#content" innerZ={999999}>
                                <Collapse onChange={callback}>
                                    <Panel
                                        header={<p
                                            style={{
                                                color: '#D10000',
                                                margin: 0,
                                                marginLeft: 20,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Câu hỏi thường gặp
                                                </p>}
                                        key="1"
                                    >
                                        <List
                                            dataSource={faq}
                                            renderItem={(item, index) => (
                                                <SideBar>
                                                    <List.Item key={index} onClick={() => changeFAQ(item.content, index)} style={{ color: active === index ? 'red' : null }}>
                                                        {item.title}
                                                    </List.Item>
                                                </SideBar>
                                            )}
                                        />
                                    </Panel>
                                </Collapse>
                            </Sticky>
                          </Col>
                        : <Col lg={8} xl={8} xs={24} sm={24}>
                            <Sticky top={130} bottomBoundary="#content" innerZ={999999}>
                                <Card
                                    title={
                                        <p
                                            style={{
                                                color: '#D10000',
                                                margin: 0,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Câu hỏi thường gặp
                                        </p>
                                    }
                                    bodyStyle={{ padding: '10px 5px' }}
                                    bordered={false}
                                >
                                    <List
                                        dataSource={faq}
                                        renderItem={(item, index) => (
                                            <SideBar>
                                                <List.Item key={index} onClick={() => changeFAQ(item.content, index)} style={{ color: active === index ? 'red' : null }}>
                                                    {item.title}
                                                </List.Item>
                                            </SideBar>
                                        )}
                                    />
                                </Card>
                            </Sticky>
                          </Col>}
                    <Col lg={16} xl={16} xs={24} sm={24}>
                        <div id="content">
                            <Accordion>
                                <>
                                    {content.map((accordionItem, index) => (
                                            <AccordionItem
                                                className="accordion_item"
                                                key={`accordion-${index}`}
                                                expanded
                                            >
                                                <>
                                                    <AccordionTitle className="accordion_title">
                                                        <>
                                                            <Heading content={`Câu hỏi ${index + 1}. ${accordionItem.ques}`} style={{ fontSize: 15, textAlign: 'justify' }} />
                                                            <IconWrapper>
                                                                <OpenIcon>
                                                                    <Icon icon={minus} size={18} />
                                                                </OpenIcon>
                                                                <CloseIcon>
                                                                    <Icon icon={plus} size={18} />
                                                                </CloseIcon>
                                                            </IconWrapper>
                                                        </>
                                                    </AccordionTitle>
                                                    <AccordionBody className="accordion_body">
                                                        <div
                                                            style={{ marginTop: 20, textAlign: 'justify', fontSize: 'calc(0.8em + 0.3vw)' }}
                                                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(accordionItem.ans) }}
                                                        />
                                                    </AccordionBody>
                                                </>
                                            </AccordionItem>
                                        ))}
                                </>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Box>
    );
};

CauHoi.defaultProps = {
    description: {
        fontSize: `${3}`,
        color: 'textColor',
        lineHeight: '1.75',
        mb: `${0}`,
    },
};

export default CauHoi;
