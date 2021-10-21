import zxcvbn from 'zxcvbn';

export const isEmpty = value => {
  if (value.trim() === '') {
    return true;
  }
  return false;
};

export const validatePassword = value => {
  if (zxcvbn(value.password).score <= 1) {
    return 'is not strong enough!';
  }
  return false;
};

export const validateEmail = value => {
  if (isEmpty(value.email)) {
    return 'Email address is required';
  } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value.email)) {
    return 'Email address is invalid';
  }
  return false;
};

export const checkValidity = (value, rules) => {
  if (value.email) {
    return validateEmail(value);
  }

  if (value.password) {
    return validatePassword(value);
  }

  if (isEmpty(value)) {
    return 'is required!';
  }

  if (rules.minLength) {
    if (value.length < rules.minLength) {
      return 'needs to have minimum of ' + rules.minLength + ' characters!';
    }
  }

  if (rules.maxLength) {
    if (value.length > rules.maxLength) {
      return 'can only have a maximum of ' + rules.maxLength + ' characters!';
    }
  }
  return false;
};
