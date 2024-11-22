import { MDS } from "@minima-global/mds"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

MDS.DEBUG_HOST = "127.0.0.1"
MDS.DEBUG_PORT = 12003
MDS.DEBUG_MINIDAPPID =
  "0x565DB2CF1B6DE227C0A6CB18053052DF1C265186ED86F3B9108385F7287859E79EC4EA3AFE0C1B2604C249E344CDF13139022E6B81F455B6F1447D28B925E16B897FEB23334984FDCDF5A998DE11C03AB6658771C0A6E525347947B235CA0C5A5B4321B459985F00EF68E207B52FBDCE053101B904D5E29B28CB18E631D648C6"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
