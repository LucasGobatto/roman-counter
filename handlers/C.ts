import { Counter } from "../types";
import * as strings from "../strings-prototype";
import { romanMapper } from "../roman.mapper";

export const handleWithC = (count: Counter): Counter => {
  let { hindu, roman } = count;

  const wrongFourThousand = 'CCCC';
  const indexOfC = strings.getIndex(roman, romanMapper[100]);
  const hasFourC = indexOfC.length === 4 && indexOfC[0] === roman.length - 4;
  const isMultipleOfFive = (hindu / 500) % 2 !== 0;

  if (hasFourC) {
    roman = roman.replace(wrongFourThousand, romanMapper[400]);

    return { roman, hindu };
  }

  if (isMultipleOfFive) {
    roman = roman.replace('CDC', romanMapper[500]);
  }

  return { hindu, roman };
}