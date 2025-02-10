import * as React from "react"
import { useEffect, useState } from "react"
import { DEFAULT_BASE64_IMAGE, fetchIPFSImage, getBase64Image, isBase64Image, isIPFSOrIPNS, isValidUrl } from "../utils"

interface ImageProps {
  src: string
  alt?: string
  className?: string
  loader?: React.ReactNode | false
}

const Image: React.FC<ImageProps> = ({ src, className = "", alt = "Custom token image", loader = false }) => {
  const [imageData, setImageData] = useState(DEFAULT_BASE64_IMAGE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processImageSource = async () => {
      setIsLoading(true)
      if (isIPFSOrIPNS(src)) {
        try {
          const ipfsUrl = await fetchIPFSImage(src)
          setImageData(ipfsUrl)
        } catch (error) {
          console.error("Failed to fetch IPFS image:", error)
          setImageData(DEFAULT_BASE64_IMAGE)
        }
      } else if (isValidUrl(src)) {
        setImageData(src)
      } else if (isBase64Image(src)) {
        const completeBase64Image = getBase64Image(src)
        setImageData(completeBase64Image)
      } else {
        setImageData(DEFAULT_BASE64_IMAGE)
      }
      setIsLoading(false)
    }

    processImageSource()
  }, [src])

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

  return (
      <>
        {isLoading ? (
            <>
              {!loader &&
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
                    /></div>}

              {loader && loader}
            </>
        ) : (
            <img src={imageData || "/placeholder.svg"} alt={alt} className={className} />
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
      </>
  )
}

export default Image

