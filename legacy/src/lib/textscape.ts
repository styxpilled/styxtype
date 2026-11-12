// https://ipfs2.seadn.io/ipfs/bafybeibfsen4s5ws6cm7igswjomtcpk6om545srywe3zknx3hkpjqk65sq/index.html

function X27(t, e) {
	return Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2));
}
function Xf(t, e, n, s) {
	return Math.abs(n - t) + Math.abs(s - e);
}
function Xa(t, e, n) {
	return t < e ? e : t > n ? n : t;
}
class X21 {
	constructor(t, e, n = Array) {
		((this.type = n), this.resize(t, e));
	}
	resize(t, e, n = 0) {
		((this.width = Math.max(0, t) || 0),
			(this.height = Math.max(0, e) || 0),
			(this.data = new this.type(t * e)),
			'function' == typeof n ? this.fill(n) : this.data.fill(n));
	}
	X12(t, e, n, s, o) {
		for (let r = 0; r < s; r++) for (let s = 0; s < n; s++) this.set(t + s, e + r, o);
		return this;
	}
	fill(t) {
		let e = 0;
		for (let n = 0; n < this.height; n++)
			for (let s = 0; s < this.width; s++) this.set(s, n, t(s, n, e++, this.width, this.height));
		return this;
	}
	X2a(t) {
		let e = 0;
		for (let n = 0; n < this.height; n++)
			for (let s = 0; s < this.width; s++) t(this.data[e], s, n, e++, this.width, this.height);
		return this;
	}
	X1b() {
		let t = 0;
		return (this.data.forEach((e) => (t = Math.max(e, t))), t);
	}
	X26(t) {
		if (t.width != this.width || t.height != this.height) return !1;
		for (let e = 0; e < this.data.length; e++) if (this.data[e] !== t.data[e]) return !1;
		return !0;
	}
	X20(t, e) {
		return (
			(t = (t + this.width) % this.width),
			(e = (e + this.height) % this.height),
			this.data[t + e * this.width]
		);
	}
	get(t, e) {
		return t < 0 || e < 0 || t >= this.width || e >= this.height
			? null
			: this.data[t + e * this.width];
	}
	X3d(t, e) {
		const n = 1 - Math.abs((Math.abs(t) % 2) - 1),
			s = 1 - Math.abs((Math.abs(e) % 2) - 1),
			o = Math.round(n * (this.width - 1)),
			r = Math.round(s * (this.height - 1));
		return this.get(o, r);
	}
	X3e(t, e) {
		const n = t * this.width - 0.5,
			s = e * this.height - 0.5;
		const o = Math.floor(n),
			r = Math.floor(s),
			i = o + 1,
			a = r + 1;
		const h = n - o,
			c = s - r,
			l = mix(this.get(o, r), this.get(i, r), h),
			d = mix(this.get(o, a), this.get(i, a), h);
		return mix(l, d, c);
	}
	X1f(t = 0, e = 0, n = 0) {
		let s, o;
		1 == n || 2 == n
			? ((s = this.height), (o = this.width))
			: ((s = this.width), (o = this.height));
		const r = new X21(s, o, this.type);
		for (let s = 0; s < r.height; s++)
			for (let o = 0; o < r.width; o++) {
				let i, a;
				(0 == n
					? ((i = o), (a = s))
					: 1 == n
						? ((i = r.height - s - 1), (a = o))
						: 2 == n
							? ((i = r.width - o - 1), (a = r.height - s - 1))
							: 3 == n && ((i = s), (a = r.width - o - 1)),
					(i = t ? r.width - 1 - i : i),
					(a = e ? r.height - 1 - a : a),
					r.set(i, a, this.get(o, s)));
			}
		return r;
	}
	X1d(t, e, n, s) {
		const o = new Grid(n, s, this.type);
		for (let n = 0; n < o.height; n++)
			for (let s = 0; s < o.width; s++) o.set(s, n, this.get(s + t, n + e));
		return o;
	}
	set(t, e, n) {
		t < 0 || e < 0 || t >= this.width || e >= this.height || (this.data[t + e * this.width] = n);
	}
	X41(t) {
		t.length == this.data.length && t.forEach((t, e) => (this.data[e] = t));
	}
	X43(t, e, n, s, o) {
		for (let r = 0; r < s; r++) for (let s = 0; s < n; s++) this.set(t + s, e + r, o[s + n * r]);
	}
	X42(t, e, n) {
		this.X43(t, e, n.width, n.height, n.data);
	}
	toString() {
		let t = '';
		for (let e = 0; e < this.height; e++) {
			for (let n = 0; n < this.width; n++) t += this.get(n, e);
			t += '\n';
		}
		return t;
	}
	X36() {
		console.log('%c' + this.toString(), 'font-family: monospace;');
	}
}
function mix(t, e, n) {
	return t * (1 - n) + e * n;
}
class FPS {
	constructor(t = 1e3) {
		((this.X4b = t), (this.fps = 0), (this.X18 = 0), (this.X39 = 0));
	}
	tick(t) {
		return (
			t >= this.X39 + this.X4b &&
				((this.fps = (this.X18 * this.X4b) / (t - this.X39)), (this.X39 = t), (this.X18 = 0)),
			this.X18++,
			this.fps
		);
	}
}
class X1 {
	X25 = 1 / 2 ** 32;
	int() {}
	X14(t = 1) {
		return this.int() * this.X25 * t;
	}
	X37(t) {
		return this.X14() < t;
	}
	X33(t = 1) {
		return 2 * (this.int() * this.$X25 - 0.5) * t;
	}
	X32(t, e) {
		const n = this.X2f(t, e);
		return this.X14() < 0.5 ? n : -n;
	}
	X2f(t, e) {
		return this.X14() * (e - t) + t;
	}
	X2e(t, e) {
		const n = (0 | e) - (t |= 0);
		return n ? t + (this.int() % n) : t;
	}
	X2fUint(t, e) {
		const n = (e >>> 0) - (t >>>= 0);
		return n ? t + (this.int() % n) : t;
	}
	X9() {
		let t;
		return (
			(t = 1 == arguments.length && Array.isArray(arguments[0]) ? arguments[0] : [...arguments]),
			t[this.X2e(0, t.length)]
		);
	}
	X45(t) {
		for (let e = t.length - 1; e > 0; e--) {
			const n = Math.floor(this.X14() * (e + 1));
			[t[e], t[n]] = [t[n], t[e]];
		}
		return t;
	}
	X8Obj(t) {
		const e = Object.keys(t).map((e) => [t[e].X54, e]);
		return this.X8(e);
	}
	X8(t) {
		const e = t.map((t) => t[0]),
			n = t.map((t) => t[1]),
			s = [];
		for (let t = 0; t < e.length; t++) s[t] = e[t] + (s[t - 1] || 0);
		const o = s[s.length - 1] * this.X14();
		for (let t = 0; t < n.length; t++) if (s[t] >= o) return n[t];
	}
}
class X44 extends X1 {
	constructor(t) {
		(super(), (this.buffer = new Uint32Array(4)), this.seed(t));
	}
	Xc() {
		return new X44(this.buffer);
	}
	bytes() {
		return new Uint8Array(this.buffer.buffer);
	}
	int() {
		const t = this.buffer,
			e = (((t[0] + t[1]) >>> 0) + t[3]) >>> 0;
		return (
			(t[3] = (t[3] + 1) >>> 0),
			(t[0] = t[1] ^ (t[1] >>> 9)),
			(t[1] = (t[2] + (t[2] << 3)) >>> 0),
			(t[2] = (((t[2] << 21) | (t[2] >>> 11)) + e) >>> 0),
			e
		);
	}
	seed(t) {
		return (this.buffer.set(t), this);
	}
}
function X55(t) {
	let e = 2166136261;
	for (let n = 0; n < t.length; n++) e = Math.imul(e ^ t.charCodeAt(n), 16777619);
	return function () {
		return ((e += e << 13), (e ^= e >>> 7), (e += e << 3), (e ^= e >>> 17), (e += e << 5) >>> 0);
	};
}
class Char {
	constructor(t = 0, e = 0) {
		((this.x = t), (this.y = e), (this.fg = 'black'), (this.bg = ''), (this.char = ' '));
	}
}
function X17(t) {
	return t - Math.floor(t);
}
function X29(t, e, n) {
	return (1 - n) * t + n * e;
}
const X4c = (t = 0) => {
		function e(e, n, s) {
			return (
				(e = 50 * X17(0.3283079 * e + 0.7091)),
				(n = 50 * X17(0.3283079 * n + 0.1131)),
				(s = 50 * X17(0.3283079 * s + 0.3291)),
				2 * X17(1.36959861 * t + e * n * s * (e + n + s)) - 1
			);
		}
		return {
			X30: function (t, n, s) {
				const o = Math.floor(t),
					r = Math.floor(n),
					i = Math.floor(s),
					a = X17(t),
					h = X17(n),
					c = X17(s),
					l = a * a * (3 - 2 * a),
					d = h * h * (3 - 2 * h);
				return X29(
					X29(
						X29(e(o + 0, r + 0, i + 0), e(o + 1, r + 0, i + 0), l),
						X29(e(o + 0, r + 1, i + 0), e(o + 1, r + 1, i + 0), l),
						d
					),
					X29(
						X29(e(o + 0, r + 0, i + 1), e(o + 1, r + 0, i + 1), l),
						X29(e(o + 0, r + 1, i + 1), e(o + 1, r + 1, i + 1), l),
						d
					),
					c * c * (3 - 2 * c)
				);
			}
		};
	},
	X50 = [
		[0, 0],
		[0, -1],
		[1, -1],
		[1, 0],
		[1, 1],
		[0, 1],
		[-1, 1],
		[-1, 0],
		[-1, -1]
	],
	X51 = [0, 1, 8, 7, 6, 5, 4, 3, 2],
	X4f = {
		X4d: () => {
			const t = X3c.X2f(0.003, 0.02) * X3c.X9(-1, 1),
				e = X3c.X2f(0.003, 0.02) * X3c.X9(-1, 1),
				n = X3c.X2f(0.001, 0.005) * X3c.X9(-1, 1),
				s = X3c.X2f(1, 2);
			return {
				short: !1,
				X16: !1,
				fn: (o, r, i, a, h) => {
					const c = 2 * Math.cos(h * t),
						l = 2 * Math.sin(h * e),
						d = Math.sin(h * n),
						f = 0.5 * X31(o * s + c, r * s + l, d) + 0.5;
					return (Math.floor(8 * f) % 8) + 1;
				}
			};
		},
		X35: () => {
			const t = X3c.X2f(0.5, 3),
				e = X3c.X2f(1, 4),
				n = X3c.X2f(0.001, 0.03) * X3c.X9(-1, 1),
				s = X3c.X2f(0.001, 0.03) * X3c.X9(-1, 1),
				o = X3c.X2f(0.001, 0.03) * X3c.X9(-1, 1);
			return {
				short: !1,
				X16: !1,
				fn: (r, i, a, h, c) => {
					const l = Math.sqrt(r * r + i * i) * e,
						d = Math.sin(c * n) * t,
						f = Math.cos(c * s) * t,
						u = Math.sin(r * d + i * f) + 1;
					const m = Math.cos(l + c * o) + 1;
					return (Math.floor(2 * (u + m)) % 8) + 1;
				}
			};
		},
		X10: () => {
			const t = X3c.X2f(0.01, 0.02) * X3c.X9(-1, 1),
				e = X3c.X2f(0.005, 0.01) * X3c.X9(-1, 1),
				n = X3c.X9(4, 8, 12),
				s = X3c.X9(-1, 1),
				o = (X3c.X2f(0.02, 0.06) / n) * s;
			return {
				short: !1,
				X16: !0,
				fn: (s, r, i, a, h) => {
					const c = Math.cos(h * t),
						l = Math.sin(h * e),
						d = ((((Math.atan2(r + l, s + c) / Math.PI + h * o) % 2) + 2) % 2) * n;
					return (Math.round(d) % 8) + 1;
				}
			};
		},
		X13: () => {
			const t = X3c.X2e(1, 9);
			return { short: !0, X16: !0, fn: (e, n, s, o, r) => t };
		},
		Box: () => {
			const t = X3c.X9(2, 4, 8, 16),
				e = X3c.X2e(0, 4),
				n = X3c.X9(-1, 1);
			return {
				short: !0,
				fn: (s, o, r, i, a) =>
					((((e + Math.floor(r / t) + n * Math.floor(i / t)) % 4) + 4) % 4) * 2 + 1
			};
		}
	};
