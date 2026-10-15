# Sales Lead Management Tool

A React + TypeScript + Redux Toolkit application for viewing sales leads, selecting a lead, and tracking follow-up activity.

## Overview

This project simulates a simple sales operations dashboard where a user can:

- view a list of sales leads
- select a lead from the list
- see the selected lead's full details
- add follow-up activity notes for that lead
- keep the app state in Redux

The UI is designed to resemble a lightweight CRM interface and focuses on a clear lead-selection workflow.

## Features

- Lead list with name and email
- Selected lead highlighting
- Detailed lead information panel
- Activity log per lead
- Add activity form with validation
- Redux state management
- Local persistence using browser storage
- Responsive, clean dashboard layout

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Create React App
- CSS Modules
- Jest + React Testing Library

## Project Structure

- src/App.tsx — main layout and composition
- src/LeadList.tsx — lead list UI
- src/LeadDetails.tsx — selected lead detail panel
- src/ActivityLog.tsx — activity tracking form and list
- src/store/ — Redux store and lead slice
- src/store/leadsSlice.test.ts — reducer unit tests
- src/App.test.js — user-flow UI test

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm start
```

Open http://localhost:3000 in the browser.

## Testing

Run the test suite:

```bash
npm test -- --watchAll=false
```

## Production Build

Build the app for deployment:

```bash
npm run build
```

The production files are generated in the build folder.

## AI Collaboration Note

This project was developed through a structured AI-assisted workflow. The process involved:

- creating the Redux slice and initial state model
- building the lead list and detail components
- connecting the app to Redux with typed selectors and actions
- validating behavior through real tests
- refining the interface for readability and usability

The AI workflow helped accelerate implementation while keeping the code maintainable, typed, and testable. Each major change was validated through the app behavior and automated tests before finalizing the solution.

## Summary

This application demonstrates a practical sales lead dashboard with a clean UX, predictable state flow, and a reusable component structure suitable for further CRM feature expansion.

## Submission Summary

This project is a Sales Lead Management Tool built with React, TypeScript, and Redux Toolkit. It includes a lead list, selected lead details, and an activity log for recording follow-up notes. The app uses centralized Redux state to manage lead selection and activity updates, and the state is persisted in local storage for a smoother user experience. I also validated the app with automated tests and a production build to confirm the implementation is stable and deployable.

