# Paul Victor: Developer Portfolio

React 19, Vite, TypeScript, Tailwind CSS 4, Motion and React Router. Dark by default with a light theme.
All project content lives in one data file, so adding a project never means editing page components.

## 1. Run it locally

Run every command in the project folder (the one containing `package.json`).

```bash
npm install        # installs dependencies; ends with "found 0 vulnerabilities"
npm run dev        # starts http://localhost:5173
```

| Command | What it does | Success looks like |
|---|---|---|
| `npm run dev` | Development server with live reload | Prints a local URL |
| `npm run typecheck` | Checks TypeScript types | No output |
| `npm test` | Runs the automated tests (Vitest) | `Tests 36 passed` |
| `npm run build` | Typechecks, then builds `dist/` | `built in ...` |
| `npm run preview` | Serves the production build locally | Prints a local URL |

## 2. Fill in your real details (important)

Open `src/config/site.ts`. Anything left as `''` is hidden automatically, so nothing fake is ever shown.

- `email`, `githubUrl`, `linkedinUrl`, `otherLinks`: add real, verified values.
- `resumePath`: put your PDF in `public/` (e.g. `public/Paul-Victor-Resume.pdf`) and set `'/Paul-Victor-Resume.pdf'`. The "Download résumé" buttons appear only when this is set.
- Replace the placeholder copy in `src/data/about.ts` with your own words.
- `src/data/experience.ts`: add `period: 'Mar 2022 to Sep 2022'` to each entry once you have verified dates. Entries without dates show none.
- `src/data/skills.ts`: review each skill's `level` (`core`, `growing`, `learning`) so it matches reality.

## 3. Make the contact form work

The form posts to a service you configure. Until you do, it shows a "not connected" notice and its button is disabled. It never fakes success.

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint, e.g. `https://formspree.io/f/xxxxxxxx`.
2. Locally: copy `.env.example` to `.env` and set `VITE_CONTACT_FORM_ENDPOINT=...`, then restart `npm run dev`.
3. In production: set the same variable in Netlify or Vercel (below) and redeploy.
4. Send yourself a test message and confirm it arrives.

Spam protection: a hidden honeypot field is built in, and Formspree adds its own filtering (you can enable reCAPTCHA in its dashboard). No secret is stored in this code. The endpoint is a public URL by design.

## 4. Adding a project

1. Open `src/data/projects.ts` and append a new object to the `projects` array (copy an existing one). The `Project` type in `src/types/project.ts` shows every field.
2. Pick a `category` from `src/data/categories.ts` (add a new category there if needed; its filter button appears automatically).
3. Optional screenshots: put images in `public/projects/<slug>/` and set `thumbnail: { src: '/projects/<slug>/cover.png', alt: '...' }` and `gallery: [...]`. Use 16:10 images (e.g. 1600×1000) with real alt text.
4. Only set `liveUrl` / `githubUrl` when the real URLs exist. Without them, no button is shown.
5. Set `status` honestly (`planned`, `in-development`, `live`) and mark each feature `planned`, `in-progress` or `done` only when true.

The gallery, filters, home previews, case-study page, previous/next links and sitemap all update automatically. Display order is the array order.

When a project becomes functional, change its `status`, add `liveUrl`/`githubUrl`, replace the concept illustration with screenshots, and rewrite "challenges" and "lessons learned" from what really happened.

## 5. Deploying

Both hosts are preconfigured (`netlify.toml`, `vercel.json`) with the single-page-app fallback, so opening `/projects/devflow` directly works.

**Netlify:** push the project to GitHub, then Add new site, Import from Git. Build command `npm run build`, publish directory `dist`. Add environment variables under Site settings, Environment variables.

**Vercel:** Add New Project, import the repo (Vite is auto-detected). Add the environment variables under Settings, Environment Variables, then redeploy.

Environment variables (see `.env.example`):

- `VITE_SITE_URL`: your live domain, no trailing slash. Enables canonical URLs, the Open Graph image link and `sitemap.xml`.
- `VITE_CONTACT_FORM_ENDPOINT`: the contact form endpoint.

Never commit `.env` (it is already in `.gitignore`). Vite bakes `VITE_` variables into the public build, so only put public values in them.

After deploying: submit your domain's `sitemap.xml` to Google Search Console, and test a share link in a preview tool. Per-page link previews are limited on single-page apps; the homepage preview uses `public/og-image.png`.

## 6. Project structure

```
src/
  config/site.ts        personal details, links, env-driven settings
  data/                 projects.ts, categories.ts, skills.ts, experience.ts, about.ts
  types/project.ts      TypeScript types for project data
  lib/                  filtering helpers, contact validation + submit, small utils
  hooks/useTheme.tsx    light/dark theme (remembered in localStorage)
  components/
    layout/             Header, Footer, Layout (skip link, focus + scroll handling)
    ui/                 Button, Badge, Reveal, Timeline, ThemeToggle, ...
    project/            ProjectCard, Filters, Gallery, Links, concept illustrations
    case-study/         CaseStudySection
    contact/            ContactForm
  pages/                Home, About, Projects, ProjectDetail, Skills, Experience, Contact, NotFound
  test/                 automated tests
vite.config.ts          also generates sitemap.xml and robots.txt at build time
```

## 7. Known limitations (be honest about these)

- Project previews are generated concept illustrations, labelled "Concept preview", until you add real screenshots.
- The six projects are marked In development or Planned. Their case studies describe intended designs, not finished work.
- There is no ESLint configuration; add one if you want lint rules in CI.
- Lighthouse scores were not measured. Run Lighthouse on your deployed site and fix whatever it reports.

## 8. Final checklist

- [ ] `src/config/site.ts`: real email, GitHub, LinkedIn, résumé
- [ ] Experience dates verified or left out; skill levels reviewed
- [ ] Contact endpoint set; test message received
- [ ] `VITE_SITE_URL` set after you have a domain
- [ ] Real screenshots added as projects progress; statuses kept truthful
- [ ] Lighthouse run on the live site
