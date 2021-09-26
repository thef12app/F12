import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const FormikField = (props) => {
  return (
    <>
      <Field {...props} />
      <ErrorMessage name={props.name} />
    </>
  );
};
