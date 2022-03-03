import { romanMapper } from "../roman.mapper";
import * as strings from "../strings-prototype";
import { Counter } from "../types";

export const handleWithL = (counter: Counter): Counter => {
  // 199: LXLIX C
  // 139: CXXXIX CL
  
  let { hindu, roman } = counter;

  const wrongThousand = 'LXLX';
  const indexOfX = strings.getIndex(roman, romanMapper[10])
  const indexOfL = strings.getIndex(roman, romanMapper[50]);
  const hasTwoLAndTwoX = indexOfX.length === 2 && indexOfL.length === 2;

  if (hasTwoLAndTwoX) {
    roman = roman.replace(wrongThousand, romanMapper[100]);
    return { roman, hindu };
  }

  return { hindu, roman };
}