import {
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { renderGender } from '../../../components/common/function';
import {
  changeAppointmentAsync,
  getHistoryDoctorAsync,
  getListAppointmentAsync,
} from '../../../redux/slices/doctorSlice';
import { Status } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../hook';

interface AcceptMedicalProps {
  // Các props khác mà bạn cần truyền vào
}

const AcceptMedical: React.FC<AcceptMedicalProps> = () => {
  const dispatch = useAppDispatch();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [reason, setReason] = useState<string>(null);
  const [id, setId] = useState<number>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const { listPendingAppointments, listHistory } = useAppSelector(
    (state) => state.doctor
  );
  useEffect(() => {
    dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
    dispatch(getHistoryDoctorAsync({ page: 1, pageSize: 100 }));
  }, []);

  const handleAccept = async (record: any) => {
    // Xác nhận lịch và cập nhật danh sách
    const res = await dispatch(
      changeAppointmentAsync({
        id: record.id,
        reason,
        status: Status.confirmed,
      })
    );
    if (res?.payload?.success) {
      notification.success({ message: 'Xác nhận cuộc hẹn thành công.' });
      dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
    } else {
      notification.error({ message: 'Lỗi xảy ra khi xác nhận cuộc hẹn.' });
    }
  };
  const showDetailModal = (patient: any) => {
    setSelectedPatient(patient);
    setDetailVisible(true);
  };
  const handleDetailCancel = () => {
    setSelectedPatient(null);
    setDetailVisible(false);
  };
  const handleCancelAppointment = async () => {
    const res = await dispatch(
      changeAppointmentAsync({ id, reason, status: Status.cancelByDoctor })
    );
    if (res?.payload?.success) {
      notification.success({ message: 'Huỷ cuộc hẹn thành công.' });
      dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
      setReason('');
      setId(0);
      setOpenConfirm(false);
    } else {
      notification.error({ message: 'Lỗi xảy ra khi huỷ cuộc hẹn.' });
    }
  };

  const pendingColumns = [
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
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (value: string) => <div>{renderGender(value)}</div>,
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Lịch sử bệnh',
      dataIndex: 'medicalHistory',
      key: 'medicalHistory',
      render: (_: any, record: any) => (
        <a onClick={() => showDetailModal(record)}>Chi tiết</a>
      ),
    },
    {
      title: 'Ngày khám',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc chắn muốn xác nhận?"
            onConfirm={() => handleAccept(record)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary">Xác nhận</Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              setId(record.id);
              setOpenConfirm(true);
            }}
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];
  const detailColumn = [
    {
      title: 'Ngày khám',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Triệu chứng',
      dataIndex: 'symptons',
      key: 'symptons',
    },
    {
      title: 'Chẩn đoán',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Phương pháp điều trị',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    {
      title: 'Đơn thuốc',
      dataIndex: 'prescription',
      key: 'prescription',
    },
  ];
  return (
    <div>
      {/* Danh sách lịch đặt cần được chấp nhận */}
      <Card title="Yêu cầu" style={{ background: '#f9f9f9' }}>
        <div style={{ overflowX: 'auto' }}>
          <Table
            dataSource={listPendingAppointments}
            columns={pendingColumns}
            style={{ width: '100%' }}
          />
        </div>
      </Card>

      {/* Modal cho việc nhập lý do từ chối */}
      {openConfirm && (
        <Modal
          open={openConfirm}
          width={400}
          onOk={handleCancelAppointment}
          onCancel={() => {
            setOpenConfirm(false);
            setReason('');
          }}
        >
          <h3>Bạn có chắc chắn muốn huỷ cuộc hẹn?</h3>
          <div>Điền lí do</div>
          <Input
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            required
          />
        </Modal>
      )}
      <Modal
        title="Chi tiết lịch sử khám"
        visible={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
      >
        {selectedPatient && (
          <div>
            <Table
              dataSource={listHistory?.filter(
                (item) => item.patientId === selectedPatient.id
              )}
              columns={detailColumn}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AcceptMedical;
