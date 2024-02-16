import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { getListAppointmentAsync } from '../../../redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const AppointmentHistory: React.FC = () => {
  const { listAppointment } = useAppSelector((state) => state.patient);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListAppointmentAsync({ page: 1, pageSize: 10 }));
  });
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'geekblue'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <h2>Lịch sử khám của bệnh nhân</h2>
      <Table dataSource={listAppointment} columns={columns} />
    </>
  );
};

export default AppointmentHistory;
