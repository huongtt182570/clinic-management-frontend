import React from 'react';
import { Table, Tag, Space } from 'antd';
import dayjs from 'dayjs';

interface Appointment {
    key: number;
    patientName: string;
    phoneNumber: string;
    doctorName: string;
    status: 'Chưa khám' | 'Đang khám' | 'Đã khám xong';

}

const data: Appointment[] = [
    { key: 1, patientName: 'Bệnh nhân A', phoneNumber: '123456789', doctorName: 'Bác sĩ 1', status: 'Chưa khám' },
    { key: 2, patientName: 'Bệnh nhân B', phoneNumber: '987654321', doctorName: 'Bác sĩ 2', status: 'Đang khám' },
    { key: 3, patientName: 'Bệnh nhân C', phoneNumber: '555555555', doctorName: 'Bác sĩ 3', status: 'Đã khám xong' },
    // ...Thêm dữ liệu khác nếu cần
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Chưa khám':
            return 'red';
        case 'Đang khám':
            return 'orange';
        case 'Đã khám xong':
            return 'green';
        default:
            return '';
    }
};

const Dashboard_Admin: React.FC = () => {
    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Doctor Name',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => <Tag color={getStatusColor(text)}>{text}</Tag>,
        },
    ];

    // Lọc các bệnh nhân khám trong ngày hôm nay
    const todayAppointments = data.filter(appointment => dayjs().isSame(dayjs(appointment.date), 'day'));

    return (
        <>
            <h2>Danh sách bệnh nhân khám trong ngày hôm nay</h2>
            <Table dataSource={todayAppointments} columns={columns} />
        </>
    );
};

export default Dashboard_Admin;
