import React, { useEffect, useState } from 'react';

import { getJobOpening } from '../../../services/job-opening-services.js';
import Form from '../form';

function UpdateForm(props) {
  const [jobOpening, setJobOpening] = useState({ id: "", title: "", description: "", errors: {} });

  useEffect(() => {
    const { match: { params: { id } }} = props;

    getJobOpening(id).then((res) => {
      const { title, description, errors } = res.data.attributes;
      setJobOpening({ id, title, description, errors });
    });
  }, [])

  return <Form jobOpening={jobOpening} />;
}

export default UpdateForm;
