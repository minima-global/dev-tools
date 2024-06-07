/**
 * The MDS TS Library for building MiniDapps
 * by Minima Global
 */

import { MDSObj } from "./types"

export const MDS: MDSObj = {
  filehost: "",
  mainhost: "",
  minidappuid: "",
  logging: false,
  DEBUG_HOST: null,
  DEBUG_PORT: 0,
  DEBUG_MINIDAPPID: "",
  init: (callback) => {
    MDS.log("MDS Inited")

    if (MDS.form.getParams("MDS_LOGGING") !== null) {
      MDS.logging = true
    }

    var host = window.location.host
    var port = Number(window.location.port)

    MDS.minidappuid = MDS.form.getParams("uid")

    if (MDS.DEBUG_HOST != null) {
      MDS.log("DEBUG Settings Found..")

      host = MDS.DEBUG_HOST
      port = MDS.DEBUG_PORT
    }

    if (MDS.minidappuid == null) {
      MDS.minidappuid = MDS.DEBUG_MINIDAPPID
    }

    if (MDS.minidappuid == "0x00") {
      MDS.log("No MiniDAPP UID specified.. using test value")
    }

    MDS.filehost = "https://" + host + ":" + port + "/"
    MDS.mainhost = "https://" + host + ":" + port + "/mdscommand_/"
    MDS.log("MDS HOST  : " + MDS.filehost)

    // TODO: Add the MDS_MAIN_CALLBACK and assign to callback
    // TODO: Add the pollListener function
  },
  log: (data) => {
    console.log("Minima @ " + new Date().toLocaleString() + " : " + data)
  },

  form: {
    getParams: (parameterName) => {
      var result: string | null = null
      var tmp: string[] = []
      var items = window.location.search.slice(1).split("&")
      for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=")
        if (tmp[0] === parameterName) {
          result = decodeURIComponent(tmp[1])
        }
      }
      return result
    },
  },
}

//MDS.init(({ event }) => {})
