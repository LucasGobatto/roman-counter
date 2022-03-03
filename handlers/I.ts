import { romanMapper } from "../roman.mapper";
import * as strings from "../strings-prototype";
import { Counter } from "../types";

export function handleWithI(counter: Counter): Counter {
	// I II III IV
	// VI VII VIII IX
	// XI XII XIII XIV
	// XVI XVII XVIII XIX
	// XXVI XXVII XXVIII XXIX
	// XXXVI XXXVII XXXXIII XXXIX
	// XLI XLII XLIII XLIV
	// XLVI XLVII XLVIII XLIX
	// LI LII LIII LIV
	// LVI LVII LVIII LIX
	// LXXXI LXXXII LXXXIII LXXXIX
	// XCVI XCVII XCVIII XCIX

	let { hindu, roman } = counter;
	const lastChar = roman?.length - 1;

	const indexOfI = strings.getIndex(roman, romanMapper[1]);
	
	if (indexOfI[0] === -1) {
		roman += romanMapper[1];
		return { hindu, roman }; 
	}

	const hasTreeI = indexOfI.length === 3;

	if (!hasTreeI && indexOfI.filter((i) => i === lastChar).length) {
		roman += romanMapper[1];
	}

  if (hasTreeI) {
		if (roman.indexOf(romanMapper[8]) === -1) {
			roman = roman.slice(0, -3) + romanMapper[4]; 
		}  else {
			roman = roman.slice(0, -4) + romanMapper[9];
		}
	}

	const hasOneIAndIsNotAtTheEnd = indexOfI.length === 1 && indexOfI[0] !== lastChar;

	if (hasOneIAndIsNotAtTheEnd) {
			roman = roman.slice(0, -2) + roman.charAt(lastChar);
	}

	return { hindu, roman };
}
