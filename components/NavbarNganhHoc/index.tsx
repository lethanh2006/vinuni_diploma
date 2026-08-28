// @ts-nocheck
//
import { Menu } from "antd";
import Box from "components/Box";
import Container from "components/UI/Container";
import Link from "next/link";
import React from "react";
import Sticky from "react-stickynode";
import { MenuDiv, MenuItem, Style } from "./navbarNganhHoc.style";
import { useMediaQuery } from "react-responsive";

class Navbar extends React.Component {
  state = {
    current: "mail",
    stickyTop: 190,
  };

  handleResize = () => {
    console.log(window.innerWidth, "resize");
    if (window.innerWidth >= 710) {
      this.setState({ stickyTop: 190 });
    } else if (window.innerWidth >= 410) {
      this.setState({ stickyTop: 88 });
    } else if (window.innerWidth >= 392) {
      this.setState({ stickyTop: 88 });
    } else if (window.innerWidth >= 324) this.setState({ stickyTop: 88 });
    else {
      this.setState({ stickyTop: 88 });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { maNganh, monTinChi } = this.props;
    console.log(this.props, "props id ma nganh");
    const { SubMenu } = Menu;
    // const isMobile = useMediaQuery({
    //   query: "(max-device-width: 500px)",
    // });
    // console.log(this.props?.monTinChi?.[0].tenChuyenNganh, 'name');
    return (
      <Box>
        <Sticky
          top={this.state.stickyTop}
          bottomBoundary="#content"
          innerZ={99999}
        >
          <Style>
            <Container>
              <MenuDiv>
                <Menu
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                  // style={{ fontSize: 'calc(0.6em + 0.4vw)', padding: '15px 0' }}
                >
                  {this.props?.data?.map(({ name, url }) => {
                    if (
                      name === "Cấu trúc chương trình" &&
                      this.props?.monTinChi?.[0].tenChuyenNganh !== ""
                    ) {
                      return (
                        <SubMenu
                          title={
                            <span
                              style={{
                                color: "white",
                                fontSize: 16,
                              }}
                            >
                              Cấu trúc chương trình
                            </span>
                          }
                          style={{
                            backgroundColor: "red",
                            // margin: '10px 0',
                          }}
                        >
                          {this.props?.monTinChi.map(
                            ({ tenChuyenNganh, anchor }) => (
                              <Menu.Item
                                key={tenChuyenNganh}
                                style={{ fontSize: 16, padding: 8 }}
                              >
                                <Link legacyBehavior
                                  href={`/nganhhoc/[idMaNganh]#${anchor}`}
                                  as={`/nganhhoc/${maNganh}#${anchor}`}
                                >
                                  <a>
                                    {/* <Icon type="file-protect" /> */}
                                    {tenChuyenNganh}
                                  </a>
                                </Link>
                              </Menu.Item>
                            )
                          )}
                        </SubMenu>
                      );
                    } else {
                      return (
                        <MenuItem key={name} style={{ backgroundColor: "red" }}>
                          <Link legacyBehavior
                            href={`/nganhhoc/[idMaNganh]${url}`}
                            as={`/nganhhoc/${maNganh}${url}`}
                          >
                            <a style={{ color: "white", fontSize: 16 }}>
                              {/* <Icon type="file-protect" /> */}
                              {name}
                            </a>
                          </Link>
                        </MenuItem>
                      );
                    }
                  })}
                </Menu>
              </MenuDiv>
            </Container>
          </Style>
        </Sticky>
      </Box>
    );
  }
}

export default Navbar;
