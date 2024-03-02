/* eslint-disable no-undef */
import capitalize from '../capitalize';

const TEST_STRING = 'capitalize me';

describe('capitalize tests', () => {
  it('makes the first letter in a string uppercase', () => {
    const expected = 'Capitalize me';

    expect(capitalize(TEST_STRING)).toEqual(expected);
  });

  it('returns null if no string is passed in', () => {
    expect(capitalize()).toBeNull();
  });
});
