import React, { useState } from 'react';
import { Button, Select, Table } from 'antd';

const { Option } = Select;

const Dashboard_Admin: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
    const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
    const [data, setData] = useState<{ service: string, doctor: string }[]>([]);

    const handleSave = () => {
        if (selectedService && selectedDoctor) {
            setData([...data, { service: selectedService, doctor: selectedDoctor }]);
            // Reset dropdown selections after saving
            setSelectedService(undefined);
            setSelectedDoctor(undefined);
        }
    };

    const columns = [
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Bác sĩ phụ trách',
            dataIndex: 'doctor',
            key: 'doctor',
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Chọn dịch vụ"
                    style={{ width: 200, marginRight: 16 }}
                    value={selectedService}
                    onChange={(value) => setSelectedService(value)}
                >
                    <Option value="service1">Dịch vụ 1</Option>
                    <Option value="service2">Dịch vụ 2</Option>
                    {/* Add more options as needed */}
                </Select>
                <Select
                    placeholder="Chọn bác sĩ"
                    style={{ width: 200, marginRight: 16 }}
                    value={selectedDoctor}
                    onChange={(value) => setSelectedDoctor(value)}
                >
                    <Option value="doctor1">Bác sĩ 1</Option>
                    <Option value="doctor2">Bác sĩ 2</Option>
                    {/* Add more options as needed */}
                </Select>
                <Button type="primary" onClick={handleSave}>Lưu</Button>
            </div>
            <Table dataSource={data} columns={columns} pagination={false} />
        </div>
    );
};

export default Dashboard_Admin;
