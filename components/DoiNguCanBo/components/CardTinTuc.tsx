// @ts-nocheck
import Link from 'next/link';
import React, { PureComponent } from 'react';
import { CardImgWrapper, WrapperImg } from './Card.style';

class CardTinTuc extends PureComponent {
  render() {
    const { title, img, time, styles, src, play, href } = this.props;
    const ellipse = text => {
      let s = '';
      for (let i = 0; i < 70; i++) {
        s += text[i];
      }
      s += '...';
      return s;
    };
    return (
      <Link legacyBehavior href="/tintuc/[pid]" as={'/tintuc/' + href}>
        <a>
          <div style={{ ...styles, backgroundColor: 'white', width: '100%' }}>
            <CardImgWrapper>
              <WrapperImg>
                <div
                  style={{
                    width: 'inherit',
                    backgroundImage: `url('${img}')`,
                    backgroundRepeat: 'no-repeat',
                    // backgroundSize: '70% 60%',
                    backgroundPosition: 'center center',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </WrapperImg>
            </CardImgWrapper>
            <div
              style={{
                width: 'inherit',
                // height: '120px',
                textAlign: 'center',
                // padding: '20px 10px 10px 10px',
                backgroundColor: 'white',
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
                {this.props.children}
              </h6>
              {/* {title.length < 70 ? title : ellipse(title)} */}

            </div>
          </div>
        </a>
      </Link>
    );
  }
}

export default CardTinTuc;
