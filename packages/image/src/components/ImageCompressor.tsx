import React from "react"
import { useCallback, useState } from "react"
import { compressImage, fileToBase64 } from "../utils"

interface ImageCompressorProps {
    onCompress?: (compressedImage: string) => void
    quality?: number
    className?: string
    buttonClassName?: string
}

export const ImageCompressor: React.FC<ImageCompressorProps> = ({
        onCompress,
        quality = 0.7,
        className = "",
        buttonClassName = "",
    }) => {
    const [isCompressing, setIsCompressing] = useState(false)

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (!file) return

            try {
                setIsCompressing(true)
                const base64 = await fileToBase64(file)
                const compressed = await compressImage(base64, quality)
                onCompress?.(compressed)
            } catch (error) {
                console.error("Error compressing image:", error)
            } finally {
                setIsCompressing(false)
            }
        },
        [quality, onCompress],
    )

    return (
        <div className={className}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isCompressing}
                className={buttonClassName}
            />
            {isCompressing && <span>Compressing...</span>}
        </div>
    )
}

