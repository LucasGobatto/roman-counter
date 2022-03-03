const strings = {
	getIndex,
}

const romanMapper = {
	1: "I",
	4: "IV",
	5: "V",
	8: "VIII",
	9: "IX",
	10: "X",
	40: "XL",
	50: "L",
	100: "C",
	400: "CD",
	500: "D",
	900: "DM",
	1000: "M",
};

function handleWithI(counter) {
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

function handleWithX(count) {
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

function handleWithL(counter) {
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

function handleWithC(count) {
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

function handleWithD(count) {
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

function increase(counter) {
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

function handleClick() {
	setInterval(() => {
		const roman = document.querySelector('.roman');
		const hindu = document.querySelector('.hindu-arabic');
	
		const response = increase({ roman: roman.innerHTML, hindu: +hindu.innerHTML });
		
		roman.innerHTML = response.roman;
		hindu.innerHTML = response.hindu.toString();
	}, 500)
}

(function() {
	const button = document.querySelector('button');

	button.addEventListener('click', handleClick);
})()

function getIndex(s, char) {
	const indices = [];

	for(let i = 0; i < s.length; i++) {
		if (s[i] === char) {
			indices.push(i);
		}
	}

	return indices.length ? indices : [-1];
}