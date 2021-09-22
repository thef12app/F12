import React, { createRef, useEffect, useState } from 'react';
import style from './keycode.module.scss';

export const KeyCodeFinder = () => {
  const containerRef = createRef();
  const [keyCode, setKeyCode] = useState(null);

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

  const captureKey = (event) => {
    const { metaKey, location, code } = event;
    const keyLocations = {
      0: 'General keys',
      1: 'Left-side modifier keys',
      2: 'Right-side modifier keys',
      3: 'Numpad',
    };
    if (event.isComposing || event.keyCode === 229) return;
    if (!metaKey) {
      event.preventDefault();
    }
    setKeyCode({
      location: location,
      renderedLocation: keyLocations[location],
      code,
    });
  };
  return (
    <div className={style.keycodeContainer}>
      {keyCode && (
        <div className={style.keycodeCard}>
          <div>
            <span style={{ color: '#444', fontWeight: 900 }} title="event.code">
              {keyCode.code}
            </span>
          </div>

          <span title={`event.location` + keyCode.location}>
            {keyCode.renderedLocation}
          </span>
        </div>
      )}
      {!keyCode && <h3>Start pressing keys to get more info.</h3>}

      {keyCode && (
        <div className={style.jsonObject}>
          <code>
            {JSON.stringify({
              code: keyCode.code,
              location: keyCode.location,
            })}
          </code>
        </div>
      )}
    </div>
  );
};
