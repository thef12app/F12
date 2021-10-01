import React, { useMemo } from 'react';
import styles from './UriInspector.module.scss';

export const UriPartsRenderer = ({ parsedUrl }) => {
  const {
    protocol,

    username,
    password,

    hostname,
    port,

    pathname: _pathname,

    searchParams: _searchParams,
    hash,
  } = parsedUrl;

  const searchParams = useMemo(
    () =>
      _searchParams &&
      !!_searchParams.length &&
      _searchParams.filter(([k]) => k),
    [_searchParams]
  );

  const pathname = _pathname === '/' ? '' : _pathname;

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
    </div>
  );
};
