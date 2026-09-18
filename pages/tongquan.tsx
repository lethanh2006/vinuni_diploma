// @ts-nocheck
/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import {
 Card, Col, Collapse, List, Row,
} from 'antd';
import Container from 'components/UI/Container';
import { tongquan } from 'data/faq';
import { enquireScreen } from 'enquire-js';
import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import Box from 'components/Box';
import { SideBar } from '../styles/faq.style';
import { sanitizeHtml } from "components/Utils/htmlSecurity";

const { Panel } = Collapse;

const TongQuanHocVien = () => {
	const [content, setContent] = useState(tongquan[0].content);
	const [active, setActive] = useState(0);
	const changeFAQ = (content, index) => {
		setContent(content);
		setActive(index);
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};
	const callback = () => {};
	let isMobile;
	enquireScreen((b) => {
		isMobile = b;
	});
	console.log(isMobile, 'tongquan');
	return (
		<Box style={{ marginTop: 0 }}>
			<Container>
				<Row>
					{isMobile ? (
						<Col lg={6} xl={6} xs={24} sm={24} style={{ padding: 0 }}>
							<Sticky top={98} bottomBoundary="#content" innerZ={999999}>
								<Collapse onChange={callback}>
									<Panel
										header={
											<p
												style={{
													color: '#D10000',
													margin: 0,
													marginLeft: 20,
													fontSize: 20,
													fontWeight: 'bold',
												}}
											>
												Tổng quan Học viện
											</p>
										}
										key="1"
									>
										<List
											dataSource={tongquan}
											renderItem={(item, index) => (
												<SideBar>
													<List.Item
														key={index}
														// onClick={() => changeFAQ(item.content, index)}
														style={{ color: active === index ? 'red' : null }}
													>
														{item.title}
													</List.Item>
												</SideBar>
											)}
										/>
									</Panel>
								</Collapse>
							</Sticky>
						</Col>
					) : (
						<Col lg={6} xl={6} xs={24} sm={24}>
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
											Tổng quan Học viện
										</p>
									}
									bodyStyle={{ padding: '10px 5px' }}
									bordered={false}
								>
									<List
										dataSource={tongquan}
										renderItem={(item, index) => (
											<SideBar>
												<List.Item
													key={index}
													onClick={() => changeFAQ(item.content, index)}
													style={{ color: active === index ? 'red' : null }}
												>
													{item.title}
												</List.Item>
											</SideBar>
										)}
									/>
								</Card>
							</Sticky>
						</Col>
					)}
					<Col lg={18} xl={18} xs={24} sm={24}>
						<div id="content">
							{content}
							{/* <Accordion>
                                <>
                                    {content.map((item, index) => {
                                        return (
                                            <AccordionItem
                                                className="accordion_item"
                                                key={`accordion-${index}`}
                                                expanded
                                            >
                                                <>
                                                    <AccordionTitle className="accordion_title">
                                                        <>
                                                            <Heading content={`Câu hỏi ${index + 1}. ` + accordionItem.ques} style={{ fontSize: 15, textAlign: 'justify' }} />
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
                                                        {content}
                                                    </AccordionBody>
                                                </>
                                            </AccordionItem>
                                        );
                                    })}
                                </>
                            </Accordion> */}
						</div>
					</Col>
				</Row>
			</Container>
		</Box>
	);
};

TongQuanHocVien.defaultProps = {
	description: {
		fontSize: `${3}`,
		color: 'textColor',
		lineHeight: '1.75',
		mb: `${0}`,
	},
};

export default TongQuanHocVien;
