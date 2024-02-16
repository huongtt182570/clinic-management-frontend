import { Descriptions } from 'antd';
import React from 'react';
import { useAppSelector } from '../../hook';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  address?: string;
  phoneNumber?: string;
  hashCode?: string;
}

const DoctorInfo: React.FC = () => {
  // const [doctor, setDoctor] = useState<Doctor | null>(null);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [form] = Form.useForm();
  const userInfo = useAppSelector((state) => state.auth.user);

  // Thông tin mẫu
  // const initialDoctorInfo: Doctor = {
  //   id: 1,
  //   name: 'Dr. John Doe',
  //   specialty: 'Cardiologist',
  //   experience: 10,
  //   address: '123 Main St',
  //   phoneNumber: '555-1234',
  // };

  // Khởi tạo thông tin mẫu khi component được tạo
  // useState(() => {
  //   setDoctor(initialDoctorInfo);
  // });

  // const showEditModal = () => {
  //   setIsEditModalVisible(true);
  //   form.setFieldsValue({
  //     name: doctor?.name,
  //     specialty: doctor?.specialty,
  //     experience: doctor?.experience,
  //     address: doctor?.address,
  //     phoneNumber: doctor?.phoneNumber,
  //   });
  // };

  // const handleEditOk = () => {
  //   form.validateFields().then((values) => {
  //     const updatedDoctor: Doctor = {
  //       ...doctor!,
  //       ...values,
  //     };
  //     setDoctor(updatedDoctor);
  //     setIsEditModalVisible(false);
  //   });
  // };

  // const handleEditCancel = () => {
  //   setIsEditModalVisible(false);
  // };

  return (
    <>
      <Descriptions title="Doctor Info">
        <Descriptions.Item label="ID">{userInfo?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{userInfo?.fullname}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {userInfo?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Specialty">
          {userInfo?.doctor?.speciality}
        </Descriptions.Item>
        <Descriptions.Item label="Degree">
          {userInfo?.doctor?.degree}
        </Descriptions.Item>
        <Descriptions.Item label="Experience (years)">
          {userInfo?.doctor?.experience}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {userInfo?.address}
        </Descriptions.Item>
      </Descriptions>
      {/* <Button type="primary" onClick={showEditModal} style={{ marginTop: 16 }}>
                Edit Info
            </Button> */}
      {/* 
      <Modal
        title="Edit Doctor Info"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
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
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};

export default DoctorInfo;
