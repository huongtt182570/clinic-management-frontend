// Booking.tsx
import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Select,
  notification,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  bookeAppointmentAsync,
  getListServiceAsync,
} from '../../../redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { doctors } from './doctors';

const { Option } = Select;

const Booking: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const handleDoctorChange = (value: number) => {
    setSelectedDoctor(value);
  };
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { listService } = useAppSelector((state) => state.patient);
  const handleServiceChange = (value: number) => {
    setSelectedService(value);
  };

  useEffect(() => {
    dispatch(getListServiceAsync());
  }, []);
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    // Thực hiện lưu thông tin đặt lịch và hiển thị
    // ở đây có thể gửi request đến server để lưu thông tin

    // Hiển thị thông tin đã đăng ký
    const bookedInfo = {
      doctor: doctors.find((doctor) => doctor.id === selectedDoctor),
      service: listService.find((service) => service?.id === selectedService),
      date: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
    };
    console.log(bookedInfo);
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
      // setShowInfo(true);
    } else {
      notification.error({ message: 'Lỗi xảy ra khi đặt lịch khám.' });
    }
  };

  return (
    <div>
      <Card title="Đặt lịch khám">
        <Select
          style={{ width: 200 }}
          placeholder="Chọn bác sĩ"
          onChange={handleDoctorChange}
        >
          {doctors.map((doctor) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.name}
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
              {doctors.find((doctor) => doctor.id === selectedDoctor)?.name}
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
      )}
    </div>
  );
};

export default Booking;
