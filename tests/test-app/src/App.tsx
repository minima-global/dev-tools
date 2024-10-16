import { MDS } from "@minima-global/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

function App() {
  const [balance, _] = useState("")

  const Node2Address =
    "MxG082YK24JSUNDU6MJKSZCYAZU90R3E5CS2A8691WCGSBYBHEGKSE3NC781B8N"

  useEffect(() => {
    MDS.init(async ({ event }) => {
      if (event === "inited") {
        MDS.cmd.balance((data) => {
          console.log("DATA", data)
        })
      }
    })
  }, [])

  const send = async () => {
    const data = await MDS.cmd.send({
      params: {
        address: Node2Address,
        amount: "100",
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
