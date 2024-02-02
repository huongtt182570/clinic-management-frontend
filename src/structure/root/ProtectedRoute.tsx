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
  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, [dispatch]);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) navigate('/');
  });
  return children;
}

export default ProtectedRoute;
