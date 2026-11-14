# Sacrament Meeting Planner — Project Specification

## 1. Project Overview

The Sacrament Meeting Planner is a web application designed to help church leaders and other authorized users prepare, organize, and manage sacrament meeting programs.

The goal is to make meeting preparation easier by keeping important information organized in one place. Instead of preparing programs manually, users will be able to create meeting plans, arrange participants and assignments, and view or print the completed program.

**Current status:** The repository currently contains a basic Next.js starter application. The sacrament meeting planning features described below represent the intended product and are not yet fully implemented.

## 2. Problem Statement

Preparing a sacrament meeting requires organizing several details, including meeting leaders, speakers, hymns, prayers, and other program items.

Managing these details manually can take time and make it difficult to keep information organized or make changes when needed.

The Sacrament Meeting Planner aims to provide a simple digital solution for preparing and managing meeting programs.

## 3. Intended Users

The intended users include:

- Bishops and other church leaders.
- Ward clerks and meeting coordinators.
- Members assigned to organize sacrament meetings.
- Other authorized individuals who need to prepare or review meeting programs.

The exact user roles and permissions will be determined by the team.

## 4. Main Project Features

The following features describe the intended application.

### 4.1 Meeting Creation

Authorized users should be able to create a sacrament meeting program by entering important meeting information, including:

- Meeting date and time.
- Presiding leader.
- Conducting leader.
- Opening hymn.
- Opening prayer.
- Sacrament hymn.
- Speakers and their assigned topics.
- Closing hymn.
- Closing prayer.

### 4.2 Meeting Management

Users should be able to:

- View existing meeting programs.
- Edit meeting information when changes are needed.
- Delete meeting programs when they are no longer required.
- Organize meeting details in a clear order.

### 4.3 Meeting Program Display

The application should display meeting programs in a clean and organized format.

Users should be able to see the meeting details, participants, hymns, prayers, and other program items without confusion.

### 4.4 Printing

Users should be able to print a prepared meeting program in a readable format suitable for use during a sacrament meeting.

### 4.5 Data Storage

Meeting information should eventually be stored persistently so that users can access previously created programs without losing their information.

### 4.6 User Access

If authentication is included in the final team design, authorized users should be able to access management features according to their assigned permissions.

## 5. Functional Requirements

The application is expected to support the following requirements:

1. Users should be able to access the application through a web browser.
2. Authorized users should be able to create meeting programs.
3. Users should be able to enter meeting details, including leaders, speakers, hymns, and prayers.
4. Users should be able to view meeting programs.
5. Authorized users should be able to edit existing programs.
6. Authorized users should be able to delete programs.
7. The application should display meeting information in the correct order.
8. Users should be able to print meeting programs.
9. Meeting information should be saved persistently once database storage is implemented.
10. If authentication is implemented, restricted management features should only be available to authorized users.

These are intended requirements, not a claim that all features currently exist.

## 6. Non-Functional Requirements

### Usability
The application should have a simple interface that users can understand without extensive technical knowledge.

### Accessibility
The application should support keyboard navigation, readable text, appropriate color contrast, and accessible form labels.

### Responsiveness
The application should work properly on desktop computers, tablets, and mobile phones.

### Performance
Pages should load efficiently, and users should be able to navigate between meeting programs without unnecessary delays.

### Security
If user accounts and stored meeting information are introduced, the application should protect private information and restrict unauthorized access.

### Reliability
The application should provide clear feedback when information is saved, updated, or when an error occurs.

## 7. Main User Workflows

### Creating a Meeting Program

1. The user opens the Sacrament Meeting Planner.
2. The user accesses the meeting management area.
3. The user creates a new meeting program.
4. The user enters the meeting date, leaders, speakers, hymns, and prayers.
5. The user saves the meeting program.
6. The application displays the completed program.

### Viewing a Meeting Program

1. The user opens the meetings page.
2. The user selects a meeting.
3. The application displays its details in an organized format.

### Editing a Meeting Program

1. An authorized user selects an existing meeting.
2. The user makes the necessary changes.
3. The user saves the updated information.
4. The application displays the updated program.

### Printing a Meeting Program

1. The user opens a meeting program.
2. The user selects the print option.
3. The application presents a printer-friendly version.

## 8. Technologies

The project is intended to use the following technologies:

- **Next.js:** Application framework.
- **React:** User interface development.
- **TypeScript:** Application programming language.
- **Tailwind CSS:** Styling and responsive layouts.
- **Database:** Persistent storage, with the specific solution to be confirmed by the team.
- **GitHub:** Source code management and team collaboration.

The repository currently contains a Next.js application using TypeScript and Tailwind CSS. Other technologies and integrations will depend on the team's final implementation decisions.

## 9. Project Constraints and Assumptions

- The application is being developed as part of the WDD430 team project.
- The application should be accessible through a modern web browser.
- Meeting information should be easy to understand and manage.
- Only authorized users should be able to change meeting information if access controls are implemented.
- Database, authentication, and hosting decisions will be finalized by the team.
- The application should remain simple and practical for its intended users.

## 10. Future Improvements

Possible future improvements include:

- User authentication and role-based permissions.
- A calendar for organizing upcoming meetings.
- Reusable meeting program templates.
- Better search and filtering for previous meetings.
- Exporting programs to PDF.
- Sharing meeting programs with other authorized users.

These improvements will depend on the team's priorities and available development time.

## 11. Conclusion

The Sacrament Meeting Planner aims to simplify the preparation and management of sacrament meeting programs. By organizing meeting details, participants, hymns, and prayers in one application, the project will provide a practical tool for those responsible for preparing church meetings.

The team will continue developing the application based on these requirements and refine the specification as implementation progresses.