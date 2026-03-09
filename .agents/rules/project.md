---
trigger: always_on
---

# Vania Storefront AI Assistant Rules

## Core Stack

- Next.js 16 (App Router)
- React 19 (Server Components default, Client Components when required)
- TypeScript (Strict typing)
- Tailwind CSS 4
- Shadcn UI (Class variance authority, radix-ui, lucide-react, etc.)
- GraphQL (Apollo Client + GraphQL Codegen)
- Form Validation: React Hook Form + Zod

## Architecture & Directory Structure

- Follow **Atomic Design Principles** for components:
  - `src/components/atoms`: Basic building blocks (buttons, inputs, icons).
  - `src/components/molecules`: Simple combinations of atoms (form fields with labels, search bars).
  - `src/components/organisms`: Complex, functional sections of the UI (headers, product grids, footers).
- `src/app`: Next.js 16 App Router (handling routing, pages, and layouts).
- `src/lib`: Utility functions and shared helpers.
- `src/graphql` or `src/gql`: GraphQL operations and codegen output.

## Coding Guidelines

### 1. React & Next.js

- Use Server Components (`src/app/page.tsx`, `layout.tsx`) by default for better performance and SEO.
- Use `"use client"` directive only when hooks (`useState`, `useEffect`, context) or browser APIs are needed.
- Leverage Next.js 16 App Router features fully (nested layouts, loading.tsx, error.tsx).
- Avoid unnecessary prop drilling; leverage context or composed components appropriately.

### 2. Styling (Tailwind CSS 4)

- Use standard Tailwind utility classes.
- Use `clsx` and `tailwind-merge` (via `cn` utility) for dynamic class names and conditional styling, especially in UI components.
- Rely on defined CSS variables in `src/app/globals.css` (or `tailwind.config`) for colors and themes.

### 3. State Management & Data Fetching

- Use Apollo Client (`@apollo/client`) for GraphQL queries and mutations.
- Use `graphql-codegen` outputs for strongly typed queries, mutations, and fragments.
- When working with fragments, follow the `useFragment` (or `getFragment`) pattern established in the project.
- Always handle loading and error states for asynchronous operations.

### 4. Forms & Validation

- Always use `react-hook-form` with `zod` resolver for forms.
- Define robust Zod schemas for parsing and validating input.

### 5. Best Practices

- Every component should strictly belong to its corresponding Atomic category (Atoms, Molecules, Organisms, Templates, Pages).
- Avoid monolithic components; break them down based on atomic principles.
- Use explicit barrel exports (`index.ts`) within `components/atoms`, `components/molecules`, and `components/organisms`.
- Always write type-safe code. Avoid `any` - use generics or specific types.

## File Organization Rules

- Naming conventions: Use `kebab-case` for file and directory names (e.g., `store-config-fragment.ts`, `header.tsx`).
- Keep components focused strictly on presentation when possible, moving logic into custom hooks or context.
- Keep the `styles` isolated or scoped locally via Tailwind rather than global CSS where possible.
