# Click Scorer

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


A high-performance, full-screen **Click Speed Test (CPS)** web application developed as a frontend mini project. Built entirely using **Vanilla JavaScript**, **HTML5**, and **CSS3** with zero external libraries or runtime dependencies.

---

## Overview

**Click Scorer** is an interactive benchmark utility designed to measure user clicking speed and dexterity over designated intervals. It features a minimalist, high-contrast monochrome aesthetic, real-time auditory and visual feedback, and persistent score tracking across sessions.

---

## Key Features

- **Full-Screen Click Arena**: The entire viewport functions as an active click target, registering mouse clicks, touch inputs, and keyboard triggers seamlessly.
- **Multiple Challenge Modes**: Selectable timer durations (5s, 10s, and 30s) to evaluate short-burst sprinting vs. endurance clicking.
- **Real-Time Performance Metrics**:
  - Live click counter during the test.
  - Calculated Clicks Per Second (CPS).
  - Highest personal record tracked per mode.
- **Native Web Audio Synthesis**: Generates low-latency click sounds dynamically using the browser's `AudioContext` without requiring external sound assets.
- **Visual Ripple Effects**: Generates lightweight cursor-centered ripple animations on each click/tap.
- **Persistent High Scores**: Automatically saves personal bests locally using `localStorage`.
- **Accessible & Responsive**: Fully responsive across mobile, tablet, and desktop devices with keyboard accessibility (Spacebar and Enter support).

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic layout, SEO metadata, and SVG vector graphics |
| **CSS3** | Monochrome theme, Flexbox/Grid layout, animations, and typography |
| **JavaScript (ES6+)** | State management, timer engine, Web Audio API, and DOM manipulation |

---

## Project Structure

```
├── index.html        # Entry point & semantic structure
├── style.css         # Responsive styling, layout & animations
└── script.js         # Core application logic, timer & audio synthesis
```

---

## Getting Started

No build step, package manager, or local server is required.

### Running Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/xploreshivam/click-scorer
   ```
2. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).

---

---

# <i>thanks to checking this project out!.<i>
