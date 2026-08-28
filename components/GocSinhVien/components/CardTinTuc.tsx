// @ts-nocheck
import Link from 'next/link';
import React, { PureComponent } from 'react';
import { CardImgWrapper, WrapperImg } from './Card.style';

class CardTinTuc extends PureComponent {
  render() {
    const { title, img, time, styles, src, play, href } = this.props;
    const ellipse = text => {
      let s = '';
      for (let i = 0; i < 40; i++) {
        s += text[i];
      }
      s += '...';
      return s;
    };
    return (
      <Link legacyBehavior href="/tintucGSV/[pid]" as={'/tintucGSV/' + href}>
        <a>
          <div style={{ ...styles, backgroundColor: 'white', width: '100%', borderRadius: '20px' }}>
            <CardImgWrapper>
              <WrapperImg>
                <div
                  style={{
                    borderRadius: 20,
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
                    bottom: 0,
                    borderRadius: '20px',
                  }}
                />
              </WrapperImg>
            </CardImgWrapper>
            <div
              style={{
                width: 'inherit',
                height: '120px',
                textAlign: 'justify',
                padding: '20px 10px 10px 10px',
                backgroundColor: 'white',
                borderRadius: '0 0 20px 20px',
              }}
            >
              <h6
                style={{
                  fontSize: 18,
                  margin: 0,
                  marginBottom: 12,
                  color: 'black',
                  height: 84,
                  overflow: 'hidden',
                  fontWeight: 400,
                }}
              >
                {title.length < 40 ? title : ellipse(title)}
              </h6>
            </div>
          </div>
        </a>
      </Link>
    );
  }
}

export default CardTinTuc;
