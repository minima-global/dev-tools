import React from "react"
import { useEffect, useState } from "react"
import { DEFAULT_BASE64_IMAGE, fetchIPFSImage, getBase64Image, isBase64Image, isIPFS, isValidUrl } from "../utils"

interface ImageProps {
  src: string
  className?: string
  alt?: string
}

type ImageType = "on-chain" | "external_url" | "ipfs" | "default"

export const Image: React.FC<ImageProps> = ({ src, className = "", alt = "Custom token image" }) => {
  const [imageData, setImageData] = useState(DEFAULT_BASE64_IMAGE)
  const [imageType, setImageType] = useState<ImageType>("default")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processImageSource = async () => {
      setIsLoading(true)
      if (isValidUrl(src)) {
        setImageType("external_url")
        setImageData(src)
      } else if (isBase64Image(src)) {
        const completeBase64Image = getBase64Image(src)
        setImageType("on-chain")
        setImageData(completeBase64Image)
      } else if (isIPFS(src)) {
        try {
          const ipfsUrl = await fetchIPFSImage(src)
          setImageType("ipfs")
          setImageData(ipfsUrl)
        } catch (error) {
          console.error("Failed to fetch IPFS image:", error)
          setImageType("default")
          setImageData(DEFAULT_BASE64_IMAGE)
        }
      } else {
        setImageType("default")
        setImageData(DEFAULT_BASE64_IMAGE)
      }
      setIsLoading(false)
    }

    processImageSource()
  }, [src])

  const getWrapperStyle = () => {
    switch (imageType) {
      case "on-chain":
        return "w-[50px] h-[50px]"
      case "external_url":
      case "ipfs":
        return "w-full max-w-[300px] h-[300px]"
      default:
        return "w-[100px] h-[100px]"
    }
  }

  return (
    <div className={`relative ${getWrapperStyle()} ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <img
          src={imageData || "/placeholder.svg"}
          alt={alt}
          className={`w-full h-full object-contain ${imageType === "on-chain" ? "p-1" : ""}`}
        />
      )}
      {imageType === "on-chain" && !isLoading && (
        <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-1 rounded">On-chain</span>
      )}
    </div>
  )
}

