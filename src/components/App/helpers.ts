export const filterByKeywords = (text: string, keys: string[], mode: 'AND' | 'OR') => {
	const lowered = text.toLowerCase();

	if (mode === 'AND') {
		return keys.every(k => lowered.includes(k.toLowerCase()));
	}

	return keys.some(k => lowered.includes(k.toLowerCase()));
};
