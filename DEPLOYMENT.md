# 🚀 Deploy to GitHub Pages

## **Step 1: Update the Homepage URL**

Edit `package.json` and change the homepage URL to match your GitHub repository:

```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

**Example:**
- If your GitHub username is `johnsmith`
- And your repository name is `rubric-generator`
- Then use: `"https://johnsmith.github.io/rubric-generator"`

## **Step 2: Initialize Git Repository (if not already done)**

```bash
git init
git add .
git commit -m "Initial commit"
```

## **Step 3: Create GitHub Repository**

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name your repository (e.g., `rubric-generator`)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (since you already have one)
6. Click "Create repository"

## **Step 4: Connect to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## **Step 5: Deploy to GitHub Pages**

```bash
npm run deploy
```

This will:
1. Build your React app
2. Create a `gh-pages` branch
3. Upload the built files to GitHub Pages

## **Step 6: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

## **Step 7: Wait and Access**

- Wait 2-5 minutes for deployment
- Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## **Troubleshooting**

### **404 Error?**
- Make sure the homepage URL in `package.json` is correct
- Ensure the repository is **public**
- Wait a few minutes after deployment

### **Build Errors?**
- Run `npm install` first
- Make sure all dependencies are installed
- Check for any console errors

### **Deploy Command Not Found?**
- Make sure you ran `npm install gh-pages --save-dev`
- Check that the deploy script is in `package.json`

## **Files Structure After Deployment**

Your repository should have:
- `main` branch: Source code
- `gh-pages` branch: Built files (auto-generated)

## **Updating Your App**

After making changes:
1. Commit your changes: `git add . && git commit -m "Update" && git push`
2. Deploy: `npm run deploy`

---

**Your app will be live at:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` 🎉 