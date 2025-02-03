/**
 * Helper functions to help with compressing on-chain uploaded images
 */

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
