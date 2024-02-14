import { Button, Form, Input, Modal, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoctorAsync,
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
  const navigate = useNavigate();
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
  // const [newDoctor, setNewDoctor] = useState<IAddDoctor>();
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
    form.validateFields().then(async (values) => {
      const res = await dispatch(addDoctorAsync(values));
      if (res?.payload?.success) {
        notification.success({ message: 'Thêm bác sĩ thành công.' });
        dispatch(getListDoctorAdmin({ page: 1, pageSize: 10 }));
        setIsModalVisible(false);
        navigate('/');
      } else {
        notification.error({ message: 'Lỗi xảy ra khi thêm bác sĩ.' });
      }
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
            label="Fullname"
            name="fullname"
            rules={[
              { required: true, message: 'Please input the doctor name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input the doctor number phone!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input the doctor email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the doctor number address!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Please input the doctor date of birth!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please input the doctor date of birth!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Speciality"
            name="speciality"
            rules={[{ required: true, message: 'Please input the specialty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Degree"
            name="degree"
            rules={[{ required: true, message: 'Please input the degree!' }]}
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
