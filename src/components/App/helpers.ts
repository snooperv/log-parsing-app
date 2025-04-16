export const filterByKeywords = (text: string, keys: string[], mode: 'AND' | 'OR') => {
	if (!keys.length) {
		return true;
	}

	const lowered = text.toLowerCase();

	if (mode === 'AND') {
		return keys.every(k => lowered.includes(k.toLowerCase()));
	}

	return keys.some(k => lowered.includes(k.toLowerCase()));
};
