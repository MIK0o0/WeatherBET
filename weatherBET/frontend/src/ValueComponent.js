import React, { useState } from 'react';

export default function IntegerInput() {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(parseInt(inputValue)); // Parsowanie wprowadzonej wartości na liczbę całkowitą
  };

  return (
    <div>
      <input type="number" step="1" value={value} onChange={handleChange} />
    </div>
  );
}