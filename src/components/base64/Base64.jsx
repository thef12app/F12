import React, { createRef, useState, useEffect } from 'react';
import style from './style.module.scss';

export const Base64 = () => {
  const [encode, setEncode] = useState(true);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);
  const ref = createRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const encodeDecode = (value) => {
    let encodedValue;
    if (encode) {
      encodedValue = btoa(value);
      setError(false);
    } else {
      try {
        encodedValue = atob(value);
        setError(false);
      } catch (er) {
        encodedValue = 'Invalid Base64 String';
        setError(true);
      }
    }
    setResult(encodedValue);
  };
  return (
    <>
      <span className={style.heading}>Base64 Encoder Decoder</span>
      <div style={{ marginTop: '25px' }}>
        <div className={style.buttonGroup}>
          <button
            className={encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(true)}
          >
            Encode
          </button>
          <button
            className={!encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(false)}
          >
            Decode
          </button>
        </div>
      </div>
      <div className={style.row}>
        <textarea
          ref={ref}
          style={{
            background: error ? '#ffc0ca' : 'white',
            marginLeft: '10px',
          }}
          onChange={(event) => encodeDecode(event.target.value)}
          placeholder={`Enter text to ${
            encode ? 'encode to' : 'decode from'
          } Base64`}
        />
        <textarea placeholder="" value={result} readOnly />
      </div>
    </>
  );
};
