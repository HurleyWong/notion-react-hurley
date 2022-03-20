import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
    darkMode: 'class',
    extract: {
        include: ['**/*.{jsx,tsx,css}'],
        exclude: ['node_modules', '.git', '.next'],
    },
    theme: {
        fontFamily: {
            sans: ['Overpass', ...defaultTheme.fontFamily.sans],
            serif: ['"Old Standard TT"', ...defaultTheme.fontFamily.serif],
            mono: ['"Overpass Mono"', ...defaultTheme.fontFamily.mono],
        }
    },
})
