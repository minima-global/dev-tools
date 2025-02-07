import { Block, MDS, MinimaEvents } from "@minima-global/mds"
import { createContext, useEffect, useRef, useState } from "react"

export const appContext = createContext<{
  loaded: boolean
  block: Block | null
}>({ loaded: false, block: null })

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialised = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [block, setBlock] = useState<Block | null>(null)

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true

      MDS.init(async ({ event }) => {
        if (event === MinimaEvents.INITED) {
          setLoaded(true)
          console.log("MDS initialised and ready! 🚀")
          const command = await MDS.cmd.block()
          setBlock(command.response)

          const coins = await MDS.cmd.coins()

          coins.response.forEach((coin) => {
            if (coin.state) {
              if (Array.isArray(coin.state)) {
                coin.state.forEach((state) => {
                  console.log(state.data)
                })
              } else {
                console.log(coin.state["0"])
              }
            }
          })
        }
      })
    }
  }, [])

  const context = {
    loaded,
    block,
  }

  return <appContext.Provider value={context}>{children}</appContext.Provider>
}

export default AppProvider
