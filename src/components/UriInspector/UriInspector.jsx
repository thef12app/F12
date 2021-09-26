import React, { useEffect, useState } from 'react';

import { Formik, Form, FieldArray } from 'formik';

import { FormikField } from '../core/FormikField';
import { iteratorToArray } from '../../utils';
import styles from './UriInspector.module.scss';

export const UriInspector = () => {
  const [url, setUrl] = useState('');
  const [parseError, setParseError] = useState(null);
  const [parsedUrl, setParsedUrl] = useState(null);

  const {
    protocol,

    username,
    password,

    hostname,
    port,

    pathname,

    searchParams,
    hash,
  } = parsedUrl || {};

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
          protocol,

          username,
          password,

          hostname,
          port,

          pathname,

          searchParams,
          hash,
        });
        console.log({
          protocol,

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

      {parsedUrl && (
        <div>
          <div className={styles.urlPartsContainer}>
            {protocol && (
              <span>
                <span className={styles.urlPart} title="Protocol">
                  {protocol}
                </span>
                //
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
            {pathname && <span className={styles.urlPart}>{pathname}</span>}
            {searchParams && searchParams.length && (
              <span>
                ?
                <span className={styles.urlPart}>
                  {searchParams.map((p, i, list) => (
                    <React.Fragment key={i}>
                      <span>
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
          <Formik
            onSubmit={(e) => console.log(e)}
            initialValues={{
              protocol,
              username,
              password,
              hostname,
              pathname,
              hash,
              port,
              searchParams,
            }}
          >
            <Form onChange={(e) => console.log('e', e)}>
              {protocol && (
                <>
                  <div className={styles.urlEditSectionHeader}>Protocol</div>
                  <div>
                    <FormikField
                      name="protocol"
                      className={styles.editableField}
                    />
                  </div>
                </>
              )}
              {(password || username) && (
                <>
                  <div className={styles.urlEditSectionHeader}>
                    Authentication
                  </div>
                  <div className={styles.row}>
                    {username && (
                      <div className={styles.column}>
                        <div className={styles.label}>Username</div>
                        <FormikField
                          name="username"
                          className={styles.editableField}
                        />
                      </div>
                    )}
                    {password && (
                      <div className={styles.column}>
                        <div className={styles.label}>Password</div>
                        <FormikField
                          name="password"
                          className={styles.editableField}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
              {hostname && (
                <>
                  <div className={styles.urlEditSectionHeader}>Host</div>
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <div className={styles.label}>Hostname</div>
                      <FormikField
                        name="hostname"
                        className={styles.editableField}
                      />
                    </div>
                    <div className={styles.column}>
                      <div className={styles.label}>Port</div>
                      <FormikField
                        name="port"
                        className={styles.editableField}
                      />
                    </div>
                  </div>
                </>
              )}
              {pathname && (
                <>
                  <div className={styles.urlEditSectionHeader}>Pathname</div>
                  <div>
                    <FormikField
                      name="pathname"
                      className={styles.editableField}
                    />
                  </div>
                </>
              )}
              {searchParams && searchParams.length && (
                <>
                  <div className={styles.urlEditSectionHeader}>
                    Search Params
                  </div>
                  {searchParams.map((s, i) => (
                    <div className={styles.row} key={i}>
                      <div className={styles.column}>
                        <FormikField
                          name={`searchParams.${i}.0`}
                          className={styles.editableField}
                        />
                      </div>
                      <div className={styles.column}>
                        <FormikField
                          name={`searchParams.${i}.1`}
                          className={styles.editableField}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {hash && (
                <>
                  <div className={styles.urlEditSectionHeader}>Hash</div>
                  <div>
                    <FormikField className={styles.editableField} name="hash" />
                  </div>
                </>
              )}
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};
