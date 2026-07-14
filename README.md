# Operational_Workspace

> AI-powered operational workspace for project-based lighting businesses.

Version: 0.1
Author: Nimit
Status: Product Discovery

---

# 1. Vision

## Problem

Lighting businesses today operate using multiple disconnected tools.

- Google Keep for product references
- Excel for quotations
- WhatsApp for customer communication
- Google Drive for CAD files
- Phone calls for vendor coordination
- Manual reminders for payment follow-ups

This causes:

- Information scattered across apps
- Time wasted searching for files
- Lost samples
- Missed follow-ups
- Duplicate work
- Difficult onboarding of new employees
- Business knowledge existing only in the owner's memory

---

## Vision

Build a single operational workspace where every project, product, quotation, document, customer and task lives together.

The software should become the first application a salesperson opens in the morning.

It should replace searching, remembering and switching between applications.

---

## Long-term Vision

Become the operating system for project-based businesses.

Initially:
- Lighting

Later:
- Furniture
- Modular Kitchens
- Interior Designers
- HVAC
- Signage
- Custom Fabrication

---

# 2. Users

## Primary User

Owner / Salesperson

Responsibilities

- Site Visits
- Product Suggestions
- Quotation Creation
- Vendor Coordination
- Payment Follow-ups

Pain Points

- Searching product photos
- Searching old quotations
- Searching CAD files
- Remembering customer discussions
- Payment reminders

---

## Secondary Users

Office Staff

Responsibilities

- Generate quotations
- Upload documents
- Manage catalogue
- Create projects

---

Installation Team

Responsibilities

- Installation updates
- Upload completion photos

---

Vendor

Responsibilities

- Receive manufacturing requests
- Upload completion updates

---

# 3. Current Workflow

Lead

↓

Customer Call

↓

Site Visit

- Show products from Google Keep
- Take measurements
- Discuss ideas
- Record notes

↓

Quotation Preparation

Uses:

- Google Keep
- Excel
- Previous quotations
- CAD drawings

↓

Quotation Shared

↓

Negotiation

↓

Samples Provided

↓

Advance Received

↓

Vendor Work

↓

Material Procurement

↓

Dispatch

↓

Installation

↓

Payment Follow-ups

↓

Project Closed

---

# 4. Core Problems

## Product Search

Current

Google Keep

Problem

Slow and unstructured.

---

## Quotation References

Current

Excel folders

Problem

Old quotations difficult to find.

---

## CAD Management

Current

Drive / Computer folders

Problem

No connection with products or projects.

---

## Vendor Tracking

Current

Phone calls

Problem

No visibility of pending work.

---

## Sample Tracking

Current

Memory

Problem

Samples get delayed or lost.

---

## Payment Follow-ups

Current

Calls and WhatsApp

Problem

Easy to forget.

---

# 5. Product Principles

Every piece of information should exist only once.

Everything should be searchable.

Everything should belong to a project.

Every action should automatically create a timeline event.

No duplicate data entry.

Minimal typing.

---

# 6. Database Entities

Customer

Project

Product

Product Variant

Quotation

Quotation Item

Document

Vendor

Supplier

Task

Payment

Sample

Installation

Person

Note

Activity

---

# 7. MVP Features

## Product Library

- Images
- Variants
- Prices
- Specifications
- Tags
- CAD
- Datasheets

---

## Customers

- Contact Information
- Past Projects
- Outstanding Payments

---

## Projects

- Timeline
- Products
- Notes
- Files
- Quotations
- Tasks

---

## Quotations

- Generate
- Edit
- Duplicate
- Revision History
- PDF Export

---

## Search

Search should return

- Products
- Customers
- Projects
- Quotations
- CAD Files
- Documents

---

## Documents

Upload

- Images
- PDFs
- CAD
- Videos

---

## Notes

Rich Text

Voice Notes

Meeting Notes

Measurements

---

# 8. Future Features

Inventory

Purchase Orders

Porter Integration

WhatsApp Integration

AI Meeting Notes

AI Product Recommendation

OCR Catalogue Import

Automatic Quotation Generation

Payment Reminder Automation

Analytics

Mobile App

---

# 9. Success Metrics

Version 1 succeeds if:

✔ Father no longer opens Google Keep during site visits.

✔ Quotation creation time reduced by 50%.

✔ Every project has all files in one place.

✔ Search finds any product within 5 seconds.

✔ Payment follow-ups become visible from dashboard.

---

# 10. User Stories

## Site Visit

As a salesperson,
I want to search products instantly,
so I don't have to scroll through Google Keep.

---

As a salesperson,
I want to attach notes directly to a project,
so I never lose customer requirements.

---

## Quotation

As a salesperson,
I want to build quotations by selecting products,
instead of manually typing everything.

---

As a salesperson,
I want previous quotations linked to products,
so I can reuse similar work.

---

## Vendor

As an owner,
I want vendor tasks linked to projects,
so I know what's pending.

---

## Payment

As an owner,
I want to see pending payments in one dashboard,
so I know whom to follow up with.

---

# 11. What We Are NOT Building

Accounting

GST Filing

Payroll

HR

CRM for mass sales

Manufacturing ERP

Warehouse Management

These are solved problems.

We are building the operational layer before accounting.

---

# 12. MVP Tech Stack (Tentative)

Frontend

Next.js

Backend

NestJS / Go

Database

PostgreSQL

ORM

Prisma

Storage

AWS S3

Authentication

Clerk/Auth.js

Search

PostgreSQL Full Text
(Meilisearch later)

Hosting

Vercel + Railway/Fly.io

---

# 13. Roadmap

Sprint 1

- Product Catalogue
- Search
- Customers

Sprint 2

- Projects
- Notes
- Documents

Sprint 3

- Quotation Builder

Sprint 4

- Tasks
- Samples
- Vendor Module

Sprint 5

- Payments
- Dashboard

Sprint 6

- AI Search
- AI Meeting Notes
