export const jsonFetcher = (url) => fetch(url).then((res) => res.json());

export const removeDuplicateFromArray = (array) => [...new Set(array)];
