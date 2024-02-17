import { Button, Select, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  addRelationshipAsync,
  getListDoctorAdmin,
  getListServiceAsync,
} from '../../../redux/slices/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const { Option } = Select;

const Dashboard_Admin: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getListDoctorAdmin({
        page: 1,
        pageSize: 10,
      })
    );
    dispatch(getListServiceAsync());
  }, []);
  const [selectedService, setSelectedService] = useState<number | undefined>(
    undefined
  );
  const [selectedDoctor, setSelectedDoctor] = useState<number | undefined>(
    undefined
  );
  const [data, setData] = useState<{ service: string; doctor: string }[]>([]);
  const { listService, listDoctor } = useAppSelector((state) => state.admin);
  const handleSave = async () => {
    if (selectedService && selectedDoctor) {
      const res = await dispatch(
        addRelationshipAsync({
          serviceId: selectedService,
          doctorId: selectedDoctor,
        })
      );
      if (res?.payload?.success) {
        notification.success({
          message: 'Thêm mối quan hệ bác sĩ - dịch vụ thành công.',
        });
        // Reset dropdown selections after saving
        dispatch(getListServiceAsync());
        setSelectedService(undefined);
        setSelectedDoctor(undefined);
      } else {
        notification.error({
          message: 'Lỗi xảy ra khi thêm mối quan hệ bác sĩ - dịch vụ.',
        });
      }
    }
  };

  const columns = [
    {
      title: 'Dịch vụ',
      dataIndex: 'name',
      key: 'service',
    },
    {
      title: 'Bác sĩ phụ trách',
      dataIndex: 'doctor',
      key: 'doctor',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {record?.doctors?.map((item) => (
            <div>{item?.doctor?.user?.fullname}</div>
          ))}
        </div>
      ),
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
          {listService?.map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
          {/* Add more options as needed */}
        </Select>
        <Select
          placeholder="Chọn bác sĩ"
          style={{ width: 200, marginRight: 16 }}
          value={selectedDoctor}
          onChange={(value) => setSelectedDoctor(value)}
        >
          {listDoctor?.map((item) => (
            <Option value={item.id}>{item.fullname}</Option>
          ))}
          {/* Add more options as needed */}
        </Select>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </div>
      <Table dataSource={listService} columns={columns} pagination={false} />
    </div>
  );
};

export default Dashboard_Admin;
