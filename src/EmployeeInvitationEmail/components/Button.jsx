
import React from 'react';

const Button = ({ link, text }) => (
  <a href={link} target="_blank" className="button">
    {text}
  </a>
);

export default Button;
