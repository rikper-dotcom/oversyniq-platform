# Oversyniq Domain Model

> This document defines the core business objects of Oversyniq.
>
> All implementation (database, backend, frontend and API) should follow this model.

---

# Philosophy

Oversyniq is **not** built for a specific industry.

It is an Operational Intelligence Platform where organizations configure their own operational workflows.

The platform should always prefer configuration over customization.

---

# Core Principles

- Everything belongs to an Organization.
- Organizations contain one or more Workspaces.
- Workspaces contain operational resources.
- Workflows are the heart of the platform.
- Templates create Workflows.
- Users perform work.
- Every action is traceable.

---

# Domain Overview

```
User
│
└── Organization
      │
      ├── Members
      ├── Workspaces
      ├── Templates
      └── Settings
              │
              ▼
Workspace
│
├── Workflows
├── Assets
├── Documents
├── Dashboards
└── Reports
```

---

# User

Represents a person using the platform.

Examples:

- Owner
- Manager
- Employee
- Cleaner
- Inspector
- Technician

A User can belong to multiple Organizations.

---

# Organization

Represents a company or legal entity.

Examples:

- ICA Nära Hjärtum
- Shelf Drilling
- Volvo Cars
- MIRA Maskin & Hydraulik

Responsibilities:

- Owns all business data
- Manages billing
- Manages members
- Creates workspaces
- Installs templates

Nothing exists outside an Organization.

---

# Workspace

Represents a logical operational area.

Examples:

- Store
- Rig
- Workshop
- Warehouse
- Office
- Factory

Responsibilities:

- Groups operational data
- Contains workflows
- Contains assets
- Contains documents

---

# Template

A reusable package.

A template may contain:

- Workflows
- Forms
- Tasks
- Dashboards
- Default settings

Examples:

- Grocery Store
- Offshore
- Workshop
- Warehouse

---

# Workflow

The core object of Oversyniq.

Everything operational is represented as a Workflow.

Examples:

- Cleaning
- Temperature Control
- Incident Reporting
- Preventive Maintenance
- Risk Observation
- Vehicle Inspection

A Workflow defines:

- what should happen
- who performs it
- when it should happen
- what information should be collected

---

# Submission

Represents one completed execution of a Workflow.

Contains:

- performer
- timestamp
- responses
- attachments
- comments
- status

---

# Task

A single item inside a Workflow.

Examples:

- Vacuum floor
- Check fridge temperature
- Inspect wire rope
- Take photo

---

# Response

Represents the answer to one Task.

Examples:

- Checkbox
- Text
- Number
- Date
- Signature
- Photo
- File
- Pass / Fail

---

# Asset

Represents physical equipment.

Examples:

- Freezer
- Coffee machine
- Tugger
- Crane
- Vehicle

Assets can have Workflows attached.

Example:

Weekly inspection of Forklift 03.

---

# Document

Represents uploaded documentation.

Examples:

- Manuals
- Procedures
- Certificates
- Risk Assessments

---

# Dashboard

A configurable overview of operational information.

Examples:

- Open incidents
- Missed cleanings
- Equipment status
- Upcoming inspections

---

# Future Objects

These are intentionally excluded from version 1.

- AI Assistant
- Automation Engine
- Notifications
- Integrations
- API Keys
- Marketplace

They will be introduced when the core platform is stable.

---

# Golden Rule

The platform should never ask:

"What type of company is this?"

Instead it should ask:

"What workflows do you need?"
