// App.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Dashboard_Admin from '../Dashboard_Admin';
import AddDoctor from '../AddDoctor';
import AddPatient from '../AddPatient';
import AppointmentDetails from '../Medical'
import './style.scss'; // Create your own CSS file
import Headers from '../../../components/Headers';
import Sidebar from '../SidebarAdmin';
import Medical from '../Medical';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
  // Mặc định là 'dashboard'
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headers />
      <Layout>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {activeTab === 'dashboard' && <Dashboard_Admin />}
            {activeTab === 'addDoctor' && <AddDoctor />}
            {activeTab === 'addPatient' && <AddPatient />}
            {activeTab === 'appointmentDetails' && <Medical />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
