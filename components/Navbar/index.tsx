// @ts-nocheck
import { useRouter } from "next/router";
import { Button, Col, Drawer, Menu, Row, Dropdown } from "antd";
import axios from "axios";
import Box from "components/Box";
import ScrollSpyMenu from "components/ScrollSpyMenu";
import { ip } from "data/ip";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Container from "./ContainerMenu/index";
import NavbarWrapper from "./Navbar";
import { Image } from "./Navbar/navbar.style";
import { useTranslation } from "components/Utils/useTranslation";

const { Item, SubMenu } = Menu;

const NavbarOuter = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.scrolled ? "rgba(0, 0, 0, 0.501961)" : "transparent"};
  box-shadow: ${props => props.scrolled ? "0px 4px 10px rgba(0, 0, 0, 0.15)" : "none"};
  transition: background 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  font-family: 'Montserrat', sans-serif;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 100px 12px;
  gap: 2px;
  width: 100%;
  max-width: 1438px;
  height: 104px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 20px 12px;
    gap: 12px;
    height: auto;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  height: 24px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const PortalLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const PortalLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
    color: #ffffff;
    text-decoration: none;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Divider = styled.span`
  display: inline-block;
  width: 0;
  height: 13px;
  border-left: 1px solid #ffffff;
  opacity: 1;
`;

const LangSwitcher = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  height: 24px;
  flex-shrink: 0;
`;

const LangBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 32px;
  height: 24px;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  transition: background 0.2s, color 0.2s;

  &.active {
    background: #c72127;
    color: #ffffff;
  }

  &.inactive {
    background: transparent;
    color: #134d8b;
  }
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  height: 50px;

  @media (max-width: 768px) {
    height: 44px;
  }
`;

const LogoArea = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`;

const LogoImg = styled.img`
  width: 244px;
  height: 50px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 210px;
    height: 44px;
  }
`;



export function Format(str) {
  if (!str) return "";
  return str
    .toString()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/\s/g, "");
}

export const AWrapper = styled.a`
  color: #000000 !important;
  height: 80px !important;
  padding: 10px 20px !important;
  &:hover {
    color: #eb4d4b !important;
    background-color: yellow !important;
  }
`;

export const ItemAntd = styled(Item)`
  & li {
    padding-left: 40px !important;
  }
  & a {
    color: rgb(52, 61, 72);
  }
  &:hover a::before {
    color: #ff3d3b !important;
    content: "";
  }
