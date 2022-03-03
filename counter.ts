import { Counter } from "./types";
import { handleWithL, handleWithX, handleWithI } from "./handlers";
import { handleWithC } from "./handlers/C";
import { handleWithD } from "./handlers/D";

export function increase(counter: Counter): Counter {
	let { hindu, roman } = counter;
	hindu += 1;
	const lengthOfRomanNumber = roman?.length;

	if (!lengthOfRomanNumber) {
		roman = 'I'
		return { hindu, roman };
	}

	let response = handleWithI({ hindu, roman });

	if (hindu > 30) {
		response = handleWithX(response);
	}

	if (hindu > 90) {
		response = handleWithL(response);
	}

	if (hindu > 390) {
		response = handleWithC(response)
	}

	if (hindu > 890) {
		response = handleWithD(response);
	}
	return response;
}
