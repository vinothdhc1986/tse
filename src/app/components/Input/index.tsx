import { set } from 'immer/dist/internal';
import React, { FC } from 'react';
import './styles.scss';
import Props from './typing';

const Input: FC<Props> = ({ className, value, setInputValue, type, list = [], name = '' }): JSX.Element => {

  const onCheckboxChange = (isChecked, index) => {
    let copyValues = value ? [...value] : [];
    let UpdatedCheckbox = [...copyValues];
    if (isChecked) {
      UpdatedCheckbox = [...UpdatedCheckbox, list[index].id];
    } else {
      UpdatedCheckbox = UpdatedCheckbox.filter(item => item !== UpdatedCheckbox[index]);
    }
    setInputValue && setInputValue(UpdatedCheckbox);
  };

  return <div className='input-container'>
    {(type === 'text' || type === 'number') && (
      <input type={type} value={value} onChange={(e) => setInputValue && setInputValue(e.target.value)} className={className} />)}
    {type === 'radio' && (
      list.map((item: any, index) => (
        <div key={index} className={` ${className}`}>
          <input type={type} name={name} id={name + '_' + index} value={item.label} checked={value === index} onChange={(e) => setInputValue && setInputValue(e.target.value)} className={className} />
          <label htmlFor={name + '_' + index}>{item.label}</label>
        </div>
      )
      ))}

    {type === 'file' && (<input type={type} onChange={(e) => setInputValue && setInputValue(e.target.files)} className={className} />)}

    {type == 'checkbox' && (
      list?.map((item: any, index) => {
        return (
          <div key={index} className={` ${className}` + ` checkbox-container`}>
            <input className='cb check2' type={type} id={name + '_' + index} value={item.value}
              checked={(value && value[index] === item?.id) ? true : false}
              onChange={(e) => onCheckboxChange(e.target.checked, index)} />
            <label htmlFor={name + '_' + index}>{item?.value}</label>
          </div>
        )
      }
      )
    )
    }

    {(type === 'textArea') && (
      <textarea value={value} onChange={(e) => setInputValue && setInputValue(e.target.value)} className={className} />)}
  </div>
}

export default Input;
