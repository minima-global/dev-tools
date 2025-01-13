import { BalanceWithTokenDetails, MDS, MinimaEvents } from "@minima-global/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

function App() {
  const [balance, setBalance] = useState<BalanceWithTokenDetails[]>([])

  async function getBalance() {
    const res = await MDS.executeRaw("balance")
    console.log(res)
    setBalance(res.response)
  }

  useEffect(() => {
    MDS.init(async ({ event }) => {
      if (event === MinimaEvents.INITED) {
        getBalance()
      }
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://minima.global" target="_blank">
          <img src={minimalogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Minima + React</h1>
      <div className="card">
        <h2>Balance Test</h2>
        {balance.map((b) => (
          <div key={b.tokenid}>
            {typeof b.token === "string" ? b.token : b.token.name}: {b.total}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
