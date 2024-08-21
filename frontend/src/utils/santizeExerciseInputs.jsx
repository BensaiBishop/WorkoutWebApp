export function sanitizeInputs(name, value) {
    if (value === null || value === '') {
        return null;
    }
  
    if (name === "exerciseName") {
      return value.slice(0, 21);
    }

    let sanitizedValue = parseFloat(value);

    if (isNaN(sanitizedValue) || sanitizedValue < 0) {
      return null;
    } else if (sanitizedValue > 99999) {
      return 99999;
    }
  
    return sanitizedValue;
}