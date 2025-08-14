<p align="center">
  <img src="https://i.postimg.cc/W1zhd7Pc/Chat-GPT-Image-Aug-14-2025-05-39-14-AM.png" alt="Tic Tac Toe Game Banner" width="900" />
</p>

<div align="center">

## Tic Tac Toe (JavaScript + Factory Pattern + Computer Opponents)

An interactive Tic Tac Toe game built with vanilla JavaScript, featuring human
vs human gameplay, computer opponents with multiple difficulty levels, and a
modern UI for The Odin Project.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Deploy](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?logo=github&logoColor=white)](https://younesbardach.github.io/tic-tac-toe/)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Game Logic](#game-logic)

---

## About

This project is part of The Odin Project JavaScript curriculum:
[The Odin Project — Project: Tic Tac Toe](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).
It focuses on practicing object-oriented programming with factory functions, DOM
manipulation, game logic implementation, and creating an interactive gaming
experience with computer opponents.

- Live app:
  [https://younesbardach.github.io/tic-tac-toe/](https://younesbardach.github.io/tic-tac-toe/)

## Features

- **Human vs Human**: Classic two-player gameplay
- **Human vs Computer**: Play against computer opponents
- **Multiple Computer Difficulties**:
  - **Noob**: Random moves for easy wins
  - **Average**: Strategic blocking and winning moves
  - **Machine God**: Unbeatable computer using minimax algorithm with alpha-beta
    pruning
- **Custom Player Names**: Personalize your gaming experience
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Game State Management**: Tracks wins, draws, and game progression

## Requirements

- Modern web browser with ES6 support
- No build tools required - pure vanilla JavaScript

## Quick start

```bash
# 1) Clone the repository
git clone https://github.com/younesbardach/tic-tac-toe.git

# 2) Navigate to the project directory
cd tic-tac-toe

# 3) Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## Tech stack

- **Language:** Vanilla JavaScript (ES6+)
- **Architecture:** Factory Pattern with IIFE modules
- **Styling:** CSS3 with normalize.css
- **Markup:** HTML5
- **Icons:** SVG icons for X and O markers
- **Fonts:** System UI font stack
- **Deployment:** GitHub Pages

## Project structure

```
tic-tac-toe/
├─ index.html              # Main HTML file with game interface
├─ README.md              # Project documentation
├─ css/
│  ├─ normalize.css       # CSS reset and normalization
│  └─ style.css          # Main stylesheet with game styling
├─ js/
│  └─ script.js          # Main JavaScript application logic
├─ img/
│  ├─ xmark.svg          # X marker icon
│  ├─ omark.svg          # O marker icon
│  ├─ noob-rx.jpg        # Noob difficulty background
│  ├─ average-ultra.jpg  # Average difficulty background
│  └─ deus-ex-machina.jpg # Machine God difficulty background
├─ favicon.ico           # Site favicon
├─ favicon-16x16.png     # 16x16 favicon
├─ favicon-32x32.png     # 32x32 favicon
├─ apple-touch-icon.png  # iOS touch icon
├─ android-chrome-192x192.png  # Android chrome icon
├─ android-chrome-512x512.png  # Android chrome icon
└─ site.webmanifest     # Web app manifest
```

## Game Logic

### Architecture

The game follows the factory pattern with three main modules:

- **Gameboard**: Manages the game state and board positions
- **Player**: Handles player creation and AI move logic
- **Game**: Controls game flow and win detection

### Computer Implementation

- **Noob Computer**: Random move selection
- **Average Computer**: Strategic blocking and winning move detection
- **Machine God Computer**: Unbeatable minimax algorithm with alpha-beta pruning
