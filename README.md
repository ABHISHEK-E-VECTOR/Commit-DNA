# 🧬 Commit DNA – Developer Coding Style Analyzer

> **Decode any developer's coding DNA from their Git history.**
> Analyzes public GitHub repos to reveal coding patterns, work habits, and burnout risk — all computed live from real commit data.

---

## 📌 Table of Contents

- [What is Commit DNA?](#-what-is-commit-dna)
- [How It Works](#-how-it-works-step-by-step)
- [Metrics Explained](#-all-metrics-explained)
- [Burnout Formula](#-the-burnout-formula)
- [Example Walkthrough](#-example-walkthrough)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [How to Run](#-how-to-run)
- [API Reference](#-api-reference)
- [Roadmap](#-future-roadmap)

---

## 🧠 What is Commit DNA?

Every Git **commit** is a timestamped record: who wrote it, when, what they described, and which lines changed. Commit DNA reads an entire repo's history and generates a visual dashboard answering:

| Question | Metric |
|----------|--------|
| Works late at night? | **Night Ratio** — % of commits between 10 PM – 5 AM |
| Works on weekends? | **Weekend Ratio** — % of commits on Sat/Sun |
| Frequent bug fixes? | **Bug Rate** — % of commits mentioning "fix", "bug", etc. |
| Invests in code quality? | **Refactor Rate** — % of commits about cleanup/optimization |
| At risk of burnout? | **Burnout Score** — weighted formula combining all above |

**Think of it as a health checkup for coding habits** — no hardcoded data, everything is computed live from actual Git history.

---

## 🔄 How It Works (Step by Step)

```
User enters GitHub URL → Validate → Clone repo → Extract git log → Parse commits → Calculate metrics → Burnout score → Display dashboard → Cleanup
```

### 1️⃣ Validation
Frontend checks: valid URL? Points to `github.com`? Has `user/repo` path?

### 2️⃣ Clone
Backend clones the repo into a temp folder with a unique UUID (supports concurrent users).

### 3️⃣ Extract Git Log
Runs: `git log --numstat --pretty=format:"commit_separator|AuthorName|Date|Message"`

Produces raw data like:
```
commit_separator|John Doe|Mon Mar 1 23:30:00 2026|fix: resolve login bug
5       2       src/auth.js
```

### 4️⃣ Parse
Each commit becomes a structured object with `author`, `date`, `message`, `additions`, `deletions`.

### 5️⃣ Calculate
Every commit is checked:
- **Night?** → Hour between 22:00–04:59
- **Weekend?** → Saturday or Sunday
- **Bug fix?** → Message contains: `fix`, `bug`, `patch`, `hotfix`, `resolve`
- **Refactor?** → Message contains: `refactor`, `cleanup`, `optimize`, `clean`, `restructure`, `perf`

### 6️⃣ Score & Display
Ratios calculated → Burnout formula applied → Charts rendered → Temp repo deleted.

---

## 📈 All Metrics Explained

### 🌙 Night Ratio
```
Night Ratio = Commits between 10 PM – 5 AM ÷ Total Commits
```
| 0–10% ✅ Normal | 10–25% ⚠️ Moderate | 25%+ 🔴 Frequently coding past midnight |

### 📅 Weekend Ratio
```
Weekend Ratio = Saturday + Sunday Commits ÷ Total Commits
```
| 0–10% ✅ Healthy boundary | 10–25% ⚠️ Some weekend work | 25%+ 🔴 Regular weekend coding |

### 🐛 Bug Rate
```
Bug Rate = Bug-fix Commits ÷ Total Commits
```
Keywords: `fix` · `bug` · `patch` · `hotfix` · `resolve`

| 0–5% ✅ Low | 5–15% ⚠️ Normal | 15%+ 🔴 May need better testing |

### 🔧 Refactor Rate
```
Refactor Rate = Refactor Commits ÷ Total Commits
```
Keywords: `refactor` · `cleanup` · `optimize` · `clean` · `restructure` · `perf`

| 0–2% ⚠️ Low investment | 2–10% ✅ Healthy | 10%+ ⚠️ Architecture may be unstable |

### 📊 Commit Spike
```
Commit Spike = (Max Commits in One Day ÷ Average per Day) − 1
```
Value of 0 = steady pace. Value of 4 = busiest day had 5× more commits than average.

---

## 🔥 The Burnout Formula

```
Burnout Score = 0.4 × Night Ratio
             + 0.3 × Weekend Ratio
             + 0.2 × Commit Spike (capped at 1.0)
             + 0.1 × Bug Rate
```

### Why These Weights?

| Factor | Weight | Reasoning |
|--------|--------|-----------|
| Night Ratio | **40%** | #1 indicator of overwork; correlates with fatigue and reduced code quality |
| Weekend Ratio | **30%** | Erodes recovery time; second strongest burnout signal |
| Commit Spike | **20%** | Burst-then-rest patterns suggest deadline pressure |
| Bug Rate | **10%** | Can be a *symptom* of fatigue, but has many other causes |

### Status Thresholds

| Score | Status | Meaning |
|-------|--------|---------|
| **0.00 – 0.24** | 🟢 Healthy | Sustainable patterns, normal hours |
| **0.25 – 0.49** | 🟡 Medium | Some concerning signals, worth monitoring |
| **0.50 – 1.00** | 🔴 Overloaded | Multiple burnout indicators elevated |

### Worked Example

```
Night Ratio = 0.30, Weekend Ratio = 0.20, Spike = 0.80, Bug Rate = 0.12

Score = (0.4 × 0.30) + (0.3 × 0.20) + (0.2 × 0.80) + (0.1 × 0.12)
      = 0.12 + 0.06 + 0.16 + 0.012
      = 0.352 → 🟡 Medium
```

---

## 🎯 Example Walkthrough

**Input:** `https://github.com/expressjs/express` (~3,800 commits)

**Output:**
```json
{
  "developerName": "TJ Holowaychuk",
  "totalCommits": 3847,
  "nightRatio": 22.5,
  "weekendRatio": 15.3,
  "bugRate": 8.7,
  "refactorRate": 5.2,
  "burnoutScore": 0.48,
  "burnoutStatus": "Medium"
}
```

**Dashboard shows:** Profile card → Bar chart (night vs day) → Doughnut (bugs vs refactors) → Gauge (burnout score)

---

## 🏗 Tech Stack & Architecture

| Layer | Technologies |
|-------|-------------|
| **Frontend** | HTML5, CSS3 (dark theme), Vanilla JS, Chart.js |
| **Backend** | Node.js, Express.js, simple-git, day.js |

```
┌──────────── FRONTEND ────────────┐
│  index.html → dashboard.html     │
│  css/style.css  js/api.js        │
│  js/charts.js   js/dashboard.js  │
└──────────┬───────────────────────┘
           │ POST /analyze
           ▼
┌──────────── BACKEND (Express) ───┐
│  gitService → parserService      │
│  metricsService → burnoutService │
│  → JSON response with metrics    │
└──────────────────────────────────┘
```

---

## 🚀 How to Run

```bash
# Install & start
cd backend && npm install && npm start

# Open http://localhost:3000
```

**Prerequisites:** Node.js v16+, Git installed.

---

## 📡 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/analyze` | POST | Analyze a repo → returns all metrics |
| `/health` | GET | Server status check |
| `/metrics-info` | GET | Human-readable metric explanations |
| `/analyze/start` | POST | Start async analysis → returns `jobId` |
| `/analyze/status/:id` | GET | Check async job status |

---

## 🗺 Future Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Public repo analysis + dashboard + burnout scoring | ✅ Done |
| 2 | Private repos (GitHub OAuth), multi-dev comparison | 🔜 Planned |
| 3 | Team analytics, Slack alerts, AI recommendations | 💡 Idea |

---

