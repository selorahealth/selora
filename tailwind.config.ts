import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                blue: 'var(--blue)',
                mint: 'var(--mint)',
                lime: 'var(--lime)',
                dark: 'var(--dark)',
                dark2: 'var(--dark2)',
                dark3: 'var(--dark3)',
                dark4: 'var(--dark4)',
                muted: 'var(--muted)',
                text: 'var(--text)',
                body: 'var(--body)',
            },
            fontFamily: {
                sora: ['var(--font-sora)', 'sans-serif'],
                sans: ['var(--font-sora)', 'sans-serif'],
            },
            borderColor: {
                DEFAULT: 'rgba(97, 131, 255, 0.15)',
            },
        },
    },
    plugins: [],
}

export default config
