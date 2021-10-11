import React, { createRef, useEffect, useState } from 'react';
import style from './keycode.module.scss';
import { Button } from 'antd';

export const KeyCodeFinder = () => {
  const [keyCode, setKeyCode] = useState<any>(null);

  useEffect(() => {
    document.body.onkeydown = (e) => captureKey(e);
    document.body.onkeyup = (e) => {
      if (e.code === '44') {
        captureKey(e);
      }
    };
    return () => {
      document.body.onkeydown = () => {};
    };
  }, []);

  const captureKey = (event: KeyboardEvent) => {
    const { metaKey, location, code, key, altKey } = event;
    const keyLocations = {
      0: 'General keys',
      1: 'Left-side modifier keys',
      2: 'Right-side modifier keys',
      3: 'Numpad',
    };
    if (event.isComposing || event.keyCode === 229) return;

    const keyCode = {
      location: location,
      renderedLocation: keyLocations[location as 1 | 2 | 3 | 0],
      renderedCode: `${code} `,
      code,
      key,
      metaKey,
    };
    if (metaKey) {
      keyCode.renderedCode = `${code} (Command ⌘ / Windows Key ⊞)`;
    }
    if (altKey) {
      keyCode.renderedCode = `${code} ( Option / Alt) `;
    }
    setKeyCode(keyCode);
  };
  return (
    <>
      <div className={style.keycodeContainer}>
        {keyCode && (
          <div className={style.keycodeCard}>
            <div>
              <span style={{ color: '#444', fontWeight: 900 }}>
                {keyCode.renderedCode}
              </span>
            </div>

            <span title={`event.location` + keyCode.location}>
              {keyCode.renderedLocation}
            </span>
          </div>
        )}
        {!keyCode && (
          <h3 style={{ fontWeight: 600 }}>
            Start pressing keys to get more info.
          </h3>
        )}

        {keyCode && (
          <div className={style.jsonObject}>
            <pre>
              event:{' '}
              {JSON.stringify(
                {
                  key: keyCode.key,
                  code: keyCode.code,
                  location: keyCode.location,
                  metaKey: keyCode.metaKey,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};
