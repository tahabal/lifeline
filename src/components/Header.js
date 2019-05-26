import React, { Component } from "react";
import { Layout, Input, Row, Col, Icon } from "antd";
import { observer, inject } from "mobx-react";

const Head = Layout.Header;

class Header extends Component {
  handleChange = event => {
    this.props.store.handleSearch(event.target.value);
  };

  render() {
    return (
      <Head style={{ backgroundColor: "#114aa1" }}>
        <Row gutter={16} justify="end" type="flex">
          <Col span={6}>
            <Input
              placeholder="Search"
              disabled={this.props.store.newEntryMode}
              suffix={
                <Icon type="search" style={{ color: "rgba(0,0,0,.45)" }} />
              }
              value={this.props.store.searchKeyword}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </Head>
    );
  }
}

Header = inject("store")(observer(Header));

export default Header;
