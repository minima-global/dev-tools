/**
 *
 * This component should identify the
 * type of uri the token image holds and
 * return the best scenario <img /> for it
 * @elias
 * */

import React, { useEffect } from "react"
import { useState } from "react"
import { DEFAULT_BASE64_IMAGE, fetchIPFSImage, getBase64Image, isBase64Image, isIPFS, isValidUrl } from "../utils"
interface ImageProps {
    src: string;
    className?: string
}

/**
 *
 * @param src pass in the URL property of the custom token
 * @param className
 * @constructor
 */
export const Image: React.FC<ImageProps> = ({
        src,
        className = "",
    }) => {
    const [imageData, setImageData] = useState(DEFAULT_BASE64_IMAGE);
    const [imageType, setImageType] = useState<'on-chain' | 'external_url' | 'ipfs' | 'default'>('default');

    useEffect(() => {
      const validUrl = isValidUrl(src);

      if (validUrl) {
        setImageType("external_url")
        setImageData(src);
        return;
      }

      const isBase64 = isBase64Image(src);

      if (isBase64) {
        const completeBase64Image = getBase64Image(isBase64);
        setImageType("on-chain");
        setImageData(completeBase64Image);
        return;
      }

      if (isIPFS(src)) {
        (async () => {
          const ipfsUrl = await fetchIPFSImage(src);
          setImageType("ipfs");
          setImageData(ipfsUrl);
        })();

        return;
      }

    }, [src])

    return (
        <div>
            <img alt="custom-token-image" src={imageData} className={className} />
        </div>
    )
}
