export interface authState {
  user: {
    id: number;
    phone: string;
    fullname: string;
    email: string;
    address: string;
    birthday: string;
    gender: string;
    role: string;
    doctor?: any;
  };
}
