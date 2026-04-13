# grantboard-backend

NestJS REST API for GrantBoard — a decentralized grant management platform built on Stellar.

## Overview

This backend serves as the off-chain layer for GrantBoard, handling grant data, applications, and milestone tracking via a REST API.

## API Endpoints

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| `GET`  | `/grants`                       | Get all grants            |
| `GET`  | `/grants/:id`                   | Get a single grant        |
| `POST` | `/grants`                       | Create a new grant        |
| `POST` | `/grants/:id/apply`             | Apply for a grant         |
| `POST` | `/grants/:id/select`            | Select an applicant       |
| `POST` | `/grants/:id/approve-milestone` | Approve current milestone |

## Project Structure

src/
├── grants/
│ ├── dto/
│ │ └── create-grant.dto.ts # Request validation
│ ├── grants.controller.ts # Route handlers
│ ├── grants.service.ts # Business logic
│ └── grants.module.ts # Module definition
├── app.module.ts
└── main.ts

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm run start:dev
```

Server runs on `http://localhost:3001`

### Build

```bash
pnpm run build
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Ensure the build passes with `pnpm run build`
5. Open a pull request

## License

MIT
Done?y12:26 PMPush it:
powershellcd C:\Users\DELL\grantboard-backend
git add README.md
git commit -m "docs: add README"
git push
Done?yh12:26 PMNow move to grantboard-frontend. Open its README.md and replace everything with this:
markdown# grantboard-frontend

React frontend for GrantBoard — a decentralized grant management platform built on Stellar.

## Overview

This frontend provides the user interface for GrantBoard, allowing users to browse grants, post new grants, apply for grants, and track milestone progress.

## Pages

| Page         | Route         | Description                                                      |
| ------------ | ------------- | ---------------------------------------------------------------- |
| Home         | `/`           | Browse all open grants                                           |
| Create Grant | `/create`     | Post a new grant with milestones                                 |
| Grant Detail | `/grants/:id` | View grant details, apply, select applicants, approve milestones |

## Project Structure

src/
├── lib/
│ └── api.ts # Axios API client
├── pages/
│ ├── Home.tsx # Grant listing page
│ ├── CreateGrant.tsx # Grant creation form
│ └── GrantDetail.tsx # Grant detail and actions
├── App.tsx # Router setup
└── main.tsx # Entry point

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm run dev
```

App runs on `http://localhost:5173`

### Build

```bash
pnpm run build
```

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Freighter API (Stellar wallet)

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Ensure the build passes with `pnpm run build`
5. Open a pull request

## License

MIT
