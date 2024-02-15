// Home.tsx
import { Layout } from 'antd';
import React, { useState } from 'react';
import Headers from '../../../components/Headers';
import ChangePassword from '../../changePassword/changePassword';
import AcceptMedical from '../AcceptMedical';
import DoctorAppointment from '../DoctorAppointment';
import DoctorInfo from '../DoctorInfo';
import SidebarDoctor from '../SidebarDoctor';
import './style.scss';

const { Content } = Layout;

const DoctorDashboard: React.FC = () => {
  // Mặc định là 'dashboard'
  const [activeTab, setActiveTab] = useState<string>('information');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headers />
      <Layout>
        <SidebarDoctor activeTab={activeTab} onTabChange={handleTabChange} />
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {activeTab === 'information' && <DoctorInfo />}
            {activeTab === 'accept_medical' && <AcceptMedical />}
            {activeTab === 'doctor_appointment' && <DoctorAppointment />}
            {activeTab === 'change_password' && <ChangePassword />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DoctorDashboard;
