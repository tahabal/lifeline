import React, { Component } from "react";
import { Layout, Spin, Empty } from "antd";
import { observer, inject } from "mobx-react";

import Panel from "./Panel";
import AddPanel from "./Add";

const { Content } = Layout;

class Container extends Component {
  render() {
    let renderPanels =
      this.props.store.data.length > 0 ? (
        this.props.store.data.map(item => {
          return <Panel data={item} key={item.id} />;
        })
      ) : (
        <Empty description={<span>No entries found.</span>} />
      );

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
            {!this.props.store.loading &&
              !this.props.store.newEntryMode &&
              renderPanels}
            {!this.props.store.loading && this.props.store.newEntryMode && (
              <AddPanel />
            )}
          </div>
        </Content>
      </Spin>
    );
  }
}

Container = inject("store")(observer(Container));
export default Container;
