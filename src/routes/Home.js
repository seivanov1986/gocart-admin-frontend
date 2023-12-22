import { Card, Col, Divider, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
const { Title } = Typography;

const Home = () => {
    return (
        <>
            <Title>Статистика</Title>
            <Divider />
            <Row gutter={16}>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                        color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                        color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                        color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                        color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
            </Row>
        </>
    );
};

export default Home;