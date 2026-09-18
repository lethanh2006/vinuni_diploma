// @ts-nocheck
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Container from 'components/UI/Container';
import { sanitizeHtml } from "components/Utils/htmlSecurity";
import {
  GoTo, TitleHTML,
  WrapperCard
} from './CardHTML.style';


export function TongQuan({ tongQuan }) {
  console.log(tongQuan, 'card html')
  return (
    <Container>
      <GoTo id="tongquan" style={{ padding: '10px' }}/>
      <WrapperCard order="first">
        <TitleHTML>Tổng quan</TitleHTML>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(tongQuan) }} />
      </WrapperCard>
    </Container>
  );
}

export function ChuanDauRa({ chuanDauRa }) {
  return (
    <WrapperCard type="grey" style={{ paddingBottom: '0px' }}>
      <GoTo id="chuandaura" />
      <Container>
        <TitleHTML>Chuẩn đầu ra </TitleHTML>
        <div style={{ width: '100%', textAlign: 'justify' }}>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(chuanDauRa) }} />
        </div>
      </Container>
    </WrapperCard>
  );
}

export function TrienVongNgheNghiep({ ngheNghiep }) {
  return (
    <WrapperCard style={{ padding: '0px' }}>
      <GoTo id="nghenghiep" />

      <Container>
        <TitleHTML>Triển vọng nghề nghiệp </TitleHTML>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(ngheNghiep) }} />
      </Container>
    </WrapperCard>
  );
}

export function HocPhi({ hocPhi }) {
  return (
    <WrapperCard type="grey">
      <GoTo id="hocphi" />
      <Container>
        <TitleHTML>Học phí</TitleHTML>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(hocPhi) }} />
      </Container>
    </WrapperCard>
  );
}

export function DieuienTuyenSinh({ dieuKienTuyenSinh }) {
  return (
    <WrapperCard >
      <GoTo id="dieukientuyensinh" />

      <Container>
        <TitleHTML>Điều kiện tuyển sinh</TitleHTML>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(dieuKienTuyenSinh) }} />
      </Container>
    </WrapperCard>
  );
}
