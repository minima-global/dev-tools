import { MDS, MinimaEvents } from "@minima-global/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

function App() {
  const [balance, _] = useState("")

  async function getBalance() {
    const res = await MDS.cmd.balance({
      params: {
        tokendetails: "true",
      },
    })
    console.log(res)
  }

  useEffect(() => {
    MDS.init(async ({ event }) => {
      if (event === MinimaEvents.INITED) {
        getBalance()
      }
    })
  }, [])

  const send = async () => {
    const test = [
      "MxG084A4PMTFKVNER0W2965E06RN02C5YEFP8RE2N9TZBD6TB1YRMEZKCN6SMJW:500",
      "MxG086NDNE0Y6CGS2BSTT2ZZADTDZ45RYD3D7GN0ST79MM1ZMYD9ENWRMB80BJ8:1000",
    ]
    const data = await MDS.cmd.send({
      params: {
        split: "5",
        multi: test,
      },
    })
    console.log("DATA", data)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={minimalogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Minima + React</h1>
      <div className="card">
        <h2>Block Test</h2>
        {balance}

        <button onClick={send}>Send</button>
      </div>
    </>
  )
}

export default App
