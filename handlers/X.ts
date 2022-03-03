import { romanMapper } from '../roman.mapper';
import * as strings from "../strings-prototype";
import { Counter } from '../types';

export const handleWithX = (count: Counter): Counter => {

  let { hindu, roman } = count;

  const wrongForth = 'XXXX';
  const indexOfX = strings.getIndex(roman, romanMapper[10]);
  const hasFourX = indexOfX.length === 4 && indexOfX[0] === roman.length - 4;
  const isMultipleOfFive = (hindu / 50) % 2 === 1;
  
  if (isMultipleOfFive) {
    roman = roman.replace('XLX', romanMapper[50]);
    return { hindu, roman };
  }

  if (hasFourX) {
    roman = roman.replace(wrongForth,  romanMapper[40])
  }

  return {hindu, roman};
}

