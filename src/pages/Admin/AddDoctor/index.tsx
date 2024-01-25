import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    experience: number;
}

const AddDoctor: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fakeDoctors: Doctor[] = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', experience: 10 },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', experience: 8 },
        // Add more fake doctors as needed
    ];

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
            <Table dataSource={[...doctors, ...fakeDoctors]} columns={columns} />

            <Modal title="Add Doctor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the doctor name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Specialty" name="specialty" rules={[{ required: true, message: 'Please input the specialty!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Experience (years)"
                        name="experience"
                        rules={[{ required: true, message: 'Please input the doctor experience!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddDoctor;
