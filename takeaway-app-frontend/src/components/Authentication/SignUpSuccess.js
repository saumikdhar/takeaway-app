import classes from './SignUpSuccess.module.css';
import Card from '../UI/Card';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const SignUpSuccess = props => {
  const dispatch = useDispatch();

  dispatch(authActions.clearState());

  return (
    <section className={classes.signUpSuccess}>
      <Card>
        <div className={classes['main-container']}>
          <div className={classes['check-container']}>
            <div className={classes['check-background']}>
              <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 25L27.3077 44L58.5 7"
                  stroke="white"
                  stroke-width="13"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={classes['check-shadow']}></div>
          </div>
        </div>
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
