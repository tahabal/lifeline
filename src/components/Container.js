import React, { Component } from "react";
import { Layout, Spin } from "antd";
import { observer, inject } from "mobx-react";

import Panel from "./Panel";

const { Content } = Layout;

class Container extends Component {
  render() {
    const renderPanels = this.props.store.data.map(item => {
      return <Panel data={item} key={item.id} />;
    });

    return (
      <Spin
        tip="Yükleniyor..."
        spinning={this.props.store.loading}
        wrapperClassName="maxH"
        style={{ maxHeight: 10000 }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial"
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100%"
            }}
          >
            {!this.props.store.loading && renderPanels}
          </div>
        </Content>
      </Spin>
    );
  }
}

Container = inject("store")(observer(Container));
export default Container;
