import classes from './SignUp.module.css';
import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, userSignUp, authActions } from '../../store/auth-slice';
import { checkValidity } from '../Validation/LoginFormValidationRules.js';
import PasswordStrengthMeter from '../UI/PasswordStrengthMeter/PasswordStrengthMeter';

const SignUp = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { isFetching, errorMessage, message } = useSelector(authSelector);
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: false,
    surname: false,
    emailAddress: false,
    password: false,
    phoneNumber: false
  });

  const submitHandler = async event => {
    event.preventDefault();

    let enteredEmail = emailInputRef.current.value;
    let enteredPassword = passwordInputRef.current.value;
    let enteredFirstName = firstNameInputRef.current.value;
    let enteredSurname = surnameInputRef.current.value;
    let enteredPhoneNumber = phoneNumberInputRef.current.value.toString();

    const enteredEmailValidity = checkValidity({ email: enteredEmail });
    const enteredPasswordValidity = checkValidity(
      { password: enteredPassword },
      { minLength: 7, maxLength: 20 }
    );
    const enteredFirstNameValidity = checkValidity(enteredFirstName, {
      minLength: 3,
      maxLength: 20,
      validateName: true
    });
    const enteredSurnameValidity = checkValidity(enteredSurname, {
      minLength: 3,
      maxLength: 20,
      validateName: true
    });
    const enteredPhoneNumberValidity = checkValidity(enteredPhoneNumber, {
      minLength: 10,
      maxLength: 10,
      validatePhone: true
    });

    setFormInputsValidity({
      firstName: enteredFirstNameValidity,
      surname: enteredSurnameValidity,
      emailAddress: enteredEmailValidity,
      password: enteredPasswordValidity,
      phoneNumber: enteredPhoneNumberValidity
    });

    const formIsValid =
      !enteredEmailValidity &&
      !enteredSurnameValidity &&
      !enteredEmailValidity &&
      !enteredPasswordValidity &&
      !enteredPhoneNumberValidity;

    if (!formIsValid) {
      return;
    }

    enteredEmail = enteredEmail.trim();
    enteredSurname = enteredSurname.trim();
    enteredFirstName = enteredFirstName.trim();
    enteredPhoneNumber = enteredPhoneNumber.trim();

    const data = {
      enteredFirstName,
      enteredSurname,
      enteredEmail,
      enteredPassword,
      enteredPhoneNumber
    };
    dispatch(userSignUp(data));
  };

  const clearErrorHandler = () => {
    dispatch(authActions.clearState());
  };

  if (message === 'User created!') {
    history.push('/account/success');
  }

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
          {formInputsValidity.firstName && (
            <div className={classes.error}>
              <div className={classes.left}>First name {formInputsValidity.firstName}</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="surname">Your Surname</label>
          <input type="text" id="surname" required ref={surnameInputRef} />
          {formInputsValidity.surname && (
            <div className={classes.error}>
              <div className={classes.left}>Surname {formInputsValidity.surname}</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="phoneNumber">Your phone number</label>
          <div className={classes.country}>
            {/* <select name="country" id="country">
              <option value="+44" required>
                +44
              </option>
            </select> */}
            <label className={classes.country}>+44</label>
            <input type="tel" id="phoneNumber" required ref={phoneNumberInputRef} />
          </div>
          {formInputsValidity.phoneNumber && (
            <div className={classes.error}>
              <div className={classes.left}>Phone number {formInputsValidity.phoneNumber}</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
          {formInputsValidity.emailAddress && (
            <div className={classes.error}>
              <div className={classes.left}>Email {formInputsValidity.emailAddress}</div>
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={e => setPassword(e.target.value)}
          />
          <PasswordStrengthMeter password={password} />
          {formInputsValidity.password && (
            <div className={classes.error}>
              <div className={classes.left}>Password {formInputsValidity.password}</div>
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
