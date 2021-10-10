import { Button } from 'antd';
import React, { createRef, useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import style from './style.module.scss';

export const Base64 = () => {
  const [encode, setEncode] = useState(true);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);
  // const ref = createRef();

  useEffect(() => {
    // ref.current.focus();
  }, []);

  const encodeDecode = (value: string) => {
    let encodedValue;
    if (encode) {
      encodedValue = window.btoa(value);
      setError(false);
    } else {
      try {
        encodedValue = window.atob(value);
        setError(false);
      } catch (er) {
        encodedValue = 'Invalid Base64 String';
        setError(true);
      }
    }
    setResult(encodedValue);
  };
  return (
    <Layout title={'Base64 Encoder Decoder'}>
      <div style={{ marginTop: '25px' }}>
        <div className={style.buttonGroup}>
          <Button
            size="large"
            type="primary"
            className={encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(true)}
          >
            Encode
          </Button>
          <Button
            size="large"
            type="primary"
            className={!encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(false)}
          >
            Decode
          </Button>
        </div>
      </div>
      <div className={style.row}>
        <textarea
          autoFocus
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
    </Layout>
  );
};
