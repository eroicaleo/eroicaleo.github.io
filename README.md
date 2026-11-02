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
  progress: 0
```

The list order controls the display order. The collection count and numbering
update automatically. Use `View repository` for links to GitHub repositories.
Quote YAML strings that contain `: ` or other YAML punctuation.

Available illustrations are `algebra`, `coding`, `analysis`, `fourier`,
`calculus` (a curved surface on three-dimensional coordinate axes), and `roadmap`
(a path across a folded map, with milestones and a destination flag).
Any other value (or no `icon` field) displays a notebook illustration. `detail`
and `icon` are optional; `action` defaults to `Read notes`.

## Update reading progress

Set `progress` on each entry in `_data/notes.yml` to a number from `0` to `100`:

```yaml
  progress: 65
```

Use a number without a `%` sign. Each homepage card displays the percentage and
a matching bar. Its color gradually shifts from pinkish orange at `0` through
yellow to bright green at `100`, which also shows the label **Completed**.
The percentage badge on the right uses the same color, with dark text for
readability. The filled portion has a subtle gradient in all three themes.

The initial `0` values are placeholders for your own reading progress. Missing
values default to `0`. Decimals are supported to one decimal place, and values
outside the range are limited to `0`–`100`. Progress is rendered by Jekyll and
works without JavaScript. With `./bin/preview` running, saving the YAML file
automatically updates the local preview; commit and push to update the live site.

## Edit the design

- `index.html`: homepage structure and the note-card template.
- `assets/css/site.css`: layout, typography, and theme colors.
- `assets/js/theme.js`: early theme restoration and accessible controls.
- `_config.yml`: site metadata and Jekyll configuration.

## Edit or extend the mathematics roadmap

The roadmap is generated from editable content files; you do not need to edit
HTML. Its public address stays `/math-roadmap.html`.
Do not edit `_site/math-roadmap.html`; Jekyll regenerates that output on each build.

| File | What to edit |
| --- | --- |
| `math-roadmap.md` | Page title, introduction, and opening note. The introduction uses Markdown. |
| `_data/roadmap.yml` | Sections, stages, subject cards, reading goals, courses, timelines, and tables. Text fields support Markdown where the existing examples use it. |
| `_data/books.yml` | Book titles, authors, cover images, and source links. Each book has a reusable ID. |

To recommend another book, add it to `_data/books.yml` using a unique short ID:

```yaml
my-new-book:
  title: My New Book
  author: Author Name
  cover: /assets/books/my-new-book.jpg
  source: https://example.com/book-information
```

Use a local image under `assets/books/` or a remote image URL. Existing covers
use Open Library or the author's book page. Cover images load as readers scroll;
if an image is missing or unavailable, a small book illustration takes its place.
The `cover` field is optional. Clicking the thumbnail opens the `source` link.

Then add a reference under a card's `books` list in `_data/roadmap.yml`:

```yaml
    - book: my-new-book
      goal: my-new-book
      note: Read after completing the foundations.
```

`book` must match an ID in the catalog. `goal` adds a reading checkbox; omit it
for alternatives and references that should not count toward reading progress.
Keep existing goal IDs unchanged so saved checkboxes continue to work. Each goal
ID must be unique even when the same book appears in more than one section.

To add a stage, append a section under `sections:` in `_data/roadmap.yml`:

```yaml
- id: new-stage
  nav: New stage
  title: My new stage
  timeframe: At my own pace
  intro: A short introduction with **Markdown** formatting.
  cards:
  - tag: Subject
    title: What I want to learn
    books:
    - book: my-new-book
      goal: my-new-book
      note: Start with the opening chapters.
    body: |
      Add study advice or [a course link](https://example.com/course).
```

Use this new goal in one place only. Sections and cards appear in file order,
and the chapter navigation updates automatically. Keep section IDs unique and
stable to preserve links. The existing `status` and `table` sections provide
examples for editing the current-position cards, side paths, and study rhythm.

Run `./bin/preview` while editing. The roadmap rebuilds when you save these
files. Reading checkboxes remain private to each browser and do not change the
homepage's manually configured `progress` values.

The rendering files are `_layouts/roadmap.html`, `_includes/roadmap-book.html`,
`assets/css/roadmap.css`, and `assets/js/roadmap.js`; only edit these to change
the visual layout or behavior.

No personal identity or profile is displayed. Existing standalone notes retain
their filenames and URLs. `_design-preview/` contains local design experiments
and is excluded from Git and the published site.

## Preview locally

The project uses Ruby 3.3 and Bundler to install the same Jekyll dependencies
as GitHub Pages. The Ruby 2.6 bundled with macOS is too old for this setup.

On a Mac with Homebrew, install Ruby once:

```sh
brew install ruby@3.3
```

Then, from the repository directory, start the preview:

```sh
./bin/preview
```

The launcher selects Homebrew Ruby 3.3, installs any missing dependencies into
the ignored `vendor/bundle/` directory, and starts Jekyll with live reload.
Open <http://127.0.0.1:4000/>. Keep the terminal running while editing; press
**Control+C** to stop. Changes to notes and pages rebuild automatically. Restart
the server after editing `_config.yml`.

If port 4000 is already in use, run `./bin/preview --port 4001` and open
<http://127.0.0.1:4001/> instead.

To run Bundler directly or check the build without starting a server:

```sh
export PATH="$(brew --prefix ruby@3.3)/bin:$PATH"
bundle install
bundle exec jekyll build
bundle exec jekyll serve --livereload
```

Use `./bin/preview` or `bundle exec jekyll serve` instead of bare `jekyll serve`:
Jekyll is installed as a project dependency, not a global command. Simply opening
`index.html` as a file does not render its Liquid template or YAML data.

Commit `Gemfile` and `Gemfile.lock` when dependencies change. The `.bundle/`,
`vendor/`, and `_site/` directories are local and ignored by Git.

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
git add _data/ _layouts/ _includes/ assets/ bin/ index.html math-roadmap.md _config.yml README.md .gitignore Gemfile Gemfile.lock
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

### Fix GitHub authentication errors

If a push reports `Invalid username or token` or `Password authentication is not
supported`, the HTTPS credentials were rejected. This checkout uses SSH with an
existing key registered to the `eroicaleo` GitHub account.

To check SSH authentication:

```sh
ssh -T git@github.com
```

A successful result says `Hi eroicaleo! You've successfully authenticated`.
GitHub also says it does not provide shell access and returns exit code 1;
that is normal for this check.

If a future checkout uses an HTTPS remote, switch it to SSH and retry the push:

```sh
git remote set-url origin git@github.com:eroicaleo/eroicaleo.github.io.git
git remote -v
git push origin master
```

On another computer, first follow GitHub's
[SSH setup guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
If authentication succeeds as a different account, configure the key for
`eroicaleo` before pushing.

See GitHub's [publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
and [remote URL instructions](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)
for details.
