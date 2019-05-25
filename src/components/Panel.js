import React from "react";
import { Statistic, Icon, Row, Col, Card, Typography } from "antd";
import JSONPretty from "react-json-pretty";

const { Text, Title, Paragraph } = Typography;

const Panel = props => {
  console.log(props);
  const {
    id,
    name,
    owner,
    squad,
    endpoint,
    type,
    source,
    request,
    response,
    isOnline,
    lastCallLatency,
    dailyAverageLatency,
    weeklyAverageLatency,
    monthlyAverageLatency,
    dailyDowntime,
    weeklyDowntime,
    monthlyDowntime
  } = props.data;

  let statusColor = isOnline ? "#3f8600" : "#cf1322";

  return (
    <Card title={name} style={{ marginBottom: 20 }}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={4}>
          <Statistic
            title="Service Status"
            value={isOnline ? "Online" : "Offline"}
            valueStyle={{ color: statusColor }}
          />
        </Col>
        <Col span={4}>
          <Statistic title="Service Type" value={type} />
        </Col>
        <Col span={4}>
          <Statistic title="Latency" value={lastCallLatency} suffix="ms" />
        </Col>
        <Col span={4}>
          <Statistic
            title="Daily Average Latency"
            value={dailyAverageLatency}
            suffix="ms"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Weekly Average Latency"
            value={weeklyAverageLatency}
            suffix="ms"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Monthly Average Latency"
            value={monthlyAverageLatency}
            suffix="ms"
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={4}>
          <Statistic title="Owner" value={owner} />
        </Col>
        <Col span={4}>
          {squad != null && <Statistic title="Squad" value={squad} />}
        </Col>
        <Col span={4}>
          {source != null && <Statistic title="Sources" value={source} />}
        </Col>
        <Col span={4}>
          <Statistic
            title="Daily Downtime"
            value={dailyDowntime}
            suffix="minutes"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Weekly Downtime"
            value={weeklyDowntime}
            suffix="minutes"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Monthly Downtime"
            value={monthlyDowntime}
            suffix="minutes"
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Paragraph>Endpoint</Paragraph>
          <Text strong copyable>
            {endpoint}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4}>Request</Title>
          <JSONPretty data={JSON.parse(request)} />
        </Col>
        <Col span={12}>
          <Title level={4}>Response</Title>
          <JSONPretty data={JSON.parse(response)} />
        </Col>
      </Row>
    </Card>
  );
};
export default Panel;