`;



const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const router = useRouter();
  const { t, locale, changeLocale } = useTranslation();
  const isDesktop = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const languageMenu = (
    <Menu onClick={({ key }) => changeLocale(key)} style={{ padding: "8px 0" }}>
      <Menu.Item key="vi-VN" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px" }}>
        <img src="/assets/image/locales/vi-VN.svg" width={28} height={18} alt="vi" style={{ objectFit: "cover", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
        <span style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>Tiếng Việt (vi-VN)</span>
      </Menu.Item>
      <Menu.Item key="en-US" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px" }}>
        <img src="/assets/image/locales/en-US.svg" width={28} height={18} alt="en" style={{ objectFit: "cover", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
        <span style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>English (en-US)</span>
      </Menu.Item>
    </Menu>
  );

  const [daotao, setDaotao] = useState([]);
  const [loaitintuc, setLoaiTinTuc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async function wrapFunc() {
      setLoading(false);
      const response = await axios.get(`${ip}/he-dao-tao`, {
        params: { page: 1, limit: 1000 },
      });
      const ctrDaoTao = _.get(response, "data.data", []);
      setDaotao(ctrDaoTao);
    })();
  }, []);

  useEffect(() => {
    (async function wrapFunc() {
      setLoading(false);
      const response = await axios.get(`${ip}/loai-bai-viet`, {
        params: {
          page: 1,
          limit: 1000,
          cond: {
            $and: [
              { maLoai: { $regex: "DAO_TAO_TIN_TUC_" } },
              { maLoai: { $ne: "DAO_TAO_TIN_TUC_BA_CONG_KHAI" } },
              { maLoai: { $ne: "DAO_TAO_TIN_TUC_LICH_THI_TA" } },
              { maLoai: { $ne: "DAO_TAO_TIN_TUC_DINH_HUONG" } },
            ],
          },
        },
      });
      const list = _.get(response, "data.data", []);
      setLoaiTinTuc(list);
    })();
  }, []);

  const tintucDesk = () => {
    let tun = [];
    loaitintuc?.map((item) => {
      tun.push(
        <Item
          onClick={() => {
            router.replace(`/tintucchung#${Format(item?.maLoai)}`);
            if (router.pathname === "/tintucchung") {
              router.reload();
            }
          }}
        >
          <a style={{ fontSize: isDesktop ? 14 : 18 }}>{item?.tenLoai}</a>
        </Item>,
      );
    });
    return tun;
  };

  const daotaoDesk = () => {
    let res = [];
    daotao.map((item) => {
      res.push(
        <SubMenu
          title={
            <span style={{ fontSize: isDesktop ? 14 : 18 }}>
              {item?.tenHeDaoTao ?? ""}
            </span>
          }
        >
          {item.nganhDaoTao.map((e, ind) => (
            <Item>
              <Link legacyBehavior href={`/nganhhoc/${e?.maNganh ?? ""}`}>
                <a style={{ fontSize: isDesktop ? 14 : 18 }}>
                  {e?.tenNganh ?? ""}
                </a>
              </Link>
            </Item>
          ))}
        </SubMenu>,
      );
    });
    return res;
  };

  let MENU_ITEMS = [
    { label: t("menu.home"), path: "#", offset: "70" },
    {
      hover: true,
      label: t("menu.general_intro"),
      path: "#",
      offset: "70",
      submenu: [
        <Item>
          <Link legacyBehavior href="/doinguchitiet">
            <a style={{ fontSize: isDesktop ? 14 : 18 }}>{t("menu.staff")}</a>
          </Link>
        </Item>,
        <Item>
          <Link legacyBehavior href="/chucnangnhiemvu">
            <a style={{ fontSize: isDesktop ? 14 : 18 }}>{t("menu.functions")}</a>
          </Link>
        </Item>,
        <Item>
          <Link legacyBehavior href="/quychequydinh">
            <a style={{ fontSize: isDesktop ? 14 : 18 }}>{t("menu.regulations")}</a>
          </Link>
        </Item>,
      ],
    },
    { label: t("menu.news"), path: "tintucchung" },
    { label: t("menu.admission_plan"), path: "deantuyensinh" },
    {
      label: t("menu.admission"),
      path: "https://tuyensinh.ptit.edu.vn/",
      offset: "70",
      redirect: true,
      submenu: [
        <Item>
          <a
            style={{ fontSize: isDesktop ? 14 : 18 }}
            onClick={() => window.open("https://tuyensinh.ptit.edu.vn/")}
          >
            {t("menu.admission_news")}
          </a>
        </Item>,
        <Item>
          <Link legacyBehavior href="/chungchi">
            <a
              style={{ fontSize: isDesktop ? 14 : 18 }}
              onClick={() => window.open("https://tuyensinh.ptit.edu.vn/")}
            >
              {t("menu.admission_scheme")}
            </a>
          </Link>
        </Item>,
      ],
    },
    {
      hover: true,
      label: t("menu.training_program"),
      path: "#",
      offset: "70",
      submenu: daotaoDesk(),
    },
    {
      label: t("menu.lookup"),
      path: "#",
      offset: "70",
      submenu: [
        <Item>
          <a
            style={{ fontSize: isDesktop ? 14 : 18 }}
            onClick={() => window.open("https://tracuuvanbang.ptit.edu.vn/")}
          >
            {t("menu.lookup_diploma")}
          </a>
        </Item>,
        <Item>
          <Link legacyBehavior href="/chungchi">
            <a style={{ fontSize: isDesktop ? 14 : 18 }}>{t("menu.lookup_english")}</a>
          </Link>
        </Item>,
      ],
    },
    { label: t("menu.three_publics"), path: "bacongkhai", offset: "70" },
  ];

  const handleClick = () => { };
  const closeDrawer = () => setShowDrawer(false);
  const openDrawer = () => setShowDrawer(true);

  const isEN = locale === "en-US";

  const LangSwitch = () => (
    <LangSwitcher>
      <LangBtn
        className={isEN ? "active" : "inactive"}
        onClick={() => changeLocale("en-US")}
        style={{ borderRadius: "4px 0 0 4px" }}
      >
        EN
      </LangBtn>
      <LangBtn
        className={!isEN ? "active" : "inactive"}
        onClick={() => changeLocale("vi-VN")}
        style={{ borderRadius: "0 4px 4px 0" }}
      >
        VI
      </LangBtn>
    </LangSwitcher>
  );

  const NavShell = () => (
    <NavbarOuter scrolled={scrolled}>
      <InnerWrap>
        <TopRow>
          <PortalLinks>
            <PortalLink href="https://vinuni.edu.vn" target="_blank" rel="noreferrer">
              {t("footer.ve_vinuni")}
            </PortalLink>
            <Divider />
            <PortalLink
              href={isEN
                ? "https://vinuni.edu.vn/academics/home/"
                : "https://vinuni.edu.vn/vi/academics/dao-tao/"}
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.academic")}
            </PortalLink>
            <Divider />
            <PortalLink
              href={isEN
                ? "https://admissions.vinuni.edu.vn/"
                : "https://admissions.vinuni.edu.vn/vi/trang-chu/"}
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.admission")}
            </PortalLink>
          </PortalLinks>

          <LangSwitch />
        </TopRow>

        <BottomRow>
          <LogoArea href="/">
            <LogoImg
              src="/assets/image/textngang.svg"
              alt="VinUni Logo"
            />
          </LogoArea>
        </BottomRow>
      </InnerWrap>
    </NavbarOuter>
  );

  return <NavShell />;
};

export default Navbar;
