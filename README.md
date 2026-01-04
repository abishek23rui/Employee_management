
# Employee_Management

This is a React-based Employee Management web application built with Vite, TypeScript, and Tailwind CSS. It is designed as a single-page application (SPA) and can be deployed easily to platforms like Netlify.

## Features
- Employee login and authentication
- Employee list management (add, view)
- Dashboard for quick insights
- Modular folder structure for scalability
- Responsive UI with Tailwind CSS

## Project Structure
```
public/           # Static assets and Netlify redirects
src/              # Application source code
  app/            # Main app logic and routing
    modules/      # Feature modules (dashboard, employee_list, login)
    types/        # TypeScript types
    validator/    # Validation logic
  assets/         # Images and icons
  components/     # Reusable UI components
  layout/         # Layout and sidebar components
index.html        # Main HTML file
vite.config.ts    # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd ERPLite.SixAM.UI.App
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Development
To start the development server:
```sh
npm run dev
```
The app will be available at `http://localhost:5173` (or as shown in your terminal).

