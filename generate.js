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
const subsetCharset = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~“”`;

import nodeHtmlToImage from 'node-html-to-image';
import font2base64 from 'node-font2base64';
import { fonts as _fonts } from './src/fonts.js';
import fs, { constants } from 'node:fs';
import path from 'node:path';
/**
 * @type import('./src/fonts.js').Font[]
 */
let fonts = config.single ? _fonts.filter((f) => f.name === config.single) : _fonts;
const tmpImageDir = './static/generated/images';
const processedImageDir = './static/generated/avif';

try {
	fs.mkdirSync(tmpImageDir);
} catch (_) {}

// * RESOLVE FILE PATHS
fonts.map((f) => {
	f.filePath = import.meta.resolve(f.font()).replace('file:///', '');
	f.absolutePath = path.resolve(f.filePath);
	// console.log(f.absolutePath);
	// console.log(f.filePath);
	// const p = path.resolve(f.filePath);
	// console.log(p);
	// copyFileSync(p, `${tmpFontsDir}/${f.name}${path.extname(p)}`);
});

// * COPY FONTS
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

// * GENERATE METADATA
import { open } from 'fontkit';
const promises = [];
const metadata = {};
const extendedMetadata = {};
for (const f of fonts) {
	promises.push(
		open(`./static/generated/fonts/${f.name}${path.extname(f.absolutePath)}`).then((font) => {
			// console.log(font.availableFeatures);
			// console.log(font.familyName);
			// console.log(font.fullName);
			// console.log(font.variationAxes);
			if (!metadata[f.name]) {
				metadata[f.name] = {};
			}
			metadata[f.name][font.fullName] = {
				availableFeatures: font.availableFeatures,
				variationAxes: font.variationAxes,
				copyright: font.copyright,
				version: font.version
			};
			// for (const char of font.characterSet) {
			// 	const glyph = font.glyphForCodePoint(char);
			// 	if (glyph.path.commands.length === 0) {
			// 		console.log(String.fromCodePoint(char));

			// 		// console.log(glyph.path);
			// 	}
			// }

			const charSet = font.characterSet
				.filter((codePoint) => font.glyphForCodePoint(codePoint).path.commands.length !== 0)
				.filter((codePoint) => font.hasGlyphForCodePoint(codePoint));
			// console.log(font.characterSet.length);
			// console.log(charSet.length);

			charSet.pop();
			const strCharSet = UnicodeRange.stringify(charSet);
			// console.log(JSON.stringify(strCharSet).length, JSON.stringify(charSet).length);

			// console.log(String.fromCodePoint(...charSet));
			extendedMetadata[f.name] = {
				characterSet: strCharSet
			};
			// console.log(extendedMetadata[f.name].characterSet.length);

			// console.log(Array.from(font.characterSet));
			// console.log(String.fromCodePoint(...[9731, 9733, 9842, 0x2f804]));
			// console.log(String.fromCodePoint(...font.characterSet));
			// String.fromCodePoint.apply(...font.characterSet);
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

// * SUBSET FONTS
import subsetFont from 'subset-font';
import { UnicodeRange } from '@japont/unicode-range';
try {
	fs.rmdirSync('./static/generated/optimized', {
		recursive: true,
		force: true
	});
} catch (error) {
	console.log(error);
}
try {
	fs.mkdirSync('./static/generated/optimized');
} catch (error) {
	console.log(error);
}
for (const f of fonts) {
	try {
		const buf = fs.readFileSync(f.absolutePath);
		const subset = await subsetFont(buf, subsetCharset, {
			targetFormat: 'woff2'
		});
		fs.writeFileSync(`./static/generated/optimized/${f.name}.woff2`, subset);
		// fs.copyFileSync(f.absolutePath, `./static/generated/fonts/${f.name}${ext}`);
	} catch (error) {
		console.log(error);
	}
}

// * GENERATE IMAGES
let generateFonts = fonts;
if (config.useExisting) {
	generateFonts = fonts.filter((f) => !fs.existsSync(`${tmpImageDir}/${f.name}.${config.format}`));
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

import sharp from 'sharp';

const previewPromises = [];
// fs.rmSync(processedImageDir, { recursive: true, force: true });
// try {
// 	fs.mkdirSync(processedImageDir);
// } catch (error) {}
for (const f of fonts) {
	fs.stat(`${processedImageDir}/${f.name}.avif`, (err) => {
		if (err) {
			console.log();

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
// sharp()

import { imageSizeFromFile } from 'image-size/fromFile';

const sizePromises = [];
const sizes = {};
for (const f of fonts) {
	sizePromises.push(
		imageSizeFromFile(`${tmpImageDir}/${f.name}.${config.format}`).then((dimensions) => {
			// console.log(f.name, dimensions.width, dimensions.height);
			sizes[f.name] = {
				w: dimensions.width,
				h: dimensions.height
			};
			// console.log(sizes);
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
