import { capitalize, ceilEthers, floorEthers } from './string-helpers';

describe('capitalize', () => {
  test.each`
    value     | expected
    ${''}     | ${''}
    ${'abcd'} | ${'Abcd'}
    ${'Abcd'} | ${'Abcd'}
    ${'.'}    | ${'.'}
  `('capitalize: $value', ({ value, expected }) => {
    expect(capitalize(value)).toBe(expected);
  });
});

describe('round-ethers', () => {
  test.each`
    value               | decimals
    ${'999.999999999'}  | ${0}
    ${'999.999999999'}  | ${6}
    ${'1000.999999999'} | ${6}
    ${'1000.1234567'}   | ${6}
    ${'1000.1234560'}   | ${6}
    ${'1000.0'}         | ${6}
    ${'1000'}           | ${6}
    ${'0'}              | ${6}
    ${'0.0'}            | ${6}
    ${''}               | ${6}
  `('value: "$value", decimals: $decimals', ({ value, decimals }) => {
    expect(ceilEthers(value, decimals)).toMatchSnapshot('ceilEthers');
    expect(floorEthers(value, decimals)).toMatchSnapshot('floorEthers');
  });
});
