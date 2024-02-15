// MedicalServiceTable.tsx
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  addServiceAsync,
  deleteServiceAsync,
  editServiceAsync,
  getListServiceAsync,
} from '../../../redux/slices/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { IService } from '../../model/model';

const MedicalServiceTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<number>();
  const { listService } = useAppSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getListServiceAsync());
  }, []);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'serviceName' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Giá', dataIndex: 'price', key: 'servicePrice' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: IService) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record.id || 0)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const showEditModal = (record: IService) => {
    setId(record.id);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values);

      const res = await dispatch(
        editServiceAsync({ ...(values as IService), id })
      );
      if (res?.payload?.success) {
        notification.success({ message: 'Sửa dịch vụ thành công.' });
        dispatch(getListServiceAsync());
        setIsEditModalVisible(false);
        form.resetFields();
      } else {
        notification.error({ message: 'Lỗi xảy ra khi sửa dịch vụ.' });
      }
    });
  };

  const handleEditCancel = () => {
    form.resetFields();
    setIsEditModalVisible(false);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    form.validateFields().then(async (values) => {
      const res = await dispatch(addServiceAsync(values as IService));
      if (res?.payload?.success) {
        notification.success({ message: 'Thêm dịch vụ thành công.' });
        await dispatch(getListServiceAsync());
        setIsAddModalVisible(false);
        form.resetFields();
      } else {
        notification.error({ message: 'Lỗi xảy ra khi thêm dịch vụ.' });
      }
    });
  };

  const handleAddCancel = () => {
    form.resetFields();
    setIsAddModalVisible(false);
  };

  const handleDelete = async (id: number) => {
    const res = await dispatch(deleteServiceAsync(id));
    if (res?.payload?.success) {
      notification.success({ message: 'Xoá dịch vụ thành công.' });
      await dispatch(getListServiceAsync());
    } else {
      notification.error({ message: 'Lỗi xảy ra khi xoá dịch vụ.' });
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Add Service
      </Button>
      <Table dataSource={listService} columns={columns} pagination={false} />

      <Modal
        title="Edit Service"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Hãy nhập tên dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Hãy nhập mô tả của dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Hãy nhập giá của dịch vụ' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Service"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Hãy nhập tên dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Hãy nhập mô tả của dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Hãy nhập giá của dịch vụ' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicalServiceTable;
