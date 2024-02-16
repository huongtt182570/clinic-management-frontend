import React, { useState } from 'react';
import { Table, Modal } from 'antd';

interface Doctor {
    key: string;
    name: string;
    specialization: string;
    availableTime: string;
}

const BookingDoctor: React.FC = () => {
    const columns = [
        { title: 'Tên đầy đủ', dataIndex: 'fullname', key: 'fullname' },
        { title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday' },
        { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
        { title: 'Chuyên môn', dataIndex: 'speciality', key: 'speciality' },
        { title: 'Bằng cấp', dataIndex: 'degree', key: 'degree' },
        { title: 'Kinh nghiệm (năm)', dataIndex: 'experience', key: 'experience' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Lịch trình',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            render: () => <a onClick={() => showDetailModal()}>Chi tiết</a>,
        },
    ];

    const data: Doctor[] = [
        {
            key: '1',
            name: 'Dr. Nguyễn Văn A',
            specialization: 'Ngoại khoa',
            availableTime: '08:00 AM - 05:00 PM',
        },
        {
            key: '2',
            name: 'Dr. Trần Thị B',
            specialization: 'Nhi khoa',
            availableTime: '09:00 AM - 06:00 PM',
        },
        // Thêm dữ liệu khác nếu cần
    ];

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const showDetailModal = () => {
        setModalVisible(true);
    };

    const hideDetailModal = () => {
        setModalVisible(false);
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

    return (
        <>
            <h2>Danh sách Bác sĩ</h2>
            <Table dataSource={data} columns={columns} />
            <Modal
                title="Chi tiết"
                visible={modalVisible}
                onCancel={hideDetailModal}
                footer={null}
            >
                {/* Form và bảng thông tin */}
                <Table
                    dataSource={dataSource} // Sử dụng dataSource từ state hoặc từ props tùy vào nơi bạn lấy dữ liệu
                    columns={[
                        { title: 'Dịch vụ khám', dataIndex: 'serviceName', key: 'serviceName' },
                        { title: 'Bác sĩ phụ trách', dataIndex: 'doctor', key: 'doctor' },
                        // Thêm các cột khác tương ứng
                        { title: 'Thời gian khám', dataIndex: 'appointmentTime', key: 'appointmentTime' },
                    ]}
                />
            </Modal>
        </>
    );
};

export default BookingDoctor;
