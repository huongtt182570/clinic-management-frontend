import { DoubleRightOutlined } from '@ant-design/icons';
import { Popconfirm, Tag } from 'antd';
import { Status } from '../../pages/enum';

function StatusTag(props: { status: string; onClick?: () => void }) {
  const { status, onClick } = props;
  let color;
  let statusString;
  switch (status) {
    case Status.pending:
      color = '#FFCC66';
      statusString = 'Chờ xử lý';
      break;
    case Status.inprogress:
      color = '#FFCCFF';
      statusString = 'Đang khám';
      break;
    case Status.confirmed:
      color = '#00EE00';
      statusString = 'Xác nhận';
      break;
    case Status.completed:
      color = '#6699FF';
      statusString = 'Hoàn thành';
      break;
    case Status.cancelByPatient:
      color = '#BBBBBB';
      statusString = 'Huỷ bởi bệnh nhân';
      break;
    case Status.cancelByDoctor:
      color = '#AAAAAA';
      statusString = 'Huỷ bởi bác sĩ';
      break;
    default:
      break;
  }
  return (
    <div style={{ display: 'flex' }}>
      <Tag color={color}>{statusString}</Tag>
      {status === Status.confirmed && (
        <Popconfirm
          title="Chuyển trạng thái bắt đầu khám?"
          onConfirm={onClick}
          okText="Có"
          cancelText="Không"
        >
          <DoubleRightOutlined />
        </Popconfirm>
      )}
    </div>
  );
}

export default StatusTag;
