import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import StatusTag from '../../../components/common/StatusTag';
import { renderGender } from '../../../components/common/function';
import {
  addDoctorAsync,
  deleteDoctorAsync,
  getAllAppointmentAsync,
  getListDoctorAdmin,
  resetListDoctorAdmin,
  updateDoctorAsync,
} from '../../../redux/slices/adminSlice';
import { Status } from '../../enum';
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
    dispatch(getAllAppointmentAsync({ page: 1, pageSize: 100 }));
    return () => {
      dispatch(resetListDoctorAdmin());
    };
  }, []);
  const { listDoctor = [], listAppointment = [] } = useAppSelector(
    (state) => state.admin
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // const [newDoctor, setNewDoctor] = useState<IAddDoctor>();

  const [isEdit, setIsEdit] = useState(false);
  const [doctorId, setDoctorId] = useState<number>(0);
  const handleDelete = async (key: number) => {
    const res = await dispatch(deleteDoctorAsync(key));
    if (res?.payload?.success) {
      notification.success({ message: 'Xoá bác sĩ thành công.' });
      dispatch(getListDoctorAdmin({ page: 1, pageSize: 10 }));
    } else {
      notification.error({ message: 'Lỗi xảy ra khi xoá bác sĩ.' });
    }
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên đầy đủ', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday' },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (value: string) => <div>{renderGender(value)}</div>,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Chuyên môn', dataIndex: 'speciality', key: 'speciality' },
    { title: 'Bằng cấp', dataIndex: 'degree', key: 'degree' },
    { title: 'Kinh nghiệm (năm)', dataIndex: 'experience', key: 'experience' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Lịch trình',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            setModalVisible(true);
            setDoctorId(record.id);
          }}
        >
          Chi tiết
        </a>
      ),
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

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Thêm bác sĩ
      </Button>
      <Table dataSource={listDoctor || []} columns={columns} />

      <Modal
        title={isEdit ? 'Sửa bác sĩ' : 'Thêm bác sĩ'}
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
            rules={[{ required: true, message: 'Bạn chưa điền email!' }]}
          >
            <Input />
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
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please input the doctor gender!',
              },
            ]}
          >
            <Select>
              <Select.Option value="FEMALE">Nữ</Select.Option>
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="OTHER">Khác</Select.Option>
            </Select>
          </Form.Item>
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
          dataSource={listAppointment.filter(
            (item) =>
              item.doctorId === doctorId &&
              (item.status === Status.confirmed ||
                item.status === Status.inprogress)
          )} // Dùng [dataSource[0]] để chỉ hiển thị thông tin cho bệnh nhân đầu tiên trong ví dụ
          columns={[
            {
              title: 'Tên bệnh nhân',
              dataIndex: 'patientName',
              key: 'patientName',
            },
            {
              title: 'Số điện thoại bệnh nhân',
              dataIndex: 'patientPhone',
              key: 'patientPhone',
            },
            {
              title: 'Dịch vụ khám',
              dataIndex: 'service',
              key: 'service',
            },
            {
              title: 'Thời gian khám',
              dataIndex: 'startTime',
              key: 'startTime',
            },
            {
              title: 'Tình trạng khám',
              dataIndex: 'status',
              key: 'status',
              render: (status: string) => <StatusTag status={status} />,
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default AddDoctor;
