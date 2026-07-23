# Oversyniq

**Operational Intelligence Platform**

Oversyniq is a modern SaaS platform that helps organizations manage operations, assets, inspections, incidents, maintenance, and compliance in one unified system.

The goal is simple:

> Make work flow.

---

## Vision

Most operational software focuses on storing data.

Oversyniq focuses on helping people make better operational decisions by presenting the right information at the right time.

---

## Core Modules

- Incident Management
- Asset Management
- Inspection & Checklists
- Work Orders
- Preventive Maintenance
- Dashboards & Analytics
- AI Assistant
- Document Management
- User & Role Management

---

## Technology

Current stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- PocketBase (backend)
- Cloudflare
- GitHub Actions

---

## Repository Structure

```
oversyniq-platform/
│
├── apps/
│   ├── app/          # SaaS application
│   └── web/          # Marketing website
│
├── backend/
├── docs/
├── infra/
└── .github/
```

---

## Development

Install dependencies:

```bash
cd apps/app
npm install
```

Run locally:

```bash
npm run dev
```

---

## Deployment

Deployment is handled using the project deployment script.

```bash
./infra/scripts/deploy.sh
```

---

## Status

Current version:

**Pre-Alpha**

This project is under active development.