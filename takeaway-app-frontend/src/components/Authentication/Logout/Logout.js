import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
  }, []);

  return (
    <>
      <Redirect to="/" />;
    </>
  );
};

export default Logout;
