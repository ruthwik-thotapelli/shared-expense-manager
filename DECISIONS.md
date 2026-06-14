# DECISIONS

This document captures the key technical and product decisions made for the Shared Expense Manager project. Each decision is described with the alternatives considered, the selected option, the reasoning behind it, and the tradeoffs involved.

---

## 1. React + Vite vs Next.js

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| React + Vite | ✅ | Vite provides a fast, lightweight development experience with instant HMR and a minimal configuration surface. React with Vite is a strong fit for a frontend-first dashboard application. | Requires manual handling of routing, deployment configuration, and SEO concerns compared to Next.js. No built-in SSR. |
| Next.js |  | Next.js offers server-side rendering and built-in routing, but its additional complexity was unnecessary for a primarily client-side CRUD and import interface. | Better for SEO and hybrid rendering, but heavier than needed for this MVP-level project. |

**Reasoning:** The project is a frontend-first application with local mock data and an optional backend scaffold. React + Vite keeps the stack simple while delivering fast builds, developer feedback, and modern tooling.

---

## 2. Tailwind CSS vs Traditional CSS

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Tailwind CSS | ✅ | Tailwind enables rapid styling with utility classes, encourages consistency, and reduces CSS file maintenance. It fits well with a component-driven React architecture. | Utility-heavy markup can appear verbose, and there is a learning curve for developers unfamiliar with utility-first styling. |
| Traditional CSS / CSS Modules |  | Traditional CSS provides clearer separation of concerns but requires more boilerplate and stylesheet organization for a component-heavy UI. | Easier debugging in some cases, but increases stylesheet complexity and potential for naming conflicts. |

**Reasoning:** Tailwind accelerates UI creation, improves responsiveness, and keeps styling consistent across the app without requiring a separate design system implementation.

---

## 3. SQLite vs PostgreSQL

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| SQLite | ✅ | SQLite is easy to bootstrap for a local development backend and is sufficient for a small-scale demo or prototype. It requires no additional service and can be initialized from a file. | Not ideal for large-scale deployment, high concurrency, or advanced transactional scaling. |
| PostgreSQL |  | PostgreSQL is a better long-term choice for production-grade workloads, multi-tenant data, and complex joins. | Requires more infrastructure and configuration, which is outside the scope of this frontend-focused project. |

**Reasoning:** The project aims to demonstrate product concepts and developer competency rather than provide a production backend, so SQLite offers the simplest maintainable persistence layer.

---

## 4. Manual Review vs Automatic Duplicate Deletion

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Manual Review | ✅ | Manual review safeguards against false positives and preserves data integrity for imported expense records. It allows the user to confirm whether a duplicate is legitimate or not. | The user experience requires additional review steps and may slow down import throughput. |
| Automatic Duplicate Deletion |  | Automatic deletion simplifies the import flow, but risks dropping a valid transaction that was misclassified as a duplicate. | Better for fully automated imports, but less safe for financial data where auditability matters. |

**Reasoning:** Financial import workflows require trust and auditability. Manual review provides a safer path and is justified by the importance of accurate expense records.

---

## 5. Settlement as Separate Entity vs Expense Type

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Separate Settlement Entity | ✅ | Treating settlements as a distinct domain model keeps expense tracking clean and separates payment transfers from shared expense creation. | Adds a second table and a separate reconciliation flow. |
| Expense Type Flag |  | Encoding settlements as a special expense type is simpler in schema design but blurs the meaning of what an expense is. | Easier to implement, but more likely to complicate bookkeeping and reporting. |

**Reasoning:** A separate entity explicitly models payment settlement behavior and avoids miscounting settlements as shared expenses in analytics.

---

## 6. Equal / Exact / Percentage Split Support

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Support Equal, Exact, Percentage | ✅ | Supporting multiple split modes meets user expectations for real-world shared expenses, where not all costs are divided equally. | More implementation complexity in validation and UI flow. |
| Only Equal Split |  | Simplest to implement, but too restrictive for actual usage patterns. | Easier UI and calculations, but less flexible. |

**Reasoning:** This decision favors user value over simplicity. The shared expense manager must handle unequal contributions and percentage-based allocation to be credible.

---

## 7. CSV Import Validation Strategy

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Strict validation with manual review | ✅ | Strict validation catches malformed or inconsistent data early while allowing users to resolve issues before incorrect records are imported. | Requires a review step and adds friction during import. |
| Lenient import with later correction |  | Allows faster imports but may introduce bad data that is harder to correct after ingestion. | Easier for the user initially, but increases long-term maintenance risk. |

**Reasoning:** Expense data is sensitive and should be validated aggressively. The import pipeline flags anomalies rather than silently accepting them.

---

## 8. Member Join/Leave Handling

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Enforce member join/leave dates in expense allocation | ✅ | Correctly handling member membership windows preserves fairness and prevents former members from being charged after leaving. | Requires maintaining join/leave metadata and additional validation logic. |
| Ignore membership boundaries |  | Simpler model, but can produce incorrect balances and user dissatisfaction. | Easier to implement, but inaccurate for real-world group dynamics. |

**Reasoning:** Group membership is core to shared expenses. Accurate charge assignment around member lifecycle events is essential for trust.

---

## 9. Frontend-First Architecture

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Frontend-first with lightweight backend scaffold | ✅ | The project is intended as a frontend showcase with a modern UI. A lightweight backend delivers minimal persistence without overwhelming the architecture. | Not optimized for full backend scalability or production-grade deployments. |
| Backend-driven full-stack application |  | Makes sense for a production system but would increase complexity and derail the frontend-focused scope. | Better for complex business logic, but slower to deliver and harder to maintain in this context. |

**Reasoning:** The implementation emphasizes user experience, dashboard design, and import validation, so frontend-first allows rapid iteration and visible progress.

---

## 10. Vercel Deployment

| Option | Chosen | Reasoning | Tradeoffs |
|---|---|---|---|
| Vercel | ✅ | Vercel offers seamless deployment for Vite apps, automatic branch previews, and easy static hosting configuration. | Not a full backend platform, though it can support serverless functions if needed. |
| Self-hosted or alternate cloud provider |  | More control, but requires additional DevOps and infrastructure setup. | More flexible, but more operational burden. |

**Reasoning:** Vercel minimizes deployment overhead and is well suited for portal-style React applications, making it the best choice for the project's current scope.

---

## Summary

The decisions in this project favor a fast, modern frontend experience with strong import validation, clear separation of financial domain models, and safe data handling. The chosen options are aligned with a prototype that can scale into a more complete product while keeping implementation and reviewability straightforward.
