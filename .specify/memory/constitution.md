<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0 (MINOR: materially expanded principle guidance,
  amendment/versioning rules, and compliance review expectations).
- Modified principles: User-Centered Design (clarified); Reliable Meeting
  Information (clarified); Responsive and Accessible Design (clarified);
  Maintainable and Simple Code (clarified); Testing and Quality (clarified);
  Privacy and Security (clarified). No titles renamed.
- Added sections: None in the constitution; added "Non-Functional Requirements"
  to .specify/templates/spec-template.md.
- Removed sections: None.
- Dependent artifacts: ✅ .specify/templates/plan-template.md; ✅
  .specify/templates/spec-template.md; ✅ .specify/templates/tasks-template.md;
  ✅ .github/agents/speckit.tasks.agent.md; ✅
  .github/agents/speckit.implement.agent.md; ✅
  .github/agents/speckit.constitution.agent.md. The expected
  .specify/templates/commands directory is absent; the available command
  guidance is under .github/agents and was reviewed.
- Runtime guidance: README.md, AGENTS.md, and spec.md reviewed; no updates needed.
- Deferred TODOs: Confirm the original ratification date; the existing date
  has no independently verifiable source in the repository.
-->

# Sacrament Meeting Planner Constitution

## Core Principles

### I. User-Centered Design
The application MUST make it straightforward for authorized users to create,
organize, view, edit, and print sacrament meeting programs. User-facing labels
and instructions MUST use clear language; meeting details MUST appear in a
predictable order; and save or error outcomes MUST be communicated. This keeps
meeting preparation understandable without requiring technical knowledge.

### II. Reliable Meeting Information
The application MUST validate required meeting dates, times, leaders, hymns,
prayers, speakers, and assigned topics before accepting a meeting program.
Invalid or missing information MUST be identified without silently discarding
the user's other entries. Saved or updated information MUST be reflected
accurately when the program is viewed, and program items MUST retain their
intended order. This reduces avoidable preparation errors.

### III. Responsive and Accessible Design
User-facing workflows MUST remain usable on desktop, tablet, and mobile
viewports. All interactive controls MUST be keyboard-operable, form controls
MUST have programmatic labels, and text and controls MUST have sufficient
contrast to remain readable. These requirements make the planner usable across
devices and by people with different abilities.

### IV. Maintainable and Simple Code
Changes MUST follow the existing project structure and coding conventions and
MUST keep responsibilities clear and reusable where reuse is appropriate.
Dependencies, duplication, and abstraction MUST be added only when they solve
a stated need. This keeps the application understandable and practical to
extend.

### V. Testing and Quality
New features and significant changes MUST have documented verification. Use
automated tests where the project supports them; otherwise, define and perform
repeatable manual checks. Verification MUST cover the affected user workflows
and applicable validation and error paths, and MUST confirm that existing
functionality remains intact. This provides evidence that changes meet their
acceptance criteria.

### VI. Privacy and Security
The application MUST protect meeting information and any personal information
it handles. Inputs MUST be validated at the appropriate trust boundary, and
sensitive information MUST NOT be exposed unnecessarily in responses, logs,
or user interfaces. Where authorization is implemented, restricted actions
MUST be enforced by the trusted application layer and MUST NOT depend only on
hiding interface controls.

## Technical Constraints

- Preserve the existing Next.js application architecture and TypeScript
  conventions unless a documented design decision justifies a change.
- Use the existing project dependencies and styling approach unless a change is
  justified by a requirement.
- Follow the Next.js App Router conventions already used in the repository.
- Keep application logic organized into appropriate components, routes, and
  utility modules.
- Do not introduce external services or integrations without a clear
  requirement and documented tradeoffs.
- Any feature that stores or displays dates and times MUST state its timezone
  behavior and apply it consistently.
- Maintain compatibility with the project's existing deployment environment.

## Development Workflow

- Begin each feature with a clear specification and verifiable acceptance
  criteria.
- Review the existing implementation before changing files.
- Break larger features into small, manageable tasks with explicit verification
  coverage.
- Prefer small, focused changes over unnecessary rewrites.
- Run the available linting, type-checking, and tests before considering work
  complete; record any unavailable check and its replacement validation.
- Document important technical decisions and update project documentation
  when necessary.

## Governance

This constitution governs planning, implementation, and review work for the
Sacrament Meeting Planner. A proposed amendment MUST state its rationale and
affected artifacts, receive review and approval from the project team, and
update this file and any dependent guidance together.

Version numbers MUST follow semantic versioning: MAJOR for backward-incompatible
principle or governance changes, MINOR for new principles or materially
expanded guidance, and PATCH for clarifications and non-semantic corrections.

Every feature specification, implementation plan, task list, and implementation
review MUST be checked against these principles. Plans MUST record the
constitution check before and after design. A conflict with a MUST requirement
MUST be resolved in the proposed work or through an explicitly reviewed
constitution amendment before implementation proceeds.

**Version**: 1.1.0
**Ratified**: TODO(RATIFICATION_DATE): original adoption date is not verifiable
from repository history
**Last Amended**: 2026-11-15
