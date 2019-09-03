import React from 'react';
import Form from '../form';

function NewForm(props) {
  const jobOpening = { title: '', description: '', errors: {} };

  return (
    <Form isNew jobOpening={jobOpening} />
  );
};

export default NewForm;
