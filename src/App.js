import React, { Component } from "react";
import { Layout } from "antd";
import { observer, inject } from "mobx-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";

class App extends Component {
  async componentDidMount() {
    console.log(this.props);
    this.props.store.showLoader();
    this.props.store.fetchData();

    const fauxLag = ms => new Promise(resolve => setTimeout(resolve, ms));
    await fauxLag(1000);

    this.props.store.hideLoader();
  }

  render() {
    return (
      <Layout>
        <Sidebar />
        <Layout style={{ marginLeft: 200, display: "flex", height: "100vh" }}>
          <Header />
          <Container />
        </Layout>
      </Layout>
    );
  }
}

App = inject("store")(observer(App));

export default App;
