# SCOPE

## Project Overview

The Shared Expense Manager project provides a modern frontend experience for tracking shared group spending, managing settlements, and importing expense data from CSV. The application is built using React, Vite, Tailwind CSS, Recharts, and React Router. It includes a public welcome page, authentication flow, group management, expense reporting, balance summaries, and an anomaly-aware import pipeline.

The system is designed for collaborative scenarios such as roommate budgets, travel groups, and shared event expenses. It supports expense tracking across multiple groups, settlement workflows, and robust transactional import handling.

## Database Schema

The database schema is designed to support user management, group membership, expense logging, split calculations, settlements, import reports, and anomaly tracking.

### Users

- `id` (TEXT, primary key)
- `name` (TEXT, not null)
- `email` (TEXT, not null, unique)
- `role` (TEXT, not null)
- `password` (TEXT, not null)
- `avatar` (TEXT, optional)
- `createdAt` (TEXT, optional)

### Groups

- `id` (TEXT, primary key)
- `name` (TEXT, not null)
- `description` (TEXT, not null)
- `category` (TEXT, not null)
- `coverImage` (TEXT, not null)
- `createdAt` (TEXT, optional)

### GroupMembers

- `group_id` (TEXT, not null)
- `user_id` (TEXT, not null)
- `joinedAt` (TEXT, optional)
- `leftAt` (TEXT, optional)
- Primary Key: (`group_id`, `user_id`)

### Expenses

- `id` (TEXT, primary key)
- `description` (TEXT, not null)
- `amount` (REAL, not null)
- `date` (TEXT, not null)
- `paidBy` (TEXT, not null)
- `groupId` (TEXT, not null)
- `currency` (TEXT, default `USD`)
- `category` (TEXT, optional)
- `sourceDocument` (TEXT, optional)
- `createdAt` (TEXT, optional)

### ExpenseSplits

- `id` (TEXT, primary key)
- `expenseId` (TEXT, not null)
- `userId` (TEXT, not null)
- `shareAmount` (REAL, not null)
- `splitPercentage` (REAL, not null)
- `createdAt` (TEXT, optional)

### Settlements

- `id` (TEXT, primary key)
- `groupId` (TEXT, not null)
- `fromUserId` (TEXT, not null)
- `toUserId` (TEXT, not null)
- `amount` (REAL, not null)
- `settlementDate` (TEXT, not null)
- `paymentMethod` (TEXT, optional)
- `notes` (TEXT, optional)
- `createdAt` (TEXT, optional)

### ImportReports

- `id` (TEXT, primary key)
- `importDate` (TEXT, not null)
- `sourceFile` (TEXT, not null)
- `rowsProcessed` (INTEGER, not null)
- `rowsImported` (INTEGER, not null)
- `rowsFlagged` (INTEGER, not null)
- `rowsReview` (INTEGER, not null)
- `status` (TEXT, not null)
- `warnings` (TEXT, optional)
- `createdAt` (TEXT, optional)

### Anomalies

- `id` (TEXT, primary key)
- `importReportId` (TEXT, not null)
- `rowNumber` (INTEGER, not null)
- `anomalyType` (TEXT, not null)
- `description` (TEXT, not null)
- `detectionLogic` (TEXT, not null)
- `handlingPolicy` (TEXT, not null)
- `policyRationale` (TEXT, not null)
- `resolved` (BOOLEAN, default `false`)
- `createdAt` (TEXT, optional)

## Complete Anomaly Log for the Expense CSV Import System

Each anomaly identified during CSV import is tracked as a discrete record in the `Anomalies` table and summarized in the import report.

### Duplicate expenses

- **Description:** The imported row matches an existing expense record by transaction ID, date, amount, and payer.
- **Detection Logic:** Compare the expense transaction ID or unique row hash against existing expense identifiers in the system.
- **Handling Policy:** Flag the row for review and skip automatic duplicate insertion.
- **Reason for Choosing the Policy:** Prevents duplicate financial records while allowing manual verification to avoid false positives.

### Missing payer

- **Description:** The row contains an expense amount but the payer field is empty or invalid.
- **Detection Logic:** Validate that the `payer` column is present and corresponds to a known user.
- **Handling Policy:** Flag for review and do not import until payer identity is resolved.
- **Reason for Choosing the Policy:** Accurate payer attribution is essential for split calculations and liability tracking.

### Missing participants

- **Description:** The expense row does not specify participants or split recipients.
- **Detection Logic:** Confirm participant fields are present and include at least one valid user ID or email.
- **Handling Policy:** Flag the row for manual review and import with a review-required status.
- **Reason for Choosing the Policy:** Prevents ambiguous expense allocation and forces correct participant definition.

### Invalid dates

