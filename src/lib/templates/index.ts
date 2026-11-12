import type { Component } from 'svelte';
import Flyer from './Flyer.svelte';
import Poster from './Poster.svelte';
import Test from './Test.svelte';

export type Role = 'display' | 'body';

/** Every scheme sets all tokens. A template uses only the tokens it needs. */
export const tokens = ['paper', 'panel', 'ink', 'muted', 'rule', 'accent', 'on-accent'] as const;
export type Token = (typeof tokens)[number];

export type Scheme = { id: string; name: string; colors: Record<Token, string> };

export type Template = {
	id: string;
	name: string;
	roles: Role[];
	schemes: Scheme[];
	component: Component;
};

export const templates: Template[] = [
	{
		id: 'poster',
		name: 'Poster',
		roles: ['display', 'body'],
		component: Poster,
		schemes: [
			{
				id: 'riso',
				name: 'Riso',
				colors: {
					paper: '#f9d3dc',
					panel: '#f4bccb',
					ink: '#1b3fae',
					muted: '#3f55a8',
					rule: '#1b3fae',
					accent: '#1b3fae',
					'on-accent': '#f9d3dc'
				}
			},
			{
				id: 'sodium',
				name: 'Sodium',
				colors: {
					paper: '#ff8c1a',
					panel: '#ff9f40',
					ink: '#2b1140',
					muted: '#5a2443',
					rule: '#2b1140',
					accent: '#2b1140',
					'on-accent': '#ff8c1a'
				}
			},
			{
				id: 'depot',
				name: 'Depot',
				colors: {
					paper: '#17332a',
					panel: '#1f4236',
					ink: '#eef3e2',
					muted: '#a9bfae',
					rule: '#3d6455',
					accent: '#f5b8c8',
					'on-accent': '#17332a'
				}
			}
		]
	},
	{
		id: 'flyer',
		name: 'Flyer',
		roles: ['display', 'body'],
		component: Flyer,
		schemes: [
			{
				id: 'red',
				name: 'Red',
				colors: {
					paper: '#c4241e',
					panel: '#ab1d18',
					ink: '#fbefe0',
					muted: '#fbe0d2',
					rule: '#fbefe0',
					accent: '#1c0a08',
					'on-accent': '#fbefe0'
				}
			},
			{
				id: 'newsprint',
				name: 'Newsprint',
				colors: {
					paper: '#e6e2d6',
					panel: '#dcd7c8',
					ink: '#1d1b18',
					muted: '#55504a',
					rule: '#1d1b18',
					accent: '#b0201b',
					'on-accent': '#f3efe4'
				}
			},
			{
				id: 'night-shift',
				name: 'Night shift',
				colors: {
					paper: '#1d2547',
					panel: '#26305a',
					ink: '#ece6d4',
					muted: '#aab0c8',
					rule: '#ece6d4',
					accent: '#ef5a4b',
					'on-accent': '#1d2547'
				}
			}
		]
	},
	{
		id: 'test',
		name: 'Test',
		roles: ['display', 'body'],
		component: Test,
		schemes: [
			{
				id: 'paper',
				name: 'Paper',
				colors: {
					paper: '#ffffff',
					panel: '#f1f1ef',
					ink: '#000000',
					muted: '#5b5b58',
					rule: '#d4d4d0',
					accent: '#2438e8',
					'on-accent': '#ffffff'
				}
			},
			{
				id: 'harbour',
				name: 'Harbour',
				colors: {
					paper: '#111839',
					panel: '#1b2350',
					ink: '#f0f2ff',
					muted: '#9ca4d4',
					rule: '#2d3668',
					accent: '#ffd23f',
					'on-accent': '#111839'
				}
			},
			{
				id: 'tomato',
				name: 'Tomato',
				colors: {
					paper: '#ff5a36',
					panel: '#ff7452',
					ink: '#1c0700',
					muted: '#6e200d',
					rule: '#e4441f',
					accent: '#ffffff',
					'on-accent': '#d63a17'
				}
			}
		]
	}
];
