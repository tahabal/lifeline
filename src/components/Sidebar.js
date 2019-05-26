import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { observer, inject } from "mobx-react";

const Sider = Layout.Sider;

class Sidebar extends Component {
  handleSelect = async item => {
    if (item.key === "ADD") {
      this.props.store.setNewEntryMode();
      return;
    }
    this.props.store.showLoader();
    const fauxLag = ms => new Promise(resolve => setTimeout(resolve, ms));
    await fauxLag(1000);

    this.props.store.handleMenu(item.key);
    this.props.store.hideLoader();
  };

  render() {
    return (
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#114aa1"
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["ALL"]}
          onClick={this.handleSelect}
          style={{ backgroundColor: "#114aa1" }}
        >
          <Menu.Item key="ALL">
            <Icon type="user" />
            <span className="nav-text">All</span>
          </Menu.Item>
          <Menu.Item key="REST">
            <Icon type="video-camera" />
            <span className="nav-text">REST</span>
          </Menu.Item>
          <Menu.Item key="SOAP">
            <Icon type="upload" />
            <span className="nav-text">SOAP</span>
          </Menu.Item>
          <Menu.Item key="ADD">
            <Icon type="upload" />
            <span className="nav-text">Create New Endpoint</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar = inject("store")(observer(Sidebar));

export default Sidebar;
