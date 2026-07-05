# Shuveta Jovi - Premium Portfolio Website

A state-of-the-art, high-performance personal portfolio website designed and developed for **Shuveta Jovi**, aspiring Machine Learning & Computer Vision Engineer. The site highlights academic achievements, research publications (including FinOps GCP cloud research), internships, technical skills, and featured projects using an interactive dark-themed layout.

## 🚀 Key Visual & Technical Features

- **Interactive Neural Particle Canvas**: Custom HTML5 Canvas script generating responsive floating nodes representing neural network structures, responding to mouse inputs and adapting dynamically to theme updates.
- **Glassmorphism Design System**: Frosted glass panels (`backdrop-filter: blur(12px)`) with gradient borders, glow shadows, and dynamic hover translations.
- **Dynamic Typing Subtitles**: High-fidelity character typing loops showcasing engineering fields in the Hero section.
- **Dual-Theme Manager**: Custom Dark & Light color modes saved in `localStorage` and synchronizing elements (including canvas particle color states) instantaneously.
- **Interactive Project Filters**: Fast JavaScript filters allowing seamless navigation through project categories (Machine Learning, Computer Vision, and Web Development).
- **Responsive Navigation Timeline**: Visual chronological cards displaying internship experience and academic milestones.
- **Zero-Dependency & Zero-Config**: Written in semantic HTML5, Vanilla CSS3, and Vanilla JS, ensuring lightweight page sizes, fast performance, and hosting on GitHub Pages without build configurations.

---

## 📂 Project Structure

```
Portfolio/
├── index.html   # Main page containing semantic structure, content, and SEO meta tags
├── style.css    # Responsive layout system, variables, dark/light themes, animations
├── script.js    # Interactive features (canvas particles, filters, typing, form handler)
└── README.md    # Documentation and deployment guide
```

---

## 💻 Local Preview

To view the portfolio locally with all interactive assets loading correctly, launch a local web server from this directory. 

### Option 1: Python (Recommended)
Run the following command in your terminal inside the `Portfolio` folder:
```bash
python -m http.server 8000
```
Then navigate to: **[http://localhost:8000](http://localhost:8000)**

### Option 2: Node.js (npx)
Run the following command in your terminal:
```bash
npx http-server -p 8000
```
Then navigate to: **[http://localhost:8000](http://localhost:8000)**

---

## 🌐 Deployment to GitHub Pages

Follow these step-by-step instructions to push this portfolio to your GitHub account and publish it to the web.

### Step 1: Create a Repository on GitHub
1. Go to your GitHub account: [github.com/shuvetajovia](https://github.com/shuvetajovia).
2. Click **New** to create a new repository.
3. Name it exactly: `Portfolio`.
4. Leave it **Public**, do *not* check "Add a README", and click **Create repository**.

### Step 2: Initialize Git and Commit Locally
Open your command terminal (Command Prompt, PowerShell, or Git Bash) inside the `Portfolio` directory on your machine, and execute:
```bash
# Initialize a local Git repository
git init

# Add all files to staging
git add .

# Create the initial commit
git commit -m "feat: initial commit of premium portfolio"

# Rename branch to main
git branch -M main
```

### Step 3: Push to GitHub
Copy the remote repository URL from your GitHub repository page and run (replace with your exact URL if different):
```bash
# Add the remote link
git remote add origin https://github.com/shuvetajovia/Portfolio.git

# Push your code to the remote repository
git push -u origin main
```

### Step 4: Activate GitHub Pages
1. Go to your repository on GitHub: `https://github.com/shuvetajovia/Portfolio`.
2. Click on the **Settings** tab.
3. In the left-hand menu, under the **Code and automation** section, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Click the dropdown, select `main`, leave the folder as `/ (root)`, and click **Save**.
5. Wait 1–2 minutes. GitHub will compile the page and display your live URL at the top of the Pages settings screen:
   👉 **`https://shuvetajovia.github.io/Portfolio/`**
