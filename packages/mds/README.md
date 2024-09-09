# Minima MDS Library

The Minima MDS (MiniDapp System) Library is a TypeScript implementation of the MDS interface for building MiniDapps on the Minima blockchain platform.

## Features

- Fully typed MDS interface
- Promise-based API for asynchronous operations
- Comprehensive set of commands for interacting with the Minima blockchain
- File system operations
- Network requests
- Utility functions for data conversion

## Installation

```bash
npm install minima-mds
```

## Usage

Using callback

```tsx
MDS.cmd.block((data) => {
  console.log('BLOCK DATA');
  console.log(data);
});
```

You can also await the response

```tsx
const res = await MDS.cmd.block();

console.log(res.response.block);
```
