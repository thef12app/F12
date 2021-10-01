import React, { useState } from 'react';
import { Field } from 'rc-field-form';

import styles from './FormField.module.scss';

export const FormField = ({ name, children, ...restProps }) => {
  return (
    <>
      <Field {...restProps} name={name}>
        {(control, meta, form) => {
          console.log(control, '<<<<');
          const childNode =
            typeof children === 'function'
              ? children(control, meta, form)
              : React.cloneElement(children, {
                  ...control,
                });

          return (
            <>
              {childNode}
              {meta.errors &&
                meta.errors.map((e, i) => (
                  <div key={i} className={styles.errorMessage}>
                    {e}
                  </div>
                ))}
            </>
          );
        }}
      </Field>
    </>
  );
};
