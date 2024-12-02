import { MDS, MinimaEvents } from "@minima-global/mds"
import { createContext, useEffect, useRef, useState } from "react"

export const appContext = createContext<{ loaded: boolean }>({ loaded: false })

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialised = useRef(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true

      MDS.init((msg) => {
        console.log(msg)
        if (msg.event === MinimaEvents.INITED) {
          setLoaded(true)
        }
      })
    }
  }, [])

  const context = {
    loaded,
  }

  return <appContext.Provider value={context}>{children}</appContext.Provider>
}

export default AppProvider
