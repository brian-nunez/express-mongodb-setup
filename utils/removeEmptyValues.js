// Removes empty values from Object
// Values removed are undefined, null, '', []

const removeEmptyValues = (obj = {}) => {
  const keyValues = Object.entries(obj);

  const removed = keyValues.reduce((acc, [key, value]) => {
    const valid = !(
      typeof value === 'undefined' ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    );
    if (!valid) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  return removed;
}

module.exports = removeEmptyValues;
