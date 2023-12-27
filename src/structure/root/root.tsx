import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Home } from '../../pages';
import Login from '../../components/Login/Login';
import PatientInfo from '../../pages/Patient/patientInfo';
import DoctorInfo from '../../pages/Doctor/doctorInfo';
import Appointment from '../../pages/Appointment/appointment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'patient',
        element: <PatientInfo />,
      },
      {
        path: 'doctor',
        element: <DoctorInfo />,
      },
      {
        path: 'appointment',
        element: <Appointment />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

export default router;
