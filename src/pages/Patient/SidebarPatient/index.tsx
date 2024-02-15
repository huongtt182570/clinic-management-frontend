// Sidebar.tsx
import { Layout, Menu } from 'antd';
import React from 'react';

const { Sider } = Layout;

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarPatient: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <Sider width={200} theme="dark">
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[activeTab]}
        onClick={({ key }) => onTabChange(key.toString())}
      >
        <Menu.Item key="information">Thông tin</Menu.Item>
        <Menu.Item key="choose_doctor">Bác sĩ</Menu.Item>
        <Menu.Item key="choose_medical">Dịch vụ</Menu.Item>
        <Menu.Item key="booking">Đặt lịch khám</Menu.Item>
        <Menu.Item key="appointment_history">Lịch sử khám</Menu.Item>
        <Menu.Item key="change_password">Đổi mật khẩu</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarPatient;
