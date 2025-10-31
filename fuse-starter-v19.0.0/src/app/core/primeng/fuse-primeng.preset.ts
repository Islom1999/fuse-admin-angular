import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

// 🔧 Rang manipulyatsiya yordamchilari
const mix = (base: string, overlay: string, weight: number): string =>
    `color-mix(in srgb, ${base} ${100 - weight}%, ${overlay} ${weight}%)`;

const lighten = (color: string, amount = 8): string =>
    mix(color, '#ffffff', amount);

const darken = (color: string, amount = 12): string =>
    mix(color, '#000000', amount);

// 🧩 PrimeNG uchun Fuse / User Themes bilan mos preset
export const FusePrimePreset = definePreset(Aura, {
    semantic: {
        focusRing: {
            color: 'var(--fuse-primary-default)',
        },
        // Primary ranglar (har bir tema uchun dinamik)
        primary: {
            50: 'var(--fuse-primary-50)',
            100: 'var(--fuse-primary-100)',
            200: 'var(--fuse-primary-200)',
            300: 'var(--fuse-primary-300)',
            400: 'var(--fuse-primary-400)',
            500: 'var(--fuse-primary-500)',
            600: 'var(--fuse-primary-600)',
            700: 'var(--fuse-primary-700)',
            800: 'var(--fuse-primary-800)',
            900: 'var(--fuse-primary-900)',
            950: 'var(--fuse-primary-950)',
        },

        // Rang sxemasi (yorug‘ va qorong‘i)
        colorScheme: {
            light: {
                surface: {
                    0: 'var(--fuse-background-card)',
                    50: 'var(--fuse-background-base)',
                    100: 'var(--fuse-background-hover)',
                    200: 'var(--fuse-foreground-divider)',
                    300: 'var(--fuse-foreground-disabled)',
                    400: 'var(--fuse-foreground-hint)',
                    500: 'var(--fuse-foreground-secondary)',
                    700: 'var(--fuse-foreground-text)',
                    900: '#000000',
                },
                primary: {
                    color: 'var(--fuse-primary-default)',
                    contrastColor: 'var(--fuse-primary-contrast-default)',
                    hoverColor: 'var(--fuse-primary-600)',
                    activeColor: 'var(--fuse-primary-700)',
                },
                accent: {
                    color: 'var(--fuse-accent-default)',
                    contrastColor: 'var(--fuse-accent-contrast-default)',
                },
                warn: {
                    color: 'var(--fuse-warn-default)',
                    contrastColor: 'var(--fuse-warn-contrast-default)',
                },
                text: {
                    color: 'var(--fuse-foreground-text)',
                    mutedColor: 'var(--fuse-foreground-secondary)',
                    hoverColor: darken('var(--fuse-foreground-text)', 10),
                },
                content: {
                    background: 'var(--fuse-background-card)',
                    hoverBackground: 'var(--fuse-background-hover)',
                    borderColor: 'var(--fuse-foreground-divider)',
                    color: 'var(--fuse-foreground-text)',
                },
                overlay: {
                    popover: {
                        background: 'var(--fuse-background-card)',
                        borderColor: 'var(--fuse-foreground-divider)',
                        color: 'var(--fuse-foreground-text)',
                    },
                    modal: {
                        background: 'var(--fuse-background-dialog)',
                        color: 'var(--fuse-foreground-text)',
                    },
                },
                list: {
                    option: {
                        hoverBackground: 'var(--fuse-background-hover)',
                        selectedBackground: 'var(--fuse-primary-50)',
                        selectedColor: 'var(--fuse-primary-700)',
                    },
                },
            },

            dark: {
                surface: {
                    0: 'var(--fuse-background-card)',
                    50: 'var(--fuse-background-base)',
                    100: lighten('var(--fuse-background-card)', 8),
                    300: 'var(--fuse-foreground-disabled)',
                    500: 'var(--fuse-foreground-secondary)',
                    700: 'var(--fuse-foreground-text)',
                    900: darken('var(--fuse-background-base)', 8),
                },
                primary: {
                    color: 'var(--fuse-primary-300)',
                    contrastColor: 'var(--fuse-primary-contrast-default)',
                    hoverColor: 'var(--fuse-primary-200)',
                    activeColor: 'var(--fuse-primary-100)',
                },
                accent: {
                    color: 'var(--fuse-accent-default)',
                    contrastColor: 'var(--fuse-accent-contrast-default)',
                },
                warn: {
                    color: 'var(--fuse-warn-default)',
                    contrastColor: 'var(--fuse-warn-contrast-default)',
                },
                text: {
                    color: 'var(--fuse-foreground-text)',
                    mutedColor: 'var(--fuse-foreground-secondary)',
                    hoverColor: lighten('var(--fuse-foreground-text)', 8),
                },
                content: {
                    background: 'var(--fuse-background-card)',
                    hoverBackground: lighten('var(--fuse-background-card)', 8),
                    borderColor: 'var(--fuse-foreground-divider)',
                    color: 'var(--fuse-foreground-text)',
                },
                overlay: {
                    popover: {
                        background: 'var(--fuse-background-card)',
                        borderColor: 'var(--fuse-foreground-divider)',
                        color: 'var(--fuse-foreground-text)',
                    },
                    modal: {
                        background: 'var(--fuse-background-dialog)',
                        color: 'var(--fuse-foreground-text)',
                    },
                },
                list: {
                    option: {
                        hoverBackground: lighten(
                            'var(--fuse-background-card)',
                            6
                        ),
                        selectedBackground: mix(
                            'var(--fuse-primary-default)',
                            'transparent',
                            80
                        ),
                        selectedColor: 'var(--fuse-primary-100)',
                    },
                },
            },
        },
    },
});

