import React from 'react';

import classes from './Card.module.css';

const Card = props => {
  return <div className={[classes.card, classes[props.cardType]].join(' ')}>{props.children}</div>;
};
export default Card;
