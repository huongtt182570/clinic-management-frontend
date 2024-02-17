import React, { useState } from 'react';
import { Table, Modal, Select, Tag, Form, Input, Button } from 'antd';
const { Option } = Select;

const DoctorAppointment: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
    const [recordToUpdate, setRecordToUpdate] = useState<any>(null);


    const handleStatusChange = (key: string, status: string) => {
        const newData = tableData.map((item: any) => {
            if (item.key === key) {
                return { ...item, appointmentStatus: status };
            }
            return item;
        });
        setTableData(newData);
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
            appointmentStatus: 'In Progress',
        },
        // Thêm dữ liệu khác nếu cần
    ];

    const [tableData, setTableData] = useState(dataSource);

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
            title: 'Thời gian khám',
        },
        {
            title: 'Tình trạng cuộc hẹn',
            dataIndex: 'appointmentStatus',
            key: 'appointmentStatus',
            render: (text: string, record: any) => {
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
                    <Select defaultValue={text} style={{ width: 120 }} bordered={false} onChange={(value) => handleStatusChange(record.key, value)}>
                        <Option value="Waiting"><Tag color={color}>Chờ khám</Tag></Option>
                        <Option value="In Progress"><Tag color={color}>Đang khám</Tag></Option>
                        <Option value="Completed"><Tag color={color}>Đã khám</Tag></Option>
                    </Select>

                );
            },
        },
        {
            title: 'Hành động',
            dataIndex: 'key',
            key: 'action',
            render: (text: string, record: any) => {
                if (record.appointmentStatus === 'In Progress') {
                    return <a onClick={() => handleUpdate(record)}>Cập nhật thông tin khám</a>;
                } else if (record.appointmentStatus === 'Completed') {
                    return <a onClick={() => handleDetail(record)}>Thông tin khám chi tiết</a>;
                } else {
                    return null; // Không hiển thị hành động nếu trạng thái là "Waiting"
                }
            },
        }
    ];

    const handleUpdate = (record: any) => {
        setRecordToUpdate(record);
        setUpdateFormVisible(true);
    };

    const handleDetail = (record: any) => {
        setRecordToUpdate(record);
        setModalVisible(true);
    };

    const handleUpdateFormCancel = () => {
        setUpdateFormVisible(false);
        setRecordToUpdate(null);
    };

    const handleDetailModalCancel = () => {
        setModalVisible(false);
        setRecordToUpdate(null);
    };

    const handleUpdateFormSubmit = () => {
        // Xử lý logic lưu cập nhật thông tin khám và đóng form
        setUpdateFormVisible(false);
        setRecordToUpdate(null);
    };

    return (
        <>
            <Table dataSource={tableData} columns={columns} />


            <Modal
                title="Chi tiết lịch sử khám"
                visible={modalVisible}
                onCancel={handleDetailModalCancel}
                footer={null}
            >
                <div>
                    <p><strong>Phương pháp điều trị:</strong> {recordToUpdate?.treatmentMethod}</p>
                    <p><strong>Đơn thuốc:</strong> {recordToUpdate?.prescription}</p>
                </div>
            </Modal>

            <Modal
                title="Cập nhật thông tin khám"
                visible={updateFormVisible}
                onCancel={handleUpdateFormCancel}
                footer={[
                    <Button key="cancel" onClick={handleUpdateFormCancel}>Hủy</Button>,
                    <Button key="submit" type="primary" onClick={handleUpdateFormSubmit}>Lưu</Button>
                ]}
            >
                {/* Hiển thị form cập nhật thông tin khám ở đây */}
                <Form>
                    <Form.Item label="Phương pháp điều trị">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Đơn thuốc">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DoctorAppointment;
