/* eslint-disable no-undef */
import formatMoney from '../formatMoney';

describe('formatMoney tests', () => {
  it('works with subunits', () => {
    const tests = [
      { input: 1, expected: '€0.01' },
      { input: 11, expected: '€0.11' },
      { input: 0.0001, expected: '€0.00' },
    ];

    tests.map((test) => (
      expect(formatMoney(test.input)).toEqual(test.expected)
    ));
  });

  it('returns whole units with zero decimal places', () => {
    const tests = [
      { input: 100, expected: '€1' },
      { input: 1000, expected: '€10' },
      { input: 10000000, expected: '€100,000' },
    ];

    tests.map((test) => (
      expect(formatMoney(test.input)).toEqual(test.expected)
    ));
  });

  it('works with whole and subunits at the same time', () => {
    const tests = [
      { input: 101, expected: '€1.01' },
      { input: 1111, expected: '€11.11' },
    ];

    tests.map((test) => (
      expect(formatMoney(test.input)).toEqual(test.expected)
    ));
  });

  it('comma separates thousands', () => {
    const tests = [
      { input: 100000001, expected: '€1,000,000.01' },
      { input: 111111111, expected: '€1,111,111.11' },
    ];

    tests.map((test) => (
      expect(formatMoney(test.input)).toEqual(test.expected)
    ));
  });
});
