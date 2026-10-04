---
name: radware0 GitHub Profile
description: An OLED black ASCII profile with native GitHub prose.
colors:
  oled-black: "#000000"
  ink: "#f5f5f5"
  project-white: "#ffffff"
  support-text: "#b8b8b8"
  ascii-muted: "#aaaaaa"
  tile-label: "#e0e0e0"
  hairline: "#292929"
  panel-border: "#303030"
  heatmap-empty: "#181818"
  heatmap-low: "#555555"
  heatmap-medium: "#888888"
  heatmap-high: "#bbbbbb"
typography:
  ascii-display:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "24px"
    lineHeight: "28px"
  ascii-mobile:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "23px"
    lineHeight: "26px"
  project-title:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "42px"
    fontWeight: 700
    letterSpacing: "-1px"
  project-title-mobile:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    letterSpacing: "-0.8px"
  svg-body:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "18px"
  svg-label:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "12px"
  activity-mobile:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "14px"
  tile-label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "12px"
rounded:
  panel: "14px"
  heatmap-cell: "2px"
spacing:
  desktop-inset: "32px"
  mobile-inset: "24px"
  activity-row: "16px"
components:
  hero-panel:
    backgroundColor: "{colors.oled-black}"
    textColor: "{colors.ink}"
    width: "900px"
    height: "324px"
  native-introduction:
    width: "100%"
  antwork-panel:
    backgroundColor: "{colors.oled-black}"
    textColor: "{colors.ink}"
    typography: "{typography.project-title}"
    rounded: "{rounded.panel}"
    width: "900px"
    height: "216px"
  tech-tile:
    backgroundColor: "{colors.oled-black}"
    textColor: "{colors.tile-label}"
    typography: "{typography.tile-label}"
    width: "100px"
    height: "76px"
  activity-panel:
    backgroundColor: "{colors.oled-black}"
    textColor: "{colors.support-text}"
    rounded: "{rounded.panel}"
    width: "900px"
    height: "246px"
---

# Design System: radware0 GitHub Profile

## Overview

**Creative North Star: "OLED ASCII profile"**

Authored ASCII establishes Rad's identity; native GitHub headings, paragraphs, and links make his introduction and project easy to read. The finished system is monochrome, flat, and spacious around dense character art.

The brief precisely specified OLED black and ASCII. No random concept seed was used. This document describes the profile folder; Antwork's application design system remains separate.

**Key Characteristics:**

- Pure-black SVG panels with grayscale ink.
- Real monospace characters for RAD, the orbital field, and the ant.
- Native prose and links between responsive graphic panels.

## Colors

White is the primary ink; all supporting colors are neutral. The frontmatter expands the SVG source's short hex notation without changing its colors.

Primary `ink` draws ASCII, icons, prominent labels, and the brightest heatmap level. `project-white` draws the Antwork wordmark and external-link arrow. Neutral `oled-black` fills every SVG; `support-text` carries project and calendar details; `ascii-muted` carries hero metadata and the orbital field; `tile-label` names each technology. `hairline` divides hero and mobile project content; `panel-border` outlines project and activity panels.

The heatmap maps GitHub's NONE, FIRST_QUARTILE, SECOND_QUARTILE, THIRD_QUARTILE, and FOURTH_QUARTILE levels to `heatmap-empty`, `heatmap-low`, `heatmap-medium`, `heatmap-high`, and `ink`, in that order.

**The Host Boundary Rule.** Pure black belongs to the SVG artwork. GitHub controls the page background, native text, heading rules, and link styling.

## Typography

SVG ASCII and supporting copy use the documented monospace stacks. RAD row spacing is captured as line height; the production SVG positions each row separately. The desktop orbital field uses smaller characters (8.8 source units, 7.2-unit row spacing). Antwork's bold Arial wordmark supplies the sole large sans-serif display. Technology labels use Arial.

Project supporting text adapts from a desktop sentence to stacked mobile lines. Mobile calendar labels use the larger `activity-mobile` role. Native README prose and headings inherit GitHub typography; no custom font or prose scale is imposed.

## Layout

All measurements describe source SVG coordinates. The hero, project, and calendar scale to the available README width. At a viewport width of 600px or less, their `picture` sources switch to the mobile assets.

| Asset | Desktop | Mobile |
| --- | --- | --- |
| Hero | 900 × 324 | 420 × 286 |
| Antwork | 900 × 216 | 420 × 278 |
| Activity | 900 × 246 | 420 × 236 |

The desktop hero balances left-aligned RAD lettering with a 56-column, 30-row orbital field. Mobile centers the lettering and motto and removes the orbital field. Desktop project copy shares space with the ant; mobile stacks the capabilities beside a smaller ant.

Native content runs in this order: centered introduction, About me, Pinned project, Tech stack, Activity, centered footer. Blank lines and `br` elements create section breathing room. The seven 100 × 76 technology images form a centered inline group that wraps with the available width.

## Elevation & Depth

The artwork has no shadows, gradients, or motion. Black fields, grayscale contrast, whitespace, and thin strokes separate content. GitHub supplies the surrounding shell.

## Shapes

Hero and technology canvases are rectangular. Antwork and activity use the `panel` radius and a one-unit border. Contribution cells use the `heatmap-cell` radius, a 13-unit height, and the documented row pitch; horizontal pitch follows the number of weeks. Icon geometry is monochrome SVG path art.

## Components

- **ASCII hero:** a static identity banner with metadata, quiet divider lines, and the Work Hard, Play Hard motto.
- **Native introduction and prose:** real headings, paragraphs, and links; preserve the author's casual voice. Interaction styling belongs to GitHub.
- **Antwork panel:** the entire image links to the repository. Separate native links expose source and live demo. Its copy describes lock-ins, work hours, private local journals, and history.
- **Technology tiles:** HTML, CSS, JavaScript, VS Code, Codex, React JS, and GitHub, in that order. Each combines a white SVG icon, gray label, and meaningful alt text.
- **Activity panel:** real GitHub GraphQL calendar data, refreshed by the included daily workflow. Desktop shows 53 weeks; mobile shows the recent 26 weeks and explicitly says Recent 6 months. The headline total remains the past-year total.

All production art is text SVG generated by `scripts/build-art.mjs` and `scripts/update-activity.mjs`. The desktop and mobile PNGs are browser captures excluded from publication. They show GitHub Markdown API HTML with an approximate default dark GitHub shell, not a published profile. Sidecar samples are static extracts; contribution totals and dates remain generated data.

## Do's and Don'ts

- Do regenerate SVGs from their included scripts and keep meaningful image alt text.
- Do preserve the native content order and the author's casual voice.
- Do keep the 600px picture switch and label the shorter mobile calendar.
- Don't add colored badges or unrelated statistics.
- Don't treat preview captures or the dark preview shell as production profile styling.
- Don't replace contribution data with placeholders or hand-drawn counts.
