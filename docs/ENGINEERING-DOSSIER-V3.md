# Engineering Dossier / Design V3

## Design rationale

References (research date 2026-10-29):
- Stefan Vitasović (Awwwards): giant typographic hierarchy
- Rauno Freiberg: intentionally restrained interaction
- Nick DiMatteo (Siteinspire): project-list editorial architecture
- Lee Robinson: clarity, career evidence, technical writing

This is original layout, not an imitation of source code or branded artwork.
The original Secure Vault PR remains separate; no 3D hero in this revision.

## CV content

Primary basis: `CV César Bugueño Mella.pdf` from 2026-10-29;
risk-sensitive claims reconciled conservatively with
`CV_Cesar_Bugueno_Mella_Senior_DevSecOps_2026.pdf` from 2026-10-27.
None of the original CV PDF files are added to this repository.

The site deliberately avoids percentages, claimed 0-downtime, operational
telemetry, hostnames, private source links, CV download buttons and internal
incident details. Public source links are restricted to repositories checked.

## Accessibility

- Semantic h1/h2/h3, links and native details/summary.
- Fully readable and interactive without JavaScript.
- No hero 3D, no WebGL, no lazy hydration, no fake telemetry.
- GSAP is lazy and opt-out with prefers-reduced-motion.
- Mobile and desktop routes checked in Chromium E2E.
- Screenshot reviews and WCAG audits should be completed before merge.

## Preview without deployment

Use GitHub Actions -> Editorial Portfolio — Visual and Browser Review
to download desktop ES/EN and mobile ES screenshots. PR remains draft.
