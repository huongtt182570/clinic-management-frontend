import { Tag } from 'antd';
import { Status } from '../../pages/enum';

function StatusTag(props: { status: string }) {
  const { status } = props;
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
      statusString = 'xác nhận';
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
    <div>
      <Tag color={color}>{statusString}</Tag>
    </div>
  );
}

export default StatusTag;
