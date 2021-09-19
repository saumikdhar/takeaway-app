import classes from './Authentication.module.css';

// import FacebookLogin from 'react-facebook-login';

import { useState, useRef } from 'react';

const Authentication = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
  };

  const changeRememberMeHandler = () => {
    setIsChecked(prevState => !prevState);
  };

  //   const responseFacebook = response => {
  //     console.log(response);
  //   };

  return (
    <section className={classes.authentication}>
      <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
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
          <div className={classes.button}>
            {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          </div>
          {/* {isLogin && (
            <FacebookLogin
              appId="604579027581681"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
            />
          )} */}
          {isLoading && <p>Sending request...</p>}
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Don't have an account? Sign Up" : 'Login with existing account'}
          </button>
        </div>

        <p>
          By creating an account you agree to our{' '}
          <a href="/terms-and-conditions" className={classes['o-link']}>
            Terms and Conditions
          </a>
          . Please read our{' '}
          <a href="/privacy-policy" className={classes['o-link']}>
            Privacy Policy.
          </a>
        </p>
      </form>
    </section>
  );
};

export default Authentication;
