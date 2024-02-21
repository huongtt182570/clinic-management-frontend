import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import StatusTag from '../../../components/common/StatusTag';
import { renderGender } from '../../../components/common/function';
import {
  changeAppointmentAsync,
  getHistoryDoctorAsync,
  getListAppointmentAsync,
  updateHistoryAsync,
} from '../../../redux/slices/doctorSlice';
import { Status } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../hook';
const { Option } = Select;

const DoctorAppointment: React.FC = () => {
  const dispatch = useAppDispatch();

  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [patientId, setPatientId] = useState<number>(null);
  const [appointmentId, setAppointmentId] = useState<number>(null);
  const [form] = Form.useForm();
  const { listApproveAppointments, listHistory } = useAppSelector(
    (state) => state.doctor
  );
  useEffect(() => {
    dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
    dispatch(getHistoryDoctorAsync({ page: 1, pageSize: 100 }));
  }, []);

  const showDetailModal = (record: any) => {
    setSelectedRecord(record);
    setDetailVisible(true);
  };
  const handleDetailCancel = () => {
    setSelectedRecord(null);
    setDetailVisible(false);
  };

  const handleUpdateCancel = () => {
    setSelectedRecord(null);
    setUpdateFormVisible(false);
  };
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => (
        <StatusTag
          status={status}
          onClick={() => changeToInProgress(record.id)}
        />
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'key',
      key: 'action',
      render: (text: string, record: any) => {
        if (record.status === Status.inprogress) {
          return (
            <a onClick={() => handleUpdate(record)}>Cập nhật thông tin khám</a>
          );
        }
      },
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
  const handleUpdate = (record: any) => {
    setUpdateFormVisible(true);
    setPatientId(record.patientId);
    setAppointmentId(record.id);
  };
  const changeToInProgress = async (id: number) => {
    const res = await dispatch(
      changeAppointmentAsync({
        id,
        status: Status.inprogress,
      })
    );
    if (res?.payload?.success) {
      notification.success({
        message: 'Đổi trạng thái khám thành công.',
      });
      dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
    } else {
      notification.error({
        message: 'Lỗi xảy ra khi đổi trạng thái khám.',
      });
    }
  };
  const handleUpdateFormSubmit = () => {
    form.validateFields().then(async (value) => {
      const res = await dispatch(
        updateHistoryAsync({
          ...value,
          patientId,
          dischargeDate: form.getFieldValue('admissionDate'),
        })
      );
      if (res?.payload?.success) {
        notification.success({
          message: 'Cập nhật thông tin khám thành công.',
        });
        handleUpdateCancel();
        await dispatch(
          changeAppointmentAsync({
            id: appointmentId,
            status: Status.completed,
          })
        );
        await dispatch(getListAppointmentAsync({ page: 1, pageSize: 100 }));
        form.resetFields();
        setPatientId(0);
        setAppointmentId(0);
      } else {
        notification.error({
          message: 'Lỗi xảy ra khi cập nhật thông tin khám.',
        });
      }
    });
  };
  const handleUpdateFormCancel = () => {
    setUpdateFormVisible(false);
    form.resetFields();
  };
  return (
    <>
      <Table dataSource={listApproveAppointments} columns={columns} />
      <Modal
        title="Cập nhật thông tin khám"
        visible={updateFormVisible}
        onCancel={handleUpdateFormCancel}
        footer={[
          <Button key="cancel" onClick={handleUpdateFormCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateFormSubmit}>
            Lưu
          </Button>,
        ]}
      >
        {/* Hiển thị form cập nhật thông tin khám ở đây */}
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="Triệu chứng"
            name="symptons"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền triệu chứng!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chẩn đoán"
            name="diagnosis"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền chẩn đoán!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phương pháp điều trị"
            name="treatment"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền phương pháp điều trị!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn thuốc"
            name="prescription"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền đơn thuốc!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày khám"
            name="admissionDate"
            rules={[
              {
                required: true,
                message: 'Bạn chưa điền ngày khám!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chi tiết lịch sử khám"
        visible={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
      >
        {selectedRecord && (
          <div>
            <Table
              dataSource={listHistory?.filter(
                (item) => item.patientId === selectedRecord.patientId
              )}
              columns={detailColumn}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default DoctorAppointment;
