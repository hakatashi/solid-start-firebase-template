import {beforeEach, vi} from 'vitest';

const originalFetch = global.fetch;
const fetchMock = vi.spyOn(global, 'fetch');
fetchMock.mockImplementation((...args) => {
	const [url] = args;
	if (url === '/__/firebase/init.json') {
		return originalFetch('http://localhost:5000/__/firebase/init.json');
	}
	return originalFetch(...args);
});

beforeEach(async () => {
	// Reset firestore data
	await originalFetch(
		'http://localhost:8080/emulator/v1/projects/solid-start-firebase-template/databases/(default)/documents',
		{
			method: 'DELETE',
		},
	);
});
