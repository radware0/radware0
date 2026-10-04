---
name: radware0 GitHub Profile
description: A full-width animated banner, native GitHub prose, and a grayscale activity heatmap.
colors:
  oled-black: "#000000"
  ink: "#f5f5f5"
  support-text: "#b8b8b8"
  panel-border: "#303030"
  heatmap-empty: "#181818"
  heatmap-low: "#555555"
  heatmap-medium: "#888888"
  heatmap-high: "#bbbbbb"
typography:
  svg-label:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "12px"
  activity-mobile:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "14px"
rounded:
  panel: "14px"
  heatmap-cell: "2px"
components:
  gif-banner:
    width: "100%"
    aspectRatio: "500 / 281"
  native-introduction:
    width: "100%"
  antwork-title:
    headingLevel: 1
  tech-stack:
    textAlign: "center"
  activity-panel:
    backgroundColor: "{colors.oled-black}"
    textColor: "{colors.support-text}"
    rounded: "{rounded.panel}"
    width: "900px"
    height: "246px"
---

# Design System: radware0 GitHub Profile

## Overview

The uploaded GIF supplies a full-width animated banner. Native GitHub text carries the role, About me, project, technology names, and links. The existing grayscale contribution heatmap closes the profile above its footer.

GitHub controls the page background, native typography, heading rules, and link styling. The GIF keeps its own colors; the heatmap retains its black background and grayscale cells.

## Layout

Content runs in this order:

1. Full-width giphy.gif, preserving its 500 × 281 proportions.
2. Centered **Frontend Dev / Starting my cybersecurity Journey** and the original project, repository, and demo links.
3. The original **About me** prose.
4. Lowercase native H1 **antwork**, followed by the original repository and live-demo links.
5. **Tech stack**, with a centered text line that wraps naturally on phones.
6. The responsive **Activity** heatmap.
7. The original centered footer.

There is no welcome heading. The project and technology sections use native text. Existing blank lines and br elements separate sections.

## Components

- **GIF banner:** giphy.gif is embedded at 100% width. The same animation is used on desktop and mobile, with its aspect ratio preserved.
- **Native introduction:** the role line and top links are centered. The author's About me text keeps its original wording.
- **Antwork title:** a native H1 replaces the previous Pinned project heading and SVG. The Explore the repo and Try Antwork links retain their labels and destinations.
- **Tech stack:** HTML · CSS · JavaScript · Visual Studio Code · Codex · React JS · GitHub. These are plain text names with no icons or badges.
- **Activity panel:** the original contribution SVGs and daily refresh workflow remain in use. Desktop displays the past year; mobile displays the recent six months and the same yearly total.

## Heatmap

| Asset | Dimensions | Display |
| --- | --- | --- |
| assets/activity.svg | 900 × 246 | Desktop |
| assets/activity-mobile.svg | 420 × 236 | Viewports at or below 600px |

The five contribution levels use heatmap-empty, heatmap-low, heatmap-medium, heatmap-high, and ink. The panel radius is 14 source units; contribution cells use a 2-unit radius. The data and SVGs are maintained by scripts/update-activity.mjs and the included daily GitHub Actions workflow.

## Files and previews

README.md is the production profile. Keep giphy.gif beside it and retain the activity SVGs and workflow when copying the profile repository.

scripts/preview.mjs renders README.md using GitHub's Markdown API and supplies an approximate dark GitHub shell. The HTML previews and desktop/mobile PNG captures are development artifacts; they are excluded from the profile ZIP.

Legacy hero, Antwork, and technology SVG assets are retained on disk, along with scripts/build-art.mjs. They are unused by the current README.

## Rules

- Preserve the GIF's animation and proportions.
- Keep About me, native links, and the footer readable and faithful to the author's wording.
- Let the tech stack text wrap at narrow widths.
- Keep the 600px heatmap picture switch and its Recent 6 months label.
- Preserve real contribution data and its existing refresh workflow.
