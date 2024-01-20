import React from 'react';
import { Table, Space, Tag } from 'antd';

const AppointmentHistory: React.FC = () => {
    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'completed' ? 'green' : 'geekblue'}>{status}</Tag>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            time: '10:00 AM - 11:00 AM',
            doctor: 'Dr. Nguyen Van A',
            service: 'Kiểm tra tổng quát',
            status: 'completed',
        },
        // Thêm dữ liệu khác nếu cần
    ];

    return (
        <>
            <h2>Lịch sử khám của bệnh nhân</h2>
            <Table dataSource={data} columns={columns} />
        </>
    );
};

export default AppointmentHistory;
