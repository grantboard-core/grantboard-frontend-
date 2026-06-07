# 🎨 grantboard-frontend

> React frontend for GrantBoard — a decentralized grant management platform built on Stellar.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-React%2019%20%7C%20TypeScript%20%7C%20Tailwind-informational)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Pages](#-pages)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

`grantboard-frontend` is the user-facing interface for GrantBoard. It allows grant posters to publish opportunities, contributors to discover and apply for grants, and reviewers to manage applicant selection and milestone approvals — all connected to the Stellar blockchain via the [Freighter](https://www.freighter.app/) wallet.

The frontend communicates with the [grantboard-backend](https://github.com/chainboard-app/grantboard-backend) REST API and uses the Freighter API to sign and submit on-chain transactions directly from the browser.

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Browse all open grants |
| Create Grant | `/create` | Post a new grant with milestone definitions |
| Grant Detail | `/grants/:id` | View grant details, apply, select applicants, and approve milestones |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Axios | HTTP client |
| Freighter API | Stellar wallet integration |

---

## 📁 Project Structure

```
src/
├── lib/
│   └── api.ts            # Axios API client and request helpers
├── pages/
│   ├── Home.tsx          # Grant listing and discovery
│   ├── CreateGrant.tsx   # Grant creation form
│   └── GrantDetail.tsx   # Grant detail, application, and milestone actions
├── App.tsx               # Router setup and layout
└── main.tsx              # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [pnpm](https://pnpm.io/)
- [Freighter Wallet](https://www.freighter.app/) browser extension (for wallet interactions)

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
pnpm run build
```

---

## 🤝 Contributing

Contributions are welcome — UI improvements, new pages, accessibility fixes, wallet integration work, and more.

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes and ensure the build passes: `pnpm run build`
4. **Commit** using conventional commits: `git commit -m "feat: describe your change"`
5. **Open** a Pull Request against `main`

Please keep PRs focused and link any related issues in the description.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
