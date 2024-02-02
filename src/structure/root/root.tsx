import React, { ReactNode } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Home } from '../../pages';
import AddDoctor from '../../pages/Admin/AddDoctor';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import DoctorDashboard from '../../pages/Doctor/DoctorDashboard/DoctorDashboard';
import PatientDashboard from '../../pages/Patient/PatientDashboard';
import PatientRegistration from '../../pages/Patient/PatientRegistration/PatientRegistration';
import ProtectedRoute from './ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'patient/dashboard', // Thêm route cho trang dashboard của admin
        element: (
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'patient/register', // Thêm route cho trang đăng ký của bệnh nhân
        element: <PatientRegistration />,
      },
      {
        path: 'doctor/dashboard', // Thêm route cho trang dashboard của bác sĩ
        element: (
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/dashboard', // Thêm route cho trang dashboard của admin
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/add-doctor', // Thêm route cho trang dashboard của admin
        element: (
          <ProtectedRoute>
            <AddDoctor />
          </ProtectedRoute>
        ),
      },
    ] as AppRoute[], //Ép kiểu routes thành AppRoute với thuộc tính userType
  },
]);

export default router;
