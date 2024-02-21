// AddPatient.tsx
import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getAllHistoryAsync,
  getListPatientAdmin,
  resetListPatientAdmin,
} from '../../../redux/slices/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

interface Patient {
  key: number;
  name: string;
  age: number;
  phone: string;
  medicalHistory: string;
  appointmentDate: string;
  appointmentTime: string;
}

const AddPatient: React.FC = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const showDetailModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setDetailVisible(true);
  };

  const handleDetailCancel = () => {
    setSelectedPatient(null);
    setDetailVisible(false);
  };
  const dispatch = useAppDispatch();
  const { listPatient = [], listHistory } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getListPatientAdmin({ page: 1, pageSize: 10 }));
    dispatch(getAllHistoryAsync({ page: 1, pageSize: 100 }));
    return () => {
      dispatch(resetListPatientAdmin());
    };
  }, []);
  const columns = [
    { title: 'Họ và tên', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Lịch sử khám',
      dataIndex: 'medicalHistory',
      key: 'medicalHistory',
      render: (_: any, record: Patient) => (
        <a onClick={() => showDetailModal(record)}>Chi tiết</a>
      ),
    },
  ];
  const detailColumn = [
    {
      title: 'Ngày khám',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'doctor',
      key: 'doctor',
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
  ];
  return (
    <div>
      <Table dataSource={listPatient} columns={columns} pagination={false} />
      <Modal
        title="Chi tiết lịch sử khám"
        visible={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
      >
        {selectedPatient && (
          <div>
            <Table
              dataSource={listHistory?.filter(
                (item) => item.patientId === selectedPatient.id
              )}
              columns={detailColumn}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddPatient;
