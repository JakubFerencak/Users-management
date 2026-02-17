# Users Management

A user management application built with Angular 18.

## Description

A simple web application for managing users with the following features:
- User authentication and login
- Display list of users
- Edit and delete users
- Manage user groups

## Requirements

- Node.js (version 18+)
- npm

## Installation

```bash
npm install
```

## Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`. The application automatically reloads when you change source files.

## Project Structure

```
src/
├── app/              # Main components
├── services/         # Services (UsersService, MessageService)
├── guards/           # Authentication guards and resolvers
├── entities/         # Data models (User, Auth, Group)
└── modules/          # Modules (Groups module)
```

## Key Components

- **Login** - Authentication component with login functionality
- **Users** - User list and management
- **Groups** - User groups management
- **Navigation** - Navbar with links to different sections

## Running Tests

```bash
npm test
```

## Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.
