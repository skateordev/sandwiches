/**
 * Takes the given string and makes the first character uppercase
 * @param {string} string: the string to capitalize
 */

function capitalize(string) {
  if (!string) return null;

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize;
