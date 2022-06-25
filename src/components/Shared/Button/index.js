import React from 'react';

const Button = ({ content, disabled }) => {
    return (
        <button disabled = { disabled }>{ content }</button>
    );
};

export default Button;
