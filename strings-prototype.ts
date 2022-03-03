export const getIndex = (s: string, char: string): number[] => {
	const indices = [];

	for(let i = 0; i < s.length; i++) {
		if (s[i] === char) {
			indices.push(i);
		}
	}

	return indices.length ? indices : [-1];
}

export const getLastButOne = (s: string): string => {
	return s.length > 1 ? s[s.length - 2] : s;
}
