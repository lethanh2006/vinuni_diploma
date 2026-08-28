// @ts-nocheck
import Link from 'next/link';
import React, { PureComponent } from 'react';
import { CardImgWrapper, WrapperImg } from './Card.style';

class CardTinTuc extends PureComponent {
	render() {
		const { title, img, time, styles, src, play, href } = this.props;
		const ellipse = (text) => {
			let s = '';
			for (let i = 0; i < 50; i++) {
				s += text[i];
			}
			s += '...';
			return s;
		};
		return (
			<Link legacyBehavior href="/tintuc/[pid]" as={'/tintuc/' + href}>
				<a>
					<div
						style={{
							...styles,
							backgroundColor: 'white',
							borderRadius: '20px',
							borderColor: 'grey',
						}}
					>
						<CardImgWrapper>
							<WrapperImg>
								<div
									style={{
										borderRadius: 20,
										borderBlockColor: 'grey',
										width: 'inherit',
										cursor: 'pointer',
										backgroundImage: `url('${img}')`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										backgroundPosition: 'center center',
										position: 'absolute',
										left: 0,
										top: 0,
										right: 0,
										bottom: 0
									}}
								/>
							</WrapperImg>
						</CardImgWrapper>
						<div
							style={{
								width: 'inherit',
								height: '150px',
								textAlign: 'center',
								padding: '20px 10px',
								backgroundColor: 'white',
								borderRadius: '0 0 20px 20px'
							}}
						>
							<h6
								style={{
									fontSize: 18,
									margin: 0,
									marginBottom: 10,
									color: 'black',
									height: 120,
									overflow: 'hidden',
									fontWeight: 400
								}}
							>
								{title.length < 80 ? title : ellipse(title)}
							</h6>
						</div>
					</div>
				</a>
			</Link>
		);
	}
}

export default CardTinTuc;
