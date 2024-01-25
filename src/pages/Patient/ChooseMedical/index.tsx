import React from 'react';
import { Table } from 'antd';

interface MedicalService {
    key: string;
    serviceName: string;
    price: number;
}

const ChooseMedical: React.FC = () => {
    const columns = [
        {
            title: 'Dịch vụ khám',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => (
                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(text)}</span>
            ),
        },
    ];

    const data: MedicalService[] = [
        {
            key: '1',
            serviceName: 'Khám tổng quát',
            price: 50,
        },
        {
            key: '2',
            serviceName: 'Xét nghiệm máu',
            price: 30,
        },
        // Thêm dữ liệu khác nếu cần
    ];

    return (
        <>
            <h2>Danh sách Dịch vụ khám</h2>
            <Table dataSource={data} columns={columns} />
        </>
    );
};

export default ChooseMedical;
