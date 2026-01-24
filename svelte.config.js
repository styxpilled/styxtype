import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		typescript: (tsConfig) => {
			tsConfig.include.push('../src/*.js');
			return tsConfig;
		}
	}
};

export default config;
