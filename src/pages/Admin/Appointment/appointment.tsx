import { Table } from 'antd';
import { useEffect } from 'react';
import StatusTag from '../../../components/common/StatusTag';
import { getAllAppointmentAsync } from '../../../redux/slices/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

function Appointment() {
  const dispatch = useAppDispatch();
  const { listAppointment = [] } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllAppointmentAsync({ page: 1, pageSize: 10 }));
  }, []);
  const columns = [
    { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Bác sĩ', dataIndex: 'doctorName', key: 'doctorName' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    { title: 'SĐT bệnh nhân', dataIndex: 'patientPhone', key: 'patientPhone' },
    {
      title: 'Trạng thái cuộc hẹn',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <StatusTag status={status} />,
    },
    {
      title: 'Lý do từ chối (nếu có)',
      dataIndex: 'reasonCanceled',
      key: 'reasonCanceled',
    },
  ];
  return (
    <div>
      <Table
        dataSource={listAppointment}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default Appointment;
