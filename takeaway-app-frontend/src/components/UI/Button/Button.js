import React from 'react';
import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
