import React, { useEffect } from 'react';

import Form, { useForm, List } from 'rc-field-form';
import URL from 'url-parse';

import styles from './UriInspector.module.scss';
import { FormField } from '../core/FormField';
import { iteratorToArray } from '../../utils';

const u = new URL('h://test.com');

export const UriEditor = ({ parsedUrl, onChange }) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(parsedUrl);
  }, [parsedUrl]);

  const onFormChange = async () => {
    const values = form.getFieldsValue();
    const errors = form.getFieldsError();
    const hasErrors = errors.some((e) => e.errors.length);

    try {
      if (!hasErrors) {
        const url = new URL('test://test.com');

        const searchParams = values.searchParams;
        let validatedSearchParams = [];
        if (searchParams?.length) {
          const parsedSearchParams = new URLSearchParams();
          searchParams.forEach((p) => parsedSearchParams.append(p[0], p[1]));
          validatedSearchParams = iteratorToArray(parsedSearchParams.entries());
        }

        url.set('protocol', values.protocol + ':');
        url.set('username', values.username || '');
        url.set('password', values.password || '');
        url.set('hostname', values.hostname);
        url.set('port', values.port || '');
        url.set('pathname', values.pathname || '/');
        url.set('hash', values.hash || '');

        const { protocol, username, password, hostname, port, pathname, hash } =
          url;

        onChange({
          protocol: protocol.replace(/\:$/, ''),
          username,
          password,
          hostname,
          port,
          pathname,
          hash,
          searchParams: validatedSearchParams,
        });
      } else {
        console.log('ignored');
      }
    } catch (ex) {
      console.log('ignored', ex);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onBlur={onFormChange}
        onKeyDown={(e) => e.key === 'Enter' && onFormChange()}
      >
        <div className={styles.urlEditSectionHeader}>Protocol</div>
        <FormField
          name="protocol"
          rules={[
            { required: true, message: 'Missing protocol' },
            { pattern: /^[a-z,A-Z,0-9,\.,\-]*$/, message: 'Invalid protocol' },
          ]}
        >
          <input placeholder={'Protocol'} className={styles.editableField} />
        </FormField>

        <div className={styles.urlEditSectionHeader}>Authentication</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Username</div>
            <FormField name="username">
              <input className={styles.editableField} />
            </FormField>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Password</div>
            <FormField name="password">
              <input className={styles.editableField} />
            </FormField>
          </div>
        </div>

        <div className={styles.urlEditSectionHeader}>Host</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Hostname</div>
            <FormField
              name="hostname"
              rules={[
                { required: true, message: 'Missing hostname' },
                {
                  pattern: /^[a-z]/,
                  message: 'Hostname should start with a-z',
                },
                {
                  pattern: /^[a-z][a-z,0-9,\-]*(\.[a-z][a-z,0-9,\-]*)*$/,
                  message: 'Invalid Hostname',
                },
              ]}
            >
              <input className={styles.editableField} />
            </FormField>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Port</div>
            <FormField
              name="port"
              rules={[{ pattern: /^[0-9]*$/, message: 'Invalid port number' }]}
            >
              <input className={styles.editableField} />
            </FormField>
          </div>
        </div>

        <div className={styles.urlEditSectionHeader}>Pathname</div>
        <div>
          <FormField
            name="pathname"
            rules={[
              { pattern: /^\//, message: 'Pathname should start with /' },
              {
                pattern: /^[^\s]*$/,
                message: 'Pathname cannot contain spaces',
              },
            ]}
          >
            <input className={styles.editableField} />
          </FormField>
        </div>

        <div className={styles.urlEditSectionHeader}>Search Params</div>
        <List name="searchParams">
          {(fields, { add, remove }) => {
            {
              return (
                <>
                  {fields.map((s, i) => (
                    <div className={styles.row} key={s.key}>
                      <div className={styles.column}>
                        <FormField name={[s.name, 0]}>
                          <input className={styles.editableField} />
                        </FormField>
                      </div>
                      <div className={styles.column}>
                        <FormField name={[s.name, 1]}>
                          <input className={styles.editableField} />
                        </FormField>
                      </div>
                    </div>
                  ))}

                  <div>
                    <button type="button" onClick={() => add(['', ''])}>
                      Add Param
                    </button>
                  </div>
                </>
              );
            }
          }}
        </List>

        <div className={styles.urlEditSectionHeader}>Hash</div>
        <div>
          <FormField
            name="hash"
            rules={[
              {
                whitespace: true,
                pattern: /^[^\s]*$/,
                message: 'Hash cannot contain spaces',
              },
            ]}
          >
            <input className={styles.editableField} />
          </FormField>
        </div>
      </Form>
    </div>
  );
};
