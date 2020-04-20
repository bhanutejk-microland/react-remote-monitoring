export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const updateArrayObject = (oldObject, updatedProperties) => {
  return [
      ...oldObject,
      ...updatedProperties
  ];
};
