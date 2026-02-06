/**
 * @import { Font } from "./font"
 */
/**
 * @type {Font[]}
 */
export const fonts = [
	{
		name: 'Afacad Flux',
		author: {
			href: 'https://github.com/ktkm',
			name: 'Kristian Möller'
		},
		href: 'https://github.com/Dicotype/Afacad',
		description: `The letters and numerals of {{name}} by {{author}} were meticulously crafted to harmonise with	the architectural proportions and materials employed by Architect Sture Elmén during the 1940s.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/afacad-flux/files/afacad-flux-latin-standard-normal.woff2'
	},
	{
		name: 'Anton',
		author: {
			href: null,
			name: 'Vernon Adams'
		},
		href: 'https://github.com/googlefonts/AntonFont',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/anton/files/anton-latin-400-normal.woff2',
		style: 'text-transform: uppercase;'
	},
	{
		name: 'Bagnard',
		href: 'https://github.com/sebsan/Bagnard',
		author: {
			name: 'Sebastien Sanfilippo',
			href: null
		},
		category: 'serif',
		description:
			'%TITLE% by %AUTHOR% was inspired by the graffitis of an anonymous prisoner of the napoleonic wars. A serif font with bold yet sleek serifs, well suited for larger text.',
		license: 'SIL',
		links: [
			{
				href: 'https://fontsource.org/fonts/bagnard',
				label: 'Fontsource'
			},
			{
				href: 'https://open-foundry.com/fonts/bagnard_regular',
				label: 'Open Foundry'
			},
			{
				href: 'https://github.com/sebsan/Bagnard',
				label: 'Github'
			},
			{
				href: 'https://fontsinuse.com/typefaces/46816/bagnard',
				label: 'Fonts In Use'
			}
		],
		font: () => '@fontsource/bagnard/files/bagnard-latin-400-normal.woff2'
	},
	{
		name: 'Basteleur',
		href: 'https://velvetyne.fr/fonts/basteleur',
		author: {
			name: 'Keussel',
			href: 'https://keussel.studio'
		},
		category: 'serif',
		description:
			'Designed with the Tarot de Marseille in mind, %TITLE% by %AUTHOR% is a blend of medieval-ish and cooperblack-ish typeface. The Basteleur Arcana represents a lot of things a designer can experience: new beginnings, having fun, crafting, but also a lack of confidence and having hard time to finish projects.',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Basteleur/BasteleurBold.woff2'
	},
	{
		name: 'Besley',
		author: {
			href: 'https://indestructibletype.com/Home.html',
			name: 'Owen Earl'
		},
		href: 'https://indestructibletype.com/Besley.html',
		description: `%TITLE% by %AUTHOR% is an antique slab serif with a timeless feel. It features large, sturdy serifs which convey stability and trustworthyness.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/besley/files/besley-latin-wght-normal.woff2'
	},
	{
		name: 'Calistoga',
		author: null,
		href: null,
		description: `%TITLE% by %AUTHOR% is a cheerful, space saving display typeface with vintage US railroad flavor. Calistoga includes proportional, tabular, old style and lining figures. It also offers fractions, superiors, inferiors, a broad range of symbols, and it includes case sensitive forms.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/calistoga/files/calistoga-latin-400-normal.woff2'
	},
	{
		name: 'Cookie',
		author: {
			href: null,
			name: 'Ania Kruk'
		},
		href: null,
		description: `%TITLE% by %AUTHOR% is a script typeface based on brush calligraphy. It has a little bit of 1950s style that makes you think about all the beautiful ads and pin-ups from this time. It is sweet and friendly - but not too decorative; simple and legible even in text sizes.`,
		category: 'script',
		license: 'SIL',
		links: [
			{
				href: 'https://fontsource.org/fonts/cookie',
				label: 'Fontsource'
			},
			{
				href: 'https://fonts.google.com/specimen/Cookie',
				label: 'Google Fonts'
			}
		],
		font: () => '@fontsource/cookie/files/cookie-latin-400-normal.woff2'
	},
	{
		name: 'Cooper',
		author: {
			href: 'https://indestructibletype.com/Home.html',
			name: 'Owen Earl'
		},
		href: 'https://indestructibletype.com/Besley.html',
		description: `%TITLE% by %AUTHOR% is a revival of a 1922 font family by Oswald Bruce Cooper. The original is most known for it's iconic Cooper Black font. This revival aims to shine some light on the more lightweight variants of the font.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Cooper/webfont/Cooper-Bold.woff2'
	},
	{
		name: 'Darumadrop One',
		author: null,
		href: null,
		description: `%TILE% is a flavorful handwritten font inspired by Japanese handwriting and "Daruma Otoshi", a Japanese folk craft game.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/darumadrop-one/files/darumadrop-one-latin-400-normal.woff2'
	},
	{
		name: 'Departure Mono',
		author: {
			href: 'https://www.helenazhang.com',
			name: 'Helena Zhang'
		},
		href: 'https://departuremono.com',
		description: `%TITLE% by %AUTHOR% is a monospaced pixel font inspired by the
		constraints of early command-line and graphical user interfaces, the tiny pixel fonts of the late	90s/early 00s, and sci-fi concepts from film and television.trustworthyness.`,
		category: 'monospace',
		license: 'SIL',
		links: [],
		font: () => '#fonts/departure-mono/departure-mono.woff2'
	},
	{
		name: 'DT Nouveau',
		author: {
			name: 'Death of Typography',
			href: 'https://deathoftypography.com/'
		},
		href: 'https://deathoftypography.com/nouveau',
		category: 'display',
		description: `%TITLE% by %AUTHOR% is an Art Nouveau inspired revival of a type specimen found in several issues of a local colonial-era publication, Straits Times Annual in the 1900s.`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/DTNouveau/DTNouveau.ttf'
	},
	{
		name: 'Edge Display',
		author: {
			name: 'Grzegorz Samson',
			href: 'https://grzegorzsamson.pl'
		},
		href: 'https://grzegorzsamson.pl/project/edge-display',
		category: 'sans-serif',
		description: `%TITLE% by %AUTHOR% is sans-serif typeface best suited for large text. It was inspired by music posters, band logos and concert art.`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/EdgeDisplay/EdgeDisplay-Regular.otf'
	},
	{
		name: 'Federo',
		author: {
			name: 'Olexa Volochay',
			href: null
		},
		href: 'https://github.com/cyrealtype/Federo',
		category: 'sans-serif',
		description: `%TITLE% by %AUTHOR% is a display webfont
		that references Jakob Erbar's Feder Grotesk. The goal was to keep the typeface as close as possible	to the original 1909 design while adapting it for crisp web typography.`,
		license: 'SIL',
		links: [],
		font: () => '@fontsource/federo/files/federo-latin-400-normal.woff2'
	},
	{
		name: 'Fraunces',
		author: null,
		href: 'https://fraunces.undercase.xyz',
		category: 'sans-serif',
		description: `%TITLE% is a display, "Old Style" soft-serif typeface inspired by the mannerisms of early 20th century typefaces such as Windsor, Souvenir, and the Cooper Series.`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/Fraunces/Fraunces.woff2'
	},
	{
		name: 'Gluten',
		author: {
			name: 'Ty Finck',
			href: 'https://tyfromtheinternet.com'
		},
		href: 'https://etceteratype.co/gluten',
		category: 'sans-serif',
		description: `%TITLE% by %AUTHOR% is a display webfont
		that references Jakob Erbar's Feder Grotesk. The goal was to keep the typeface as close as possible	to the original 1909 design while adapting it for crisp web typography.`,
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/gluten/files/gluten-latin-standard-normal.woff2'
	},
	{
		name: 'Gotico Antiqua Durandus',
		author: null,
		href: null,
		category: 'serif',
		description: `%TITLE%, first used in Mainz by Peter Schoffer & Johann Fust for Guillaume Durand’s Rationale Divinorum Officorum in the XIV century.`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/GoticoAntiquaDurandus/GoticoAntiquaDurandus.woff2'
	},
	{
		name: 'Jellee',
		author: null,
		href: null,
		category: 'sans-serif',
		description: `%TITLE% is a rounded and soft sans serif typeface for posters, headlines, and titles. Great for cool and friendly animations.`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/Jellee/Jellee.woff2'
	},
	{
		name: 'Josefin Sans',
		author: {
			name: 'Santiago Orozco',
			href: null
		},
		href: 'https://etceteratype.co/gluten',
		category: 'sans-serif',
		description: `%TITLE% by %AUTHOR% is inspired by geometric sans serifs of the 1920 like Futura.`,
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/josefin-sans/files/josefin-sans-latin-wght-normal.woff2'
	},
	{
		name: 'Jost',
		author: {
			href: 'https://indestructibletype.com/Home.html',
			name: 'Owen Earl'
		},
		href: 'https://indestructibletype.com/Jost.html',
		description: `%TITLE% by %AUTHOR% is a spiritual successor to the famous Futura typeface.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/jost/files/jost-latin-wght-normal.woff2'
	},
	{
		name: 'Lilex',
		author: null,
		href: 'https://lilex.myrt.co/',
		category: 'monospace',
		description:
			'%TITLE% is an extended font on top of IBM Plex Mono designed for developers. It contains ligatures, special characters (e.g. PowerLine), Greek and exists in a variable format.',
		license: 'SIL',
		links: [
			{
				href: 'https://github.com/mishamyrt/Lilex',
				label: 'GitHub'
			}
		],
		font: () => '#fonts/Lilex/Lilex.ttf'
	},
	{
		name: 'Merriweather',
		author: null,
		href: '',
		category: 'serif',
		description:
			'%TITLE% was designed to be a text face that is pleasant to read on screens. It features a very large x height, slightly condensed letterforms, a mild diagonal stress, sturdy serifs and open forms.',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/merriweather/files/merriweather-latin-400-normal.woff2'
	},
	{
		name: 'Minipax',
		author: null,
		href: '',
		category: 'serif',
		description: `%TITLE%, inspired by George Orwell's 1984. It's been designed to fit with the atmosphere of the Orwellian dystopia. Although Minipax remains a rather transparent text typeface, many of its distinctive features have been crafted to reflect de dusty and gritty universe of the novel.'`,
		license: 'SIL',
		links: [],
		font: () => '#fonts/Minipax/MinipaxVariable.ttf'
	},
	{
		name: 'Nyght Serif',
		author: {
			href: 'https://www.behance.net/mkobuzan#',
			name: 'Maksym Kobuzan'
		},
		href: 'https://www.tunera.xyz/fonts/nyght-serif',
		description: `%TITLE% by %AUTHOR% is a spiritual successor to the famous Futura typeface.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/NyghtSerif/font/NyghtSerif-Dark.woff2'
	},
	{
		name: 'Ojuju',
		href: 'https://github.com/jobosonchisa/ojuju',
		author: {
			name: '',
			href: ''
		},
		category: 'serif',
		description:
			'%TITLE% is a reverse contrast variable typeface inspired by African Masquerades. The masks worn by the Dogon dancers from Mali inspired the aperture shaping, and counterform placement within many of the letterforms.',
		license: 'SIL',
		links: [
			{
				href: 'https://github.com/jobosonchisa/ojuju',
				label: 'GitHub'
			},
			{
				href: 'https://fonts.google.com/specimen/Ojuju',
				label: 'Google Fonts'
			}
		],
		font: () => '@fontsource-variable/ojuju/files/ojuju-latin-wght-normal.woff2'
	},
	{
		name: 'Ouroboros',
		href: 'https://github.com/jobosonchisa/ojuju',
		author: {
			name: '',
			href: ''
		},
		category: 'serif',
		description: `%TITLE% is a font for alchemists, witches, heretics, outsiders and curious people in general. It's inspired by early art-nouveau styles, which were sometimes used in relation with magical themes and symbolism, so it comes together with a set of alchemical and astronomical symbols.`,
		license: 'SIL',
		links: [
			{
				href: 'https://github.com/jobosonchisa/ojuju',
				label: 'GitHub'
			},
			{
				href: 'https://fonts.google.com/specimen/Ojuju',
				label: 'Google Fonts'
			}
		],
		font: () => '#fonts/Ouroboros/Ouroboros.woff2'
	},
	{
		name: 'Outfit',
		author: {
			href: 'https://www.behance.net/erreefe',
			name: 'Rodrigo Fuenzalida'
		},
		href: 'https://github.com/Outfitio/Outfit-Fonts',
		description: `%TITLE% is a geometric sans-serif typeface designed as the brand typeface for for brand automation company outfit.io by %AUTHOR%.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2'
	},
	{
		name: 'Patriot',
		author: null,
		href: null,
		description: `%TITLE% is a display sans serif typeface with a great quantity of distinctive features, from
		irregular crossbars to abrupt diagonal strokes. It also demonstrates its industrialist nature
		with a uniformity in weight, and no flourishes nor distinctions between thick and thin lines.
		Traces of Art Deco, Bauhaus and hints of Constructivism are preserved in the digital typeface,
		promising a progressive and influential voice when used in proper manners.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Patriot/font/Patriot-UltraBold.woff2'
	},
	{
		name: 'Picaflor',
		author: {
			href: 'https://arielmartinperez.com',
			name: 'Ariel Martín Pérez'
		},
		href: 'https://www.tunera.xyz/fonts/picaflor/',
		description: `%TITLE% by %AUTHOR% is a hybrid display typeface with calligraphic details - French didone meet Spanish vernacular exhuberance.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Picaflor/font/Picaflor-12pt.woff2'
	},
	{
		name: 'Pouler',
		author: {
			href: 'https://alex-creq.com/',
			name: 'Alexandre Créquer'
		},
		href: 'https://www.tunera.xyz/fonts/picaflor/',
		description: `%TITLE% by %AUTHOR% is a distinctly French serif, evoking the feel of a warm inn serving ale.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Pouler/Pouler.woff2'
	},
	{
		name: 'Rubik',
		author: {
			href: 'https://hfs-studio.com/',
			name: 'Philipp Hubert and Sebastian Fischer'
		},
		href: null,
		description: `%TITLE% is a sans serif font family with slightly rounded corners designed by Philipp Hubert and Sebastian Fischer. Rubik is a 5 weight family with Roman and Italic styles, that accompanies Rubik Mono One, a monospaced variation of the Black roman design.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Rubik/RubikVariable.ttf'
	},
	{
		name: 'Shantell Sans',
		author: {
			href: null,
			name: 'Shantell Martin'
		},
		href: null,
		description: `%TITLE% from %AUTHOR% is a marker-style font built for creative expression, typographic play, and animation.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/shantell-sans/files/shantell-sans-latin-wght-normal.woff2'
	},
	{
		name: 'Sinistre',
		author: {
			href: null,
			name: 'Jules Durand'
		},
		href: 'https://www.collletttivo.it/typefaces/sinistre',
		description: `%TITLE% by %AUTHOR% combines the Uncial minuscule, Roman proportions and subtle hints of Fraktur into soft letterforms and sharp terminations.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Sinistre/SinistreVF.woff2'
	},
	{
		name: 'Space Grotesk',
		author: {
			href: 'https://floriankarsten.com',
			name: 'Florian Karsten'
		},
		href: 'https://floriankarsten.github.io/space-grotesk',
		description: `%TITLE% is a proportional sans-serif typeface variant based on Colophon Foundry's fixed-width Space Mono family (2016). Originally designed by %AUTHOR% in 2018, Space Grotesk retains the monospace's idiosyncratic details while optimizing for improved readability at non-display sizes.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'
	},
	{
		name: 'Staatliches',
		author: null,
		href: null,
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/staatliches/files/staatliches-latin-400-normal.woff2'
	},
	{
		name: 'SUSE',
		author: {
			href: 'https://www.renebieder.com',
			name: 'René Bieder'
		},
		href: '',
		description: `%TITLE% is a sans-serif typeface designed by %AUTHOR%, embodying a unique hybrid between geometric and monospaced features. It was comissioned by the SUSE open-source software company to serve as their brand typeface.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource-variable/suse/files/suse-latin-wght-normal.woff2'
	},
	{
		name: 'Titan One',
		author: {
			href: 'https://www.behance.net/erreefe',
			name: 'Rodrigo Fuenzalida'
		},
		href: 'https://fonts.google.com/specimen/Titan+One',
		description: `%TITLE% by %AUTHOR% is a really fat display type with a happy and cheerful personality. It takes most of its essence from hand lettering with big brushes.`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/titan-one/files/titan-one-latin-400-normal.woff2'
	},
	{
		name: 'Westgate',
		author: null,
		href: null,
		description: `%TITLE% was designed based on the vernacular concrete typography on the North, East and West gates of Saigon's iconic Ben Thanh Market. The typeface carries an elegant condensed form inspired by the Art Deco style of the early 20th century French colonial era.`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Westgate/font/Westgate-Bold.woff2'
	},
	{
		name: 'Yeast',
		author: {
			href: 'https://www.behance.net/ilmix',
			name: 'Ilya Mikhailovsky'
		},
		href: 'https://www.behance.net/gallery/134723667/Yeast-typeface-ver-03-(free-font)',
		description: `%TITLE% by %AUTHOR% is a modern font with smooth, flowing lines and rounded forms, creating a typographic experience that feels inviting and joyful.`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Yeast/Yeast.otf'
	},
	{
		name: 'Young Serif',
		author: {
			href: 'https://noirblancrouge.com',
			name: 'NoirBlancRouge'
		},
		href: 'https://www.behance.net/gallery/134723667/Yeast-typeface-ver-03-(free-font)',
		description: `%TITLE% by the %AUTHOR% foundry is a heavy weight old style serif typeface, taking inspiration from Plantin Infant or ITC Italian Old Style.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/young-serif/files/young-serif-latin-400-normal.woff2'
	},
	{
		name: 'Zarathustra',
		author: {
			href: 'http://lorene-picard.com/',
			name: 'Lorène Picard'
		},
		href: 'https://www.behance.net/gallery/134723667/Yeast-typeface-ver-03-(free-font)',
		description: `%TITLE% by the %AUTHOR% is a revival of a typeface designed by Belgian painter Georges Lemmen at the beggining of the 20th century. It was specifically designed for the 1908 version of the Friedrich Nietzsche's book Thus Spoke Zarathustra.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Zarathustra/zarathustra.otf'
	},
	{
		name: 'Kaph',
		author: {
			href: 'https://ggbot.net',
			name: 'GGBotNet'
		},
		href: 'https://ggbot.itch.io/kaph-font',
		description: `MISSING DESCRIPTION`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Kaph/Kaph-Regular.woff2'
	},
	{
		name: 'Gotfridus',
		author: {
			href: 'https://ggbot.net',
			name: 'GGBotNet'
		},
		href: 'https://ggbot.itch.io/gotfridus-font',
		description: `MISSING DESCRIPTION`,
		category: 'blackletter',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Gotfridus/Gotfridus.woff2'
	},
	{
		name: 'Vulnus',
		author: {
			href: 'https://codeberg.org/m-casanova',
			name: 'Michele Casanova'
		},
		href: 'https://codeberg.org/m-casanova/Vulnus',
		description: `MISSING DESCRIPTION`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Vulnus/Vulnus.woff2'
	},
	{
		name: 'In die busillis',
		author: {
			href: 'https://codeberg.org/m-casanova',
			name: 'Michele Casanova'
		},
		href: 'https://codeberg.org/m-casanova/InDieBusillis',
		description: `MISSING DESCRIPTION`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/InDieBusillis/InDieBusillis.woff2'
	},
	{
		name: 'Averia Serif Libre',
		author: {
			href: null,
			name: 'Dan Sayers'
		},
		href: 'http://iotic.com/averia',
		description: `MISSING DESCRIPTION`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/averia-serif-libre/files/averia-serif-libre-latin-400-normal.woff2'
	},
	{
		name: 'Alegreya SC',
		author: {
			href: null,
			name: 'Juan Pablo del Peral'
		},
		href: 'https://github.com/huertatipografica/Alegreya',
		description: `%TITLE% by %AUTHOR%, originally intended for literature, conveys a dynamic and varied rhythm which facilitates the reading of long texts.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/alegreya-sc/files/alegreya-sc-latin-400-normal.woff2'
	},
	{
		name: 'Caesium',
		author: {
			href: 'https://argon.red',
			name: 'Alpha Argon'
		},
		href: 'https://github.com/alphaArgon/Caesium',
		description: `%TITLE% by %AUTHOR% is a cursive typeface for programming, derived from Cascadia Code. While it inherits some of Cascadia's structure, Caesium takes a more radical approach in design.`,
		category: 'monospace',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Caesium/CaesiumVF-Upright.ttf'
	},
	{
		name: 'Inknut Antiqua',
		author: {
			href: 'https://www.forthehearts.net',
			name: 'Claus Eggers Sørensen'
		},
		href: 'https://github.com/clauseggers/Inknut-Antiqua',
		description: `%TITLE% by %AUTHOR% is designed to evoke Venetian incunabula and humanist manuscripts, but with the quirks and idiosyncrasies of the kinds of typefaces you find in this artisanal tradition.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/inknut-antiqua/files/inknut-antiqua-latin-400-normal.woff2'
	},
	{
		name: 'Aboensis',
		author: {
			href: null,
			name: 'Tommi Syrjänen'
		},
		href: 'https://ctan.org/pkg/aboensis',
		description: `%TITLE% by %AUTHOR% is a cursive book hand based on Codex Aboensis that it a medieval book of laws written in Sweden during the 1430s.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Aboensis/Aboensis.otf'
	},
	{
		name: 'Pecita',
		author: {
			href: null,
			name: 'Philippe Cochy'
		},
		href: 'https://pecita.eu',
		description: `DESCRIPTION MISSING`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Pecita/Pecita.otf'
	},
	{
		name: 'League Gothic',
		author: {
			href: 'https://www.theleagueofmoveabletype.com',
			name: 'The League of Moveable Type'
		},
		href: 'https://www.theleagueofmoveabletype.com/league-gothic',
		description: `%TITLE% by %AUTHOR% is a revival of Alternate Gothic #1.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/league-gothic/files/league-gothic-latin-400-normal.woff2'
	},
	{
		name: 'DM Serif Text',
		author: {
			href: 'https://github.com/googlefonts/dm-fonts',
			name: ''
		},
		href: 'https://github.com/googlefonts/dm-fonts',
		description: `%TITLE% is derived from Source Serif Pro.`,
		category: 'serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/dm-serif-text/files/dm-serif-text-latin-400-normal.woff2'
	},
	{
		name: 'TeX Gyre Heros',
		author: {
			href: null,
			name: 'Bogusław Jackowski and Janusz M. Nowacki'
		},
		href: 'http://www.gust.org.pl/projects/e-foundry/tex-gyre/heros',
		description: `%TITLE% is derived from Source Serif Pro.`,
		category: 'sans-serif',
		license: 'GUST Font License',
		links: [],
		font: () => '#fonts/TeXGyreHeros/texgyreheros-regular.otf'
	},
	{
		name: 'hrdtkn_ver1_20',
		author: {
			href: 'https://ncempire.net',
			name: 'NC Empire'
		},
		href: 'https://ncempire.net/download',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/hrdtkn_ver1_20/hrdtkn_ver1_20.otf'
	},
	{
		name: 'Kounstruct',
		author: {
			href: 'https://ncempire.net',
			name: 'NC Empire'
		},
		href: 'https://ncempire.net/download',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Kounstruct/Kounstruct.otf'
	},
	{
		name: 'Foundation',
		author: {
			href: 'https://github.com/rsperberg',
			name: 'Roger Sperberg'
		},
		href: 'https://github.com/rsperberg/foundation-logo',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Foundation/Foundation.ttf',
		style: 'letter-spacing: -9px;'
	},
	{
		name: 'Pelicula',
		author: {
			href: 'https://github.com/jackkershaw',
			name: 'Jack Kershaw'
		},
		href: 'https://github.com/jackkershaw/pelicula',
		description: `MISSING DESCRIPTION`,
		category: 'script',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Pelicula/Pelicula.otf'
	},
	{
		name: 'Walthari',
		author: {
			href: 'https://www.peter-wiegel.de/',
			name: 'Peter Wiegel'
		},
		href: 'https://www.peter-wiegel.de/CAT_Walthari.html',
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Walthari/Walthari.ttf'
	},
	{
		name: 'Trathnona',
		author: {
			href: 'https://www.stanleyfonts.com',
			name: 'Dominic Stanley'
		},
		href: 'https://github.com/insert-smiley/Irishfontclub-trathnona',
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '#fonts/Trathnona/Trathnona.woff2'
	},
	{
		name: 'Righteous',
		author: {
			href: null,
			name: 'Brian J. Bonislawsky'
		},
		href: 'https://github.com/librefonts/righteous',
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/righteous/files/righteous-latin-400-normal.woff2',
		style: 'text-transform: uppercase;'
	},
	{
		name: 'Rock Salt',
		author: {
			href: null,
			name: 'Sideshow'
		},
		href: 'https://fonts.google.com/specimen/Rock+Salt',
		description: `MISSING DESCRIPTION`,
		category: 'script',
		license: 'SIL',
		links: [],
		font: () => '@fontsource/rock-salt/files/rock-salt-latin-400-normal.woff2'
	},
	{
		name: 'Maratype',
		author: {
			href: 'https://www.behance.net/iamimago',
			name: 'Artyom Galinov'
		},
		href: 'https://www.behance.net/gallery/227048755/MARATYPE-custom-display-font',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'FREE',
		links: [],
		font: () => '#fonts/Maratype/Maratype.otf'
	},
	{
		name: 'Very very punk font',
		author: {
			href: 'https://wanders.work',
			name: 'Tup Wanders'
		},
		href: 'https://wanders.work/fonts',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/VeryVeryPunkFont/VeryVeryPunkFont.ttf'
	},
	{
		name: 'TJF Anomaly',
		author: {
			href: 'https://jigsawfoundry.gumroad.com/',
			name: 'The Jigsaw Foundry'
		},
		href: 'https://www.fontspace.com/the-jigsaw-foundry',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'CC BY 4.0',
		links: [],
		font: () => '#fonts/TJFAnomaly/TJFAnomaly.ttf',
		style: 'text-transform: uppercase;'
	},
	{
		name: 'Sandana',
		author: {
			href: 'https://jigsawfoundry.gumroad.com/',
			name: 'The Jigsaw Foundry'
		},
		href: 'https://www.fontspace.com/the-jigsaw-foundry',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'CC BY 4.0',
		links: [],
		font: () => '#fonts/TJFSandana/Sandana.ttf',
		style: 'text-transform: uppercase; font-feature-settings: "aalt";'
	},
	{
		name: 'Evil Empire',
		author: {
			href: 'https://wanders.work',
			name: 'Tup Wanders'
		},
		href: 'https://wanders.work/fonts',
		description: `MISSING DESCRIPTION`,
		category: 'display',
		license: 'SIL',
		links: [],
		font: () => '#fonts/EvilEmpire/EvilEmpire.ttf'
	},
	{
		name: 'Committee',
		author: {
			href: null,
			name: 'Alec Dunn'
		},
		href: 'https://justseeds.org/graphic/justseeds-font-pack-4',
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'CC BY-SA',
		links: [],
		font: () => '#fonts/Committee/Committee-Bold.otf'
	},
	{
		name: 'Umbral',
		author: {
			href: null,
			name: 'Alec Dunn'
		},
		href: 'https://justseeds.org/graphic/justseeds-font-pack-18',
		description: `MISSING DESCRIPTION`,
		category: 'sans-serif',
		license: 'CC BY-SA',
		links: [],
		font: () => '#fonts/Umbral/Umbral.otf'
	}
];
