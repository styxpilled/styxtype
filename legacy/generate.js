const config = {
	previewText: '',
	textColor: '#1b1b18',
	fontSize: '44px',
	format: 'png',
	quality: 100,
	transparent: true,
	useExisting: true,
	single: null
	// single: 'hrdtkn_ver1_20'
};
const subsetCharset = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~“” `;

import nodeHtmlToImage from 'node-html-to-image';
import sharp from 'sharp';
import font2base64 from 'node-font2base64';
import { fonts as _fonts } from './src/fonts.js';
import fs from 'node:fs';
import path from 'node:path';
import { open } from 'fontkit';
import subsetFont from 'subset-font';
import { UnicodeRange } from '@japont/unicode-range';
import { performance as perf } from 'node:perf_hooks';
import { imageSizeFromFile } from 'image-size/fromFile';

/**
 * @type import('./src/fonts.js').Font[]
 */
let fonts = config.single ? _fonts.filter((f) => f.name === config.single) : _fonts;
const tmpImageDir = './static/generated/images';
const processedImageDir = './static/generated/avif';
const subsetDir = './static/generated/optimized';

try {
	fs.mkdirSync(tmpImageDir);
} catch (_) {}

const t0 = performance.now();
resolvePaths();
const t1 = performance.now();
console.log(`resolvePaths took ${t1 - t0} milliseconds`);
copyFonts();
const t2 = performance.now();
console.log(`copyFonts took ${t2 - t1} milliseconds`);
await generateMetadata();
const t3 = performance.now();
console.log(`generateMetadata took ${t3 - t2} milliseconds`);
await subsetFonts();
const t4 = performance.now();
console.log(`subsetFonts took ${t4 - t3} milliseconds`);
await generateImages();
const t5 = performance.now();
console.log(`generateImages took ${t5 - t4} milliseconds`);
await transcodeImages();
const t6 = performance.now();
console.log(`transcodeImages took ${t6 - t5} milliseconds`);
await generateSizes();
const t7 = performance.now();
console.log(`generateSizes took ${t7 - t6} milliseconds`);

function resolvePaths() {
	fonts.map((f) => {
		f.filePath = import.meta.resolve(f.font()).replace('file:///', '');
		f.absolutePath = path.resolve(f.filePath);
	});
}

function copyFonts() {
	try {
		fs.mkdirSync('./static/generated/fonts');
	} catch (error) {}
	for (const f of fonts) {
		const ext = path.extname(f.absolutePath);
		try {
			fs.copyFileSync(f.absolutePath, `./static/generated/fonts/${f.name}${ext}`);
		} catch (error) {
			console.log(error);
		}
	}
}

async function generateMetadata() {
	const promises = [];
	const metadata = {};
	const extendedMetadata = {};
	for (const f of fonts) {
		promises.push(
			open(`./static/generated/fonts/${f.name}${path.extname(f.absolutePath)}`).then((font) => {
				if (!metadata[f.name]) {
					metadata[f.name] = {};
				}
				metadata[f.name][font.fullName] = {
					availableFeatures: font.availableFeatures,
					variationAxes: font.variationAxes,
					copyright: font.copyright,
					version: font.version
				};
				const charSet = font.characterSet
					.filter((codePoint) => font.glyphForCodePoint(codePoint).path.commands.length !== 0)
					.filter((codePoint) => font.hasGlyphForCodePoint(codePoint));
				charSet.pop();
				const strCharSet = UnicodeRange.stringify(charSet);
				extendedMetadata[f.name] = {
					characterSet: strCharSet
				};
			})
		);
	}
	await Promise.all(promises);
	const extendedMetadataJSON = JSON.stringify(extendedMetadata);
	const metadataJSON = JSON.stringify(metadata);
	try {
		fs.rmSync('./src/lib/assets/metadata.json');
	} catch (error) {}
	try {
		fs.rmSync('./src/lib/assets/extended-metadata.json');
	} catch (error) {}
	fs.writeFile('./src/lib/assets/metadata.json', metadataJSON, 'utf8', (err) => {
		if (err) {
			console.error('Error writing to file', err);
		}
	});
	fs.writeFile('./src/lib/assets/extended-metadata.json', extendedMetadataJSON, 'utf8', (err) => {
		if (err) {
			console.error('Error writing to file', err);
		}
	});
}

async function subsetFonts() {
	try {
		if (!config.useExisting)
			fs.rmdirSync('./static/generated/optimized', {
				recursive: true,
				force: true
			});
	} catch (error) {}
	try {
		fs.mkdirSync(subsetDir);
	} catch (error) {}
	for (const f of fonts) {
		if (fs.existsSync(`${subsetDir}/${f.name}.woff2`)) continue;
		try {
			const buf = fs.readFileSync(f.absolutePath);
			const subset = await subsetFont(buf, subsetCharset, {
				targetFormat: 'woff2'
			});
			fs.writeFileSync(`${subsetDir}/${f.name}.woff2`, subset);
			// fs.copyFileSync(f.absolutePath, `./static/generated/fonts/${f.name}${ext}`);
		} catch (error) {
			console.log(error);
		}
	}
}

async function generateImages() {
	let generateFonts = fonts;
	if (config.useExisting) {
		generateFonts = fonts.filter(
			(f) => !fs.existsSync(`${tmpImageDir}/${f.name}.${config.format}`)
		);
	} else {
		fs.rmSync(tmpImageDir, { recursive: true, force: true });
		try {
			fs.mkdirSync(tmpImageDir);
		} catch (error) {}
	}
	const fontsData$ = generateFonts.map((f) => font2base64.encodeToDataUrl(f.filePath));
	const fontsData = await Promise.all(fontsData$);

	await nodeHtmlToImage({
		type: config.format,
		transparent: config.transparent,
		content: generateFonts.flatMap((font, idx) => [
			{
				fontId: font.name,
				fontData: fontsData[idx],
				text: config.previewText || font.name,
				color: config.textColor,
				output: `${tmpImageDir}/${font.name}.${config.format}`,
				features: font.features || 'normal',
				style: font.style || ''
			}
		]),
		selector: '#preview',
		html: `
    <html>
     <head>
       <style>
         @font-face {
           font-family: {{fontId}};
           src: url("{{{fontData}}}") format('woff');
         }

         #preview {
           display: inline-block;
           margin: 1rem;
           -webkit-font-smoothing: antialiased;
           -moz-osx-font-smoothing: grayscale;
           text-rendering: geometricPrecision;
           color: white;
           font-family: "{{fontId}}";
           font-size: ${config.fontSize};
           padding: 1rem;
           font-feature-settings: {{features}};
           line-height: 1em;
           vertical-align: center;
           alignment-baseline: center;
           dominant-baseline: center;
           {{{style}}}
         }
       </style>
     </head>
     <body>
       <div id="preview">
        {{text}}
       </div>
     </body>
   </html>
  `
	});
}

async function transcodeImages() {
	const previewPromises = [];
	// fs.rmSync(processedImageDir, { recursive: true, force: true });
	// try {
	// 	fs.mkdirSync(processedImageDir);
	// } catch (error) {}
	for (const f of fonts) {
		fs.stat(`${processedImageDir}/${f.name}.avif`, (err) => {
			if (err) {
				previewPromises.push(
					sharp(`${tmpImageDir}/${f.name}.${config.format}`)
						.avif({
							quality: 30
						})
						.toColorspace('grayscale')
						.toFile(`${processedImageDir}/${f.name}.avif`)
						.catch((err) => console.log(err))
				);
			}
		});
	}
	await Promise.allSettled(previewPromises);
}

async function generateSizes() {
	const sizePromises = [];
	const sizes = {};
	for (const f of fonts) {
		sizePromises.push(
			imageSizeFromFile(`${tmpImageDir}/${f.name}.${config.format}`).then((dimensions) => {
				sizes[f.name] = {
					w: dimensions.width,
					h: dimensions.height
				};
			})
		);
	}
	await Promise.all(sizePromises);
	const sizesJSON = JSON.stringify(sizes);

	try {
		fs.rmSync('./src/lib/assets/sizes.json');
	} catch (error) {}
	fs.writeFile('./src/lib/assets/sizes.json', sizesJSON, 'utf8', (err) => {
		if (err) {
			console.error('Error writing to file', err);
		}
	});
}
