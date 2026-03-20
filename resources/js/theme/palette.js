export const palette = {
  light: {
    mode: 'light',

    // ── Base ──────────────────────────────────────────
    background:    '#F9FAFB',
    surface:       '#FFFFFF',
    bg:            '#FFFFFF',          // Header / top-level bg
    bgSecondary:   '#F3F4F6',          // Main content area bg
    card:          '#FFFFFF',          // SectionHeader card bg
    border:        '#E5E7EB',          // General borders
    text:          '#111827',          // Main text
    mutedText:     '#6B7280',          // Descriptions, secondary text

    // ── Brand ─────────────────────────────────────────
    primary:       '#2563EB',
    secondary:     '#9333EA',
    accent:        '#2563EB',          // Accent highlights (badges, icons)
    accentHover:   '#1D4ED8',          // Accent hover state

    // ── Semantic ──────────────────────────────────────
    success:       '#16A34A',
    error:         '#DC2626',
    danger:        '#DC2626',

    // ── Text ──────────────────────────────────────────
    textPrimary:   '#111827',
    textSecondary: '#6B7280',

    // ── Sidebar ───────────────────────────────────────
    sidebarBg:       '#FFFFFF',
    sidebarFg:       '#111827',
    sidebarBorder:   '#E5E7EB',
    sidebarMuted:    '#D1D5DB',        // Scrollbar thumb, dot indicators
    sidebarMutedFg:  '#6B7280',        // Section titles, sub-link text
    sidebarHover:    '#F3F4F6',        // Row hover background
    sidebarActive:   '#EFF6FF',        // Active / expanded row background
    sidebarActiveFg: '#2563EB',        // Active row text + icons
  },

  dark: {
    mode: 'dark',

    // ── Base ──────────────────────────────────────────
    background:    '#111827',
    surface:       '#1F2937',
    bg:            '#1F2937',
    bgSecondary:   '#111827',
    card:          '#1F2937',
    border:        '#374151',
    text:          '#F9FAFB',
    mutedText:     '#9CA3AF',

    // ── Brand ─────────────────────────────────────────
    primary:       '#3B82F6',
    secondary:     '#A855F7',
    accent:        '#3B82F6',
    accentHover:   '#2563EB',

    // ── Semantic ──────────────────────────────────────
    success:       '#22C55E',
    error:         '#EF4444',
    danger:        '#EF4444',

    // ── Text ──────────────────────────────────────────
    textPrimary:   '#F9FAFB',
    textSecondary: '#9CA3AF',

    // ── Sidebar ───────────────────────────────────────
    sidebarBg:       '#1F2937',
    sidebarFg:       '#F9FAFB',
    sidebarBorder:   '#374151',
    sidebarMuted:    '#4B5563',
    sidebarMutedFg:  '#9CA3AF',
    sidebarHover:    '#374151',
    sidebarActive:   '#1E3A5F',
    sidebarActiveFg: '#60A5FA',
  },
};