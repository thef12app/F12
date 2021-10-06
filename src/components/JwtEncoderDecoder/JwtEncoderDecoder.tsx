import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';

import { Layout } from '../Layout/Layout';
import style from './style.module.scss';

export const JwtEncoderDecoder = () => {
  const [decode, setDecode] = useState('');
  const [errDecoding, setErrDecoding] = useState(false);

  const decodeJWT = (token: string) => {
    try {
      const decoded = jwt_decode(token);
      const decodedHeader = jwt_decode(token, { header: true });
      console.log(decoded);
      setDecode(
        JSON.stringify({ payload: decoded, header: decodedHeader }, null, 2)
      );
      setErrDecoding(false);
    } catch (err) {
      console.log(err);
      setErrDecoding(true);
    } finally {
    }
  };

  return (
    <Layout title={'JWT Decoder'}>
      <div className={style.row}>
        <textarea
          style={{
            background: errDecoding ? '#ffc0ca' : '',
            marginLeft: '15px',
          }}
          placeholder="Enter JWT Token to Decode"
          onChange={(e) => decodeJWT(e.target.value)}
          defaultValue=""
        ></textarea>
        <textarea
          readOnly
          value={!errDecoding ? decode : 'Invalid JWT! Enter Valid JWT'}
          defaultValue=""
        ></textarea>
      </div>
    </Layout>
  );
};
