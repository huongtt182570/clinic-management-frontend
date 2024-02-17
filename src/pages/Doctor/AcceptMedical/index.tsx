import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hook';

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
      {
        id: 2,
        patientName: 'Patient 2',
        age: 35,
        medicalHistory: 'Medical history 2',
        timeSlot: '11:00 AM - 12:00 PM',
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
      <Form.Item
        label="Nguyên nhân từ chối"
        name="rejectReason"
        rules={[{ required: true, message: 'Vui lòng nhập nguyên nhân từ chối!' }]}
      >
        <Input.TextArea onChange={(e) => setRejectReason(e.target.value)} />
      </Form.Item>
      <Button type="primary" onClick={handleReject}>
        Gửi
      </Button>
    </Form>
  );

  const pendingColumns = [
    { title: 'Tên bệnh nhân', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Tuổi', dataIndex: 'age', key: 'age' },
    { title: 'Lịch sử bệnh', dataIndex: 'medicalHistory', key: 'medicalHistory' },
    { title: 'Thời gian khám', dataIndex: 'timeSlot', key: 'timeSlot' },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <Space>
          <Button type="primary" onClick={() => handleAccept(record)}>
            Xác nhận
          </Button>
          {/* <Button type="primary" onClick={() => showRejectModal(record)}>
            Từ chối
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        {/* Danh sách lịch đặt cần được chấp nhận */}
        <Card title="Yêu cầu" style={{ background: '#f9f9f9' }}>
          <div style={{ overflowX: 'auto' }}>
            <Table dataSource={pendingAppointments} columns={pendingColumns} style={{ width: '100%' }} />
          </div>
        </Card>
      </Col>

      {/* Modal cho việc nhập lý do từ chối */}
      <Modal
        title="Nguyên nhân từ chối"
        visible={visible}
        onOk={handleReject}
        onCancel={handleCancel}
      >
        {rejectModalContent}
      </Modal>
    </Row>
  );
};

export default AcceptMedical;
