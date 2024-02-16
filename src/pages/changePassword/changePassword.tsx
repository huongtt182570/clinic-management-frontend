import { Button, Form, Input, notification } from 'antd';
import { changePasswordAsync } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../hook';

function ChangePassword() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const validateConfirmPassword = (_, value: string) => {
    const newPassword = form.getFieldValue('newPassword');
    console.log(value);
    console.log(newPassword);

    if (value && value !== newPassword) {
      return Promise.reject(new Error('Mật khẩu không khớp'));
    }
    return Promise.resolve();
  };

  const handleChangePassword = async (values: any) => {
    const formData = new FormData();
    formData.append('oldPassword', values.oldPassword?.toString());
    console.log(formData);

    formData.append('newPassword', values.newPassword?.toString());
    formData.append('confirmPassword', values.confirmPassword?.toString());
    console.log(formData);
    console.log(values.oldPassword);

    const res = await dispatch(changePasswordAsync(values));
    if (res?.payload?.success) {
      notification.success({ message: 'Đổi mật khẩu thành công' });
    } else {
      notification.error({ message: 'Lỗi xảy ra khi đổi mật khẩu' });
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleChangePassword}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu mới' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu mới "
          rules={[
            { required: true, message: 'Hãy nhập lại mật khẩu mới' },
            { validator: validateConfirmPassword },
          ]}
        >
          <Input.Password type="number" />
        </Form.Item>
        {/* <Col span={8}> */}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
        {/* </Col> */}
      </Form>
    </div>
  );
}

export default ChangePassword;