- **Description:** The date field is malformed or not parseable as a valid timestamp.
- **Detection Logic:** Parse the date string with strict validation; reject invalid ISO-8601 or known local formats.
- **Handling Policy:** Flag the row and hold import until the date is corrected.
- **Reason for Choosing the Policy:** Ensures consistent reporting, chronological sorting, and accurate period-based analytics.

### Future dates

- **Description:** The expense date is later than the current system date.
- **Detection Logic:** Compare parsed expense date against the import execution date.
- **Handling Policy:** Flag for review and optionally allow import if the user confirms it is a planned expense.
- **Reason for Choosing the Policy:** Future dates are uncommon for actual expenses and may indicate data-entry errors.

### Negative amounts

- **Description:** The expense amount is negative, which may indicate a refund or reversal.
- **Detection Logic:** Validate the numeric amount and identify values below zero.
- **Handling Policy:** Mark as a refund event and require review to classify correctly.
- **Reason for Choosing the Policy:** Negative transactions must be interpreted differently than standard expense charges.

### Zero amount expenses

- **Description:** The expense amount is zero, which typically does not represent a payable transaction.
- **Detection Logic:** Check numeric amount exactly equals 0.
- **Handling Policy:** Flag for review and omit from balance calculations until validated.
- **Reason for Choosing the Policy:** Zero-amount rows often indicate placeholder entries or data format issues.

### Settlement logged as expense

- **Description:** A row appears to represent a payment settlement, not a new shared expense.
- **Detection Logic:** Detect keywords such as "settlement", "paid back", or transaction type codes used for transfers.
- **Handling Policy:** Reclassify to `Settlements` when possible or flag for review if ambiguous.
- **Reason for Choosing the Policy:** Settlement entries should not inflate shared expense totals and require a separate payment flow.

### Currency mismatch (USD vs INR)

- **Description:** The expense row currency differs from the expected default currency for the import source.
- **Detection Logic:** Compare the imported currency field against the configured currency context.
- **Handling Policy:** Convert using the configured exchange rate and record the original currency in source metadata.
- **Reason for Choosing the Policy:** Enables multi-currency support without losing traceability of the original values.

### Unknown users

- **Description:** The payer or participant does not match any user in the system.
- **Detection Logic:** Validate each user identifier against the `Users` table.
- **Handling Policy:** Flag for review and preserve the imported row until manual user mapping is completed.
- **Reason for Choosing the Policy:** Prevents creation of invalid expense ownership and ensures only authorized users are recognized.

### Expenses after member exit date

- **Description:** A participant is associated with the expense despite having left the group before the expense date.
- **Detection Logic:** Compare the expense date against the participant's `leftAt` date in `GroupMembers`.
- **Handling Policy:** Exclude the participant from split calculation and flag the row for review.
- **Reason for Choosing the Policy:** Preserves historical accuracy while avoiding improper charges for former members.

### Duplicate transaction IDs

- **Description:** The same transaction ID appears in multiple imported rows.
- **Detection Logic:** Detect repeated transaction IDs within the current import batch and against existing records.
- **Handling Policy:** Flag duplicates and require manual reconciliation before importing one or more versions.
- **Reason for Choosing the Policy:** Prevents duplicate financial entries and preserves transaction-level consistency.

### Invalid split percentages

- **Description:** The sum of participant split percentages does not equal 100%, or individual percentages are out of bounds.
- **Detection Logic:** Validate that total split percentages equal 100% and each value lies between 0 and 100.
- **Handling Policy:** Flag for review and halt automatic split assignment until corrected.
- **Reason for Choosing the Policy:** Ensures expense allocation is mathematically consistent and legally defensible.

### Empty categories

- **Description:** The expense category field is blank or missing.
- **Detection Logic:** Require a non-empty string in the category column.
- **Handling Policy:** Assign a default category such as `Uncategorized` and flag for later review.
- **Reason for Choosing the Policy:** Maintains import completeness while highlighting classification gaps.

### Malformed CSV rows

- **Description:** The row does not match the expected column count or contains quoting errors.
- **Detection Logic:** Validate CSV row structure, delimited fields, and escaping rules.
- **Handling Policy:** Reject the row and record an anomaly for manual investigation.
- **Reason for Choosing the Policy:** Malformed data can corrupt import parsing and should be corrected before ingestion.

## Import Tracking and Review Process

The import system creates an `ImportReports` entry for each file processed. Each report is linked to anomaly records in the `Anomalies` table, and rows requiring review remain in a pending state until resolved.

### Review Workflow

- Automatically imported rows are committed to `Expenses`, `ExpenseSplits`, and `Settlements` when no anomalies are detected.
- Flagged rows are written to the anomaly log and displayed in the import review dashboard.
- Reviewers can resolve anomalies by correcting source data, mapping unknown users, or confirming planned future expenses.
- Resolved anomalies are marked `true` in the `Anomalies` table and referenced in the final import report.
