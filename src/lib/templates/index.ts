import type { Component } from 'svelte';
import Article from './Article.svelte';
import Flyer from './Flyer.svelte';
import Poster from './Poster.svelte';

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
		id: 'article',
		name: 'Article',
		roles: ['display', 'body'],
		component: Article,
		schemes: [
			{
				id: 'newsprint',
				name: 'Newsprint',
				colors: {
					paper: '#e9e7e1',
					panel: '#dedbd3',
					ink: '#1f1d1a',
					muted: '#5a564f',
					rule: '#b3aea4',
					accent: '#8c1c13',
					'on-accent': '#f4f2ec'
				}
			},
			{
				id: 'rotogravure',
				name: 'Rotogravure',
				colors: {
					paper: '#e8d9b8',
					panel: '#ddcba5',
					ink: '#3d2414',
					muted: '#664630',
					rule: '#b89f78',
					accent: '#7a3b1c',
					'on-accent': '#f3e9d4'
				}
			},
			{
				id: 'slate',
				name: 'Slate',
				colors: {
					paper: '#232a33',
					panel: '#2c343f',
					ink: '#e9e6df',
					muted: '#a9adb3',
					rule: '#4a525d',
					accent: '#e0a43a',
					'on-accent': '#232a33'
				}
			}
		]
	}
];
