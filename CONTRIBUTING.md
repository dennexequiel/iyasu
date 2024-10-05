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