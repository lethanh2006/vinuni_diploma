// @ts-nocheck
import { CloseCircleOutlined } from "@ant-design/icons";
import { Menu, notification } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Wrapper } from "./index.style";

const { Item, SubMenu } = Menu;

const ScrollSpyMenu = ({
  onClose,
  isDesktop,
  className,
  menuItems,
  drawerClose,
  ...props
}) => {
  // empty array for scrollspy items
  const scrollItems = [];
  const { Item } = Menu;
  // convert menu path to scrollspy items
  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  // Add all classs to an array
  const addAllClasses = ["scrollspy__menu"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // Close drawer when click on menu item

  const thiTA = () => {
    notification.open({
      message: "Chức năng đang trong quá trình phát triển",
      placement: "bottomRight",
      icon: <CloseCircleOutlined style={{ color: "red" }} />,
    });
  };

  const tuyenSinh = () => {
    window.open("https://tuyensinh.ptit.edu.vn/");
  };

  return (
    // <Scrollspy
    //   items={scrollItems}
    //   className={addAllClasses.join(' ')}
    //   drawerClose={drawerClose}
    //   {...props}
    // >
    //   {menuItems.map((menu, index) => (
    //     <li key={`menu-item-${index}`}>
    //       {menu.staticLink ? (
    //         <a href={menu.path}>{menu.label}</a>
    //       ) : (
    //           <>
    //             {menu.hover ? (
    //               <AntDropdown
    //                 overlay={menu.submenu}
    //                 placement="topLeft"
    //                 getPopupContainer={() => document.getElementById('nav-bar')}
    //               >
    //                 <a>{menu.label}</a>
    //               </AntDropdown>
    //             ) :
    //               <Link href={`/${menu.path}`}>
    //                 <a href={`/${menu.path}`}>{menu.label}</a>
    //               </Link>
    //             }
    //           </>
    //         )}
    //     </li>
    //   ))
    //   }
    // </Scrollspy >
    <Wrapper>
      <Menu
        mode={isDesktop ? "vertical" : "horizontal"}
        // mode="horizontal"
        onClick={onClose}
      >
        {menuItems.map((menu, index) => {
          console.log(menu, "menu");
          if (menu.submenu && menu.submenu.length > 0) {
            return (
              <SubMenu
                title={
                  <span
                    style={{
                      fontSize: isDesktop ? 14 : 18,
                      fontWeight: "bold",
                      color: "rgb(52, 61, 72)",
                    }}
                  >
                    {menu.label}
                  </span>
                }
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "rgb(52, 61, 72)",
                }}
              >
                {menu.submenu.map((e) => e)}
              </SubMenu>
            );
          }
          if (menu.redirect) {
            return (
              <Item>
                <Link legacyBehavior href={`${menu.path}`}>
                  <a
                    style={{
                      fontSize: isDesktop ? 14 : 18,
                      fontWeight: "bold",
                      color: "rgb(52, 61, 72)",
                    }}
                  >
                    {menu.label}
                  </a>
                </Link>
              </Item>
            );
          } else {
            return (
              <Item>
                <Link legacyBehavior href={`/${menu.path}`}>
                  <a
                    style={{
                      fontSize: isDesktop ? 14 : 18,
                      fontWeight: "bold",
                      color: "rgb(52, 61, 72)",
                    }}
                  >
                    {menu.label}
                  </a>
                </Link>
              </Item>
            );
          }
        })}
        {isDesktop && (
          <Item
            style={{
              fontSize: isDesktop ? 14 : 18,
              fontWeight: "bold",
              color: "rgb(52, 61, 72)",
            }}
            onClick={tuyenSinh}
          >
            TUYỂN SINH
          </Item>
        )}
      </Menu>
      {/* <Menu
        // onClick={this.handleClick}
        // selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item>
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item>Option 1</Menu.Item>
            <Menu.Item>Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item>Option 3</Menu.Item>
            <Menu.Item>Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item>
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu> */}
    </Wrapper>
  );
};

ScrollSpyMenu.propTypes = {
  /** className of the ScrollSpyMenu. */
  className: PropTypes.string,

  /** menuItems is an array of object prop which contain your menu
   * data.
   */
  menuItems: PropTypes.array.isRequired,

  /** Class name that apply to the navigation element paired with the content element in viewport. */
  currentClassName: PropTypes.string,

  /** Class name that apply to the navigation elements that have been scrolled past [optional]. */
  scrolledPastClassName: PropTypes.string,

  /** HTML tag for Scrollspy component if you want to use other than <ul/> [optional]. */
  componentTag: PropTypes.string,

  /** Style attribute to be passed to the generated <ul/> element [optional]. */
  style: PropTypes.object,

  /** Offset value that adjusts to determine the elements are in the viewport [optional]. */
  offset: PropTypes.number,

  /** Name of the element of scrollable container that can be used with querySelector [optional]. */
  rootEl: PropTypes.string,

  /**
   * Function to be executed when the active item has been updated [optional].
   */
  onUpdate: PropTypes.func,
};

ScrollSpyMenu.defaultProps = {
  componentTag: "ul",
  currentClassName: "is-current",
};

export default ScrollSpyMenu;

// (
//   // <AnchorLink href={menu.path} offset={menu.offset}>
//   //   {menu.label}
//   // </AnchorLink>
// <Link href={`/${menu.path}`}>
//   <a href={`/${menu.path}`}>{menu.label}</a>
// </Link>
// )
