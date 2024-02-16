import { Table } from 'antd';
import React, { useEffect } from 'react';
import { getListServiceAsync } from '../../../redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const ChooseMedical: React.FC = () => {
  const dispatch = useAppDispatch();
  const { listService } = useAppSelector((state) => state.patient);
  useEffect(() => {
    dispatch(getListServiceAsync());
  }, []);
  const columns = [
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'serviceName' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => (
        <span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(text)}
        </span>
      ),
    },
  ];
  return (
    <>
      <h2>Danh sách Dịch vụ khám</h2>
      <Table dataSource={listService} columns={columns} />
    </>
  );
};

export default ChooseMedical;
