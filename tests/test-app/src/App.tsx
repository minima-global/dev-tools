import { MDS } from "minima-mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

function App() {
  const [balance, _] = useState("")

  useEffect(() => {
    MDS.init(({ event }) => {
      if (event === "inited") {
        console.log("INITED!!!")
        MDS.cmd.checkaddress(
          {
            params: {
              address:
                "MxG0830GK0H88GUBQJQAR3UMHNS2SDFMZK6559Y6F6SN3UANHABMD67N3J86U48",
            },
          },
          (data) => {
            console.log(data)
          }
        )
      }
    })
  }, [])

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
      </div>
    </>
  )
}

export default App
