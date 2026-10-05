# FreshGuard AI — Zero-Waste Grocery Intelligence Platform

> **Predict. Prevent. Redistribute.**  
> AI-powered operations intelligence for supermarkets and grocery retail chains.

---

## 🚀 Why Was It Not Working on GitHub? (Fixed)

When deploying a modern Vite + React application to GitHub, two common issues cause a blank screen:

1. **Absolute vs Relative Asset Paths**: By default, Vite builds assets as `/assets/...`. When hosted on GitHub Pages (`https://<username>.github.io/<repository-name>/`), the browser looks for `https://<username>.github.io/assets/...` instead of inside your repository folder, resulting in `404 Not Found` for CSS and JS.
   - **Fix Applied**: `vite.config.ts` has been configured with `base: './'` so that all assets load relatively and work seamlessly on GitHub Pages, Vercel, Netlify, and custom domains.
2. **Serving `.tsx` directly instead of the built output**: Browsers cannot directly parse TypeScript/JSX. GitHub Pages must serve the compiled `dist/` directory, not the raw source files.
   - **Fix Applied**: We added an automated **GitHub Actions workflow** (`.github/workflows/deploy.yml`) that automatically builds and deploys your site whenever you push to GitHub!

---

## 🌐 How to Deploy on GitHub Pages (Step-by-Step)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. **Enable GitHub Pages in your Repository Settings**:
   - Go to your repository on GitHub.
   - Click on **Settings** (top navigation tab).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select:
     👉 **"GitHub Actions"** (do NOT choose "Deploy from a branch").
3. **Done!**
   - Click on the **Actions** tab in GitHub to watch the workflow run.
   - In ~60 seconds, your site will be live at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## ⚡ How to Deploy on Vercel (Alternative 1-Click)

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository.
3. Keep the default settings (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
4. Click **Deploy**. Vercel will deploy your project in under 30 seconds.

---

## 💻 Running Locally

### Prerequisites
- Node.js 18+ installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Or to run with standard Vite directly:
   ```bash
   npm run dev:vite
   ```
4. Open [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Building for Production Manually

To create the production build:
```bash
npm run build
```
The compiled, ready-to-deploy static website will be created in the `dist/` directory.

To test the production build locally:
```bash
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Tooling**: Vite 8, @tailwindcss/vite
- **Autonomous Agents**: Demand Forecast (DFA-801), Spoilage Prediction (SPA-402), Markdown Optimization (MOA-205), Inventory Transfer (ITA-603), Inventory Optimization (IOA-909)
- **Deployment**: GitHub Pages (Actions workflow), Vercel (`vercel.json`), or full-stack Node/Express
