/**
 * Helper functions to help with compressing on-chain uploaded images
 */

/**
 * Default base64 encoded image (a simple 1x1 pixel transparent PNG)
 */
export const DEFAULT_BASE64_IMAGE =
  "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHBhdGggZD0iTTQwIDYwaDEyMHY4MEg0MFY2MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHBhdGggZD0iTTYwIDEwMGwyMC0yMGwyMCAyMGwyMC0yMGwyMCAyMCIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8Y2lyY2xlIGN4PSIxNDAiIGN5PSI4MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMTAwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg=="

/**
 * Add an image file, it should give you back a base64 data type representation
 * @param file
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const fileRead = new FileReader();
        fileRead.readAsDataURL(file);
        fileRead.onload = async () => {
            const base64 = fileRead.result as string;
            resolve(base64);
        };

        fileRead.onerror = () => {
            resolve(
                "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPGcgY29sb3I9IiMwMDAwMDAiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtZmFtaWx5PSJVYnVudHUiIGxldHRlci1zcGFjaW5nPSIwIiB3b3JkLXNwYWNpbmc9IjAiIHdoaXRlLXNwYWNlPSJub3JtYWwiIGZpbGw9ImdyYXkiPg0KICAgICAgICA8cGF0aCBkPSJNOCAyYTIuODQgMi44NCAwIDAgMC0xLjEyLjIyMWMtLjM0NS4xNDEtLjY1MS4zNDgtLjkwNi42MTV2LjAwM2wtLjAwMS4wMDJjLS4yNDguMjY5LS40NC41OTItLjU3NC45Ni0uMTM3LjM2Ny0uMjAzLjc2OS0uMjAzIDEuMiAwIC40MzUuMDY1Ljg0MS4yMDMgMS4yMDkuMTM1LjM2MS4zMjcuNjguNTc0Ljk1bC4wMDEuMDAyYy4yNTQuMjY3LjU1OC40NzcuOTAxLjYyNHYuMDAzYy4zNDYuMTQxLjcyMy4yMSAxLjEyLjIxLjM5NSAwIC43Ny0uMDY5IDEuMTE3LS4yMXYtLjAwMmMuMzQzLS4xNDcuNjQ0LS4zNTcuODkyLS42MjUuMjU1LS4yNjguNDUtLjU5LjU4Ni0uOTUyLjEzOC0uMzY4LjIwNC0uNzc0LjIwNC0xLjIxaC4wMWMwLS40My0uMDY1LS44MzEtLjIwMy0xLjE5OGEyLjc3MSAyLjc3MSAwIDAgMC0uNTg1LS45NjMgMi41IDIuNSAwIDAgMC0uODk3LS42MThBMi44MzUgMi44MzUgMCAwIDAgNy45OTkgMnpNOC4wMjQgMTAuMDAyYy0yLjMxNyAwLTMuNTYxLjIxMy00LjQ4Ni45MS0uNDYyLjM1LS43NjcuODI1LS45MzkgMS4zNzgtLjE3Mi41NTMtLjIyNi45NzUtLjIyOCAxLjcxTDggMTQuMDAyaDUuNjI5Yy0uMDAxLS43MzYtLjA1Mi0xLjE1OS0uMjI1LTEuNzEyLS4xNzItLjU1My0uNDc3LTEuMDI3LS45NC0xLjM3Ni0uOTIzLS42OTctMi4xMjQtLjkxMi00LjQ0LS45MTJ6IiBzdHlsZT0ibGluZS1oZWlnaHQ6MTI1JTstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidVYnVudHUsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LXBvc2l0aW9uOm5vcm1hbDtmb250LXZhcmlhbnQtY2Fwczpub3JtYWw7Zm9udC12YXJpYW50LW51bWVyaWM6bm9ybWFsO2ZvbnQtdmFyaWFudC1hbHRlcm5hdGVzOm5vcm1hbDtmb250LWZlYXR1cmUtc2V0dGluZ3M6bm9ybWFsO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDt0ZXh0LXRyYW5zZm9ybTpub25lO3RleHQtb3JpZW50YXRpb246bWl4ZWQ7c2hhcGUtcGFkZGluZzowO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiLz4NCiAgICA8L2c+DQo8L3N2Zz4=",
            );
        };
    });
};


/**
 * Add a base64 representation of an image, it should give you back a compressed image ready for on-chain upload
 * @param base64Image
 * @param quality https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#quality
 */
