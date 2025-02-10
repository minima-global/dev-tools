# Minima Custom Token Image Processor

This package is made to facilitate image compatibility across the Minima dApp ecosystem.  It holds both a custom React component, `Image`, and a utility methods that allow you to compress, process and parse custom token images seamlessly.


## Installation

Install `image` using your preferred package manager:

```bash
npm install @minima-global/image
```

## Features

- Re-usable React Componenet, Image
- Utility methods that allow you to compress, parse and process custom token images depending on their format
- It currently handles base64 encoding, IPFS, IPNS and external URLS.

## Documentation

View the full documentation on [docs.minima.global](https://docs.minima.global/docs/development/using-typescript).

## Usage

```tsx
import { Image } from "@minima-global/image";

... rest of your component

<Image src={customToken.url} />
```

You can also independently write your own component and use the utility methods to help you do so like,

```tsx
import { DEFAULT_BASE64_IMAGE, fetchIPFSImage, getBase64Image, isBase64Image, isIPFSOrIPNS, isValidUrl } from "@minima-global/image" // [!code highlight] 

... rest of your component

if (isIPFSOrIPNS(src)) {
    const ipfsUrl = await fetchIPFSImage(src)
    return ipfsUrl;
} else if (isValidUrl(src)) {
    return src;
} else if (isBase64Image(src)) {
    const completeBase64Image = getBase64Image(src)
    return completeBase64Image
}

... rest of your component
```

You can also compress an image to ensure it fits on-chain and doesn't cause issues for you when making transactions

```tsx
import { compressImage } from "@minima-global/image";

const compressedImage = await compressImage(tokensBase64ImageData);
```


## Contributing

This project is made better by contributors like you, and we welcome contributions of all sizes - from fixing typos, adding new features and fixing types, please open an issue or submit a pull request, but be sure to read the [contributing guidelines](https://github.com/minima-global/dev-tools/blob/main/CONTRIBUTING.md).
