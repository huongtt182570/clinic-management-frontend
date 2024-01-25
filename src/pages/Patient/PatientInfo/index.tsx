import React, { useState } from 'react';
import { Descriptions, Form, Input, Button } from 'antd';
import './style.scss';

const PatientInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      userName: 'Zhou Maomao',
      telephone: '1810000000',
      live: 'Hangzhou, Zhejiang',
      remark: 'empty',
      address: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log('Submitted values:', values);
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <Descriptions title="User Info">
        <Descriptions.Item label="UserName">
          {isEditing ? (
            <Form form={form} name="userInfoForm">
              <Form.Item name="userName">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            'Zhou Maomao'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {isEditing ? (
            <Form.Item name="telephone">
              <Input />
            </Form.Item>
          ) : (
            '1810000000'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Live">
          {isEditing ? (
            <Form.Item name="live">
              <Input />
            </Form.Item>
          ) : (
            'Hangzhou, Zhejiang'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Remark">
          {isEditing ? (
            <Form.Item name="remark">
              <Input />
            </Form.Item>
          ) : (
            'empty'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {isEditing ? (
            <Form.Item name="address">
              <Input />
            </Form.Item>
          ) : (
            'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
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