export const compressImage = async (base64Image: string, quality = 0.7): Promise<string> => {
    // Extract the MIME type from the base64 string
    const mimeType = base64Image.substring(base64Image.indexOf(":") + 1, base64Image.indexOf(";"));

    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Image;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

            const MAX_IMAGE_SIZE = 50; // for that 50K HD resolution

            let imageWidth = img.width;
            let imageHeight = img.height;

            if (imageWidth > MAX_IMAGE_SIZE || imageHeight > MAX_IMAGE_SIZE) {
                // Calculate the aspect ratio
                const aspectRatio = imageWidth / imageHeight;

                // Calculate the new width and height
                if (imageWidth > imageHeight) {
                    imageWidth = MAX_IMAGE_SIZE;
                    imageHeight = MAX_IMAGE_SIZE / aspectRatio;
                } else {
                    imageHeight = MAX_IMAGE_SIZE;
                    imageWidth = MAX_IMAGE_SIZE * aspectRatio;
                }
            }

            canvas.width = imageWidth;
            canvas.height = imageHeight;

            ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

            const compressedImage = canvas.toDataURL(mimeType, quality);

            // Extract the base64 content (the part after the comma)
            const pureCompressedImage = compressedImage.slice(compressedImage.indexOf(',') + 1);

            // Create an XML structure to hold the base64 image data
            const xmlString = '<artimage></artimage>';
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Insert the base64 image content into the XML structure
            xmlDoc.firstElementChild!.innerHTML = pureCompressedImage;

            // Serialize the XML back into a string
            const serializer = new XMLSerializer();
            const serializedXML = serializer.serializeToString(xmlDoc);

            // Resolve the promise with the serialized XML
            resolve(serializedXML);
        };

        img.onerror = () => {
            // In case of error, resolve with the original image URL as a fallback
            resolve(base64Image);
        };
    });
};

/**
 *
 * @param url - custom token url
 */
export const isBase64Image = (url: string): string | false => {
    // Remove <artimage> tags if present
    const cleanedUrl = url.replace(/<artimage>(.*?)<\/artimage>/, "$1").trim()

    // Check if the cleaned string is base64 encoded
    try {
        if (btoa(atob(cleanedUrl)) === cleanedUrl) {
            return cleanedUrl;
        }
    } catch (err) {
        return false
    }

    return false
}

/**
 * Determines the MIME type of a base64 encoded image.
 * @param base64String The base64 encoded image data.
 * @returns The MIME type of the image.
 */
function getMimeType(base64String: string): string {
    try {
        // Decode the first few bytes of the base64 data
        const decodedData = atob(base64String.substring(0, 8));
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }

        // Determine the image type based on the magic numbers
        if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8 && uint8Array[2] === 0xff) {
            return "image/jpeg";
        } else if (uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4e && uint8Array[3] === 0x47) {
            return "image/png";
        } else if (uint8Array[0] === 0x47 && uint8Array[1] === 0x49 && uint8Array[2] === 0x46) {
            return "image/gif";
        } else if (uint8Array[0] === 0x42 && uint8Array[1] === 0x4d) {
            return "image/bmp";
        }

        // Check for SVG (look for XML declaration or SVG tag)
        const svgCheck = atob(base64String.substring(0, 32));
        if (svgCheck.includes('<svg') || svgCheck.includes('<?xml')) {
            return "image/svg+xml";
        }

        return "application/octet-stream"; // Default type
    } catch (err) {
        console.error(`Failed to determine MIME type`, err);
        return "application/octet-stream";
    }
}

/**
 * Processes base64 image data and returns a complete data URL.
 * @param imageData The base64 encoded image data, potentially wrapped in <artimage> tags.
 * @param defaultImage The default image to return if processing fails.
 * @returns A complete data URL for the image.
 */
