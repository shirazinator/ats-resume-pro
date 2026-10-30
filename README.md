# 📄 ATS Resume Pro & Keyword Optimizer

> **100% Free, Client-Side ATS Resume Builder & Optimization Web App.**  
> Built to bypass enterprise Applicant Tracking Systems (Workday, Greenhouse, Lever, Taleo) and format resumes according to industry-specific hiring standards.

---

## 🌟 Key Features

### 1. 🎯 Real-Time ATS Keyword Matcher & Audit
- Extracts critical technical skills, tools, and methodologies from any target **Job Description**.
- Calculates a live **ATS Score (0 - 100)** broken down across:
  - **Keyword Match Rate** (40 pts)
  - **ATS Formatting & Single-Column Structure** (25 pts)
  - **STAR / XYZ Formula & Metric Impact** (25 pts)
  - **Readability & Contact Coordinates** (10 pts)
- **One-Click Keyword Injector**: Click `+` on any missing keyword to immediately add it into your resume.

### 2. 🏢 4 Company-Specific ATS Resume Formats
Tailored typography and layouts designed to pass ATS bots with 100% parseable, selectable text:
1. **🏢 FAANG & Big Tech (Google, Meta, Apple, Amazon)**: Stanford/Ivy League single-column, extreme density, metric-heavy (`X%`, `$Y`, latency, scale).
2. **🚀 High-Growth Tech & Startups**: Modern clean typography with subtle accent, showcasing open source, projects, and agile execution.
3. **💼 Corporate, Consulting & Banking (McKinsey, Goldman, Deloitte)**: Wall Street serif typography, strategic outcomes, EBITDA impact.
4. **👔 Executive & Leadership**: Management scope, core leadership competencies, revenue ownership.

### 3. ✨ Built-In STAR Formula Optimizer (No API Key Required)
- Detects passive phrases (*"responsible for"*, *"helped with"*, *"assisted in"*) and automatically transforms them into high-impact action verbs (*"Spearheaded"*, *"Architected"*, *"Optimized"*, *"Automated"*).
- Suggests realistic KPI and metric placeholders.

### 4. 🤖 Optional Google Gemini AI Integration
- Optionally plug in your free Google Gemini API key to generate executive summaries and custom bullet polishing.
- Stored purely client-side in `localStorage`.

### 5. 📥 Zero-Loss ATS Exports
- **Print / PDF**: Uses `@media print` with strict letter margins, single-column alignment, and zero text boxes/graphics traps.
- **Word (.docx)**: Clean Microsoft Word document generated via `docx` library.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploy to GitHub Pages for 100% Free

This project comes pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Deployment Steps:
1. Create a new repository on GitHub (e.g. `ats-resume-pro`).
2. Run in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ATS Resume Pro"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! GitHub will build and host your web app at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/` completely free forever!

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **PDF & DOCX Parsing**: `pdfjs-dist`, `mammoth`
- **Document Export**: `@media print` CSS + `docx`
- **Celebration Effects**: `canvas-confetti`
