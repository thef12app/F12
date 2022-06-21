import { Textarea, Button, Grid, Spacer } from '@nextui-org/react';
import React, { createRef, useState, useEffect } from 'react';
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
    <>
      <div style={{ marginTop: '25px' }}>
        <Button.Group>
          <Button
            flat={!encode}
            className={encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(true)}
          >
            Encode
          </Button>
          <Button
            flat={encode}
            className={!encode ? 'enabled' : style.disabled}
            onClick={() => setEncode(false)}
          >
            Decode
          </Button>
        </Button.Group>
      </div>
      <Spacer y={2} />

      <Grid.Container css={{ w: '100%' }} gap={1} direction="row">
        <Grid xs>
          <Textarea
            css={{
              w: '100%',
            }}
            autoFocus
            bordered
            style={{
              background: error ? '#ffc0ca' : 'initial',
              marginLeft: '10px',
            }}
            onChange={(event) => encodeDecode(event.target.value)}
            labelPlaceholder={`Enter text to ${
              encode ? 'encode to' : 'decode from'
            } Base64`}
          />
        </Grid>
        <Grid xs>
          <Textarea
            placeholder=""
            value={result}
            readOnly
            css={{
              w: '100%',
            }}
          />
        </Grid>
      </Grid.Container>
    </>
  );
};
