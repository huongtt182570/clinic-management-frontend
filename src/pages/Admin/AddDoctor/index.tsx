import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getListDoctorAdmin,
  resetListDoctorAdmin,
} from '../../../redux/slices/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
}

const AddDoctor: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getListDoctorAdmin({
        page: 1,
        pageSize: 10,
      })
    );
    return () => {
      dispatch(resetListDoctorAdmin());
    };
  }, []);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { listDoctor = [] } = useAppSelector((state) => state.admin);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Specialty', dataIndex: 'specialty', key: 'specialty' },
    { title: 'Experience (years)', dataIndex: 'experience', key: 'experience' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Doctor) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newDoctor: Doctor = {
        id: doctors.length + 1,
        ...values,
      };
      setDoctors([...doctors, newDoctor]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleEdit = (record: Doctor) => {
    // Implement your edit logic here
    console.log('Editing doctor:', record);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Doctor
      </Button>
      <Table dataSource={listDoctor || []} columns={columns} />

      <Modal
        title="Add Doctor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the doctor name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Specialty"
            name="specialty"
            rules={[{ required: true, message: 'Please input the specialty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Experience (years)"
            name="experience"
            rules={[
              {
                required: true,
                message: 'Please input the doctor experience!',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDoctor;
