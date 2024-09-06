import { MDS } from "@/minima/mds"
import { useEffect, useState } from "react"
import "./App.css"
import minimalogo from "./assets/minima_logo.png"
import reactLogo from "./assets/react.svg"

function App() {
  const [balance, setBalance] = useState("")

  useEffect(() => {
    MDS.init(({ event }) => {
      if (event === "inited") {
        console.log("INITED!!!")
        const test = async () => {
          const data = await MDS.cmd.balance(
            {
              params: {
                address:
                  "MxG0808A0Y4UZDPCGYHQMA82W81PC12B6QY2FZC003RNJEBCDNSRN7DKQ45B66Z",
              },
            },
            (data) => {
              console.log("data from callback")
              console.log(data)
            }
          )
          console.log("data from promise")
          console.log(data)
        }
        test()
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
