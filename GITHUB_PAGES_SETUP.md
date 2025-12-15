# GitHub Pages Setup Guide

## 🚀 Automated Deployment with GitHub Actions

Your website is now configured for automatic deployment to GitHub Pages using GitHub Actions!

---

## 📁 Workflow Files Created

1. **`.github/workflows/deploy.yml`** - Deploys website to GitHub Pages
2. **`.github/workflows/ci.yml`** - Continuous Integration pipeline

---

## ⚙️ GitHub Repository Settings

### Step 1: Enable GitHub Pages

1. Go to your repository: `https://github.com/ersinkoc/env-scout`
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 2: Configure Custom Domain

1. Still in **Pages** settings
2. Under **Custom domain**, enter: `env-scout.oxog.dev`
3. Click **Save**
4. Check **Enforce HTTPS** (recommended)

### Step 3: DNS Configuration

At your domain provider (oxog.dev), add:

```
Type: CNAME
Name: env-scout
Value: ersinkoc.github.io
TTL: 3600 (or default)
```

---

## 🔄 How It Works

### Deployment Trigger
The workflow runs automatically when:
- Code is pushed to `main` or `master` branch
- A pull request is created

### Workflow Steps

1. **Checkout** - Downloads repository code
2. **Setup Node.js** - Installs Node.js 20
3. **Install dependencies** - Runs `npm ci`
4. **Build library** - Runs `npm run build`
5. **Prepare website** - Copies website files
6. **Deploy to Pages** - Uploads to GitHub Pages

---

## 🌐 Website Structure

The deployment process:
- Builds the TypeScript library
- Copies `website/` folder contents
- Deploys to GitHub Pages
- Available at: `https://env-scout.oxog.dev`

---

## ✅ Verification

After pushing to main branch:

1. Go to **Actions** tab in repository
2. Click on the latest workflow run
3. Check job statuses:
   - ✅ build - Library built successfully
   - ✅ deploy - Website deployed
4. Visit `https://env-scout.oxog.dev` to see your site!

---

## 📝 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Copy website to dist folder
cp -r website/* dist/

# Deploy using GitHub CLI
gh pages deploy --dir dist
```

---

## 🔧 Troubleshooting

### Deployment Failed
- Check **Actions** tab for error details
- Ensure all files are committed
- Verify `website/` folder exists

### Custom Domain Not Working
- Wait up to 24 hours for DNS propagation
- Check CNAME record is correct
- Verify domain ownership

### Website Not Loading
- Check GitHub Pages settings
- Ensure HTTPS is enforced
- Verify `CNAME` file exists in `website/` folder

---

## 📊 Monitoring

### GitHub Pages
- **URL**: https://github.com/ersinkoc/env-scout/deployments
- View deployment history and status

### GitHub Actions
- **URL**: https://github.com/ersinkoc/env-scout/actions
- Monitor workflow runs and logs

---

## 🎯 Quick Start

1. **Commit and push** changes:
```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

2. **Check Actions tab** for deployment status

3. **Visit your site**: https://env-scout.oxog.dev

---

## 🔐 Security

The workflow uses:
- `id-token: write` - For secure deployment
- `permissions` - Minimal required access
- `concurrency` - Prevents multiple deployments

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## ✨ Features

✅ **Automatic Deployment** - Push to main = instant deploy
✅ **Custom Domain** - env-scout.oxog.dev
✅ **HTTPS Enabled** - Secure by default
✅ **CI/CD Pipeline** - Build and test on every push
✅ **Artifact Upload** - Build artifacts preserved

---

**Your website is ready to go live! 🚀**
