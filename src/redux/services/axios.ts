import axios from 'axios';
import config from './config';

export const API_URL = 'https://clinic-management-api.up.railway.app/api/v1';

// Thực hiện cuộc gọi API để lấy danh sách lịch đặt cần được chấp nhận
// const fetchPendingAppointments = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/pendingAppointments`);
//     const pendingAppointments = response.data;
//     console.log('Pending Appointments:', pendingAppointments);
//   } catch (error) {
//     console.error('Error fetching pending appointments:', error);
//   }
// };

const fetchHandler = axios.create(config.api);

export default fetchHandler;
// Gọi hàm để thực hiện cuộc gọi API
// fetchPendingAppointments();
