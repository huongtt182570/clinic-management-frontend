import React from 'react';
import { Table, Space, Button } from 'antd';

interface Doctor {
    key: string;
    name: string;
    specialization: string;
    availableTime: string;
}

const BookingDoctor: React.FC = () => {
    const columns = [
        {
            title: 'Tên Bác sĩ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chuyên môn',
            dataIndex: 'specialization',
            key: 'specialization',
        },
        {
            title: 'Thời gian làm việc',
            dataIndex: 'availableTime',
            key: 'availableTime',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record: Doctor) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleBookAppointment(record)}>
                        Đặt lịch hẹn
                    </Button>
                </Space>
            ),
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

    const handleBookAppointment = (doctor: Doctor) => {
        // Xử lý đặt lịch hẹn với bác sĩ đã chọn
        console.log(`Booking appointment with Dr. ${doctor.name}`);
    };

    return (
        <>
            <h2>Danh sách Bác sĩ</h2>
            <Table dataSource={data} columns={columns} />
        </>
    );
};

export default BookingDoctor;
