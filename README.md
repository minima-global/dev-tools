<p align="center">
  <a href="">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://avatars.githubusercontent.com/u/71636227?s=200&v=4">
      <img src="https://avatars.githubusercontent.com/u/71636227?s=200&v=4" height="128">
    </picture>
    <h1 align="center">Minima Dev-tools</h1>
  </a>
</p>

A collection of development tools for building MiniDapps on the Minima Blockchain.

## Packages

This monorepo contains the following packages:

- [`mds`](./packages/mds) - Core TypeScript library for building type-safe MiniDapps
- [`create-minima-app`](./packages/create-minima-app) - CLI tool for scaffolding new MiniDapp projects
- [`minima-cli`](./packages/minima-cli) - Development CLI for managing MiniDapps

## Getting Started

Create a new MiniDapp project with:

```bash
# npm
npx @minima-global/create-minima-app init
```

or use typescript with MDS

```bash
npm install @minima-global/mds
```

## Documentation

- [Official Documentation](https://docs.minima.global)
- [MDS Documentation](https://docs.minima.global/docs/development/using-typescript)
- [CLI Documentation](https://docs.minima.global/docs/development/cli)

## Development

This repository uses [pnpm](https://pnpm.io/) for package management and [Turborepo](https://turbo.build/repo) for build orchestration.

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run tests and linting
pnpm ci
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on how to get started.

## Community

- [Discord](https://discord.gg/minima)
- [Twitter](https://x.com/Minima_Global)
- [Build on Minima](https://build.minima.global/)
- [Main website](https://minima.global/)

## Support

If you find these tools helpful, please consider giving this repository a star! It helps others discover these resources.
