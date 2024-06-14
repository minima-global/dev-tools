import { MDS } from "@/minima/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

type Block = {
  block: string
  date: string
  hash: string
  timemilli: string
}
//const address =
//"MxG087EBE3Y7TATY0GTNB2AFZCNA4777V954FNPJJ9BMHJHAC8ARCQ0EP21FUAW"

function App() {
  const [block, setBlock] = useState<Block>()

  useEffect(() => {
    MDS.init(({ event }) => {
      if (event === "inited") {
        MDS.cmd("block", (data) => {
          setBlock(data.response)
        })
      }
    })
  }, [])

  if (block)
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
          <h2>Block</h2>
          <p>Block: {block.block}</p>
          <p>Date: {block.date}</p>
          <p>Hash: {block.hash}</p>
          <p>Time: {block.timemilli}</p>
        </div>
      </>
    )
}

export default App
