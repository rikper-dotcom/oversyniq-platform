# Runivo

> **The digital operations binder for unmanned and small retail stores.**

Runivo is a mobile-first web application that helps store owners and employees manage the daily operation of unmanned and small retail stores.

Instead of paper checklists, Excel sheets and handwritten notes, Runivo provides a simple, modern interface for documenting and following up daily operational tasks.

---

# Vision

Runivo exists to answer three simple questions:

- ✅ What needs to be done?
- ✅ What has been completed?
- ✅ What requires attention?

Runivo is **not** an ERP, POS or accounting system.

It complements existing business systems by focusing entirely on store operations.

---

# Core Principles

- 📱 Mobile first
- ⚡ Fast and simple
- 🏪 Built for real stores
- 🧩 Modular architecture
- 📋 Daily operations first

Every feature should solve a real operational problem.

---

# Current Features

## 👤 Staff

- User authentication
- User roles
- Staff management
- Personal profiles
- Language selection

## 🏪 Store

- Store settings
- Company information
- Contact information
- Theme colors

## 🌡 Temperature Control

- Register temperatures
- Temperature history
- Admin overview

## 🧹 Cleaning

- Weekly cleaning checklist
- Alternate week tasks
- Progress tracking
- Comments

## ⏱ Time Tracking

- Clock in
- Clock out
- Manual adjustments
- Time history
- Export

## 📋 Dashboard

- Operational dashboard
- Widget architecture
- Configurable widgets (in progress)

---

# Planned Modules

- ⚠ Incident Management
- 📚 Documents
- 🔧 Maintenance
- 📱 QR Codes
- 🔔 Notifications
- 🤖 AI Assistant
- 🌡 Automatic Temperature Monitoring

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

## Backend

- PocketBase

## Database

- SQLite (PocketBase)

## Authentication

- PocketBase Authentication

---

# Project Structure

```
src/
│
├── components/
├── config/
├── contexts/
├── hooks/
├── pages/
├── services/
├── translations/
├── types/
└── utils/
```

---

# Development

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Philosophy

Runivo is designed around one simple idea:

> **Help people run the store—not the business system.**

Examples of features that belong in Runivo:

- Temperature controls
- Cleaning
- Checklists
- Incident reporting
- Maintenance
- Documentation
- Staff routines

Examples of features that do **not** belong in Runivo:

- Accounting
- POS
- Inventory management
- Purchasing
- ERP functionality

---

# Roadmap

See:

```
ROADMAP.md
```

---

# License

Private project.

Copyright © Runivo