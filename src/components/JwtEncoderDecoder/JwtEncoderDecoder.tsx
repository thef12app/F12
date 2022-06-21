import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import style from './style.module.scss';
import { Grid, Textarea } from '@nextui-org/react';

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
    <Grid.Container justify="flex-start" style={{ width: '100%' }} gap={1}>
      <Grid xs>
        <Textarea
          autoFocus
          bordered
          labelPlaceholder="Enter or Pase JWT Token to Decode"
          style={{
            marginLeft: '15px',
            maxWidth: '100%',
          }}
          css={{
            w: '100%',
          }}
          status={errDecoding ? 'error' : 'default'}
          onChange={(e) => decodeJWT(e.target.value)}
          defaultValue=""
        ></Textarea>
      </Grid>
      <Grid xs>
        <Textarea
          readOnly
          value={!errDecoding ? decode : 'Invalid JWT! Enter Valid JWT'}
          defaultValue=""
          style={{
            maxWidth: '100%',
          }}
          css={{
            w: '100%',
          }}
        ></Textarea>
      </Grid>
    </Grid.Container>
  );
};
