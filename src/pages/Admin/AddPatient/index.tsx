// AddPatient.tsx
import { DatePicker, Form, Input, Modal, Table, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import {
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
  const [patients, setPatients] = useState<Patient[]>([
    {
      key: 1,
      name: 'John Doe',
      age: 30,
      phone: '1234567890',
      medicalHistory: 'Cough and fever',
      appointmentDate: '2022-01-20',
      appointmentTime: '10:00',
    },
    {
      key: 2,
      name: 'Jane Doe',
      age: 25,
      phone: '9876543210',
      medicalHistory: 'Headache',
      appointmentDate: '2022-01-21',
      appointmentTime: '14:30',
    },
    // Add more patient data as needed
  ]);

  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const showDetailModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setDetailVisible(true);
  };

  const handleDetailCancel = () => {
    setSelectedPatient(null);
    setDetailVisible(false);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { listPatient = [] } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getListPatientAdmin({ page: 1, pageSize: 10 }));
    return () => {
      dispatch(resetListPatientAdmin());
    };
  }, []);
  const columns = [
    { title: 'Họ và tên', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday' },
    // { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // {
    //   title: 'Lịch sử khám',
    //   dataIndex: 'medicalHistory',
    //   key: 'medicalHistory',
    //   render: (_: any, record: Patient) => (
    //     <a onClick={() => showDetailModal(record)}>Chi tiết</a>
    //   ),
    // },

    // {
    //   title: 'Trạng thái cuộc hẹn',
    //   dataIndex: 'appointmentDate',
    //   key: 'appointmentDate',
    //   render: (_: any, record: Patient) => (
    //     <a onClick={() => showDetailModal(record)}>Chi tiết</a>
    //   ),
    // },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newPatient: Patient = {
        key: patients.length + 1,
        ...values,
      };
      const updatedPatients = [...patients, newPatient].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPatients(updatedPatients);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table dataSource={listPatient} columns={columns} pagination={false} />

      <Modal
        title="Add Patient"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the patient name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: 'Please input the patient age!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input the patient phone number!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Medical History" name="medicalHistory">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Appointment Date" name="appointmentDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Appointment Time" name="appointmentTime">
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPatient;
