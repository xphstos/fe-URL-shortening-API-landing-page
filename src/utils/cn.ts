import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': Object.keys({
				sm: ['.825rem', { lineHeight: '1.5', fontWeight: '700' }],
				md: ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
				lg: ['1.25rem', { lineHeight: '1.5', fontWeight: '700' }],
				xl: ['1.5rem', { lineHeight: '1.333', fontWeight: '700' }],
				'2xl': ['fluid(2rem,3rem)', { lineHeight: '1.125', fontWeight: '800' }]
			}).map((key) => `text-${key}`)
		}
	}
});
export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));
