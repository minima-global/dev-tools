import { MDS } from "@minima-global/mds"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

MDS.DEBUG_HOST = "127.0.0.1"
MDS.DEBUG_PORT = 9003
MDS.DEBUG_MINIDAPPID =
  "0xE2CBAA130026011402C63BBA01BC3B906D28FBD5685CEE9FA31318B31700BFC2D1A23A86F348626CBBAA247B459BDAB84ACF67661685C46510D030CB3A9A22339BDAF3617FD324272EF1AC4EF4C92E55E49077DBE5239A6C911F75E12832B94E5060E01B85AFA7B670475EE20CA11C1612FDEB222C0442EABF070FF4B5B744B3"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
