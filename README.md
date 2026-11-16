# Clarity2027 website

The Clarity2027 conference website in English and French. GitHub builds and publishes the site whenever changes are committed to the `main` branch.

- **Hosting:** GitHub Pages
- **Public address:** `https://clarity2027.org`
- **Domain and DNS:** one.com
- **Updates:** commit changes to GitHub; no one.com file upload is required

## Part 1. Upload the website to GitHub

1. Sign in to GitHub and open the `Clarity-International/clarity2027` repository.
2. Unzip the update package. Open the dated folder and select everything inside it, including the hidden `.github` folder.
3. Drag the files into the top level of the repository.
4. Click **Commit changes** and commit to the `main` branch.
5. Go to **Settings**, then **Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
6. Open the **Actions** tab and select **Build and publish**.
7. Click **Run workflow**, choose `main`, and run it.

The workflow builds the public site with `/` as its base path and allows search engines to index it.

## Part 2. Connect clarity2027.org to GitHub Pages

Keep one.com as the domain and DNS provider. Do not change the nameservers if one.com also provides email for Clarity.

In the one.com DNS settings, create these four `A` records for the root domain. In some one.com interfaces, the root name is shown as `@` or left blank.

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Create this `CNAME` record for `www`:

- Name: `www`
- Target: `clarity-international.github.io`

Do not delete existing `MX`, `TXT`, `SPF`, `DKIM`, or `DMARC` records used for email.

Then, in GitHub:

1. Open **Settings**, then **Pages**.
2. Enter `clarity2027.org` in **Custom domain**.
3. Click **Save**.
4. Wait for GitHub to verify the DNS settings.
5. Enable **Enforce HTTPS** when it becomes available.

For a site published through this GitHub Actions workflow, a `CNAME` file is not required in the repository. The custom domain is configured in GitHub Pages settings.

## Part 3. Update the website

For a global update, upload the contents of the new dated update folder to the top level of the repository and commit to `main`.

For a small text update, open `src/frame/content.ts` in GitHub and edit the English or French text. Commit the change to `main`.

Every commit to `main` starts the **Build and publish** workflow. The website normally updates within a few minutes.

If something goes wrong, open the **Actions** tab and inspect the failed job. GitHub keeps the history of each file, so earlier versions can be restored.

## For a web developer

- Vite + React 18 + Tailwind CSS 4
- `npm install`, `npm run dev`, `npm run build`
- Build output: `dist/`
- `BASE_PATH=/` is used for the custom domain
- `src/frame/` contains the website application
- `src/shims/` replaces the two Dust-only helpers
- Texts: `src/frame/content.ts`, `sponsorsContent.ts`, and `learnings.ts`
- Team: `portraits.ts`
- Colors: `theme.ts` and `src/index.css`
- Pages use hash addresses such as `#cfp`, `#register`, and `#sponsors`
- `.github/workflows/deploy.yml` builds and publishes the site through GitHub Pages

The previous one.com SFTP deployment remains in the workflow as an optional fallback. It stays disabled unless the repository variable `ONECOM_ENABLED` is set to `true`.
