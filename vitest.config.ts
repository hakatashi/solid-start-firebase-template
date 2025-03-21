import path from 'node:path';
import solid from 'vite-plugin-solid';
import {defineConfig} from 'vitest/config';

export default defineConfig({
	plugins: [solid()],
	resolve: {
		conditions: ['development', 'browser'],
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		setupFiles: ['./vitest.setup.ts'],
	},
});
