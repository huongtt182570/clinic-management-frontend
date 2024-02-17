import { Button, Card, DatePicker, Descriptions, Select, Table, notification } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { bookeAppointmentAsync, getListDoctorAsync, getListServiceAsync } from '../../../redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const { Option } = Select;

const Booking: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { listService, listDoctor } = useAppSelector((state) => state.patient);
  const [appointmentHistory, setAppointmentHistory] = useState<any[]>([]); // Thêm state để lưu lịch sử khám bệnh nhân

  const handleDoctorChange = (value: number) => {
    setSelectedDoctor(value);
  };

  const handleServiceChange = (value: number) => {
    setSelectedService(value);
  };

  useEffect(() => {
    dispatch(getListServiceAsync());
    dispatch(getListDoctorAsync({ page: 1, pageSize: 10 }));
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
      // Thêm dữ liệu lịch sử khám mới vào state
      const newAppointment = {
        time: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
        doctor: listDoctor.find((doctor) => doctor.id === selectedDoctor)?.fullname,
        service: listService.find((service) => service?.id === selectedService)?.name,
        status: 'Chờ khám', // Thêm trạng thái khám mặc định
      };
      setAppointmentHistory([...appointmentHistory, newAppointment]);
    } else {
      notification.error({ message: 'Lỗi xảy ra khi đặt lịch khám.' });
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
    },
  ];

  return (
    <div>
      <Card title="Đặt lịch khám">
        <Select
          style={{ width: 200 }}
          placeholder="Chọn bác sĩ"
          onChange={handleDoctorChange}
        >
          {listDoctor.map((doctor) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.fullname}
            </Option>
          ))}
        </Select>
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
        <DatePicker
          style={{ marginLeft: 16 }}
          onChange={handleDateChange}
          disabledDate={(current) => current && current < moment().endOf('day')}
        />
        <Button type="primary" style={{ marginLeft: 16 }} onClick={handleSave}>
          Lưu
        </Button>
      </Card>
      {showInfo && (
        <Card style={{ marginTop: 16 }}>
          <Descriptions title="Thông tin đặt lịch">
            <Descriptions.Item label="Bác sĩ">
              {listDoctor.find((doctor) => doctor.id === selectedDoctor)?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {listService.find((service) => service.id === selectedService)?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày">
              {selectedDate?.format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* Hiển thị bảng lịch sử khám bệnh nhân */}
      <Card title="Lịch sử khám bệnh nhân" style={{ marginTop: 16 }}>
        <Table dataSource={appointmentHistory} columns={columns} />
      </Card>
    </div>
  );
};

export default Booking;
