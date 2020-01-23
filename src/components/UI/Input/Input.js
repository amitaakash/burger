import React from 'react';

const Input = props => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'textbox':
      inputElement = <input {...props} onChange={props.onChange} />;
      break;
    case 'textarea':
      inputElement = <textarea {...props} onChange={props.onChange} />;
      break;
    case 'option':
      inputElement = (
        <select className="ui fluid dropdown" onChange={props.onChange}>
          {props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = null;
  }
  const classNameField = ['field'];
  if (props.validity && props.touched) {
    classNameField.push('error');
  }

  return (
    <div className={classNameField.join(' ')}>
      <label>{props.label}</label>
      {inputElement}
      {props.message ? (
        <small style={{ color: 'red' }}>{props.message}</small>
      ) : null}
    </div>
  );
};

export default Input;
