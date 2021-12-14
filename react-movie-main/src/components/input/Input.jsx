import React from 'react';

import './input.scss';

const Input = props => {
    return (
        <input
            type={props.type} // take input from the user and onChnage function to change text based on user input 
            placeholder={props.placeholder} 
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
}

export default Input;
