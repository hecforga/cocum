export const generateEventLabel = (data) => {
  let label = '';

  Object.keys(data).map((key, index) => {
    const value = data[key];

    if (index !== 0) {
      label += ', ';
    }

    label += key + ': ' + value;
  });

  return label;
};