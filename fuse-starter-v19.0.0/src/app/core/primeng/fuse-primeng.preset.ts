import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FusePrimePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
            950: '#1e1b4b',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{indigo.600}',
                    contrastColor: '#ffffff',
                    hoverColor: '{indigo.700}',
                    activeColor: '{indigo.800}',
                },
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            dark: {
                primary: {
                    color: '{indigo.500}',
                    contrastColor: '#ffffff',
                    hoverColor: '{indigo.400}',
                    activeColor: '{indigo.300}',
                },
                surface: {
                    0: '#ffffff',
                    50: '#18181b',
                    100: '#27272a',
                    200: '#3f3f46',
                    300: '#52525b',
                    400: '#71717a',
                    500: '#a1a1aa',
                    600: '#d4d4d8',
                    700: '#e4e4e7',
                    800: '#f4f4f5',
                    900: '#fafafa',
                    950: '#ffffff',
                },
            },
        },
    },
    components: {
        button: {
            colorScheme: {
                light: {
                    root: {
                        primary: {
                            background: '{primary.color}',
                            hoverBackground: '{primary.hoverColor}',
                            activeBackground: '{primary.activeColor}',
                            borderColor: '{primary.color}',
                            hoverBorderColor: '{primary.hoverColor}',
                            activeBorderColor: '{primary.activeColor}',
                            color: '{primary.contrastColor}',
                            hoverColor: '{primary.contrastColor}',
                            activeColor: '{primary.contrastColor}',
                        },
                    },
                },
                dark: {
                    root: {
                        primary: {
                            background: '{primary.color}',
                            hoverBackground: '{primary.hoverColor}',
                            activeBackground: '{primary.activeColor}',
                            borderColor: '{primary.color}',
                            hoverBorderColor: '{primary.hoverColor}',
                            activeBorderColor: '{primary.activeColor}',
                            color: '{primary.contrastColor}',
                            hoverColor: '{primary.contrastColor}',
                            activeColor: '{primary.contrastColor}',
                        },
                    },
                },
            },
        },
    },
});
