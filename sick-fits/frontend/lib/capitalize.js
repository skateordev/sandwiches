/**
 * Takes the given string and makes the first character uppercase
 * @param string: the string to capitalize
 */

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize;