export const getBase64Image = (imageData: string, defaultImage: string = DEFAULT_BASE64_IMAGE): string => {
    try {
        // Remove <artimage> tags if present
        const cleanedUrl = imageData.replace(/<artimage>(.*?)<\/artimage>/, "$1").trim();

        // Determine MIME type and construct data URL
        const mimeType = getMimeType(cleanedUrl);
        return `data:${mimeType};base64,${cleanedUrl}`;
    } catch (err) {
        console.error(`Failed to create image data`, err);
        return defaultImage;
    }
}

const IPFS_GATEWAYS = [
    "https://ipfs.io/ipfs/",
    "https://gateway.pinata.cloud/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://gateway.ipfs.io/ipfs/",
    "https://dweb.link/ipfs/", // Added more reliable gateway
    "https://ipfs.fleek.co/ipfs/", // Added another reliable gateway
];

const IPNS_GATEWAYS = [
    "https://ipfs.io/ipns/",
    "https://gateway.pinata.cloud/ipns/",
    "https://cloudflare-ipfs.com/ipns/",
    "https://gateway.ipfs.io/ipns/",
    "https://dweb.link/ipns/",
    "https://ipfs.fleek.co/ipns/",
];

/**
 * Checks if the given string is an IPFS/IPNS URI or gateway URL
 * @param uri The string to check
 * @returns boolean indicating if the string is an IPFS/IPNS URI or gateway URL
 */
export const isIPFSOrIPNS = (uri: string): boolean => {
    // Check if it's an IPFS/IPNS URI
    if (uri.startsWith("ipfs://") || uri.startsWith("ipfs:/ipfs/") || uri.startsWith("ipns://")) {
        return true
    }

    // Check if it's an IPFS/IPNS gateway URL
    for (const gateway of [...IPFS_GATEWAYS, ...IPNS_GATEWAYS]) {
        if (uri.includes(gateway)) {
            return true
        }
    }

    // Check for IPFS hash pattern (Qm... or bafy...)
    const ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,})/
    if (ipfsHashRegex.test(uri)) {
        return true
    }

    // Check for IPNS hash pattern
    const ipnsHashRegex = /^(k[1-9A-HJ-NP-Za-km-z]{58,})/
    return ipnsHashRegex.test(uri)
}

/**
 *
 * @param uri the data URL
 * @param defaultImage add this if you want to use your own custom default image
 */

export const fetchIPFSImage = async (uri: string, defaultImage = DEFAULT_BASE64_IMAGE): Promise<string> => {
    try {
        // Determine if this is an IPNS or IPFS resource
        const isIPNS = uri.includes("ipns/") || uri.includes("/ipns/")
        const gateways = isIPNS ? IPNS_GATEWAYS : IPFS_GATEWAYS

        // Clean the URI - handle both direct URIs and full gateway URLs
        let cid = uri

        // Handle full gateway URLs
        if (cid.includes("/ipfs/") || cid.includes("/ipns/")) {
            // Extract the CID from a full gateway URL
            const parts = cid.split(/\/ip[fn]s\//)
            cid = parts[parts.length - 1]
        } else {
            // Handle direct ipfs:// or ipns:// protocol URIs
            cid = cid.replace("ipfs://", "").replace("ipns://", "")
        }

        // Remove any trailing parameters (like :1)
        cid = cid.split(":")[0]

        // Try each gateway in order
        for (const gateway of gateways) {
            try {
                const response = await fetch(`${gateway}${cid}`, {
                    // Add fetch options to handle SSL issues
                    mode: "cors",
                    credentials: "omit",
                })

                if (response.ok) {
                    const blob = await response.blob()
                    return URL.createObjectURL(blob)
                }
            } catch (error) {
                console.warn(`Failed to fetch from ${gateway}`, error)
                // Continue to next gateway instead of returning defaultImage immediately
                continue
            }
        }

        // If we've tried all gateways and none worked, return default image
        console.error(`Failed to fetch from all ${isIPNS ? "IPNS" : "IPFS"} gateways`)
        return defaultImage
    } catch (error) {
        console.error("Error in fetchIPFSImage:", error)
        return defaultImage
    }
}

/**
 * Checks if the given string is a valid URL
 * @param url The string to check
 * @returns boolean indicating if the string is a valid URL
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