class X53 {
	constructor() {}
	X19(t, e) {
		const n = X4f[X3c.X9(Object.keys(X4f))]();
		((this.WARP = n.fn),
			(this.count = n.short ? X3c.X2e(20, 80) : X3c.X2e(200, 800)),
			(this.simmetry = !!n.X16 || X3c.X9(!0, !1)));
	}
	step(t, e, n) {
		const s = this.simmetry ? e.cols / 2 : e.cols,
			o = Math.floor(e.cols / 1) - 1,
			r = Math.floor(e.rows / 1) - 1,
			i = (e.cols / e.rows) * e.X2d.X2;
		for (let a = 0; a < e.rows; a++)
			for (let h = 0; h < s; h++) {
				const s = ((h / o) * 2 - 1) * i,
					c = (a / r) * 2 - 1,
					l = this.WARP(s, c, h, a, t);
				(n.X52.set(h, a, l), this.simmetry && n.X52.set(e.cols - h - 1, a, X51[l]));
			}
		(([n.X23, n.X24] = [n.X24, n.X23]),
			n.X56.X2a((t, e, s, o, r, i) => {
				if (1 == n.X56.get(e, s)) {
					const t = n.background.get(e, s);
					n.X23.set(e, s, t);
				} else {
					const t = n.X52.get(e, s),
						o = X50[t].map((t, n) => t + [e, s][n]);
					((o[0] = Xa(o[0], 0, r - 1)), (o[1] = Xa(o[1], 0, i - 1)));
					const a = n.X24.get(...o);
					n.X23.set(e, s, a);
				}
			}),
			this.count-- <= 0 && this.X19());
	}
}
function hex(t, e, n, s) {
	const o = Math.abs(t),
		r = Math.abs(e);
	let i, a;
	return (
		o >= r + n - s
			? ((i = (o + r - n - s) / 2), (a = t > 0 ? (e > 0 ? 0 : 5) : e > 0 ? 2 : 3))
			: ((i = r - s), (a = e > 0 ? 1 : 4)),
		{ d: i, q: a }
	);
}
class BG {
	constructor(t, e) {
		((this.X57 = t), (this.X47 = e));
	}
	X19(t, e) {
		const n = X3c.X9(2, 4, 8),
			s = X3c.X9(2, 4, 8),
			o = 2 * Math.ceil(t.cols / n / 2) + (n % 2 == 0 ? 1 : 0),
			r = 2 * Math.ceil(t.rows / s / 2) + (s % 2 == 0 ? 1 : 0),
			i = -(t.cols - o * n) / 2,
			a = -(t.rows - r * s) / 2,
			h = e.X3,
			c = 2 * Math.ceil(t.cols / this.X47 / 2),
			l = 2 * Math.ceil(t.rows / this.X47 / 2),
			d = (t.cols - c * this.X47) / 2,
			f = (t.rows - l * this.X47) / 2;
		let u, m;
		if (
			((u = 4 * Math.floor(X3c.X2e(0, this.X57.length) / 4)),
			(m = X3c.X9(u + 1, u + 2, u + 3, X3c.X2e(0, this.X57.length))),
			(m = X3c.X9(-1, m)),
			(u = X3c.X9(-1, u)),
			-1 == u || -1 == m)
		) {
			const e = X3c.X9(Object.keys(X5)),
				c = X5[e](t, n, s, o, r);
			h.X2a((e, o, r, l, d, f) => {
				const u = Math.floor((o + i) / n),
					m = Math.floor((r + a) / s),
					g = c(o, r, u, m, (o + i) % n, (r + a) % s) % t.num_chars;
				h.set(o, r, g);
			});
		}
		for (let t = 0; t < l; t++)
			for (let e = 0; e < c; e++) {
				const n = d + e * this.X47,
					s = f + t * this.X47,
					o = (e + t) % 2 == 0 ? u : m;
				-1 != o && h.X43(n, s, this.X47, this.X47, this.X57[o]);
			}
		const g = X3c.X9(Object.keys(X6)),
			p = X6[g](t),
			x = e.X4;
		x.X2a((t, e, n, s, o, r) => {
			const i = p(e, n);
			x.set(e, n, i);
		});
	}
	step(t, e, n) {
		let s = !0;
		(n.background.X2a((t, o, r, i, a, h) => {
			if (0 == n.X4.data[i]) {
				const t = n.background.data[i];
				if (t != n.X3.data[i]) {
					s = !1;
					const o = (t + 1) % e.num_chars;
					((n.background.data[i] = o), (n.X23.data[i] = o));
				}
			} else ((s = !1), n.X4.data[i]--);
		}),
			s && this.X19(e, n));
	}
}
const X6 = {
		X3a: (t) => {
			const e = (t.cols - 1) / 2,
				n = X3c.X9(0, (t.rows - 1) / 2, t.rows - 1),
				s = Xf;
			return (t, o) => {
				const r = s(0, 0, Math.abs(e - t), Math.abs(n - o));
				return Math.floor(r);
			};
		},
		X13: (t) => {
			const e = X3c.X8([
				[3, 0],
				[3, 1],
				[1, 2],
				[1, 3]
			]);
			return 0 == e
				? (t, e) => e
				: 1 == e
					? (e, n) => t.rows - n - 1
					: 2 == e
						? (t, e) => t
						: 3 == e
							? (e, n) => t.cols - e - 1
							: void 0;
		}
	},
	X5 = {
		Hex: (t, e, n, s, o) => {
			const r = X3c.X9(0, 1),
				i = X3c.X2e(1, t.num_chars) * r,
				a = X3c.X2e(0, t.num_chars),
				h = 4 * X3c.X2e(0, 5),
				c = Math.ceil(X27(h, h * t.X2d.X2)),
				l = (t.cols - 1) / 2,
				d = (t.rows - 1) / 2,
				f = X3c.X9(0.4, 0.6, 0.8, 1),
				u = X3c.X9(2, 3),
				m = X3c.X9(0, X3c.X2e(1, t.num_chars));
			return (e, n, s, o) => {
				const r = hex(e - l, 1 * (n - d), h, c),
					g = Math.floor(Math.abs(r.d * f + (r.q % u) * m));
				return (a + g + (Math.floor(e + n) % 2) * i) % t.num_chars;
			};
		},
		X13: (t, e, n, s, o) => {
			const r = X3c.X2e(0, t.num_chars),
				i = X3c.X8([
					[4, !0],
					[1, !1]
				]),
				a = X3c.X8([
					[8, 1],
					[1, 0]
				]);
			return (e, n, o, h) => (r + (i ? Math.abs(Math.floor(s / 2) - o) : o) * a) % t.num_chars;
		},
		X58: (t, e, n, s, o) => {
			const r = X3c.X9(0, X3c.X2e(0, t.num_chars));
			let i = r;
			for (; i == r; ) i = X3c.X2e(0, t.num_chars);
			return (e, n, s, o) => ((s + o) % 2 == 0 ? r : i) % t.num_chars;
		}
	},
	X49 = [
		'/:/:/:/:\\:\\:\\:\\:/:/:/:/:\\:\\:\\:\\:/:/:/:/:\\:\\:\\:\\:/:/:/:/:\\:\\:\\:\\:',
		'\\+\\ \\+\\ / /+/ /+\\+\\ \\+\\ / /+/ /+\\+\\ \\+\\ / /+/ /+\\+\\ \\+\\ / /+/ /+',
		'+++++++++     + +    +  +   +   +  +    + +     ++      +       ',
		'++++++++++      + +     +  +    +   +   +    +  +     + +      +',
		'.........     . .    .  .   .   .  .    . .     ..      .       ',
		'..........      . .     .  .    .   .   .    .  .     . .      .',
		'****    ****    **xxxx  **xxxx    xx....  xx....    ....    ....',
		'XXXX    XXXX    XX°°°°  XX°°°°    °°$$$$  °°$$$$    $$$$    $$$$',
		'       <      ><     <><    ><><   <><><  ><><>< <><><><><><><><',
		'       >      <>     ><>    <><>   ><><>  <><><> ><><><><><><><>',
		'-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│-│=│',
		'+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-',
		'\\      / \\    /   \\  /     \\/      /      /      /      /       ',
		'\\\\\\\\//// \\\\\\///   \\\\//     \\/                                   ',
		'\\\\\\\\//// \\\\\\///   \\\\//     \\/      /\\     /  \\   /    \\ /      \\',
		'\\      / \\    /   \\  /     \\/      /\\     /  \\   /    \\ /      \\',
		'\\\\\\\\//// \\\\\\///   \\\\//     \\/      /\\     //\\\\   ///\\\\\\ ////\\\\\\\\',
		'/////////////// //////  /////   ////    ///     //      /       ',
		'///////////////\\//////\\\\/////\\\\\\////\\\\\\\\///\\\\\\\\\\//\\\\\\\\\\\\/\\\\\\\\\\\\\\',
		'<<<<<<<<>>>>>>>><<<<<<<<>>>>>>>><<<<<<<<>>>>>>>><<<<<<<<>>>>>>>>',
		'==≠====≠=≠====≠=≠====≠======≠======≠======≠====≠=≠====≠=≠====≠==',
		'│W│W│W│W│W│W│W│W│V│V│V│V│V│V│V│V│ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ ',
		'│:│:│:│:│:│:│:│:│.│.│.│.│.│.│.│.│ │ │ │ │ │ │ │ │.│.│.│.│.│.│.│.',
		'││││││││––––––––////////││││││││\\\\\\\\\\\\\\\\││││││││––––––––////////',
		'  ^   v < o > o   v   ^           ^   v < o > o   v   ^         ',
		'   x   x  xx  xx xxx xxxxxxxxxxx   x   x  xx  xx xxx xxxxxxxxxxx',
		'«<[()]>»<[(––)]>[(––––)](––––––)(––––––)[(––––)]<[(––)]>«<[()]>»',
		' . . . . + + + +▅.▅.▅.▅. . . . . + + + +▅.▅.▅.▅. + + + + ^ ^ ^ ^',
		'========--------========--------========--------========--------',
		'«<[()]>»<[(##)]>[(####)](######)(######)[(####)]<[(##)]>«<[()]>»',
		'• • • • •   •   • • • • • • • • • ••••• • • • • • • • • •   •   ',
		'K--------K--------K--------K--------K--------K--------K--------K',
		'........-.......--......---.....----....-----...------..-------.',
		'ZZZZZZZZ77777777////////ZZZZZZZZ77777777////////ZZZZZZZZ77777777',
		'--=HH=----=HH=----=HH=----=HH=----=HH=----=HH=----=HH=----=HH=--',
		'||||||||--------||||||||--------||||||||--------||||||||--------'
	],
	X38 = 'Hex';
