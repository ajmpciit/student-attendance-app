# Student Attendance App

A responsive React application for marking and reviewing student attendance.

## Features

- View a class roster of 10 students.
- Mark attendance as present, absent, late, or unmarked.
- Cycle through statuses by selecting a student's attendance icon.
- View live totals for present, absent, and late students.
- Identify present students with a perfect-attendance star.
- Display the current date.
- Validate attendance updates and attendance calculations.

## Attendance Statuses

Selecting a student's attendance icon cycles through:

1. Default/unmarked
2. Present
3. Absent
4. Late

Present and late statuses are considered attended when calculating the attendance rate. The application is intended to support a 75% exam eligibility rule.

## Project Structure

```text
src/
  App.jsx                 Main attendance interface and state
  App.css                 Application component styles
  index.css               Global styles
  main.jsx                React application entry point
  lib/
    attendance.js         Attendance status and calculation functions
    attendance.test.js    Unit tests for attendance functions
public/                   Static public assets
index.html                HTML entry document
```

## Attendance Functions

The reusable logic is located in `src/lib/attendance.js`.

- `STATUS` - contains the available attendance statuses.
- `calculateAttendanceRate(records)` - returns an attendance percentage.
- `isEligibleForExam(records, threshold)` - checks eligibility against an attendance threshold.
- `markAttendance(records, studentId, status)` - returns updated records for a student.

`calculateAttendanceRate` counts present and late records as attended. `isEligibleForExam` uses a default threshold of 75%.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```Docker Terminal inside root folder
Docker build -t jenkins -f Dockerfile-JenkinsSetup .

docker run -d --name jenkins --user root -p 8090:8080 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins
```

- Install 'Copy Artifact', 'SonarQube Scanner', 'NodeJS' plugins on Jenkins
- Add the following tools :
  - JDK installations : {name: "JDK21", JAVA_HOME: "/opt/java/openjdk"}
  - SonarQube Scanner installations : {name:"SonarQube Scanner" }
  - NodeJS installations : {Version: 24.xx.x}

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### Create a Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Tests

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Current Data Behavior

The application currently stores attendance data in React state. Changes remain available while the page is open, but they are reset when the page is refreshed. There is no database, authentication, API, or user account system yet.
