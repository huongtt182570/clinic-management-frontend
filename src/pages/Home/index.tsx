// Home.tsx
import { CarOutlined, CheckOutlined, HeartOutlined } from '@ant-design/icons';
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
              <Title>Chào mừng đến với Quản lý Phòng Khám Của Chúng Tôi!</Title>
              <div style={sectionStyle}>
                <Title level={2} style={{ color: '#ffff' }}>
                  Dịch vụ chăm sóc khách hàng tận tình
                </Title>
                <Paragraph>
                  <CheckOutlined /> Chọn lựa các dịch vụ y tế ưa thích của bạn.
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Môi trường thân thiện và thoải mái cho mọi người sử dụng.
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Cam kết cung cấp dịch vụ y tế chất lượng cao.
                </Paragraph>
                <Paragraph>
                  <CheckOutlined /> Thực hiện các biện pháp phòng ngừa và điều trị y tế hiệu quả.
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
                <HeartOutlined /> Clinic Managements
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
              <Menu.Item key="2">Về chúng tôi</Menu.Item>
              <Menu.Item key="3">Đăng nhập</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '50px' }}>{renderContent()}</Content>
    </Layout>
  );
};

export default Home;
