# Study notes homepage

A Jekyll homepage for GitHub Pages with three visitor-selectable appearances:
Warm, Minimal, and Dark. Warm is the default. A visitor's choice is stored in
their browser and restored on their next visit. The note links are rendered
by Jekyll and work without JavaScript; JavaScript enables the appearance controls.

## Add a collection

Append an entry to `_data/notes.yml`:

```yaml
- title: Your notebook title
  subject: Your subject
  description: A short description of the notes.
  detail: Book edition or another short label
  url: https://example.com/your-notes/
  action: Read notes
  icon: notebook
```

The list order controls the display order. The collection count and numbering
update automatically. Use `View repository` for links to GitHub repositories.
Quote YAML strings that contain `: ` or other YAML punctuation.

Available illustrations are `algebra`, `coding`, `analysis`, `fourier`, and
`calculus` (a curved surface on three-dimensional coordinate axes).
Any other value (or no `icon` field) displays a notebook illustration. `detail`
and `icon` are optional; `action` defaults to `Read notes`.

## Edit the design

- `index.html`: homepage structure and the note-card template.
- `assets/css/site.css`: layout, typography, and theme colors.
- `assets/js/theme.js`: early theme restoration and accessible controls.
- `_config.yml`: site metadata and Jekyll configuration.

No personal identity or profile is displayed. Existing standalone notes retain
their filenames and URLs. `_design-preview/` contains local design experiments
and is excluded from Git and the published site.

## Preview locally

With Jekyll and the GitHub Flavored Markdown parser installed, run:

```sh
jekyll serve
```

Open the local URL printed by Jekyll. Simply opening `index.html` as a file
does not render its Liquid template or YAML data.

## Publish to GitHub Pages

This repository publishes to <https://eroicaleo.github.io/> from the `master`
branch. Run the Git commands below from the repository directory.

### First publish of the redesigned homepage

1. Review, commit, and push the homepage changes:

   ```sh
   git status
   git add .gitignore _config.yml index.md index.html README.md _data/ assets/
   git diff --cached
   git commit -m "Redesign study notes homepage with three themes"
   git push origin master
   ```

   Including `index.md` stages the removal of the old homepage. This command is
   for the initial redesign; use the commands below for later updates.
   `_design-preview/` is ignored and will not be published.

2. Open [Settings → Pages](https://github.com/eroicaleo/eroicaleo.github.io/settings/pages)
   and check the **Build and deployment** settings:

   - Source: **Deploy from a branch**
   - Branch: **master**
   - Folder: **/ (root)**

   Click **Save** if you changed these settings. GitHub builds the Jekyll site
   automatically; no separate hosting service or JavaScript build step is needed.

3. Open the [Actions tab](https://github.com/eroicaleo/eroicaleo.github.io/actions)
   and wait for the Pages build and deployment to succeed. Then visit
   <https://eroicaleo.github.io/> to check the published homepage.

### Publish future updates

After editing the notes list, design, or documentation:

```sh
git status
git add _data/ assets/ index.html _config.yml README.md .gitignore
git diff --cached
git commit -m "Update study notes homepage"
git push origin master
```

Adjust the commit message to describe your changes. If you edited other files,
add those paths to `git add` too. Review the staged changes before committing.
The Pages settings only need to be configured once; subsequent pushes to
`master` trigger publication automatically.

Check the Actions tab after each push. If deployment fails, open the failed run
and inspect its build logs. A working local HTML preview does not verify the full
Jekyll build. If deployment succeeds but the site looks unchanged, refresh the
page without using the browser cache.

See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
for details.
