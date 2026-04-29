# Panon Suite Design System Standards

This document establishes the design principles for the Panon Suite application. Consistent adherence to these standards is mandatory for all future UI development.

## 1. Color Palette
- **Primary Accent (`--color-accent`):** `#52C5F3`
- **Body Background (Dark):** `#161616`
- **Card Background (Dark):** `#1e1e1e`
- **Text (Dark):** Neutral gray-scale, consistent with global theme.

## 2. Component Design
### Cards
- **Structure:** Rounded corners (`rounded-[11px]`), border-gray-100 (light) / border-[#222] (dark).
- **Shadows:** Subtle `shadow-sm` for depth.
- **Backgrounds:** Use `#1e1e1e` for consistency in dark mode.

### Tables
- **Headers:** Minimalist header with `text-[10px]`, `font-black`, `tracking-widest`.
- **Borders:** Subtle `divide-y` or `border` lines.
- **Rows:** Hover effects should be subtle (`hover:bg-gray-50/50 dark:hover:bg-[#252525]/30`).

### Buttons
- **Style:** Compact, rounded, dark theme.
- **Classes:** `bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors`.
- **Usage:** Action buttons (e.g., "New", "Submit" in certain contexts).

### Typography
- **Headings:** Bold/Black weights with `tracking-tight`.
- **UI Labels:** Use small font sizes (`text-sm`, `text-[10px]`) for secondary labels (e.g., table headers, card headers). Ensure Title Case is used for consistency.

## 3. UI Consistency
- Maintain professional, clean layouts.
- Avoid over-crowding; prioritize readability and data clarity.
- All new components must follow these established color and spacing standards.
