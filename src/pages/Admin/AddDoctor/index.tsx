import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoctorAsync,
  deleteDoctorAsync,
  getListDoctorAdmin,
  resetListDoctorAdmin,
  updateDoctorAsync,
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

  const [isEdit, setIsEdit] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Doctor | null>(null);

  const showDetailModal = (doctors: Doctor) => {
    setSelectedPatient(doctors);
    setDetailVisible(true);
  };
  const handleDelete = async (key: number) => {
    const res = await dispatch(deleteDoctorAsync(key));
    if (res?.payload?.success) {
      notification.success({ message: 'Xoá bác sĩ thành công.' });
      dispatch(getListDoctorAdmin({ page: 1, pageSize: 10 }));
    } else {
      notification.error({ message: 'Lỗi xảy ra khi xoá bác sĩ.' });
    }
  };

  const dataSource = [
    {
      key: '1',
      patientName: 'John Doe',
      phoneNumber: '1234567890',
      gender: 'Male',
      email: 'johndoe@example.com',
      medicalHistory: 'Cough and fever',
      appointmentHistory: '2024-02-14',
      appointmentStatus: 'Waiting',
    },
    // Thêm dữ liệu khác nếu cần
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên đầy đủ', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday' },
    // { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Chuyên môn', dataIndex: 'speciality', key: 'speciality' },
    { title: 'Bằng cấp', dataIndex: 'degree', key: 'degree' },
    { title: 'Kinh nghiệm (năm)', dataIndex: 'experience', key: 'experience' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Lịch trình',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: () => <a onClick={() => setModalVisible(true)}>Chi tiết</a>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Doctor) => (
        <div>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (isEdit) {
        const res = await dispatch(updateDoctorAsync(values));
        if (res?.payload?.success) {
          notification.success({ message: 'Sửa bác sĩ thành công.' });
          dispatch(getListDoctorAdmin({ page: 1, pageSize: 10 }));
          setIsModalVisible(false);
          setIsEdit(false);
        } else {
          notification.error({ message: 'Lỗi xảy ra khi sửa bác sĩ.' });
        }
      } else {
        const res = await dispatch(addDoctorAsync(values));
        if (res?.payload?.success) {
          notification.success({ message: 'Thêm bác sĩ thành công.' });
          dispatch(getListDoctorAdmin({ page: 1, pageSize: 10 }));
          setIsModalVisible(false);
        } else {
          notification.error({ message: 'Lỗi xảy ra khi thêm bác sĩ.' });
        }
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setIsEdit(false);
  };

  const handleEdit = (record: Doctor) => {
    setIsModalVisible(true);
    setIsEdit(true);
    form.setFieldsValue({ ...record, birthday: '' });
    console.log('Editing doctor:', record);
  };

  const items = [
    { lable: 'male', key: 'MALE' },
    { label: 'Female', key: 'FEMALE' },
    { label: 'Other', key: 'OTHER' },
  ];
  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Thêm bác sĩ
      </Button>
      <Table dataSource={listDoctor || []} columns={columns} />

      <Modal
        title="Add Doctor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {isEdit && (
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item
            label="Tên đầy đủ"
            name="fullname"
            rules={[{ required: true, message: 'Bạn chưa điền tên đầy đủ!' }]}
          >
            <Input disabled={isEdit} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền số điện thoại!',
              },
            ]}
          >
            <Input type="number" disabled={isEdit} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ message: 'Bạn chưa điền email!' }]}
          >
            <Input disabled={isEdit} />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                // required: true,
                message: 'Bạn chưa điền địa chỉ!',
              },
            ]}
          >
            <Input disabled={isEdit} />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[
              {
                message: 'Bạn chưa điền ngày sinh!',
              },
            ]}
          >
            <DatePicker disabled={isEdit} />
          </Form.Item>
          {/* <Form.Item
            label="gender"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please input the doctor gender!',
              },
            ]}
          >
            <Dropdown menu={{ items }} />
          </Form.Item> */}
          <Form.Item
            label="Chuyên môn"
            name="speciality"
            rules={[{ required: true, message: 'Bạn chưa điền chuyên môn!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bằng cấp"
            name="degree"
            rules={[{ required: true, message: 'Bạn chưa điền bằng cấp!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kinh nghiệm(năm)"
            name="experience"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền kinh nghiệm!',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chi tiết"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {/* Form và bảng thông tin */}
        <Table
          dataSource={[dataSource[0]]} // Dùng [dataSource[0]] để chỉ hiển thị thông tin cho bệnh nhân đầu tiên trong ví dụ
          columns={[
            {
              title: 'Dịch vụ khám',
              dataIndex: 'serviceName',
              key: 'serviceName',
            },
            { title: 'Bác sĩ phụ trách', dataIndex: 'doctor', key: 'doctor' },
            // { title: 'Chuẩn đoán bệnh', dataIndex: 'diagnosis', key: 'diagnosis' },
            {
              title: 'Thời gian khám',
              dataIndex: 'appointmentTime',
              key: 'appointmentTime',
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default AddDoctor;
