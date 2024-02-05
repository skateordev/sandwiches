import { useState } from "react"

export default function useForm(initial = {}) {
  // create a state object for inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(evt) {
    let { name, type, files, value } = evt.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      // assign files to the first item (aka first file) in the [value] array
      [value] = files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    console.log('inputs', inputs);
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  return {
    inputs,
    clearForm,
    resetForm,
    handleChange,
  }
};
