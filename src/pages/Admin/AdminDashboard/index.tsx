// App.tsx
import { Layout } from 'antd';
import React, { useState } from 'react';
import Headers from '../../../components/Headers';
import AddDoctor from '../AddDoctor';
import AddPatient from '../AddPatient';
import Appointment from '../Appointment/appointment';
import Dashboard_Admin from '../Dashboard_Admin';
import Medical from '../Medical';
import Sidebar from '../SidebarAdmin';
import './style.scss'; // Create your own CSS file

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
  // Mặc định là 'dashboard'
  const [activeTab, setActiveTab] = useState<string>('addDoctor');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headers />
      <Layout>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {activeTab === 'dashboard' && <Dashboard_Admin />}
            {activeTab === 'addDoctor' && <AddDoctor />}
            {activeTab === 'addPatient' && <AddPatient />}
            {activeTab === 'medical' && <Medical />}
            {activeTab === 'appointmentDetails' && <Appointment />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
