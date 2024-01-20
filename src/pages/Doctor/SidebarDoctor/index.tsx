// Sidebar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const SidebarDoctor: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <Sider width={200} theme="dark">
            <Menu
                theme='dark'
                mode="vertical"
                selectedKeys={[activeTab]}
                onClick={({ key }) => onTabChange(key.toString())}
            >
                <Menu.Item key="information">Thông tin cá nhân</Menu.Item>
                <Menu.Item key="accept_medical">Bệnh nhân</Menu.Item>
                <Menu.Item key="doctor_appointment">Lịch trình</Menu.Item>
                {/* <Menu.Item key="appointmentDetails">Dịch vụ</Menu.Item> */}
            </Menu>
        </Sider>
    );
};

export default SidebarDoctor;