// import Aura from '@primeng/themes/aura';
// import { definePreset } from '@primeng/themes';

// const mix = (base: string, overlay: string, weight: number): string =>
//     `color-mix(in srgb, ${base} ${100 - weight}%, ${overlay} ${weight}%)`;

// const lighten = (color: string, amount = 8): string =>
//     mix(color, '#ffffff', amount);

// const darken = (color: string, amount = 12): string =>
//     mix(color, '#000000', amount);

// export const FusePrimePreset = definePreset(Aura, {
//     semantic: {
//         focusRing: {
//             color: 'var(--fuse-primary-default)',
//         },
//         primary: {
//             50: 'var(--fuse-primary-50)',
//             100: 'var(--fuse-primary-100)',
//             200: 'var(--fuse-primary-200)',
//             300: 'var(--fuse-primary-300)',
//             400: 'var(--fuse-primary-400)',
//             500: 'var(--fuse-primary-500)',
//             600: 'var(--fuse-primary-600)',
//             700: 'var(--fuse-primary-700)',
//             800: 'var(--fuse-primary-800)',
//             900: 'var(--fuse-primary-900)',
//             950: 'var(--fuse-primary-950)',
//         },
//         colorScheme: {
//             light: {
//                 surface: {
//                     0: 'var(--fuse-background-card)',
//                     50: 'var(--fuse-background-base)',
//                     100: 'var(--fuse-background-hover)',
//                     200: 'var(--fuse-foreground-divider)',
//                     300: 'var(--fuse-foreground-disabled)',
//                     400: 'var(--fuse-foreground-hint)',
//                     500: 'var(--fuse-foreground-secondary)',
//                     600: darken('var(--fuse-foreground-secondary)', 10),
//                     700: 'var(--fuse-foreground-text)',
//                     800: darken('var(--fuse-foreground-text)', 15),
//                     900: darken('var(--fuse-foreground-text)', 25),
//                     950: '#000000',
//                 },
//                 primary: {
//                     color: 'var(--fuse-primary-default)',
//                     contrastColor: 'var(--fuse-primary-contrast-default)',
//                     hoverColor: 'var(--fuse-primary-600)',
//                     activeColor: 'var(--fuse-primary-700)',
//                 },
//                 highlight: {
//                     background: 'var(--fuse-primary-50)',
//                     focusBackground: 'var(--fuse-primary-100)',
//                     color: 'var(--fuse-primary-700)',
//                     focusColor: 'var(--fuse-primary-800)',
//                 },
//                 mask: {
//                     background: mix(
//                         'var(--fuse-background-base)',
//                         'rgba(15, 23, 42, 0.6)',
//                         50
//                     ),
//                     color: 'var(--fuse-foreground-divider)',
//                 },
//                 formField: {
//                     background: 'var(--fuse-background-card)',
//                     disabledBackground: mix(
//                         'var(--fuse-background-card)',
//                         'var(--fuse-background-base)',
//                         30
//                     ),
//                     filledBackground: 'var(--fuse-background-base)',
//                     filledHoverBackground: 'var(--fuse-background-hover)',
//                     filledFocusBackground: 'var(--fuse-background-hover)',
//                     borderColor: 'var(--fuse-foreground-divider)',
//                     hoverBorderColor: 'var(--fuse-foreground-hint)',
//                     focusBorderColor: 'var(--fuse-primary-default)',
//                     invalidBorderColor: 'var(--fuse-warn-400)',
//                     color: 'var(--fuse-foreground-text)',
//                     disabledColor: 'var(--fuse-foreground-disabled)',
//                     placeholderColor: 'var(--fuse-foreground-hint)',
//                     invalidPlaceholderColor: 'var(--fuse-warn-600)',
//                     floatLabelColor: 'var(--fuse-foreground-secondary)',
//                     floatLabelFocusColor: 'var(--fuse-primary-600)',
//                     floatLabelActiveColor: 'var(--fuse-foreground-secondary)',
//                     floatLabelInvalidColor: 'var(--fuse-warn-500)',
//                     iconColor: 'var(--fuse-foreground-hint)',
//                     shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(15, 23, 42, 0.05)',
//                 },
//                 text: {
//                     color: 'var(--fuse-foreground-text)',
//                     hoverColor: darken('var(--fuse-foreground-text)', 12),
//                     mutedColor: 'var(--fuse-foreground-secondary)',
//                     hoverMutedColor: darken(
//                         'var(--fuse-foreground-secondary)',
//                         10
//                     ),
//                 },
//                 content: {
//                     background: 'var(--fuse-background-card)',
//                     hoverBackground: 'var(--fuse-background-hover)',
//                     borderColor: 'var(--fuse-foreground-divider)',
//                     color: 'var(--fuse-foreground-text)',
//                     hoverColor: darken('var(--fuse-foreground-text)', 8),
//                 },
//                 overlay: {
//                     select: {
//                         background: 'var(--fuse-background-card)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                     popover: {
//                         background: 'var(--fuse-background-card)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                     modal: {
//                         background: 'var(--fuse-background-dialog)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                 },
//                 list: {
//                     option: {
//                         focusBackground: 'var(--fuse-background-hover)',
//                         selectedBackground: 'var(--fuse-primary-50)',
//                         selectedFocusBackground: 'var(--fuse-primary-100)',
//                         color: 'var(--fuse-foreground-text)',
//                         focusColor: darken('var(--fuse-foreground-text)', 10),
//                         selectedColor: 'var(--fuse-primary-700)',
//                         selectedFocusColor: 'var(--fuse-primary-800)',
//                         icon: {
//                             color: 'var(--fuse-foreground-hint)',
//                             focusColor: 'var(--fuse-foreground-secondary)',
//                         },
//                     },
//                     optionGroup: {
//                         background: 'transparent',
//                         color: 'var(--fuse-foreground-secondary)',
//                     },
//                 },
//                 navigation: {
//                     item: {
//                         focusBackground: 'var(--fuse-background-hover)',
//                         activeBackground: 'var(--fuse-background-hover)',
//                         color: 'var(--fuse-foreground-text)',
//                         focusColor: darken('var(--fuse-foreground-text)', 8),
//                         activeColor: 'var(--fuse-primary-700)',
//                         icon: {
//                             color: 'var(--fuse-foreground-hint)',
//                             focusColor: 'var(--fuse-foreground-secondary)',
//                             activeColor: 'var(--fuse-primary-600)',
//                         },
//                     },
//                     submenuLabel: {
//                         background: 'transparent',
//                         color: 'var(--fuse-foreground-secondary)',
//                     },
//                     submenuIcon: {
//                         color: 'var(--fuse-foreground-hint)',
//                         focusColor: 'var(--fuse-foreground-secondary)',
//                         activeColor: 'var(--fuse-primary-600)',
//                     },
//                 },
//             },
//             dark: {
//                 surface: {
//                     0: 'var(--fuse-background-card)',
//                     50: 'var(--fuse-background-base)',
//                     100: lighten('var(--fuse-background-card)', 6),
//                     200: 'var(--fuse-foreground-divider)',
//                     300: 'var(--fuse-foreground-disabled)',
//                     400: 'var(--fuse-foreground-hint)',
//                     500: 'var(--fuse-foreground-secondary)',
//                     600: lighten('var(--fuse-foreground-secondary)', 12),
//                     700: 'var(--fuse-foreground-text)',
//                     800: lighten('var(--fuse-foreground-text)', 6),
//                     900: 'var(--fuse-background-base)',
//                     950: darken('var(--fuse-background-base)', 12),
//                 },
//                 primary: {
//                     color: 'var(--fuse-primary-300)',
//                     contrastColor: 'var(--fuse-primary-contrast-default)',
//                     hoverColor: 'var(--fuse-primary-200)',
//                     activeColor: 'var(--fuse-primary-100)',
//                 },
//                 highlight: {
//                     background: mix(
//                         'var(--fuse-primary-default)',
//                         'transparent',
//                         84
//                     ),
//                     focusBackground: mix(
//                         'var(--fuse-primary-default)',
//                         'transparent',
//                         76
//                     ),
//                     color: 'var(--fuse-foreground-text)',
//                     focusColor: 'var(--fuse-foreground-text)',
//                 },
//                 mask: {
//                     background: 'rgba(15, 23, 42, 0.7)',
//                     color: 'var(--fuse-foreground-divider)',
//                 },
//                 formField: {
//                     background: 'var(--fuse-background-card)',
//                     disabledBackground: darken(
//                         'var(--fuse-background-card)',
//                         8
//                     ),
//                     filledBackground: lighten('var(--fuse-background-card)', 6),
//                     filledHoverBackground: lighten(
//                         'var(--fuse-background-card)',
//                         10
//                     ),
//                     filledFocusBackground: lighten(
//                         'var(--fuse-background-card)',
//                         10
//                     ),
//                     borderColor: 'var(--fuse-foreground-divider)',
//                     hoverBorderColor: lighten(
//                         'var(--fuse-foreground-divider)',
//                         20
//                     ),
//                     focusBorderColor: 'var(--fuse-primary-300)',
//                     invalidBorderColor: 'var(--fuse-warn-400)',
//                     color: 'var(--fuse-foreground-text)',
//                     disabledColor: 'var(--fuse-foreground-disabled)',
//                     placeholderColor: 'var(--fuse-foreground-hint)',
//                     invalidPlaceholderColor: 'var(--fuse-warn-400)',
//                     floatLabelColor: 'var(--fuse-foreground-secondary)',
//                     floatLabelFocusColor: 'var(--fuse-primary-300)',
//                     floatLabelActiveColor: 'var(--fuse-foreground-secondary)',
//                     floatLabelInvalidColor: 'var(--fuse-warn-300)',
//                     iconColor: 'var(--fuse-foreground-hint)',
//                     shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(15, 23, 42, 0.35)',
//                 },
//                 text: {
//                     color: 'var(--fuse-foreground-text)',
//                     hoverColor: lighten('var(--fuse-foreground-text)', 8),
//                     mutedColor: 'var(--fuse-foreground-secondary)',
//                     hoverMutedColor: lighten(
//                         'var(--fuse-foreground-secondary)',
//                         12
//                     ),
//                 },
//                 content: {
//                     background: 'var(--fuse-background-card)',
//                     hoverBackground: lighten('var(--fuse-background-card)', 8),
//                     borderColor: 'var(--fuse-foreground-divider)',
//                     color: 'var(--fuse-foreground-text)',
//                     hoverColor: lighten('var(--fuse-foreground-text)', 6),
//                 },
//                 overlay: {
//                     select: {
//                         background: 'var(--fuse-background-card)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                     popover: {
//                         background: 'var(--fuse-background-card)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                     modal: {
//                         background: 'var(--fuse-background-dialog)',
//                         borderColor: 'var(--fuse-foreground-divider)',
//                         color: 'var(--fuse-foreground-text)',
//                     },
//                 },
//                 list: {
//                     option: {
//                         focusBackground: lighten(
//                             'var(--fuse-background-card)',
//                             10
//                         ),
//                         selectedBackground: mix(
//                             'var(--fuse-primary-default)',
//                             'transparent',
//                             80
//                         ),
//                         selectedFocusBackground: mix(
//                             'var(--fuse-primary-default)',
//                             'transparent',
//                             72
//                         ),
//                         color: 'var(--fuse-foreground-text)',
//                         focusColor: lighten('var(--fuse-foreground-text)', 6),
//                         selectedColor: 'var(--fuse-primary-100)',
//                         selectedFocusColor: 'var(--fuse-primary-50)',
//                         icon: {
//                             color: 'var(--fuse-foreground-hint)',
//                             focusColor: lighten(
//                                 'var(--fuse-foreground-secondary)',
//                                 15
//                             ),
//                         },
//                     },
//                     optionGroup: {
//                         background: 'transparent',
//                         color: 'var(--fuse-foreground-secondary)',
//                     },
//                 },
//                 navigation: {
//                     item: {
//                         focusBackground: lighten(
//                             'var(--fuse-background-card)',
//                             10
//                         ),
//                         activeBackground: lighten(
//                             'var(--fuse-background-card)',
//                             10
//                         ),
//                         color: 'var(--fuse-foreground-text)',
//                         focusColor: lighten('var(--fuse-foreground-text)', 8),
//                         activeColor: 'var(--fuse-primary-200)',
//                         icon: {
//                             color: 'var(--fuse-foreground-hint)',
//                             focusColor: lighten(
//                                 'var(--fuse-foreground-secondary)',
//                                 12
//                             ),
//                             activeColor: 'var(--fuse-primary-200)',
//                         },
//                     },
//                     submenuLabel: {
//                         background: 'transparent',
//                         color: 'var(--fuse-foreground-secondary)',
//                     },
//                     submenuIcon: {
//                         color: 'var(--fuse-foreground-hint)',
//                         focusColor: lighten(
//                             'var(--fuse-foreground-secondary)',
//                             10
//                         ),
//                         activeColor: 'var(--fuse-primary-200)',
//                     },
//                 },
//             },
//         },
//     },
// });
