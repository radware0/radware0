# Rad's GitHub profile

This folder is ready to become the public profile repository **radware0/radware0**. Its root README contains the profile, `giphy.gif` supplies the animated header, and the contribution heatmap is stored locally in `assets/`.

Copy the contents of this folder, including `.github/`, into the root of that repository. Use `main` as the default branch. GitHub displays the root README automatically when the public repository name matches your username. [GitHub's profile README guide](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme).

## Activity

The included images contain real contribution data for `radware0`, fetched from GitHub's GraphQL contribution calendar. The workflow refreshes them daily at approximately **08:17 Singapore time**, and can also be run from **Actions → Refresh OLED activity → Run workflow**. Scheduled runs can be delayed by GitHub. [GitHub's scheduled workflow reference](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

The workflow uses the built-in `GITHUB_TOKEN`; no personal access token, external stats service, or paid API is needed. If repository settings restrict workflow writes, enable **Settings → Actions → General → Workflow permissions → Read and write permissions**. GitHub can disable scheduled workflows in inactive public repositories after 60 days; use a manual run or re-enable the workflow if needed.

The desktop heatmap shows the past year. Phones show the recent six months so the cells remain readable; both show the same yearly contribution total. The SVG date tooltips are available when an SVG is opened directly. Embedded README images are static between daily refreshes.

Refresh locally with Node.js 24 and an authenticated GitHub CLI:

```powershell
node scripts/update-activity.mjs
```

The previous header, project, and technology SVGs are retained as unused source assets. Regenerate those legacy assets with:

```powershell
node scripts/build-art.mjs
```

## Profile details

- Antwork repository: https://github.com/radware0/antwork
- Antwork demo: https://antwork-five.vercel.app/
- To pin Antwork in GitHub's native **Pinned** area, use **Customize your pins** on your profile and select **antwork**. The README already features it.
- Edit the About Me directly in `README.md`.
- The GIF fills the README width and keeps its original proportions. Keep `giphy.gif` beside `README.md` when copying or uploading the profile.
- The project title is a native H1, and the tech stack is plain text. The heatmap uses a pure `#000000` background and white/gray foregrounds; GitHub controls the surrounding page styling.

The local previews and preview PNGs are development artifacts. `radware0-profile.zip` contains the profile files, including the GIF and activity workflow, for upload to the profile repository.
