const checkEmailvalidity = email => {
  const emailRegex = /^[\w\-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,5}$/;
  return emailRegex.test(email);
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  let message = '';

  if (!rules) {
    return { isValid, message };
  }

  if (rules.required && value.toString().trim() === '') {
    isValid = false;
    message = 'is required.';
  } else if (rules.minlength && value.length < rules.minlength) {
    isValid = false;
    message = 'should be atleast ' + rules.minlength + ' characters.';
  } else if (rules.maxlength && value.length > rules.maxlength) {
    isValid = false;
    message = 'should be maximum ' + rules.maxlength + ' characters.';
  } else if (rules.email && !checkEmailvalidity(value)) {
    isValid = false;
    message = ' is invalid.';
  } else {
    isValid = true;
    message = '';
  }
  return { isValid, message };
};
