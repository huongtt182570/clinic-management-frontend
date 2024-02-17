// Sidebar.tsx
import { Layout, Menu } from 'antd';
import React from 'react';

const { Sider } = Layout;

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <Sider width={200} theme="dark">
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[activeTab]}
        onClick={({ key }) => onTabChange(key.toString())}
      >
        {/* <Menu.Item key="dashboard">Bảng điều khiển</Menu.Item> */}
        <Menu.Item key="addDoctor">Quản lý bác sĩ</Menu.Item>
        <Menu.Item key="addPatient">Bệnh nhân</Menu.Item>
        <Menu.Item key="appointmentDetails">Quản lý dịch vụ</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
