import React, { useMemo } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import styles from './UriInspector.module.scss';
import { composeURL } from '../../utils';

export const UriPartsRenderer = ({ parsedUrl }) => {
  const {
    protocol,

    username,
    password,

    hostname,
    port,

    pathname,

    searchParams,
    hash,
  } = useMemo(() => {
    return {
      ...parsedUrl,
      pathname:
        parsedUrl.pathname === '/'
          ? ''
          : parsedUrl.pathname
              .split('/')
              .map((p) => encodeURIComponent(p))
              .join('/'),
      username: parsedUrl.username && encodeURIComponent(parsedUrl.username),
      password: parsedUrl.password && encodeURIComponent(parsedUrl.password),
      searchParams:
        parsedUrl.searchParams &&
        !!parsedUrl.searchParams.length &&
        parsedUrl.searchParams
          .filter(([k]) => k)
          .map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)]),
    };
  }, [parsedUrl]);

  const _copyToClipboard = () => {
    copyToClipboard(
      composeURL({
        protocol,
        username,
        password,
        hostname,
        port,
        pathname,
        search:
          searchParams &&
          searchParams.length &&
          '?' + searchParams.map(([k, v]) => `${k}${v && '=' + v}`).join('&'),
        hash,
      })
    );
  };

  return (
    <div className={styles.urlPartsContainer}>
      {protocol && (
        <span>
          <span className={styles.urlPart} title="Protocol">
            {protocol}
          </span>
          ://
        </span>
      )}
      {username && <span className={styles.urlPart}>{username}</span>}
      {password && (
        <span>
          :<span className={styles.urlPart}>{password}</span>
        </span>
      )}
      {(username || password) && '@'}
      {hostname && <span className={styles.urlPart}>{hostname}</span>}
      {port && (
        <span>
          :<span className={styles.urlPart}>{port}</span>
        </span>
      )}
      {pathname && <span>{pathname}</span>}
      {searchParams && !!searchParams.length && (
        <span>
          ?
          <span>
            {searchParams.map((p, i, list) => (
              <React.Fragment key={i}>
                <span className={styles.urlPart}>
                  {p[0]}
                  {p[1] && '='}
                  {p[1]}
                </span>
                {i !== list.length - 1 && '&'}
              </React.Fragment>
            ))}
          </span>
        </span>
      )}

      {hash && <span className={styles.urlPart}>{hash}</span>}
      <div>
        <button
          onClick={_copyToClipboard}
          className={styles.copyToClipboardBtn}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};
