// @ts-nocheck
import styled from "styled-components";
const SectionWrapper = styled.section`
  &.vbcc-inter,
  &.vbcc-inter *:not(.anticon) {
    font-family: 'Inter', sans-serif;
  }

  .vbcc-form .ant-form-item-row {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    flex-wrap: nowrap !important;
  }
  .vbcc-form .ant-form-item-label {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 0 4px !important;
    text-align: left !important;
    flex: none !important;
  }
  .vbcc-form .ant-form-item-control {
    width: 100% !important;
    max-width: 100% !important;
    flex: none !important;
  }

  @media (max-width: 990px) {
    padding: 80px 0 40px 0;
  }
  @media (max-width: 575px) {
    padding: 0px 0 20px 0;
  }
  @media (max-width: 360px) {
    margin: 36px 0 -65px 0;
  }
  @keyframes ScaleInUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .update-screen-tab {
    border: 0;
    overflow: initial;
    .rc-tabs-ink-bar {
      display: none !important;
    }
    .rc-tabs-bar {
      height: 56px;
      border: 1px;
      background-color: #ffffff;
      color: #e7e8eb;
    }
    .rc-tabs-nav-container {
      margin-bottom: 45px;
      @media (max-width: 767px) {
        margin-bottom: 30px;
      }
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ffffff;
        display: block;
        left: 0;
        bottom: 0;
        z-index: -1;
      }
      &:not(.rc-tabs-nav-container-scrolling) {
        .rc-tabs-nav-scroll {
          width: 100%;
          text-align: center;
          .rc-tabs-nav {
            float: none;
            display: block;
            .rc-tabs-tab {
              width: 50%;
              display: inline-block;
              float: none;
            }
          }
        }
      }
      .rc-tabs-tab {
        font-size: 18px;
        width: 277px;
        border: solid 1px #c01718;
        background-color: #ffff;
        color: #c01718;
        font-weight: 400;
        min-width: 230px;
        padding: 8px 8px;
        margin: auto;
        text-align: center;
        margin-right: 0;
        transition: 0.25s ease-in-out;
        &:hover {
          color: #ff4362;
        }
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          display: block;
          @media (max-width: 767px) {
            display: none;
          }
        }
        &:after {
          background: #ffff;
          transform: scaleX(0);
          transform-origin: right center 0;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
        }
        &.rc-tabs-tab-active {
          color: #ffff;
          background-color: #c01718;

          &:after {
            color: #ffff;
            transform: scaleX(1);
            transform-origin: left center 0;
            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
          }
        }
        > div {
          margin-right: 8px;
        }
        @media (max-width: 1199px) {
          font-size: 16px;
          /* padding: 0 0 20px 0; */
          min-width: 170px;
        }
        @media (max-width: 990px) {
          min-width: auto;
          /* padding: 0 20px 15px 20px; */
        }
        @media (max-width: 767px) {
          font-size: 14px;
          svg {
            width: 20px;
          }
        }
      }
    }
    .rc-tabs-content {
      color: #e7e8eb;
      .rc-tabs-tabpane {
        /* border-radius: 10px; */
        background-color: #e7e8eb;
        overflow: hidden;
        box-shadow: 0px 0px 0px 0px rgba(27, 67, 111, 0.15);
        &.rc-tabs-tabpane-active {
          /* animation: 0.7s ScaleInUp; */
        }
        > img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }

  .rc-tabs-tab-prev-icon,
  .rc-tabs-tab-next-icon {
    font-size: 20px;
    color: #ff4362;
    line-height: 1;
    display: block;
  }
  .rc-tabs-tab-prev,
  .rc-tabs-tab-next {
    display: flex;
    align-items: center;
  }
  .rc-tabs-tab-prev-icon,
  .rc-tabs-tab-next-icon {
    margin: 0 auto;
  }
`;

export default SectionWrapper;
