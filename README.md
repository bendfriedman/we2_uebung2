# WE2 Übung 2 – Studienbewerberportal (Frontend)

React frontend for a degree course application portal, built as part of the Web Engineering II course at BHT Berlin.

## Tech Stack

- React 19 + TypeScript + Vite
- Redux Toolkit (state management)
- React Router v6 (routing)
- Bootstrap 5 (styling)

## Features

- Landing page with modal login dialog
- Basic Auth against a Node.js/Express backend
- JWT token stored in Redux store
- Protected routes (redirect to login if not authenticated)
- Dark mode toggle

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server on port 3000:

```bash
npm start
```

> Requires the WE2 Übung 1 backend to be running on `https://localhost:443`.
