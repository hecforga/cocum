export const pushToArray = (array, item) => {
  return [
    ...array.slice(),
    item
  ];
};

export const popFromArray = (array) => {
  return [
    ...array.slice(0, -1)
  ];
};

export const updateItemAtPosition = (array, pos, newItem) => {
  return array.map((item, index) => {
    if(index !== pos) {
      return item;
    }

    return newItem;
  });
};