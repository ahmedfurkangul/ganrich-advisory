# Ganrich Advisory — Release Operations

Date: 24 July 2026

Release type: private review candidate; production unchanged

## 1. Change inventory

| Surface | Before | Implemented | Rationale |
|---|---|---|---|
| EN/TR RSS | Six core articles only | Adds publicly published, non-private PDF insights from the governed editorial database; falls back safely to the six core articles when storage is unavailable | Makes newly approved research discoverable without exposing drafts or private material |
| RSS ordering | Static article dates | Core articles and governed reports share one publication-date order | Keeps subscribers’ reading sequence coherent |
| Production preflight | Validation commands existed across phase notes | One repeatable technical preflight checks hosting bindings, production origin, analytics default, discovery/error files, migrations, prospect-facing placeholders, verified contact, build presence, and build freshness | Reduces release-day omission risk |
| Sign-off | Owner and legal gates listed descriptively | Unsigned approval record for owner, legal/privacy, accessibility/content, and production operations | Separates technical completion from authority to publish |

## 2. Final EN/TR copy

No new prospect-facing interface copy is introduced. Governed PDF feed items reuse only the report’s approved title, short summary or executive thesis, topic/content type, and publication date in its source language.

Private records are excluded. PDF-gated and briefing-by-request records may expose the approved editorial summary, but never the protected PDF document.

## 3. Component and operational specification

### Dynamic bilingual feed

- `/en/feed.xml` and `/tr/feed.xml` are runtime feeds.
- Each feed requests only records with `status = published` and the matching language.
- `gating_model = private` records are excluded.
- The report URL points to the governed editorial page, never directly to object storage.
- If D1 is unavailable, the feed remains valid and continues to publish the six reviewed core articles.
- Invalid or missing dates do not break the feed.

### Technical preflight

`npm run release:preflight` is a non-networked, non-deploying gate. It returns a failure when a required technical condition is absent. It does not mark legal, owner, accessibility, operational, or production-browser review as complete.

### Sign-off authority

`RELEASE-SIGN-OFF.md` begins unsigned and cannot approve a deployment by existing in the repository. The named owner and reviewers must complete it against a specific private candidate before production publication.

## 4. Open decisions

1. Confirm whether the current public email remains acceptable or should move to a domain mailbox.
2. Supply and approve the registered entity and formal data-rights information.
3. Decide whether to launch without verified engagement vignettes.
4. Keep newsletter and analytics off, or select providers and complete their privacy/consent reviews.
5. Assign release, rollback, post-deployment smoke-test, and backup/recovery owners.
6. Explicitly approve a named private candidate before any public deployment.
