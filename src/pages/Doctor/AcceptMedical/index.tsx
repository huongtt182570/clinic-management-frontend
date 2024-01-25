import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Space, Table, Modal, Form, Input } from 'antd';
import axios from 'axios';

interface Appointment {
    id: number;
    patientName: string;
    age?: number;
    medicalHistory?: string;
    timeSlot?: string;
}

interface AcceptMedicalProps {
    // Các props khác mà bạn cần truyền vào
}

const AcceptMedical: React.FC<AcceptMedicalProps> = () => {
    const [acceptedAppointments, setAcceptedAppointments] = useState<Appointment[]>([]);
    const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);
    const [rejectReason, setRejectReason] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        // Tạo dữ liệu mẫu khi component được render
        const initialPendingAppointments: Appointment[] = [
            {
                id: 1,
                patientName: 'Patient 1',
                age: 25,
                medicalHistory: 'Medical history 1',
                timeSlot: '10:00 AM - 11:00 AM',
            },
            // Thêm các dữ liệu mẫu khác nếu cần
        ];

        setPendingAppointments(initialPendingAppointments);
    }, []);

    const handleAccept = (record: Appointment) => {
        // Xác nhận lịch và cập nhật danh sách
        setAcceptedAppointments([...acceptedAppointments, record]);
        setPendingAppointments(pendingAppointments.filter((item) => item.id !== record.id));
    };

    const showRejectModal = (record: Appointment) => {
        // Mở modal để nhập lý do từ chối
        setVisible(true);
    };

    const handleReject = () => {
        // Xử lý khi từ chối bệnh nhân
        // Gửi rejectReason về cho bệnh nhân hoặc thực hiện các xử lý tùy thuộc vào yêu cầu
        setVisible(false);
    };

    const handleCancel = () => {
        // Đóng modal khi hủy bỏ
        setVisible(false);
    };

    const rejectModalContent = (
        <Form>
            <Form.Item label="Nguyên nhân từ chối" name="rejectReason" rules={[{ required: true, message: 'Vui lòng nhập nguyên nhân từ chối!' }]}>
                <Input.TextArea onChange={(e) => setRejectReason(e.target.value)} />
            </Form.Item>
            <Button type="primary" onClick={handleReject}>
                Gửi
            </Button>
        </Form>
    );

    const columns = [
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Lịch sử bệnh',
            dataIndex: 'medicalHistory',
            key: 'medicalHistory',
        },
        {
            title: 'Thời gian khám',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
    ];

    const pendingColumns = [
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Lịch sử bệnh',
            dataIndex: 'medicalHistory',
            key: 'medicalHistory',
        },
        {
            title: 'Thời gian khám',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Thao tác',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: Appointment) => (
                <Space>
                    <Button type="primary" onClick={() => handleAccept(record)}>
                        Xác nhận
                    </Button>
                    <Button type="primary" onClick={() => showRejectModal(record)}>
                        Từ chối
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Row gutter={16}>
            <Col span={12}>
                {/* Danh sách lịch đặt cần được chấp nhận */}
                <Card title="Yêu cầu" style={{ background: '#f9f9f9' }}>
                    <Table dataSource={pendingAppointments} columns={pendingColumns} />
                </Card>
            </Col>

            <Col span={12}>
                {/* Danh sách bệnh nhân đã chấp nhận */}
                <Card title="Danh sách bệnh nhân đã chấp nhận" style={{ background: '#f9f9f9' }}>
                    <Table dataSource={acceptedAppointments} columns={columns} />
                </Card>
            </Col>

            {/* Modal cho việc nhập lý do từ chối */}
            <Modal title="Nguyên nhân từ chối" visible={visible} onOk={handleReject} onCancel={handleCancel}>
                {rejectModalContent}
            </Modal>
        </Row>
    );
};

export default AcceptMedical;
