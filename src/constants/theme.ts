/**
 * Color palette configuration
 */
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  secondary: {
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
    950: '#020617'
  },
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  }
} as const;

/**
 * Typography configuration
 */
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  }
} as const;

/**
 * Spacing and layout configuration
 */
export const SPACING = {
  /** Navigation bar height */
  nav: '4rem',
  /** Footer height */
  footer: '6rem',
  /** Container max width */
  container: '1200px',
  /** Content padding */
  contentPadding: '1.5rem',
  /** Section spacing */
  sectionSpacing: '4rem',
  /** Component spacing */
  componentSpacing: '2rem'
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

/**
 * Animation and transition configuration
 */
export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms'
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  },
  scale: {
    hover: '1.05',
    active: '0.95'
  }
} as const;

/**
 * Shadow configuration
 */
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
} as const;

/**
 * Border radius configuration
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
} as const;

/**
 * Z-index configuration
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080
} as const;

/**
 * Component-specific theme constants
 */
export const COMPONENT_THEMES = {
  navigation: {
    height: SPACING.nav,
    backgroundColor: COLORS.primary[600],
    textColor: COLORS.neutral[50],
    hoverColor: COLORS.primary[500],
    activeColor: COLORS.primary[700],
    borderRadius: BORDER_RADIUS.none,
    shadow: SHADOWS.md
  },
  button: {
    primary: {
      backgroundColor: COLORS.primary[600],
      hoverColor: COLORS.primary[700],
      textColor: COLORS.neutral[50],
      borderRadius: BORDER_RADIUS.md,
      shadow: SHADOWS.sm
    },
    secondary: {
      backgroundColor: COLORS.secondary[100],
      hoverColor: COLORS.secondary[200],
      textColor: COLORS.secondary[900],
      borderRadius: BORDER_RADIUS.md,
      shadow: SHADOWS.sm
    },
    accent: {
      backgroundColor: COLORS.accent[500],
      hoverColor: COLORS.accent[600],
      textColor: COLORS.neutral[50],
      borderRadius: BORDER_RADIUS.md,
      shadow: SHADOWS.sm
    }
  },
  card: {
    backgroundColor: COLORS.neutral[50],
    borderColor: COLORS.secondary[200],
    borderRadius: BORDER_RADIUS.lg,
    shadow: SHADOWS.base,
    padding: '1.5rem'
  },
  input: {
    backgroundColor: COLORS.neutral[50],
    borderColor: COLORS.secondary[300],
    focusBorderColor: COLORS.primary[500],
    textColor: COLORS.secondary[900],
    placeholderColor: COLORS.secondary[400],
    borderRadius: BORDER_RADIUS.md,
    shadow: SHADOWS.sm
  }
} as const;

/**
 * Default theme configuration
 */
export const DEFAULT_THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  breakpoints: BREAKPOINTS,
  animations: ANIMATIONS,
  shadows: SHADOWS,
  borderRadius: BORDER_RADIUS,
  zIndex: Z_INDEX,
  components: COMPONENT_THEMES
} as const;

/**
 * Theme type for TypeScript
 */
export type Theme = typeof DEFAULT_THEME;