# KABISAT Maulid — Design System

## Brand palette

- **Primary:** `#112C48` — deep navy, used for primary surfaces, headings, and high-contrast text.
- **Secondary:** `#D1A447` — warm gold, reserved for focal details, rules, and primary actions.
- **Accent:** `#AEAAA4` — quiet stone, used for supporting labels, dividers, and subdued text.
- **Backgrounds:** `#F7F4EF` is the main warm ivory canvas. `#112C48` is the cinematic inverse section background; white is used sparingly inside form inputs.
- **Text:** `#112C48` on ivory; `#F7F4EF` on navy; `#AEAAA4` for secondary copy.
- **Borders:** navy at 15–25% opacity on light surfaces; gold at 55% opacity for emphasis; ivory at 22% opacity on dark surfaces.

## Typography direction

Editorial serif display headings (Georgia/Times fallback) paired with a precise, wide-tracked system sans for labels and body copy. Large contrast in scale and restrained uppercase labels establish a solemn, premium rhythm.

## Components

- **Buttons:** 1px border, modest 8px radius, generous horizontal padding. Primary is gold on navy; hover lifts by 2px only.
- **Inputs:** 16px minimum mobile font size, white/ivory field, single navy bottom/outline treatment, clear focus ring in gold. No pill fields.
- **Spacing:** 4px base; section rhythm uses 72px mobile / 120px desktop vertical padding. Content measure is capped at 1120px.
- **Radius:** 8px for controls, 12px for contained utility surfaces only. Editorial sections stay square and open.
- **Shadows:** no ambient card shadows. One soft navy shadow is allowed for the primary cover CTA and focus depth.

## Responsive principles

Mobile is the primary composition (375–430px), with comfortable tap targets and unbroken text. Desktop uses a wider asymmetric editorial grid—not simply scaled mobile. Pattern artwork remains a low-opacity background layer; motion respects `prefers-reduced-motion`.
