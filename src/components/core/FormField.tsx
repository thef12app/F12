import React  from 'react';
import { Field } from 'rc-field-form';

import styles from './FormField.module.scss';
import { FieldProps } from 'rc-field-form/es/Field';

export interface FormFieldProps extends FieldProps {
}

export const FormField: React.FC<FormFieldProps> = ({ name, children, ...restProps }) => {
  return (
    <>
      <Field {...restProps} name={name}>
        {(control, meta, form) => {
          const childNode =
            typeof children === 'function'
              ? children(control, meta, form)
              : React.cloneElement(children as React.ReactElement, {
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
