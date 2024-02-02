import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../pages/hook';
import { getUserInfoAsync } from '../../redux/slices/authSlice';
interface IProtectedRoute {
  children: JSX.Element;
}

function ProtectedRoute({ children }: IProtectedRoute) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //   const role = useAppSelector((state) => state.auth.user?.role);
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) dispatch(getUserInfoAsync());
  }, [dispatch, accessToken]);
  useEffect(() => {
    if (!accessToken) navigate('/');
  }, []);
  return children;
}

export default ProtectedRoute;
