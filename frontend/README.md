# e.on - React Social Platform

A modern social platform built with React, featuring posts, comments, and user authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/e-on.git
cd e-on
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

- User authentication (login/register)
- View, create, and interact with posts
- Comment on posts
- Like posts
- Light and dark theme toggle

## Theme Toggle

The application features a theme toggle system that allows users to switch between light and dark themes:

1. Click on the moon/sun icon in the header to toggle between themes
2. The selected theme is saved to localStorage and persists between sessions
3. The app also respects the user's system preference on first load

## Folder Structure

```
src/
  ├── assets/             # Static assets like images
  ├── components/         # Reusable components
  │   ├── common/         # Shared components like buttons, headers
  │   ├── auth/           # Authentication related components
  │   ├── posts/          # Post related components
  │   ├── comments/       # Comment related components
  │   └── users/          # User related components
  ├── features/           # Feature-specific modules
  ├── layout/             # Layout components
  ├── context/            # React context providers
  ├── hooks/              # Custom React hooks
  ├── pages/              # Page components
  ├── services/           # API and service functions
  ├── styles/             # Global styles
  ├── themes/             # Theme CSS files
  ├── utils/              # Utility functions
  ├── App.jsx             # Main App component
  └── main.jsx            # Application entry point
```

## API Integration

The project is currently using mock data for development. To connect to a real backend:

1. Update the `baseURL` in `src/services/api.js` to point to your API server
2. Remove the mock implementations in the service files
3. Uncomment the actual API calls

## Technologies Used

- React 18
- React Router 6
- CSS for styling
- Axios for API requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.