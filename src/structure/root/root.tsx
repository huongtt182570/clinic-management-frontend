import { createBrowserRouter, RouteObject } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Home } from '../../pages';
import PatientRegistration from '../../pages/Patient/PatientRegistration/PatientRegistration';
import DoctorDashboard from '../../pages/Doctor/DoctorDashboard/DoctorDashboard';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import PatientDashboard from '../../pages/Patient/PatientDashboard';
import AddDoctor from '../../pages/Admin/AddDoctor';

type AppRoute<P = {}> = RouteObject & {
  element: ReactNode;
  component?: React.ComponentType<P>;
  children?: AppRoute<P>[]; // Đặt children là một mảng của AppRoute<P>
};

const router = createBrowserRouter([
  {

    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'patient/dashboard', // Thêm route cho trang dashboard của admin
        element: <PatientDashboard />,
      },
      {
        path: 'patient/register', // Thêm route cho trang đăng ký của bệnh nhân
        element: <PatientRegistration />,
      },
      {
        path: 'doctor/dashboard', // Thêm route cho trang dashboard của bác sĩ
        element: <DoctorDashboard />,
      },
      {
        path: 'admin/dashboard', // Thêm route cho trang dashboard của admin
        element: <AdminDashboard />,
      },
<<<<<<< HEAD
      {
        path: '/add-doctor', // Thêm route cho trang dashboard của admin
        element: <AddDoctor />,
      },
=======
>>>>>>> 570a2368404a6a1eaca3194fb6ae2022c7de8e68
    ] as AppRoute[], //Ép kiểu routes thành AppRoute với thuộc tính userType
  }]);

export default router;
