// Home.tsx
import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom'; // Import thư viện Link từ react-router-dom
import "./style.scss";
import SidebarDoctor from '../SidebarDoctor';
import Headers from '../../../components/Headers';
import DoctorInfo from '../DoctorInfo';
import AcceptMedical from '../AcceptMedical';
import DoctorAppointment from '../DoctorAppointment';

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
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {activeTab === 'information' && <DoctorInfo />}
            {activeTab === 'accept_medical' && <AcceptMedical />}
            {activeTab === 'doctor_appointment' && <DoctorAppointment />}

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DoctorDashboard;