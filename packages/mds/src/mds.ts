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
  CMD(...args) {
    const [command, payload, callback] = args
  },
  notify: (output) => {
    //httpPostAsync(MDS.mainhost+"notify?"+"uid="+MDS.minidappuid, output);
  },
  notifycancel: () => {
    //httpPostAsync(MDS.mainhost+"notifycancel?"+"uid="+MDS.minidappuid, "*");
  },

  file: {
    list: (folder, _, callback) => {
      var commsline = "list&" + folder
      /*httpPostAsync(
        MDS.mainhost + "file?" + "uid=" + MDS.minidappuid,
        commsline,
        callback, 
      );*/
    },
    save: (filename, text, callback) => {
      var commsline = "save&" + filename + "&" + text
    },
    savebinary: function (filename, hexdata, callback) {
      var commsline = "savebinary&" + filename + "&" + hexdata

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },

    load: (filename, _, callback) => {
      var commsline = "load&" + filename

      //Send via POST
      //  httpPostAsync("file", commsline, callback)
    },

    loadbinary(filename, _, callback) {
      var commsline = "loadbinary&" + filename

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    delete: (filename, callback) => {
      var commsline = "delete&" + filename
      //httpPostAsync("file", commsline, callback);
    },

    getpath: (filename, _, callback) => {
      var commsline = "getpath"

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },

    makedir: (filename, _, callback) => {
      var commsline = "makedir&" + filename

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    copy: (filename, newfilename, callback) => {
      var commsline = "copy&" + filename + "&" + newfilename

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    move: (filename, newfilename, callback) => {
      var commsline = "move&" + filename + "&" + newfilename

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    download: (url, _, callback) => {
      var commsline = "download&" + url

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    upload: (file, _, callback) => {
      //_recurseUploadMDS(file, 0, callback)
    },
    listweb: (folder, _, callback) => {
      var commsline = "listweb&" + folder

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    copytoweb: (file, webfile, callback) => {
      var commsline = "copytoweb&" + file + "&" + webfile

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
    deletefromweb: (file, _, callback) => {
      var commsline = "deletefromweb&" + file

      //Send via POST
      //httpPostAsync("file", commsline, callback);
    },
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
