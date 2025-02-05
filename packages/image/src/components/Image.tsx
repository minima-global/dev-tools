import React from "react"
import { useEffect, useState } from "react"
import { DEFAULT_BASE64_IMAGE, fetchIPFSImage, getBase64Image, isBase64Image, isIPFSOrIPNS, isValidUrl } from "../utils"

interface ImageProps {
  src: string
  alt?: string
  className?: string
}

type ImageType = "on-chain" | "external_url" | "ipfs" | "default"

const Image: React.FC<ImageProps> = ({ src, className = "", alt = "Custom token image" }) => {
  const [imageData, setImageData] = useState(DEFAULT_BASE64_IMAGE)
  const [imageType, setImageType] = useState<ImageType>("default")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processImageSource = async () => {
      setIsLoading(true)
      if (isIPFSOrIPNS(src)) {
        try {
          const ipfsUrl = await fetchIPFSImage(src)
          setImageType("ipfs")
          setImageData(ipfsUrl)
        } catch (error) {
          console.error("Failed to fetch IPFS image:", error)
          setImageType("default")
          setImageData(DEFAULT_BASE64_IMAGE)
        }
      } else if (isValidUrl(src)) {
        setImageType("external_url")
        setImageData(src)
      } else if (isBase64Image(src)) {
        const completeBase64Image = getBase64Image(src)
        setImageType("on-chain")
        setImageData(completeBase64Image)
      } else {
        setImageType("default")
        setImageData(DEFAULT_BASE64_IMAGE)
      }
      setIsLoading(false)
    }

    processImageSource()
  }, [src])

  const getWrapperStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "relative",
      overflow: "hidden",
    }

    switch (imageType) {
      case "on-chain":
        return { ...baseStyle, width: "50px", height: "50px" }
      case "external_url":
      case "ipfs":
        return { ...baseStyle, width: "100%", maxWidth: "300px", height: "300px" }
      default:
        return { ...baseStyle, width: "100px", height: "100px" }
    }
  }

  const loadingStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    animation: "pulse 1.5s infinite ease-in-out",
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: imageType === "on-chain" ? "4px" : "0",
  }

  return (
      <div style={getWrapperStyle()} className={className}>
        {isLoading ? (
            <div style={loadingStyle}>
              <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid #e2e8f0",
                    borderTopColor: "#3b82f6",
                    animation: "spin 1s linear infinite",
                  }}
              />
            </div>
        ) : (
            <img src={imageData || "/placeholder.svg"} alt={alt} style={imageStyle} />
        )}
        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
  )
}

export default Image

