import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  // fix values of `initial` being undefined
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // initialValues will be undefined on first render
    // update inputs to the actual values once initialValues changes
    setInputs(initial);
  }, [initialValues]);

  function handleChange(evt) {
    let { value } = evt.target;
    const { name, type, files } = evt.target;

    if (type === 'number') {
      value = parseInt(value, 10);
    }

    if (type === 'file') {
      // assign files to the first item (aka first file) in the [value] array
      [value] = files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, '']),
    );

    setInputs(blankState);
  }

  return {
    inputs,
    clearForm,
    resetForm,
    handleChange,
  };
}
