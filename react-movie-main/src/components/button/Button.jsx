import React from 'react';
import PropTypes from 'prop-types'; // user the Node js ProtoType

import './button.scss'; // import .scss file for styling 

const Button = props => {
    return (
        <button
            className={`btn ${props.className}`} // the props data from the main page that tells which button was clicked
            onClick={props.onClick ? () => props.onClick(props.type) : null} // if else condition to check the on click button
        >
            {props.children}
        </button>
    );
}

export const OutlineButton = props => {
    return (
        <Button
            className={`btn-outline ${props.className}`} // the props data from the main page that tells which button was clicked
            onClick={props.onClick ? () => props.onClick() : null} // if else condition to check the on click button
        >
            {props.children}
        </Button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func 
}

export default Button;
