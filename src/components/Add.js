import React, { Component } from "react";
import {
  Input,
  Tag,
  Tooltip,
  Icon,
  Row,
  Col,
  Card,
  Typography,
  Switch,
  Button,
  Alert,
  notification
} from "antd";
import { observer, inject } from "mobx-react";
import JSONPretty from "react-json-pretty";

const { Text, Title, Paragraph } = Typography;
const TextArea = Input.TextArea;

class AddPanel extends Component {
  state = {
    name: "",
    owner: "",
    squad: "",
    endpoint: "",
    type: "REST",
    source: [],
    request: "",
    response: "",
    inputVisible: false,
    error: false,
    inputValue: ""
  };

  handleClose = removedTag => {
    const source = this.state.source.filter(tag => tag !== removedTag);
    console.log(source);
    this.setState({ source });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { source } = this.state;
    if (inputValue && source.indexOf(inputValue) === -1) {
      source = [...source, inputValue];
    }
    console.log(source);
    this.setState({
      source,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveInputRef = input => (this.input = input);

  handleInput = event => {
    if (this.state.error) {
      this.setState({ error: false, [event.target.name]: event.target.value });
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSwitch = event => {
    switch (event) {
      case true:
        this.setState({ type: "REST" });
        break;
      case false:
        this.setState({ type: "SOAP" });
        break;
      default:
        break;
    }
  };

  save = () => {
    const {
      name,
      owner,
      squad,
      endpoint,
      type,
      source,
      request,
      response
    } = this.state;

    let validation =
      name !== "" &&
      owner !== "" &&
      endpoint !== "" &&
      request !== "" &&
      response !== "";

    console.log(validation);

    switch (validation) {
      case true:
        const args = {
          message: "Successful",
          description: "New endpoint entry created!",
          duration: 0
        };
        notification.open(args);
        break;
      case false:
        this.setState({ error: true });
        break;
      default:
        break;
    }
  };

  render() {
    const { source, inputVisible, inputValue } = this.state;

    return (
      <Card title="Create New Endpoint" style={{ marginBottom: 20 }}>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={4}>
            <Paragraph>Name</Paragraph>
            <Input
              placeholder="Enter service name"
              onChange={this.handleInput}
              name="name"
            />
          </Col>
          <Col span={4}>
            <Paragraph>Owner</Paragraph>
            <Input
              placeholder="Enter owner name"
              onChange={this.handleInput}
              name="owner"
            />
          </Col>
          <Col span={4}>
            <Paragraph>Squad</Paragraph>
            <Input
              placeholder="Enter squad name"
              onChange={this.handleInput}
              name="squad"
            />
          </Col>
          <Col span={4}>
            <Paragraph>Type</Paragraph>
            <Switch
              checkedChildren="REST"
              unCheckedChildren="SOAP"
              defaultChecked
              name="type"
              onClick={this.handleSwitch}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Paragraph>Endpoint</Paragraph>
            <Input
              placeholder="Enter endpoint URL"
              onChange={this.handleInput}
              name="endpoint"
            />
          </Col>
          <Col span={12}>
            {this.state.type === "REST" && (
              <>
                <Paragraph>Sources</Paragraph>
                <div>
                  {source.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={true}
                        onClose={() => this.handleClose(tag)}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: "#fff", borderStyle: "dashed" }}
                    >
                      <Icon type="plus" /> New Source
                    </Tag>
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={4}>Request</Title>
            <TextArea
              placeholder="Copypaste the example request"
              autosize
              name="request"
              onChange={this.handleInput}
            />
          </Col>
          <Col span={12}>
            <Title level={4}>Response</Title>
            <TextArea
              placeholder="Copypaste the example response"
              autosize
              name="response"
              onChange={this.handleInput}
            />
          </Col>
        </Row>
        {this.state.error && (
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col span={24}>
              <Alert
                message="Please fill the required areas."
                type="error"
                showIcon
              />
            </Col>
          </Row>
        )}
        <Row gutter={16} type="flex" justify="end">
          <Col span={3}>
            <div style={{ paddingHorizontal: 8, textAlign: "right" }}>
              <Button
                type="primary"
                icon="upload"
                size="large"
                onClick={this.save}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
AddPanel = inject("store")(observer(AddPanel));
export default AddPanel;
