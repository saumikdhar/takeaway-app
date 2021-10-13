import classes from './Authentication.module.css';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';

import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, userAuth } from '../../store/auth-slice';
// import FacebookLogin from 'react-facebook-login';

const Authentication = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isFetching, errorMessage } = useSelector(authSelector);
  const [isChecked, setIsChecked] = useState(true);
  const [formInputsValidity, setFormInputsValidity] = useState({
    emailAddress: true,
    password: true
  });

  const isEmpty = value => value.trim() === '';

  const submitHandler = async event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setFormInputsValidity({
      emailAddress: !isEmpty(enteredEmail),
      password: !isEmpty(enteredPassword)
    });

    const formIsValid = !isEmpty(enteredEmail) && !isEmpty(enteredPassword);

    if (!formIsValid) {
      return;
    }
    const data = { enteredEmail, enteredPassword, isChecked };
    dispatch(userAuth(data));
    passwordInputRef.current.value = '';
  };

  const changeRememberMeHandler = () => {
    setIsChecked(prevState => !prevState);
  };

  //   const responseFacebook = response => {
  //     console.log(response);
  //   };

  return (
    <section className={classes.authentication}>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          {errorMessage && <p className={classes.error}> {errorMessage}!</p>}
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} maxLength={100} />
          {!formInputsValidity.emailAddress && (
            <div className={classes.error}>Please enter a valid email address!</div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} maxLength={100} />
          {!formInputsValidity.password && (
            <div className={classes.error}>Please enter a valid password!</div>
          )}
        </div>
        <div className={classes.row}>
          <div className={classes.rememberMe}>
            <input
              checked={isChecked}
              onChange={changeRememberMeHandler}
              name="RememberMe"
              type="checkbox"
              value="true"
            />
            <label htmlFor="RememberMe"> Remember me</label>
          </div>

          <div className={classes.forgottenPassword}>
            <a href="/account/forgotten-password" className={classes['o-link']}>
              Forgot Password
            </a>
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.button}>{!isFetching && <Button>Sign In</Button>}</div>
          {/* {isLogin && (
            <FacebookLogin
              appId="604579027581681"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
            />
          )} */}
          {isFetching && <Loader />}
          <Link to="/account/register">
            {' '}
            <button type="button" className={classes.toggle}>
              Don't have an account? Sign Up
            </button>
          </Link>
        </div>

        <p>
          By creating an account you agree to our{' '}
          <Link to="/info/terms-and-conditions">
            <label className={classes['o-link']}>Terms and Conditions</label>
          </Link>
          . Please read our{' '}
          <Link to="/info/privacy-policy">
            <label className={classes['o-link']}>Privacy Policy.</label>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Authentication;
