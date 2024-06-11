import { MDS } from "@/minima/mds"
import { useEffect, useState } from "react"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
  const [count, setCount] = useState(0)
  const address =
    "MxG084NB5YA1J7DRREWTNQZE2SDP20JWA1YDV9WMYC67HDNWY80ZS7424EH761A"

  useEffect(() => {
    MDS.init(({ event }) => {
      if (event === "inited") {
        MDS.cmd("balance", { address: address }, (data) => {
          data.response.map((res) => {
            MDS.log(res.total)
          })
        })
      }
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
