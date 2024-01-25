// MedicalServiceTable.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface MedicalService {
    key: number;
    serviceName: string;
    servicePrice: number;
}

const MedicalServiceTable: React.FC = () => {
    const [services, setServices] = useState<MedicalService[]>([
        { key: 1, serviceName: 'Service A', servicePrice: 50 },
        { key: 2, serviceName: 'Service B', servicePrice: 30 },
        // Add more service data as needed
    ]);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        { title: 'Service Name', dataIndex: 'serviceName', key: 'serviceName' },
        { title: 'Service Price', dataIndex: 'servicePrice', key: 'servicePrice' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: MedicalService) => (
                <Space size="middle">
                    <a onClick={() => showEditModal(record)}>
                        <EditOutlined />
                    </a>
                    <a onClick={() => handleDelete(record.key)}>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];

    const showEditModal = (record: MedicalService) => {
        form.setFieldsValue(record);
        setIsEditModalVisible(true);
    };

    const handleEditOk = () => {
        form.validateFields().then((values) => {
            const updatedServices = services.map((service) =>
                service.key === values.key ? { ...service, ...values } : service
            );
            setServices(updatedServices);
            form.resetFields();
            setIsEditModalVisible(false);
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
        form.validateFields().then((values) => {
            const newService: MedicalService = {
                key: services.length + 1,
                ...values,
            };
            const updatedServices = [...services, newService].sort((a, b) =>
                a.serviceName.localeCompare(b.serviceName)
            );
            setServices(updatedServices);
            form.resetFields();
            setIsAddModalVisible(false);
        });
    };

    const handleAddCancel = () => {
        form.resetFields();
        setIsAddModalVisible(false);
    };

    const handleDelete = (key: number) => {
        setServices(services.filter((service) => service.key !== key));
    };

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal} style={{ marginBottom: 16 }}>
                Add Service
            </Button>
            <Table dataSource={services} columns={columns} pagination={false} />

            <Modal title="Edit Service" visible={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item name="key" hidden />
                    <Form.Item
                        name="serviceName"
                        label="Service Name"
                        rules={[{ required: true, message: 'Please enter service name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="servicePrice"
                        label="Service Price"
                        rules={[{ required: true, message: 'Please enter service price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Add Service" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        name="serviceName"
                        label="Service Name"
                        rules={[{ required: true, message: 'Please enter service name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="servicePrice"
                        label="Service Price"
                        rules={[{ required: true, message: 'Please enter service price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MedicalServiceTable;
