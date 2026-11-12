import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		alias: {
			$static: 'src/static'
		}
		// typescript: (tsConfig) => {
		// 	tsConfig.include.push('../src/*.js');
		// 	return tsConfig;
		// }
	}
};

export default config;
