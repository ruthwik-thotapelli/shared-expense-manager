# IMPORT_REPORT

## Import Summary

- **Source file:** `expenses_export.csv`
- **Import date:** 2026-06-15
- **Processed by:** Shared Expense Manager CSV Importer
- **Import mode:** Assisted import with anomaly review
- **Configured currency:** USD

## Summary Metrics

- **Rows Processed:** 52
- **Rows Imported:** 36
- **Rows Flagged:** 12
- **Rows Requiring Review:** 8

## Anomaly Table

| Row | Issue | Action Taken |
|-----|-------|--------------|
| 7 | Duplicate expense detected | Flagged for review |
| 11 | Missing payer | Flagged for review |
| 14 | Invalid date format | Flagged for review |
| 18 | Future date | Flagged for review |
| 21 | Negative amount | Treated as refund |
| 24 | Zero amount expense | Flagged for review |
| 29 | Settlement recorded as expense | Reclassified as settlement |
| 33 | Currency mismatch (USD vs INR) | Converted using configured exchange rate |
| 37 | Unknown user in participants | Assigned to manual review |
| 40 | Expense after member exit date | Excluded from balance calculation |
| 45 | Duplicate transaction ID | Flagged for review |
| 50 | Malformed CSV row | Rejected, user notified |

## Detailed Row Actions

- **Duplicate expense detected → Flagged for review**
  - The system identified an incoming row with a transaction ID and amount already present in existing expense records.
  - The row was preserved for manual reconciliation rather than imported automatically.

- **Missing payer → Flagged for review**
  - The import encountered a row with a valid amount but no payer assigned.
  - This row was held back until payer attribution is corrected.

- **Invalid date format → Flagged for review**
  - A row contained a non-parsable date string.
  - The row was not imported until the date is corrected and reprocessed.

- **Future date → Flagged for review**
  - An expense date was later than the import execution date.
  - The row remains pending review to confirm whether it is a planned future transaction.

- **Negative amount → Treated as refund**
  - The row was interpreted as a refund or reversal rather than a standard expense.
  - It was imported with refund classification and excluded from normal expense totals.

- **Zero amount expense → Flagged for review**
  - The system encountered a zero-value row that does not represent a payable expense.
  - It was held for review and omitted from balance calculations.

- **Settlement recorded as expense → Reclassified as settlement**
  - The row included settlement-related keywords and matched settlement transaction patterns.
  - It was reclassified to the `Settlements` table to avoid inflating expense totals.

- **Currency mismatch → Converted using configured exchange rate**
  - An imported row in INR was converted to USD using the system's configured rate.
  - Original currency metadata was preserved for auditability.

- **Unknown user → Assigned to manual review**
  - A payer or participant could not be matched to a known user.
  - The row was flagged for manual user mapping.

- **Expense after member exit date → Excluded from balance calculation**
  - A participant had left the group before the logged expense date.
  - Their share was excluded, and the row was flagged for reconciliation.

- **Duplicate transaction ID → Flagged for review**
  - The same transaction ID appeared more than once in the imported dataset.
  - Duplicate rows were held for manual reconciliation to avoid double counting.

- **Malformed CSV row → Rejected, user notified**
  - The row structure did not match the expected column format.
  - It was rejected from import and reported for correction.

## Summary of Review Requirements

- 8 rows require manual review due to payer attribution, date validation, or participant mapping.
- 4 rows were imported with adjusted handling policies (refund, settlement reclassification, currency conversion).
- 12 anomalies were logged in the import report.

## Import Status

Import completed successfully with warnings.
