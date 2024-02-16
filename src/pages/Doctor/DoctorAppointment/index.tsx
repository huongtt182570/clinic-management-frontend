import React, { useState } from 'react';
import { Table, Modal, Select, Tag } from 'antd';
const { Option } = Select;
const DoctorAppointment: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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

    const columns = [
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Lịch sử khám',
            dataIndex: 'medicalHistory',
            key: 'medicalHistory',
            render: () => <a onClick={() => setModalVisible(true)}>Chi tiết</a>,
        },
        {
            title: 'Tình trạng cuộc hẹn',
            dataIndex: 'appointment',
            key: 'appointment',
            render: (text: string) => {
                let color = '';
                switch (text) {
                    case 'Waiting':
                        color = 'blue';
                        break;
                    case 'In Progress':
                        color = 'orange';
                        break;
                    case 'Completed':
                        color = 'green';
                        break;
                    default:
                        color = 'gray';
                }
                return (
                    <Select defaultValue={text} style={{ width: 120 }} bordered={false}>
                        <Option value="Waiting"><Tag color={color}>Chờ khám</Tag></Option>
                        <Option value="In Progress"><Tag color={color}>Đang khám</Tag></Option>
                        <Option value="Completed"><Tag color={color}>Đã khám</Tag></Option>
                    </Select>
                );
            },
        },
    ];

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />

            <Modal
                title="Chi tiết lịch sử khám"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {/* Form và bảng thông tin */}
                <Table
                    dataSource={[dataSource[0]]} // Dùng [dataSource[0]] để chỉ hiển thị thông tin cho bệnh nhân đầu tiên trong ví dụ
                    columns={[
                        { title: 'Dịch vụ khám', dataIndex: 'serviceName', key: 'serviceName' },
                        { title: 'Bác sĩ phụ trách', dataIndex: 'doctor', key: 'doctor' },
                        // { title: 'Chuẩn đoán bệnh', dataIndex: 'diagnosis', key: 'diagnosis' },
                        { title: 'Thời gian khám', dataIndex: 'appointmentTime', key: 'appointmentTime' },
                    ]}
                />
            </Modal>
        </>
    );
};

export default DoctorAppointment;
