# MyZurich App (Frontend)

This project is a frontend application built using **Next.js 14** with the **App Router** for routing. It’s styled with **Tailwind CSS** and uses **Shadcn UI** components for a clean and responsive design. Authentication is handled using **Auth.js** (the latest version of NextAuth), supporting both **Google OAuth** and **Custom Credentials** for role-based access (User/Admin).

---

## Tech Stack

- **React 18** – Component-based UI development.
- **Next.js 14 (App Router)** – Full-stack React framework with built-in routing and SSR.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **TypeScript** – Type-safe JavaScript for improved developer experience.

---

## Highlighted Libraries & Packages

- **axios** – For making API requests to the backend.
- **class-variance-authority** – Utility for managing Tailwind CSS classes conditionally.
- **next-auth** – Authentication using Google OAuth and Credentials.
- **react-hook-form** – Form state management and validation.
- **react-icons** – Icon library for React.
- **react-redux** – State management with Redux.
- **zod** – Schema validation for form data and API requests.
- **tailwindcss** – Styling framework.
- **typescript** – Type-safe language enhancing JavaScript.

---

## Pages / Routes Overview

| Route                                         | Description                        |
| --------------------------------------------- | ---------------------------------- |
| `/zurich/authentication/login`                | Login page for admin (Credentials) |
| `/zurich/authentication/unauthorized`         | Unauthorized access page           |
| `/zurich/dashboard/billing`                   | Billing dashboard                  |
| `/zurich/dashboard/billing/add-new-billing`   | Create a new billing record        |
| `/zurich/dashboard/billing/view-billing/[id]` | View a billing record by ID        |

---

## Authentication Flow

- **Google OAuth**: Used for **user roles** to login via Google.
- **Credentials Authentication**: Used for **admin roles**, where admins login with email/password.

Auth.js (NextAuth v5) handles session management, token storage, and route protection. Middleware is configured to secure dashboard routes, ensuring only authenticated users can access protected pages.

---

## Environment Variables

Create a `.env.local` file in the root directory with the following structure:

1. AUTH_SECRET=
2. AUTH_GOOGLE_ID=
3. AUTH_GOOGLE_SECRET=
4. NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

---

## Running the Project

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:

- npm install

3. **Setup environment variables**:
4. **Run the development server**

- npm run dev

---

## Key Components & Features

### Middleware

- Configured to protect routes based on user roles (User/Admin).
- Automatically redirects unauthenticated users to the **login** or **unauthorized** page.

### Component Structure

- Shared components are modular and reusable (e.g., buttons, form inputs).
- Built with **Shadcn UI** for a clean and consistent design system.

### Libs Folder

- Contains shared utilities, constants, and helper functions.
- Promotes code reusability and better project organization.

### Dynamic Forms

- Developed using **react-hook-form** for form state management.
- Validated with **zod** to ensure strong input validation and schema enforcement.
