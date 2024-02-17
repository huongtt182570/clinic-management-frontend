import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  notification,
} from 'antd';
import { useState } from 'react';
import { formatDate } from '../../../components/common/function';
import {
  editUserInfoAsync,
  getUserInfoAsync,
} from '../../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import './style.scss';

const PatientInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.user);
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      fullname: userInfo.fullname,
      phone: userInfo.phone,
      // birthday: new Date(userInfo.birthday),
      address: userInfo.address,
      email: userInfo.email,
    });
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      const res = await dispatch(editUserInfoAsync(values));
      console.log(values.birthday);
      if (res?.payload?.success) {
        notification.success({ message: 'Sửa thông tin thành công' });
        dispatch(getUserInfoAsync());
        form.resetFields();
        setIsEditing(false);
      } else {
        notification.error({ message: 'Lỗi xảy ra sửa thông tin' });
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <Descriptions title="User Info">
        <Descriptions.Item label="Họ và tên">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="fullname">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            userInfo.fullname
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="phone">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            userInfo.phone
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="birthday">
                <DatePicker />
              </Form.Item>
            </Form>
          ) : (
            formatDate(userInfo.birthday)
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="address">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            userInfo.address || ''
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="email">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            userInfo.email || ''
          )}
        </Descriptions.Item>
      </Descriptions>

      {isEditing ? (
        <div>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default PatientInfo;
