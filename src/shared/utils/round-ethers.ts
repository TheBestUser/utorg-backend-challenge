import { parseFixed } from '@ethersproject/bignumber';

export function ceilEthers(value: string, decimals = 18): string {
  const [integer, decimal] = parseFloatParts(value);

  const toCeilDigit = decimal[decimals] ?? '0';

  if (toCeilDigit === '0') {
    const decimalFixed = decimal.slice(0, decimals).padEnd(decimals, '0');
    return formatFloatParts(integer, decimalFixed, decimals);
  }

  const concatedAmount =
    integer + decimal.slice(0, decimals + 1).padEnd(decimals + 1, '0');
  const ceilString = parseFixed(concatedAmount, 0)
    .add(9)
    .toString()
    .slice(0, -1);

  const [integerFixed, decimalFixed] = [
    ceilString.substring(0, ceilString.length - decimals),
    ceilString.substring(ceilString.length - decimals),
  ];

  return formatFloatParts(integerFixed, decimalFixed, decimals);
}

export function floorEthers(value: string, decimals = 18): string {
  const [integer, decimal] = parseFloatParts(value);
  const decimalFixed = decimal.slice(0, decimals).padEnd(decimals, '0');
  return formatFloatParts(integer, decimalFixed, decimals);
}

function parseFloatParts(value: string): [string, string] {
  const [integer, decimal] = value.split('.');

  return [integer || '0', decimal || '0'];
}
function formatFloatParts(
  integer: string,
  decimal: string,
  decimals: number,
): string {
  return decimals <= 0 ? integer : `${integer}.${decimal}`;
}
