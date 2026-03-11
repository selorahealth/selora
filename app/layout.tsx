import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const sora = Sora({ 
    subsets: ['latin'],
    variable: '--font-sora',
})

export const metadata: Metadata = {
    title: 'Selora Health',
    description: 'Your health story, everywhere you go.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${sora.variable}`}>
            <body className="font-sans bg-dark text-body antialiased transition-colors duration-300">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}