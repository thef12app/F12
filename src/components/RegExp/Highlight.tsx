import React from 'react';
import escapeRegExp from 'lodash';

export const Highlighted = ({ text = '', highlight = '', style = {} }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);
  return (
    <span contentEditable="true" style={style}>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};
