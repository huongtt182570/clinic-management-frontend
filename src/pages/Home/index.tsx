// Home.tsx
import { CarOutlined, CheckOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';
import './style.scss';

const { Title, Paragraph } = Typography;

const { Header, Content } = Layout;

import { Typography } from 'antd';
import Login from '../Login/Login';

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('2');

  const handleMenuClick = (e: any) => {
    setSelectedTab(e.key);
  };
  const sectionStyle = {
    background: 'linear-gradient(to right, #3931af, #00c6ff)', // Màu nền của mỗi mục
    padding: '40px', // Khoảng cách giữa nội dung và viền của mỗi mục
    textAlign: 'center', // Căn giữa nội dung
    borderRadius: '8px', // Bo tròn viền của mỗi mục
    margin: '10px 0', // Khoảng cách giữa các mục
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Hiệu ứng đổ bóng
    height: '100vh',
  } as React.CSSProperties;

  const renderContent = () => {
    switch (selectedTab) {
      case '2':
        return (
          <Layout>
            <Content>
              <Title>Welcome to Clinic Managements!</Title>
              <div style={sectionStyle}>
                <Title level={2} style={{ color: '#ffff' }}>
                  Affordable monthly premium packages
                </Title>
                <Paragraph>
                  <CheckOutlined /> Lorem ipsum dolor sit amet, in verterem
                  persecuti vix, sit te meis
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Choose your favourite services
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Lorem ipsum dolor sit amet, in verterem
                  persecuti vix, sit te meis
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Only use friendly environment
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Lorem ipsum dolor sit amet, in verterem
                  persecuti vix, sit te meis
                </Paragraph>
              </div>
            </Content>
          </Layout>
        );
      case '3':
        return <Login />;
      default:
        return null;
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col span={8}>
            <div className="logo">
              <h2>
                <CarOutlined /> Clinic Managements
              </h2>
            </div>
          </Col>
          <Col span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedTab]}
              onClick={handleMenuClick}
              style={{ lineHeight: '64px', float: 'right' }}
            >
              <Menu.Item key="2">ABOUT US</Menu.Item>
              <Menu.Item key="3">Login</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '50px' }}>{renderContent()}</Content>
    </Layout>
  );
};

export default Home;
