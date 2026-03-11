'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'warm'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')

    useEffect(() => {
        // Run once on mount to check local storage
        const saved = localStorage.getItem('selora-theme') as Theme
        if (saved && ['dark', 'light', 'warm'].includes(saved)) {
            setTheme(saved)
        } else {
            // Check system preference
            const isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
            setTheme(isLight ? 'light' : 'dark')
        }
    }, [])

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
        localStorage.setItem('selora-theme', newTheme)
        
        // Remove existing theme classes
        document.documentElement.classList.remove('dark', 'light', 'warm')
        
        // Add new theme class (dark is default in :root, so we only add light/warm if needed)
        // Or if we want to be explicit, we can add it.
        document.documentElement.classList.add(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
