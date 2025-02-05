# Image Utility Functions

This document outlines the various utility functions available for handling images in our application. These functions are particularly useful for processing, compressing, and fetching images from various sources, including base64 encodings and IPFS/IPNS.

## Constants

### DEFAULT_BASE64_IMAGE
A base64 encoded SVG image used as a default "Image Not Found" placeholder.

## Functions

### fileToBase64(file: File): Promise<string>
Converts a File object to a base64 string.
- **Input**: A File object
- **Output**: A Promise that resolves to a base64 encoded string

### compressImage(base64Image: string, quality = 0.7): Promise<string>
Compresses a base64 image, resizing if necessary.
- **Input**:
    - base64Image: A base64 encoded image string
    - quality: Compression quality (default: 0.7)
- **Output**: A Promise that resolves to a compressed base64 encoded image string

### isBase64Image(url: string): string | false
Checks if a string is a base64 encoded image.
- **Input**: A string that might be a base64 encoded image
- **Output**: The cleaned base64 string if valid, false otherwise

### getMimeType(base64String: string): string
Determines the MIME type of a base64 encoded image.
- **Input**: A base64 encoded image string
- **Output**: The MIME type of the image

### getBase64Image(imageData: string, defaultImage?: string): string
Processes base64 image data and returns a complete data URL.
- **Input**:
    - imageData: Base64 encoded image data, potentially wrapped in <artimage> tags
    - defaultImage: Optional default image to return if processing fails
- **Output**: A complete data URL for the image

### isIPFSOrIPNS(uri: string): boolean
Checks if a string is an IPFS/IPNS URI or gateway URL.
- **Input**: A string to check
- **Output**: Boolean indicating if the string is an IPFS/IPNS URI or gateway URL

### fetchIPFSImage(uri: string, defaultImage?: string): Promise<string>
Fetches an image from IPFS/IPNS using multiple gateways.
- **Input**:
    - uri: The IPFS/IPNS URI or gateway URL
    - defaultImage: Optional default image to return if fetching fails
- **Output**: A Promise that resolves to the fetched image URL or the default image

### isValidUrl(url: string): boolean
Checks if a string is a valid URL.
- **Input**: A string to check
- **Output**: Boolean indicating if the string is a valid URL

## Usage

These functions can be imported and used in your application to handle various image-related tasks, such as uploading, displaying, and fetching images from decentralized storage systems.

Example:

```typescript
import { compressImage, isIPFSOrIPNS, fetchIPFSImage } from './image-utils';

// Compress an image before uploading
const compressedImage = await compressImage(base64Image, 0.8);

// Check if a URI is IPFS/IPNS
const isIPFS = isIPFSOrIPNS('ipfs://QmX...');

// Fetch an image from IPFS
const imageUrl = await fetchIPFSImage('ipfs://QmX...');
```

Remember to handle errors and edge cases when using these functions in your application.
