export const updateObject = (currentOject, updatedObject) => {
  return {
    ...currentOject,
    ...updatedObject
  };
};
