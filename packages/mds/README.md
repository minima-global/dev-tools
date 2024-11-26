# Minima MDS Library

The Minima MDS (MiniDapp System) Library is a TypeScript implementation of the MDS interface for building MiniDapps on the Minima blockchain platform.

## Installation

Install `mds` using your preferred package manager:

```bash
npm install @minima-global/mds
```

## Features

- TypeScript support for a fully typesafe experience
- Promise-based API for asynchronous operations
- Comprehensive set of commands for interacting with the Minima blockchain
- File system operations
- Network requests
- Utility functions for data conversion

## Documentation

View the full documentation and examples on [docs.minima.global](https://docs.minima.global/docs/development).

## Usage

Using callback

```tsx
MDS.cmd.block((data) => {
  // do someting with the data
});
```

Using async/await

```tsx
const block = await MDS.cmd.block();
// do someting with the data
```

## Contributing

This project is made better by contributors like you, and we welcome contributions of all sizes - from fixing typos, adding new features and fixing types, please open an issue or submit a pull request, but be sure to read the [contributing guidelines](https://github.com/minima-global/dev-tools/blob/main/CONTRIBUTING.md).
