// DoctorAppointment.tsx

import React from 'react';
import { Calendar, Row, Col, Timeline, List, Card } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { format } from 'date-fns';

interface DoctorAppointmentProps {
    // Các props khác mà bạn cần truyền vào
}

const DoctorAppointment: React.FC<DoctorAppointmentProps> = () => {
    const onDateSelect = (date: Dayjs) => {
        // Sử dụng dayjs thay vì Date
        console.log(format(date.toDate(), 'yyyy-MM-dd'));
    };

    // Giả sử bạn có một danh sách các khung giờ
    const timeSlots = [
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        // ...Thêm các khung giờ khác nếu cần
    ];

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Calendar onSelect={onDateSelect} />
            </Col>
            <Col span={12}>
                {/* Hiển thị thông tin chi tiết lịch trình của bác sĩ */}
                <div>
                    <h2>Thông tin chi tiết lịch trình</h2>
                    <Timeline>
                        {timeSlots.map((timeSlot) => (
                            <Timeline.Item key={timeSlot}>
                                <h3>{timeSlot}</h3>
                                <List
                                    dataSource={['Cuộc hẹn 1', 'Cuộc hẹn 2']} // Thay thế bằng danh sách cuộc hẹn thực tế
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card>{item}</Card>
                                        </List.Item>
                                    )}
                                />
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </div>
            </Col>
        </Row>
    );
};

export default DoctorAppointment;
