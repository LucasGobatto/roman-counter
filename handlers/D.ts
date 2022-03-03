import { Counter } from "../types";
import * as strings from '../strings-prototype';
import { romanMapper } from "../roman.mapper";

export const handleWithD = (count: Counter): Counter => {
  let { hindu, roman } = count;

  const indexOfD = strings.getIndex(roman, romanMapper[500]);
  const haveTwoD = indexOfD.length === 2;
  const isMultipleOfHungred = (hindu / 1000) % 2 !== 0;

  if (haveTwoD) {
    roman = roman.replace('CD', romanMapper[1000])
  }

  if (isMultipleOfHungred) {
    roman = roman.replace('DMC', romanMapper[1000]);
  }

  return { hindu, roman };
}