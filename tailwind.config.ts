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
                blue: '#6183FF',
                mint: '#5DFFAD',
                lime: '#C7FF45',
                dark: '#0A0B14',
                dark2: '#111224',
                dark3: '#1A1C35',
                dark4: '#232540',
                muted: '#6B6F8E',
                body: '#A0A4C8',
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
