import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function Select({ apiPath, initialValue }) {
  const [elements, setElements] = useState([]);
  const [defaultValue, setDefaultValue] = useState([]);

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
  }, []);

  useEffect(() => {
    const element = elements.find(e => e.value === initialValue);
    setDefaultValue(element);
  }, [initialValue, elements]);

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
      defaultValue={defaultValue}
      options={elements}
    />
  );
}

Select.propTypes = {
  apiPath: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
};
