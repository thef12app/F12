import React, { useEffect, useState } from 'react';
import URL from 'url-parse';

import { iteratorToArray } from '../../utils';
import styles from './UriInspector.module.scss';
import { UriPartsRenderer } from './UriPartsRenderer';
import { UriEditor } from './UriEditor';
import { Textarea, Button, Spacer, Input, Divider } from '@nextui-org/react';

export const UriInspector = () => {
  const [url, setUrl] = useState('');
  const [parseError, setParseError] = useState(null);
  const [parsedUrl, setParsedUrl] = useState<any>(null);

  const parseUrl = (_url = url, silent = false) => {
    setParseError(null);
    setParsedUrl(null);

    if (_url) {
      try {
        if (!/^[a-z][a-z,\-,\.]*:\/\//.test(_url)) {
          throw new Error('Invalid URL');
        }

        const parsed = new URL(_url);

        const { protocol, username, password, hostname, port, pathname, hash } =
          parsed;
        const searchParamsObject = new URLSearchParams(
          (parsed.query as any) || ''
        );
        const searchParams = iteratorToArray(searchParamsObject.entries());
        setParsedUrl({
          protocol: protocol.replace(/\:$/, ''),

          username,
          password,

          hostname,
          port,

          pathname,

          searchParams,
          hash,
        });
      } catch (ex: any) {
        console.error(ex);
        if (!silent) setParseError(ex.message);
      }
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      parseUrl((e.target as any).value);
    }
  };

  useEffect(() => parseUrl(url, true), [url]);

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.uriInputWrapper}>
          <Input
            name="url-input"
            labelPlaceholder="Paste your URL here"
            placeholder="Paste your URL here"
            autoFocus
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ width: '700px' }}
            css={{ w: '100%' }}
            bordered
          ></Input>
        </div>
        <Spacer y={1}></Spacer>
        <Button
          flat
          bordered
          style={{ marginTop: 5 }}
          onClick={() => parseUrl()}
        >
          Inspect [Enter]
        </Button>

        <Spacer y={2}></Spacer>
        <Divider></Divider>
        {parseError && <div className={styles.parseError}>{parseError}</div>}

        {parsedUrl && <UriPartsRenderer parsedUrl={parsedUrl} />}

        {parsedUrl && (
          <UriEditor
            parsedUrl={parsedUrl}
            onChange={(val) => setParsedUrl(val)}
          />
        )}
      </div>
    </>
  );
};
