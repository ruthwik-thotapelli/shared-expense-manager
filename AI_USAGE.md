# AI Usage

## Overview

This document describes how AI was used during development of the Shared Expense Manager project.

Only **ChatGPT** was used as an AI assistant during development.

## How ChatGPT Was Used

### UI/UX Brainstorming
ChatGPT helped generate ideas for landing page content, dashboard layout, form structure, and user onboarding flows. The assistant proposed interface improvements, accessibility enhancements, and user-friendly wording for prompt labels and buttons.

### React Component Development
ChatGPT was used to structure React components, recommend page-level and layout components, and help refactor existing code. This included guidance on component composition, route handling, and state management for the app.

### Tailwind CSS Improvements
ChatGPT suggested Tailwind CSS utility classes, responsive design patterns, and theme-aware class combinations. It helped refine spacing, button states, card layouts, and overall visual consistency.

### Project Structure Planning
ChatGPT assisted with organizing the project into clear folders and modules, including `src/pages`, `src/components`, `src/context`, and `src/routes`. It also helped define the backend scaffold layout and documentation file placement.

### Documentation Writing
ChatGPT generated professional markdown files such as `README.md`, `SCOPE.md`, `IMPORT_REPORT.md`, `DECISIONS.md`, and this AI usage document. It helped maintain a formal tone suitable for technical review.

### Debugging Assistance
ChatGPT assisted with identifying code issues, lint errors, route mismatches, and build warnings. The assistant provided corrective patterns for runtime problems and helped confirm that changes were validated before push.

## Key Prompts Used

1. "Suggest a polished landing page layout and welcome message for a shared expense manager React app."
2. "How should the project route `/` and `/dashboard` be structured so the welcome page appears before login?"
3. "What Tailwind classes should I use for a responsive card grid and accessible button styles?"
4. "Write a professional `DECISIONS.md` file explaining architecture choices for React/Vite, Tailwind, database, and CSV import validation."

## AI Mistakes and Corrections

### Example 1
- **ChatGPT suggested splitting expenses equally among all users.**
- **Problem:** This approach did not consider users joining or leaving groups at different times.
- **Fix:** Membership timeline validation was added to ensure expenses are only allocated to active group members for the relevant timeframe.

### Example 2
- **ChatGPT suggested automatically deleting duplicate expenses.**
- **Problem:** The assignment requires user review before any destructive changes are made.
- **Fix:** Duplicate imports were flagged for approval instead of being deleted automatically.

### Example 3
- **ChatGPT assumed all expenses used the same currency.**
- **Problem:** The CSV import contained mixed currencies, including USD and INR.
- **Fix:** Currency validation and conversion logic were documented and added to the anomaly handling policy.

## Validation Process

- Every AI-generated suggestion was reviewed manually.
- Assignment requirements were verified before implementation.
- Testing was performed before accepting AI suggestions.

This included running lint checks, verifying routes, and confirming build success prior to committing changes.

## Conclusion

ChatGPT accelerated development and documentation tasks for the Shared Expense Manager project. However, the final engineering decisions, testing, implementation, and ownership remained with the developer.
