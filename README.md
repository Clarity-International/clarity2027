# Clarity2027 website

The Clarity2027 conference website (English and French). No coding needed: GitHub builds and publishes the site for you every time a file changes.

- **Now:** a free demo address to show the committee (GitHub Pages).
- **Later:** the same files publish to clarity2027.org on one.com, automatically.

---

## Part 1. Put the demo online (about 10 minutes, once)

1. Sign in to GitHub. Click **+** (top right), then **New repository**.
   - Name: `clarity2027` (any name works; it becomes part of the demo address).
   - Choose **Public**. (Free GitHub accounts can only publish public repositories.)
   - Click **Create repository**.
2. On the next page, click **uploading an existing file**.
3. Unzip `clarity2027-site.zip` on your computer. Open the `clarity2027-site` folder, select **everything inside it**, and drag it into the GitHub page. Click **Commit changes**.
4. Check that the hidden `.github` folder came through: you should see a `.github` folder in the file list.
   - If it is missing (common on Mac, where it is hidden): click **Add file**, then **Create new file**. Type `.github/workflows/deploy.yml` as the name, paste the content of that file (open it from the zip with TextEdit or Notepad), and click **Commit changes**.
5. Go to **Settings**, then **Pages** (left menu). Under **Build and deployment**, set **Source** to **GitHub Actions**.
6. Go to the **Actions** tab. Click **Build and publish**, then **Run workflow**. Wait for the green tick (2 to 3 minutes).
7. Your demo is at: `https://YOUR-GITHUB-NAME.github.io/clarity2027/`

The demo tells search engines not to list it, so it stays a preview.

## Part 2. Update the site

The simplest way: come back to the Dust conversation, ask for the change, and Dust gives you the updated file(s). Then:

1. In the repository, open the folder that contains the file (usually `src/frame`).
2. Click **Add file**, then **Upload files**, and drag the new file in. It replaces the old one.
3. Click **Commit changes**. The site updates by itself in 2 to 3 minutes.

Small text edits can also be done directly on GitHub: open `src/frame/content.ts` (English and French texts), click the pencil icon, edit the text between quotation marks, and click **Commit changes**.

If something goes wrong, every earlier version is kept in the **History** of each file and can be restored.

## Part 3. Publish to clarity2027.org on one.com (when you have the login)

Before you start: in one.com File Manager, download a copy of the current website as a backup.

1. In the one.com control panel, find the **SFTP** details: host (server address), username and password.
2. In GitHub: **Settings** > **Secrets and variables** > **Actions**.
3. On the **Secrets** tab, click **New repository secret** three times:
   - `ONECOM_SFTP_HOST`: the SFTP host
   - `ONECOM_SFTP_USER`: the SFTP username
   - `ONECOM_SFTP_PASSWORD`: the SFTP password
4. On the **Variables** tab, click **New repository variable**:
   - `ONECOM_ENABLED` = `true`
   - Optional: `ONECOM_REMOTE_DIR` = the folder of the website on the server, if one.com shows one (the default is the top folder `/`).
5. Go to **Actions** > **Build and publish** > **Run workflow**.

From then on, every change publishes both the demo and clarity2027.org. Passwords stay in GitHub’s encrypted settings; never paste them in a chat or a file.

---

## For a web developer (optional)

- Vite + React 18 + Tailwind CSS 4. `npm install`, `npm run dev`, `npm run build` (output in `dist/`).
- `src/frame/` is the Dust Frame prototype, unchanged. `src/shims/` replaces the two Dust-only helpers (`FrameRoot`, `useFile`, `triggerUserFileDownload`).
- Texts: `src/frame/content.ts`, `sponsorsContent.ts`, `learnings.ts`. Team: `portraits.ts`. Colours: `theme.ts` and `src/index.css`.
- Pages use hash addresses (`#cfp`, `#register`, `#sponsors`…), so links can be shared and the Back button works.
- `.github/workflows/deploy.yml`: job `demo` publishes to GitHub Pages; job `live` uploads `dist/` to one.com over SFTP (lftp) when `ONECOM_ENABLED` is `true`.
