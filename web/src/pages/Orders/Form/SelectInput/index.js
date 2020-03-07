import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function Select({ apiPath, value, onChange }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    async function loadElements() {
      const response = await api.get(apiPath);

      const data = response.data.map(e => ({
        value: e.id,
        label: e.name,
      }));

      setElements(data);
    }

    loadElements();
  }, [apiPath]);

  function filterElements(inputValue) {
    return elements.filter(e =>
      e.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const promiseElements = inputValue =>
    new Promise(resolve => {
      resolve(filterElements(inputValue));
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={elements}
      loadOptions={promiseElements}
      options={elements}
      value={value}
      onChange={onChange}
    />
  );
}

Select.propTypes = {
  apiPath: PropTypes.string.isRequired,
  value: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
};
