import classes from './SignUpSuccess.module.css';
import Card from '../UI/Card';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

import GreenTick from '../UI/GreenTick/GreenTick';
const SignUpSuccess = props => {
  const dispatch = useDispatch();

  dispatch(authActions.clearState());

  return (
    <section className={classes.signUpSuccess}>
      <Card>
        <GreenTick />
        <h2>Your Account has now been successfully created</h2>
        <p>
          A verification email has been sent. It will be expire after one day. If you not get
          verification Email click on resend link.
        </p>

        <p>Didn't receive the email yet?</p>
        <p>Please wait x mins before re-applying</p>
      </Card>
    </section>
  );
};

export default SignUpSuccess;
