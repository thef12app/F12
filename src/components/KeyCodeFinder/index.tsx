import React, { useEffect, useState } from 'react';

import { Tooltip, Typography } from 'antd';
import { WindowsFilled, CheckCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

import style from './keycode.module.scss';

const CopyableEventProp: React.FC<{
  keyName: string;
  value: string;
  keyDescription?: string;
  comma?: boolean;
}> = ({ keyName, value: _value, comma = false, keyDescription }) => {
  const value = String(_value);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    const valueToCopy = typeof _value === 'string' ? `"${value}"` : value;

    copy(`event.${keyName.trim()} === ${valueToCopy}`);
    setCopied(true);

    const id = window.setTimeout(() => {
      setCopied(false);
    }, 500);
    setTimeoutId(id);
  };
  return (
    <pre onClick={copyValue} className={style.codeLine}>
      {keyName}
      {keyDescription && ` (${keyDescription})`}:{' '}
      <Tooltip
        visible={copied}
        title={
          <span>
            <CheckCircleOutlined /> Copied
          </span>
        }
        placement="right"
      >
        <span>{value}</span>
        {comma && ','}
      </Tooltip>
    </pre>
  );
};

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
    const { metaKey, location, code, key, altKey, which, shiftKey, ctrlKey } =
      event;
    const keyLocations = {
      0: 'General keys',
      1: 'Left-side modifier keys',
      2: 'Right-side modifier keys',
      3: 'Numpad',
    };
    if (event.isComposing || event.keyCode === 229) return;

    event.preventDefault();
    const keyCode = {
      renderedLocation: keyLocations[location as 1 | 2 | 3 | 0],
      renderedCode: <span>{code}</span>,
      location,
      code,
      key,
      metaKey,
      altKey,
      which,
      ctrlKey,
      shiftKey,
    };

    if (metaKey) {
      keyCode.renderedCode = (
        <span>
          {code} (Command ⌘ / Windows Key <WindowsFilled />)
        </span>
      );
    }

    if (altKey) {
      keyCode.renderedCode = <span>{code} (Option ⌥ / Alt)</span>;
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
            <pre className={style.code}>
              {'{'}
              <CopyableEventProp value={keyCode.key} keyName={'  key'} comma />
              <CopyableEventProp
                value={keyCode.code}
                keyName={'  code'}
                comma
              />
              <CopyableEventProp
                value={keyCode.location}
                keyName={'  location'}
                comma
              />
              <CopyableEventProp
                value={keyCode.which}
                keyName={'  which'}
                keyDescription="deprecated"
                comma
              />
              <pre className={style.codeLine}>{'\n  '}/* Modifier Keys */</pre>
              <CopyableEventProp
                value={keyCode.metaKey}
                keyName={'  metaKey'}
                comma
              />
              <CopyableEventProp
                value={keyCode.shiftKey}
                keyName={'  shiftKey'}
                comma
              />
              <CopyableEventProp
                value={keyCode.ctrlKey}
                keyName={'  ctrlKey'}
                comma
              />
              <CopyableEventProp value={keyCode.altKey} keyName={'  altKey'} />
              {'}'}
            </pre>
            <Typography.Text type="secondary" className={style.copyHint}>
              Click fields to copy condition
            </Typography.Text>
          </div>
        )}
      </div>
    </>
  );
};
