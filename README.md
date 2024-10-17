# Iyasu

Iyasu is a project focused on healing products designed for pain relief and wellness. Our tagline is "Heal Simply. Live Fully."

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies](#technologies)
- [Deployment and Environment Variables](#deployment-and-environment-variables)
- [Contributing](#contributing)
  - [Branching Strategy](#branching-strategy)
  - [Diff Stacking](#diff-stacking)
- [Changelog](#changelog)

## Getting Started

To get started with the Iyasu project:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

Iyasu is built using:
- Next.js 14 with App Router
- React
- Tailwind CSS
- Embla Carousel React for carousels
- Framer Motion for animations
- Google APIs (googleapis) for integration with Google services
- Nodemailer for sending emails

## Deployment and Environment Variables

Deployment and environment variables for the Iyasu project are managed through Vercel. This ensures a streamlined deployment process and secure handling of sensitive information.

- **Environment Variables**: All necessary environment variables are configured and managed within the Vercel dashboard. This includes API keys, database connection strings, and other sensitive information.

- **Deployment Process**:
  - **Production**: Pushes to the `main` branch trigger a production deployment.
    - URL: [https://iyasu.life](https://iyasu.life)
  - **UAT (User Acceptance Testing)**: Pushes to the `uat` branch trigger a preview deployment.
    - URL: [https://uat.iyasu.life](https://uat.iyasu.life)

For local development, you may need to set up a `.env.local` file with the required environment variables. Contact a project administrator for the necessary values.

## Contributing

Before you begin contributing to the Iyasu project, please keep the following best practices in mind:

### Branching Strategy

For feature development, create a new branch from the main branch. Each branch should focus on a single task or feature to keep the changes isolated and manageable. Name the branch descriptively based on the feature or bug fix you are working on. For example:

- `feature/add-user-authentication`
- `bugfix/login-issue`
- `release/v1.0.0`
- `hotfix/reset-password-fix`

### Diff Stacking

When working on large features or complex changes, break your work into smaller, manageable parts, with each part being developed in its own branch. This approach is known as "diff stacking."

- **Branch Creation:** In a diff stack, each branch should typically branch off from the previous branch in the stack, not directly from main. Only the first branch in the stack should be created from main.

- **Sequential Merging:** After review, stacked branches should be merged sequentially into main to ensure that each change is incorporated in the correct order.

- **Avoiding Merge Conflicts:** Keep your branches up to date with their immediate parent branches in the stack, rather than main, to avoid conflicts within the stack itself.

## Changelog

For a detailed list of changes and version updates, please refer to our [CHANGELOG.md](CHANGELOG.md) file.