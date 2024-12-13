# Minima MDS Library

The Minima MDS (MiniDapp System) Library is a TypeScript implementation of the MDS interface for building MiniDapps on the Minima blockchain platform.

## Installation

Install `mds` using your preferred package manager:

```bash
npm install @minima-global/mds
```

## Features

- TypeScript support for a fully typesafe experience
- Comprehensive set of commands for interacting with the Minima blockchain
- File system operations
- Network requests
- Utility functions for data conversion

## Documentation

View the full documentation on [docs.minima.global](https://docs.minima.global/docs/development/using-typescript).

## Usage

```tsx
import { MDS } from "@minima-global/mds";

MDS.init(async ({ event, data }) => {
  // Handle events from the MDS
})
```

You can check the `event` parameter to determine which event has been triggered and handle the event accordingly.

```tsx
import { MDS, MinimaEvents } from "@minima-global/mds"; // [!code highlight] 

MDS.init(async ({ event, data }) => {
  if (event === MinimaEvents.INITED) {  
    console.log("MDS Initialized and ready 🚀")
  } 
})
```

All Minima CLI commands are available as methods on the `MDS.cmd` object. To see the full list of commands available see the [Terminal Commands](/docs/development/terminal-commands) page.

You can use the `MDS.cmd` object to send commands and get access to the response by either using the `await` keyword or by passing a callback function.

```tsx
import { MDS, MinimaEvents } from "@minima-global/mds";

// using async/await
MDS.init(async ({ event, data }) => {
  if (event === MinimaEvents.INITED) {
    const command = await MDS.cmd.block()  
    console.log(command.response.block) 
  } 
})

// using callback
MDS.init(({ event, data }) => {
  if (event === MinimaEvents.INITED) {
    MDS.cmd.block((data) => { 
      console.log(data.response.block) 
    }) 
  }
})
```


## Contributing

This project is made better by contributors like you, and we welcome contributions of all sizes - from fixing typos, adding new features and fixing types, please open an issue or submit a pull request, but be sure to read the [contributing guidelines](https://github.com/minima-global/dev-tools/blob/main/CONTRIBUTING.md).
