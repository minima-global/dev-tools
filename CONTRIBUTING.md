# MDS

This is a library for building typesafe minidapps on the Minima BlockChain. We're excited that you're interested in contributing to our mono-repo! This project is made better by contributors like you, and we welcome contributions of all sizes - from fixing typos, adding new features and fixing types.

## About this repository

This repository is a monorepo that includes the following packages:

- `tests`: A Vite React project for testing
- `packages/mds`: The core `mds` typescript package.

We use the following tools for development and package management:

- [Turborepo](https://turbo.build/repo) as our build system.
- [pnpm](https://pnpm.io/) for package management.
- [Changesets](https://github.com/changesets/changesets) for managing releases.

## Ways to Contribute

There are many ways to make a meaningful impact:

- Code: Add features, fix bugs, or improve performance
- Documentation: Help others understand our project better
- Tests: Strengthen our test coverage
- Examples: Create examples showing how to use our packages
- Ideas: Share your thoughts in discussions and issues

## Making Your First Contribution

To get started with development, follow these steps:

1. Fork the repository by clicking the "Fork" button in the top right corner of the GitHub page.

2. Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/dev-tools.git
   ```

3. Navigate to the project directory:

   ```bash
   cd dev-tools
   ```

4. Create a new branch for your changes:

   ```bash
   git checkout -b my-new-feature
   ```

5. Install the dependencies:

   ```bash
   pnpm install
   ```

6. Start the development server:

   ```bash
   turbo dev
   ```

   This command puts everything in dev mode. When you change a file in any package in dev mode, it will automatically rebuild for you, and you will have access to the new types.

7. Run the ci script

```bash
turbo ci
```

This command will run all tests and linting.

8. Push to your branch and Open a Pull Request!

## Digging into the Project

If you want to make changes to any of the packages in the project, you can test your changes in two ways:

**Assuming `pnpm dev` is running**

1. Writing a new test

2. Running a node and using mds in the test application

## Pull Request Process

1. Ensure that your changes adhere to the project's coding conventions and have been thoroughly tested.

2. Create a pull request from your branch to the `main` branch of the main repository.

3. Provide a clear and descriptive title for your pull request, summarizing the changes made.

4. In the pull request description, include a detailed explanation of the changes, along with any relevant information or examples.

5. If your pull request addresses an open issue, please reference it in the description using the `Fixes #issue-number` syntax.

6. Be responsive to feedback and be prepared to make changes to your pull request if requested by the maintainers.

Feel free to explore the mono-repo and its packages and make changes.

## Need Help?

- Questions? Open a discussion
- Found a bug? Open an issue
- Want to discuss? Start a new discussion thread
- Need clarification? Ask in any relevant issue or PR

## Reporting Issues

If you encounter any bugs, have feature requests, or want to discuss potential improvements, please open an issue on the GitHub repository. When creating an issue, provide a clear and concise description of the problem or suggestion, along with any relevant information or examples.

We appreciate your contributions and look forward to collaborating with you to make the `Minima dev-tools` project even better!

# ❤️ Thank You

Every contribution matters, no matter how small. We appreciate your time and effort in making this project better for everyone.

Happy coding! ~ GucciCame 🎉
