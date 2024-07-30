# Next.js Task Project
## Project Overview
This project is a web application built with Next.js. It includes functionalities for managing users, such as creating, editing, deleting, and retrieving user information. The application is structured with a client-side dashboard and a server-side API to handle user data.
## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dashboard](#dashboard)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
## Installation
To run this project locally, follow these steps:
1. Clone the repository:
   git clone <repository-url>
2. Navigate to the project directory:
   cd nextjs_task_project
3. Install the dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Open your browser and go to http://localhost:3000.
## Usage
   ## Creating a User
   - Navigate to the Dashboard from the home page.
   - Fill in the user details in the provided form.
   - Click "Add User" to create a new user.
   ## Editing a User
   - Click the edit icon next to the user you want to edit.
   ## Update the user details in the form.
   - Click "Edit User" to save the changes.
   ## Deleting a User
   - Select the users you want to delete using the checkboxes.
   - Click the "Delete Selected Users" button.
## API Endpoints
   ## GET /api/users
   - Retrieve the list of all users or a specific user by UID.
   ## POST /api/users
   - Create a new user with the provided data.
   ## PUT /api/users
   - Update an existing user with the provided UID and data.
   ## DELETE /api/users
   - Delete a user with the provided UID.
## Dashboard
- The Dashboard is built with React and the @tanstack/react-table library for data display and manipulation. It provides a user-friendly interface to manage users, including adding, editing, and deleting users.
## Error Handling
- The project includes a custom error page to handle unexpected errors gracefully, so that project only work on Chrome browser. if user try to open on other browser like FireFox it will redirect to error page .
## Project Structure
nextjs_task_project/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── route.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── error/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── BrowserAuthentication.tsx
│   │   ├── ClientProvider.tsx
│   │   └── Toast.tsx
│   ├── hooks/
│   │   └── UserHooks.tsx
│   ├── lib/
│   │   └── axiosInstance.tsx
│   ├── pages/
│   │   ├── api/
│   │   │   └── hello.ts
│   │   ├── _app.tsx
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
└── package.json
## Dependencies
- Next.js: The React framework used for this project.
- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for the browser and Node.js.
- bcryptjs: A library to help hash passwords.
- Framer Motion: A library to power animations in React.
- UUID: For generating unique identifiers.
- @tanstack/react-table: A headless UI library for building powerful   tables and datagrids.
- @tanstack/react-query: TanStack Query is the data-fetching library for web applications  it makes fetching, caching, synchronizing and updating server state in your web applications