let showInfo = !1,
	debugX53 = !1,
	X15 = !0,
	exportTXT = !1,
	paused = !1;
const app = {
	boot,
	exportPNG: function (t) {
		exportSize = t;
	},
	exportTXT: function () {
		exportTXT = !0;
	},
	toggleInfo: function () {
		showInfo = !showInfo;
	},
	debugX53: function () {
		debugX53 = !debugX53;
	},
	togglePause: function () {
		paused = !paused;
	}
};
function boot(t) {
	console.log('Using seed: ' + t.seed);
	const e = X55(t.seed);
	((globalThis.X3c = new X44([e(), e(), e(), e()])), (globalThis.X31 = X4c(1e6 * X3c.X14()).X30));
	const n = t.fps;
	const s = document.querySelector('pre');
	s.style.fontFamily = t.fontFamily;
	const o = '•↓↙←↖↑↗→↘'.split(''),
		r = X49.join('').split(''),
		i = X3c.X9([
			' ,;:¿?¡!‼¶§[](){}\\|/@#%&0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ«»^°ⁿ²½¼┐┌┘└┼├┤┴┬│╗╔╝╚╬╠╣╩╦║▄▀▐▌█▓▒░Σ√■∙·-+*÷±⌐¬~≈=<>≤≥═─↑↓→←↔▲▼►◄⌂',
			' ▂▃▄▅▆▇█',
			' ╱╲╳▲▼►◄░▒▓█▄▀▌▐■∙·│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌'
		])
			.split('')
			.concat(r)
			.filter((t, e, n) => n.indexOf(t) === e)
			.sort(),
		a = [];
	i.forEach((t, e) => (a[t] = e));
	const h = X3c.X2e(0, i.length),
		c = [];
	X49.map((t) => t.split('').map((t) => a[t])).forEach((t) => {
		const e = new X21(8, 8);
		(e.X41(t),
			c.push(e.data),
			c.push(e.X1f(!0, !1).data),
			c.push(e.X1f(!0, !0).data),
			c.push(e.X1f(!1, !0).data));
	});
	const l = X3c.X8([
		[64, { bg: '#CCC', fg: '#000' }],
		[1, { bg: '#000', fg: '#CCC' }],
		[1, { bg: '#CCC', fg: '#00F' }],
		[1, { bg: '#A00', fg: '#FF5' }],
		[1, { bg: '#050', fg: '#0F0' }]
	]);
	((l.fg = t.fgColor || l.fg), (l.bg = t.bgColor || l.bg));
	const d = new X21(0, 0, Array),
		f = Object.seal({ cols: 0, rows: 0, X2: 1, X2d: null, num_chars: i.length }),
		u = {
			X23: new X21(0, 0, Array),
			X24: new X21(0, 0, Array),
			background: new X21(0, 0, Array),
			X3: new X21(0, 0, Array),
			X4: new X21(0, 0, Array),
			X48A: new X21(0, 0, Array),
			X48B: new X21(0, 0, Array),
			X52: new X21(0, 0, Array),
			X56: new X21(0, 0, Array)
		},
		m = new BG(c, 8),
		g = new X53();
	{
		let t;
		globalThis.addEventListener('resize', (e) => {
			(clearTimeout(t),
				(t = setTimeout((t) => {
					X15 = !0;
				}, 100)));
		});
	}
	const p = new FPS(1e3);
	let x = 0,
		w = -1e3;
	requestAnimationFrame(function e(r) {
		requestAnimationFrame(e);
		const c = r - w,
			R = 1e3 / n;
		if (c < R) return;
		if (((w = r - (c % R)), X15)) {
			((X15 = !1), (s.style.fontSize = t.fontSize));
			const e = 10;
			((f.X2d = X5c(s)),
				(f.cols = t.cols || 2 * Math.floor((innerWidth - 2 * e) / f.X2d.X7 / 2)),
				(f.rows = t.rows || 2 * Math.floor((innerHeight - 2 * e) / f.X2d.X5d / 2)),
				(f.cols = Math.max(f.cols, 8)),
				(f.rows = Math.max(f.rows, 8)),
				(f.X2 = f.cols / f.rows),
				d.resize(f.cols, f.rows, (t, e) => new Char(t, e)),
				Object.keys(u).forEach((t) => {
					u[t].resize(f.cols, f.rows);
				}));
			const n = a[' '];
			(u.X23.data.fill(n), u.X24.data.fill(n));
			const o = Math.max(4, 4 * Math.floor((0.6 * Math.min(f.cols / 4, f.rows / 2)) / 4)),
				r = Math.round(X27(o, o / f.X2d.X2) / 2);
			(u.X56.X2a((t, e, n, s, i, a) => {
				const h = hex(e - (i - 1) / 2, n - (a - 1) / 2, r, o).d > 0 ? 0 : 1;
				u.X56.set(e, n, h);
			}),
				m.X19(f, u),
				g.X19(f, u),
				(paused = !1),
				(document.body.style.backgroundColor = l.bg),
				(document.querySelector('html').style.backgroundColor = l.bg));
		}
		if (!paused)
			if ((m.step(x, f, u), g.step(x, f, u), debugX53))
				d.data.forEach((t, e) => {
					const n = u.X52.data[e],
						s = o[n];
					((t.char = s), (t.fg = '#00F'));
				});
			else {
				const t = u.X23;
				d.data.forEach((e, n) => {
					const s = 0 == u.X56.data[n] ? 1 : 0,
						o = (t.data[n] + s * h) % i.length;
					((e.char = i[o]), (e.fg = l.fg));
				});
			}
		if (showInfo) {
			const e = Math.round(p.tick(r)),
				s = '~F~',
				o = 16;
			let i = '';
			((i += s + '\n'),
				(i += 'fps'.padEnd(o) + e + '←' + n + '\n'),
				(i += 'frame'.padEnd(o) + x + '\n'),
				(i += s + '\n'),
				(i += 'cols'.padEnd(o) + f.cols + '\n'),
				(i += 'rows'.padEnd(o) + f.rows + '\n'),
				(i += 'innerWidth'.padEnd(o) + innerWidth + '\n'),
				(i += 'innerHeight'.padEnd(o) + innerHeight + '\n'),
				(i += s + '\n'),
				(i += 'seed'.padEnd(o) + X59(t.seed, o - 1) + '\n'),
				(i += s + '\n'),
				(i += 'keys'.padEnd(o - 2) + 'i toggle info\n'),
				(i += 'p'.padEnd(2).padStart(o) + 'toggle pause\n'),
				(i += 't'.padEnd(2).padStart(o) + 'save TXT\n'),
				(i += 'f'.padEnd(2).padStart(o) + 'fullscreen\n'),
				(i += s + '\n'));
			const a = 2 * o;
			i.trim()
				.replaceAll(s, ''.padEnd(a, '─'))
				.split('\n')
				.forEach((t, e) => {
					t.padEnd(a, ' ')
						.split('')
						.forEach((t, n) => {
							const s = d.get(n, e);
							null !== s && (s.char = t);
						});
				});
		}
		(X3b(s, d), paused || x++);
		if (exportTXT) {
			let t = '';
			(d.X2a((e, n, s, o, r, i) => {
				t += e.char + (n == r - 1 ? '\n' : '');
			}),
				X5a(new Blob([t], { type: 'text/plain;charset=utf-8' }), 'Hex_' + Date.now() + '.txt'),
				(exportTXT = !1));
		}
	});
}
function X59(t, e) {
	const n = String(t);
	return n.length > e ? '...' + n.substring(n.length - e + 3) : n;
}
const X5a = (function () {
	const t = document.createElement('a');
	return (
		document.body.appendChild(t),
		(t.style.display = 'none'),
		function (e, n) {
			((t.href = URL.createObjectURL(e)), (t.download = n), t.click());
		}
	);
})();
function X3b(t, e) {
	const n = e.width,
		s = e.height;
	for (; t.childElementCount < s; ) {
		const e = document.createElement('span');
		((e.style.display = 'block'), t.appendChild(e));
	}
	for (; t.childElementCount > s; ) t.removeChild(t.lastChild);
	for (let o = 0; o < s; o++) {
		let s = '',
			r = new Char(),
			i = !1;
		for (let t = 0; t < n; t++) {
			const a = e.data[t + o * n];
			if (!X5b(a, r)) {
				i && (s += '</span>');
				const t = 'black' === a.fg ? null : a.fg,
					e = '' === a.bg ? null : a.bg;
				let n = '';
				(t && (n += 'color:' + t + ';'),
					e && (n += 'background:' + e + ';'),
					n && (n = ' style="' + n + '"'),
					(s += '<span' + n + '>'),
					(i = !0));
			}
			let h = a.char;
			('<' == h ? (h = '&lt;') : '>' == h && (h = '&gt;'), (s += h), (r = a));
		}
		(i && (s += '</span>'), (t.childNodes[o].innerHTML = s));
	}
}
function X5b(t, e) {
	return t.fg === e.fg && t.bg === e.bg;
}
function X5c(t) {
	const e = getComputedStyle(t).getPropertyValue('font-family'),
		n = 100;
	let s,
		o,
		r = ''.padEnd(n, 'X') + '<br>';
	for (let t = 0; t < 99; t++) r += 'X<br>';
	const i = document.createElement('span');
	return (
		(i.innerHTML = r),
		t.appendChild(i),
		(s = i.getBoundingClientRect().width / n),
		(o = i.getBoundingClientRect().height / n),
		t.removeChild(i),
		{ X2: s / o, X7: s, X5d: o, fontFamily: e }
	);
}
export { app };
