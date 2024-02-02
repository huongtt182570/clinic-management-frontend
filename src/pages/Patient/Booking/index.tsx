// Booking.tsx
import { Button, Card, DatePicker, Descriptions, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { doctors } from './doctors';
import { services } from './services';

const { Option } = Select;

const Booking: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    // Thực hiện lưu thông tin đặt lịch và hiển thị
    // ở đây có thể gửi request đến server để lưu thông tin

    // Hiển thị thông tin đã đăng ký
    const bookedInfo = {
      doctor: doctors.find((doctor) => doctor.id.toString() === selectedDoctor),
      service: services.find(
        (service) => service.id.toString() === selectedService
      ),
      date: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
    };

    console.log(bookedInfo);
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
            <Option key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Chọn dịch vụ"
          onChange={handleServiceChange}
        >
          {services.map((service) => (
            <Option key={service.id} value={service.id.toString()}>
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
      {selectedDoctor && selectedService && selectedDate && (
        <Card style={{ marginTop: 16 }}>
          <Descriptions title="Thông tin đặt lịch">
            <Descriptions.Item label="Bác sĩ">
              {
                doctors.find(
                  (doctor) => doctor.id.toString() === selectedDoctor
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {
                services.find(
                  (service) => service.id.toString() === selectedService
                )?.name
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
