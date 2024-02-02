// AddPatient.tsx
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TimePicker,
} from 'antd';
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
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Medical History',
      dataIndex: 'medicalHistory',
      key: 'medicalHistory',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Patient) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.key)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
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

  const handleDelete = (key: number) => {
    setPatients(patients.filter((patient) => patient.key !== key));
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Add Patient
      </Button>
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
