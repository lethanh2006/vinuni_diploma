// @ts-nocheck
// eslint-disable-next-line react/prefer-stateless-function
import { Button, Modal } from 'antd';
import ImgDN1 from 'assets/image/imageDoiNgu1.png';
import { enquireScreen } from 'enquire-js';
import React, { PureComponent } from 'react';
import { CardImgWrapper, WrapperImg } from './Card.style';
import { sanitizeHtml } from "components/Utils/htmlSecurity";

let isMobile;
enquireScreen((b) => {
	isMobile = b;
});

class CardTinTuc extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	playVideo = () => { };

	handleModal = () => {
		this.setState({ visible: !this.state.visible });
	};

	render() {
		const { title, img, time, styles, src, play, moTa, noiDung } = this.props;
		const { visible } = this.state;
		const widthModal = 1000;
		const ellipse = (text) => {
			let s = '';
			for (let i = 0; i < 70; i++) {
				s += text[i];
			}
			s += '...';
			return s;
		};
		return (
			<div style={{ ...styles, backgroundColor: 'white', width: '100%' }}>
				<CardImgWrapper>
					<WrapperImg>
						<div
							style={{
								width: 'inherit',
								height: 'inherit',
								cursor: 'pointer',
								backgroundImage: `url(${ImgDN1})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
								position: 'absolute',
								left: 0,
								top: 0,
								right: 0,
								bottom: 0
							}}
							onClick={this.handleModal}
						/>
					</WrapperImg>
					{play && (
						<img
							src={play}
							style={{ position: 'absolute', top: '40%', left: '45%', cursor: 'pointer' }}
							onClick={this.handleModal}
							alt=""
						/>
					)}
				</CardImgWrapper>
				<div
					style={{
						width: 'inherit',
						height: '120px',
						textAlign: 'justify',
						padding: '20px 10px 10px 10px',
						backgroundColor: 'white'
					}}
				>
					<h5
						style={{
							fontSize: 22,
							margin: 0,
							marginBottom: 12,
							color: 'black',
							height: 84,
							overflow: 'hidden'
						}}
					>
						{title.length < 70 ? title : ellipse(title)}
					</h5>
				</div>
				<Modal
					open={visible && play}
					width={isMobile ? '90%' : '70%'}
					title={title}
					onCancel={this.handleModal}
					centered
					maskClosable={false}
					zIndex={9999}
					footer={[
						<Button key="back" onClick={this.handleModal}>
							Đóng
						</Button>
					]}
					destroyOnClose
				>
					{moTa !== '' ? <p>{moTa}</p> : null}
					{/* Nội Dung */}
					<div
						style={{ marginTop: 20, textAlign: 'center', fontSize: 'calc(0.8em + 0.4vw)' }}
						dangerouslySetInnerHTML={{ __html: sanitizeHtml(noiDung) }}
					/>
				</Modal>
			</div>
		);
	}
}

export default CardTinTuc;
