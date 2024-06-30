import { Keys, MDS } from "@/minima/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

//const address =
//"MxG087EBE3Y7TATY0GTNB2AFZCNA4777V954FNPJJ9BMHJHAC8ARCQ0EP21FUAW"

function App() {
  const [response, setResponse] = useState<Keys>()

  useEffect(() => {
    MDS.init(({ event }) => {
      if (event === "inited") {
        console.log("MDS inited")
      }
    })
  }, [])

  function createToken() {
    MDS.cmd("keys", { action: "list" }, (data) => {
      setResponse(data)
      console.log(data)
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={minimalogo} className="logo" alt="Vite logo" />
        </a>
        <span> X </span>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Minima + React</h1>
      <div className="card">
        <h2>Block</h2>
        <>
          <button onClick={createToken}>Create Token</button>
          <h3>Response</h3>
          {response && !response.error ? (
            <div>
              <>
                {response.response.keys.map((k) => (
                  <p>{k.maxuses}</p>
                ))}
              </>
            </div>
          ) : (
            <div>
              {response && response.error ? (
                <p>{response.error}</p>
              ) : (
                <p>Waiting for response...</p>
              )}
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default App
