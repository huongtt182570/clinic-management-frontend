import { Table } from 'antd';
import React, { useEffect } from 'react';
import { getListMedicalHistoryAsync } from '../../../redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const AppointmentHistory: React.FC = () => {
  const { listMedicalHistory } = useAppSelector((state) => state.patient);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListMedicalHistoryAsync({ page: 1, pageSize: 10 }));
  }, []);
  const columns = [
    {
      title: 'Ngày khám',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
    {
      title: 'Triệu chứng',
      dataIndex: 'symptons',
      key: 'symptons',
    },
    {
      title: 'Chẩn đoán',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Phương pháp điều trị',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    {
      title: 'Đơn thuốc',
      dataIndex: 'prescription',
      key: 'prescription',
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Khoa',
      dataIndex: 'speciality',
      key: 'speciality',
    },
  ];

  return (
    <>
      <h2>Lịch sử khám của bệnh nhân</h2>
      <Table dataSource={listMedicalHistory} columns={columns} />
    </>
  );
};

export default AppointmentHistory;
