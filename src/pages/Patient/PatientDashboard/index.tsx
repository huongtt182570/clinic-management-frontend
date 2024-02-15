import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import Headers from '../../../components/Headers';
import ChangePassword from '../../changePassword/changePassword';
import AppointmentHistory from '../AppointmentHistory';
import Booking from '../Booking';
import BookingDoctor from '../BookingDoctor';
import ChooseMedical from '../ChooseMedical';
import PatientInfo from '../PatientInfo';
import SidebarPatient from '../SidebarPatient';

const PatientDashboard: React.FC = () => {
  // Mặc định là 'dashboard'
  const [activeTab, setActiveTab] = useState<string>('information');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headers />
      <Layout>
        <SidebarPatient activeTab={activeTab} onTabChange={handleTabChange} />
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {activeTab === 'information' && <PatientInfo />}
            {activeTab === 'choose_doctor' && <BookingDoctor />}
            {activeTab === 'choose_medical' && <ChooseMedical />}
            {activeTab === 'appointment_history' && <AppointmentHistory />}
            {activeTab === 'booking' && <Booking />}
            {activeTab === 'change_password' && <ChangePassword />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PatientDashboard;
