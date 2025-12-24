---
description: Deploy the application to Vercel
---
1. Build the project to verify it works:
   ```bash
   npm run build
   ```

2. Deploy using Vercel (easiest method):
   - You can use `npx` to run vercel without installing it globally.
   ```bash
   npx vercel
   ```
   - If asked to install `vercel`, say 'y'.
   - Login if prompted.
   - **Set up and deploy**: 'y'
   - **Which scope**: Select your account.
   - **Link to existing project**: 'n' (unless you already have one)
   - **Project name**: Press Enter (default).
   - **In which directory is your code located?**: Press Enter (default `./`).
   - **Want to modify these settings**: 'n'.

3. Your site will be deployed! You'll get a URL like `https://project-name.vercel.app`.
