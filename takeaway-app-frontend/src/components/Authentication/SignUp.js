import classes from './SignUp.module.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, userSignUp, authActions } from '../../store/auth-slice';

const SignUp = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const { isFetching, errorMessage } = useSelector(authSelector);
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    surname: true,
    emailAddress: true,
    password: true,
    phoneNumber: true
  });

  const isEmpty = value => value.trim() === '';

  const submitHandler = async event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value.toString();

    setFormInputsValidity({
      firstName: !isEmpty(enteredFirstName),
      surname: !isEmpty(enteredSurname),
      emailAddress:
        !isEmpty(enteredEmail) && /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(enteredEmail),
      password: !isEmpty(enteredPassword),
      phoneNumber: !isEmpty(enteredPhoneNumber)
    });

    const formIsValid =
      !isEmpty(enteredFirstName.trim()) &&
      !isEmpty(enteredSurname.trim()) &&
      !isEmpty(enteredEmail.trim()) &&
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(enteredEmail) &&
      !isEmpty(enteredPassword.trim()) &&
      !isEmpty(enteredPhoneNumber.trim());
    if (!formIsValid) {
      return;
    }

    const data = {
      enteredFirstName,
      enteredSurname,
      enteredEmail,
      enteredPassword,
      enteredPhoneNumber
    };
    dispatch(userSignUp(data));
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const clearErrorHandler = () => {
    dispatch(authActions.clearState());
  };

  return (
    <section className={classes.authentication}>
      <h1> Registration</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.error}>
          <p>{errorMessage && errorMessage + '!'} </p>
        </div>
        <div className={classes.control}>
          <label htmlFor="firstName">Your First Name</label>
          <input type="text" id="firstName" required ref={firstNameInputRef} />
          {!formInputsValidity.firstName && (
            <div className={classes.error}>
              <div className={classes.left}>Please enter a valid first name!</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="surname">Your Surname</label>
          <input type="text" id="surname" required ref={surnameInputRef} />
          {!formInputsValidity.surname && (
            <div className={classes.error}>
              <div className={classes.left}>Please enter a valid surname!</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="phoneNumber">Your phone number</label>
          <input type="number" id="phoneNumber" required ref={phoneNumberInputRef} />
          {!formInputsValidity.phoneNumber && (
            <div className={classes.error}>
              <div className={classes.left}>Please enter a valid phone number!</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
          {!formInputsValidity.emailAddress && (
            <div className={classes.error}>
              <div className={classes.left}>Please enter a valid email address!</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
          {!formInputsValidity.password && (
            <div className={classes.error}>
              <div className={classes.left}>Please enter a valid password!</div>
            </div>
          )}
        </div>

        <div className={classes.actions}>
          <div className={classes.button}>{!isFetching && <Button>Create Account</Button>}</div>

          {isFetching && <Loader />}
          <Link to="/account/login">
            <button type="button" className={classes.toggle} onClick={clearErrorHandler}>
              Login with existing account
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

export default SignUp;
