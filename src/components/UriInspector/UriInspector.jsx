import React, { useEffect, useState } from 'react';

import { iteratorToArray } from '../../utils';
import styles from './UriInspector.module.scss';
import { UriPartsRenderer } from './UriPartsRenderer';
import { UriEditor } from './UriEditor';

export const UriInspector = () => {
  const [url, setUrl] = useState('');
  const [parseError, setParseError] = useState(null);
  const [parsedUrl, setParsedUrl] = useState(null);

  const parseUrl = (_url = url, silent = false) => {
    setParseError(null);
    setParsedUrl(null);
    console.log('url', _url);

    if (_url) {
      try {
        const parsed = new URL(_url);

        const { protocol, username, password, hostname, port, pathname, hash } =
          parsed;
        const searchParams = iteratorToArray(parsed.searchParams.entries());
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
      } catch (ex) {
        console.error(ex);
        if (!silent) setParseError(ex.message);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      parseUrl(e.target.value);
    }
  };

  useEffect(() => parseUrl(url, true), [url]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.uriInputWrapper}>
        <textarea
          name="url-input"
          className={styles.uriInput}
          rows={4}
          placeholder="Paste your URL here..."
          autoFocus
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={onKeyDown}
        ></textarea>
      </div>
      <button className={styles.parseBtn} onClick={() => parseUrl()}>
        Inspect [Enter]
      </button>

      {parseError && <div className={styles.parseError}>{parseError}</div>}

      {parsedUrl && <UriPartsRenderer parsedUrl={parsedUrl} />}

      {parsedUrl && <UriEditor parsedUrl={parsedUrl} />}
    </div>
  );
};
