import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Table,
  Tag,
  notification,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  bookeAppointmentAsync,
  cancelAppointmentAsync,
  getListAppointmentAsync,
  getListDoctorAsync,
  getListServiceAsync,
} from '../../../redux/slices/patientSlice';
import { Status } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../hook';

const { Option } = Select;

const Booking: React.FC = () => {
  const dispatch = useAppDispatch();
  const [listDoctorService, setListDoctorService] = useState<
    {
      id: number;
      fullname: string;
    }[]
  >([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [reason, setReason] = useState<string>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { listService, listDoctor, listAppointment } = useAppSelector(
    (state) => state.patient
  );

  const handleDoctorChange = (value: number) => {
    setSelectedDoctor(value);
  };

  const handleServiceChange = (value: number) => {
    const doctorList = listService?.find((item) => item.id === value)?.doctors;
    setListDoctorService(
      doctorList?.map((item) => ({
        id: item?.doctor?.id,
        fullname: item?.doctor?.user?.fullname,
      })) || []
    );
    setSelectedService(value);
  };

  useEffect(() => {
    dispatch(getListServiceAsync());
    dispatch(getListDoctorAsync({ page: 1, pageSize: 10 }));
    dispatch(getListAppointmentAsync({ page: 1, pageSize: 10 }));
  }, []);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    const res = await dispatch(
      bookeAppointmentAsync({
        startTime: selectedDate,
        doctorId: selectedDoctor || 0,
        serviceId: selectedService || 0,
      })
    );
    if (res?.payload?.success) {
      notification.success({ message: 'Đặt lịch khám thành công.' });
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedService(null);
      setShowInfo(true);
      dispatch(getListAppointmentAsync({ page: 1, pageSize: 10 }));

      // Thêm dữ liệu lịch sử khám mới vào state
    } else {
      notification.error({ message: 'Lỗi xảy ra khi đặt lịch khám.' });
    }
  };
  const handleDelete = async (key: number) => {
    if (reason) {
      const res = await dispatch(cancelAppointmentAsync({ id: key, reason }));
      if (res?.payload?.success) {
        notification.success({ message: 'Huỷ cuộc hẹn thành công.' });
        dispatch(getListAppointmentAsync({ page: 1, pageSize: 10 }));
      } else {
        notification.error({ message: 'Lỗi xảy ra khi huỷ cuộc hẹn.' });
      }
    }
  };
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Bác sĩ phụ trách',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Dịch vụ khám',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={'geekblue'}>{status}</Tag>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          {record.status && record.status === Status.pending && (
            <Popconfirm
              title="Bạn có chắc chắn muốn huỷ cuộc hẹn?"
              onConfirm={() => handleDelete(record.id)}
              okText="Có"
              children={
                <Input
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  required
                />
              }
              cancelText="Không"
            >
              <Button type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title="Đặt lịch khám">
        <Select
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Chọn dịch vụ"
          onChange={handleServiceChange}
        >
          {listService.map((service) => (
            <Option key={service.id} value={service.id}>
              {service.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          placeholder="Chọn bác sĩ"
          onChange={handleDoctorChange}
        >
          {listDoctorService.map((doctor) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.fullname}
            </Option>
          ))}
        </Select>
        <DatePicker
          style={{ marginLeft: 16 }}
          onChange={handleDateChange}
          disabledDate={(current) => current && current < moment().endOf('day')}
        />
        <Button type="primary" style={{ marginLeft: 16 }} onClick={handleSave}>
          Lưu
        </Button>
      </Card>
      {/* {showInfo && (
        <Card style={{ marginTop: 16 }}>
          <Descriptions title="Thông tin đặt lịch">
            <Descriptions.Item label="Bác sĩ">
              {
                listDoctor.find((doctor) => doctor.id === selectedDoctor)
                  ?.fullname
              }
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {
                listService.find((service) => service.id === selectedService)
                  ?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="Ngày">
              {selectedDate?.format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )} */}

      {/* Hiển thị bảng lịch sử khám bệnh nhân */}
      <Card title="Lịch sử đăng ký khám" style={{ marginTop: 16 }}>
        <Table dataSource={listAppointment} columns={columns} />
      </Card>
    </div>
  );
};

export default Booking;
