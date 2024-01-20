import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Thực hiện cuộc gọi API để lấy danh sách lịch đặt cần được chấp nhận
const fetchPendingAppointments = async () => {
    try {
        const response = await axios.get(`${API_URL}/pendingAppointments`);
        const pendingAppointments = response.data;
        console.log('Pending Appointments:', pendingAppointments);
    } catch (error) {
        console.error('Error fetching pending appointments:', error);
    }
};

// Gọi hàm để thực hiện cuộc gọi API
fetchPendingAppointments();
