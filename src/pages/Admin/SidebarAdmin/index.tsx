// Sidebar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <Sider width={200} theme="dark">
            <Menu
                theme='dark'
                mode="vertical"
                selectedKeys={[activeTab]}
                onClick={({ key }) => onTabChange(key.toString())}
            >
                <Menu.Item key="dashboard">Bảng điều khiển</Menu.Item>
                <Menu.Item key="addDoctor">Bác sĩ</Menu.Item>
                <Menu.Item key="addPatient">Bệnh nhân</Menu.Item>
                <Menu.Item key="appointmentDetails">Dịch vụ</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;