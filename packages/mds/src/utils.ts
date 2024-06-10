import { SharedState } from "./callback"
import { MDS } from "./mds"

var API_CALLS = SharedState.API_CALLS
var MDS_MAIN_CALLBACK = SharedState.MDS_MAIN_CALLBACK
var PollCounter = 0
var PollSeries = 0
type PostMdsFail<T, O, U> = {
  command: T
  params: O
  status: U
}

type HHTPPostAsync = <T, O, U>(
  theUrl: T,
  params: O,
  callback?: (msg: U) => void
) => void

type ErrorMsg<T, O, U> = {
  event: "MDSFAIL"
  data: PostMdsFail<T, O, U>
}

export function MDSPostMessage(json: any) {
  if (MDS_MAIN_CALLBACK) {
    //Is this an API response call..
    if (json.event == "MDSAPI") {
      //Check if it is a response..
      if (!json.data.request) {
        //Find the API CALL Object
        var found = ""
        var len = API_CALLS.length
        for (var i = 0; i < len; i++) {
          if (API_CALLS[i].id == json.data.id) {
            //found it..!
            found = json.data.id

            //Construct a reply..
            var reply: any = {}
            reply.status = json.data.status
            reply.data = json.data.message

            API_CALLS[i].callback(reply)
          }
        }

        //Remove it..
        if (found != "") {
          API_CALLS = API_CALLS.filter(function (apic: any) {
            return apic.id != found
          })
        } else {
          //MDS.log("API CALL NOT FOUND!"+JSON.stringify(json));
        }

        //Response messages not forwarded - only via API call
        return
      }
    }

    //Call the main function
    MDS_MAIN_CALLBACK(json)
  }
}

export function PollListener() {
  //The POLL host
  var pollhost = MDS.mainhost + "poll?" + "uid=" + MDS.minidappuid
  var polldata = "series=" + PollSeries + "&counter=" + PollCounter

  httpPostAsyncPoll(pollhost, polldata, function (msg: any) {
    //Are we on the right Series..
    if (PollSeries != msg.series) {
      //Reset to the right series..
      PollSeries = msg.series
      PollCounter = msg.counter
    } else {
      //Is there a message ?
      if (msg.status == true) {
        //Get the current counter..
        PollCounter = msg.response.counter + 1

        //And Post the message..
        MDSPostMessage(msg.response.message)
      }
    }

    //And around we go again..
    PollListener()
  })
}

export function postMDSFail<T, O, U>(command: T, params: O, status: U) {
  //Some error..
  if (MDS.logging) {
    MDS.log("** An error occurred during an MDS command!")
  }

  //Create the message
  var errormsg: ErrorMsg<T, O, U> = {
    event: "MDSFAIL",
    data: {
      command: command,
      params: params,
      status: status,
    },
  }

  //Post it to the stack
  MDSPostMessage(errormsg)
}

export const httpPostAsync: HHTPPostAsync = (theUrl, params, callback) => {
  var finalurl = MDS.mainhost + theUrl + "?uid=" + MDS.minidappuid

  //Do we log it..
  if (MDS.logging) {
    MDS.log("POST_RPC:" + finalurl + " PARAMS:" + params)
  }

  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    var status = xmlHttp.status
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Do we log it..
        if (MDS.logging) {
          MDS.log("RESPONSE:" + xmlHttp.responseText)
        }

        //Send it to the callback function..
        if (callback) {
          callback(JSON.parse(xmlHttp.responseText))
        }
      } else {
        //Some error..
        postMDSFail(finalurl, params, xmlHttp.status)
      }
    }
  }
  xmlHttp.open("POST", finalurl, true) // true for asynchronous
  xmlHttp.overrideMimeType("text/plain; charset=UTF-8")
  xmlHttp.send(encodeURIComponent(params as string))
  //xmlHttp.onerror = function () {
  //  console.log("** An error occurred during the transaction");
  //};
}

export function httpPostAsyncPoll(
  theUrl: string,
  params: string,
  callback: (msg: any) => void
) {
  //Do we log it..
  if (MDS.logging) {
    MDS.log("POST_POLL_RPC:" + theUrl + " PARAMS:" + params)
  }

  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    var status = xmlHttp.status
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Do we log it..
        if (MDS.logging) {
          MDS.log("RESPONSE:" + xmlHttp.responseText)
        }

        //Send it to the callback function..
        if (callback) {
          callback(JSON.parse(xmlHttp.responseText))
        }
      } else {
        //Some error..
        postMDSFail(theUrl, params, xmlHttp.status)
      }
    }
  }
  xmlHttp.addEventListener("error", function () {
    MDS.log("Error Polling - reconnect in 10s")
    setTimeout(function () {
      PollListener()
    }, 10000)
  })
  xmlHttp.open("POST", theUrl, true) // true for asynchronous
  xmlHttp.overrideMimeType("text/plain; charset=UTF-8")
  xmlHttp.send(encodeURIComponent(params))
}

export function _recurseUploadMDS(
  thefullfile: any,
  chunk: any,
  callback?: any
) {
  //Get some details
  var filename = thefullfile.name
  var filesize = thefullfile.size

  //1MB MAX Chunk size..
  var chunk_size = 1024 * 1024
  var allchunks = Math.ceil(filesize / chunk_size)

  //Have we finished..
  if (chunk > allchunks - 1) {
    return
  }

  var startbyte = chunk_size * chunk
  var endbyte = startbyte + chunk_size
  if (endbyte > filesize) {
    endbyte = filesize
  }

  //Get a piece of the file
  var filepiece = thefullfile.slice(startbyte, endbyte)

  //Create a form..
  var formdata = new FormData()
  formdata.append("uid", MDS.minidappuid as string)

  //Filedata handled a little differently
  formdata.append("filename", filename)
  formdata.append("filesize", filesize)
  formdata.append("allchunks", allchunks as any)
  formdata.append("chunknum", chunk)
  formdata.append("fileupload", filepiece)

  var request = new XMLHttpRequest()
  request.open("POST", "/fileuploadchunk.html")
  request.onreadystatechange = function () {
    var status = request.status
    if (request.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Send it to the callback function..
        if (callback) {
          var resp: any = {}
          resp.status = true
          resp.filename = filename
          resp.size = filesize
          resp.allchunks = allchunks
          resp.chunk = chunk + 1
          resp.start = startbyte
          resp.end = endbyte

          callback(resp)
        }

        //And now continue uploading..
        if (callback) {
          _recurseUploadMDS(thefullfile, chunk + 1, callback)
        } else {
          _recurseUploadMDS(thefullfile, chunk + 1)
        }
      } else {
        if (callback) {
          var resp: any = {}
          resp.status = false
          resp.error = request.responseText
          resp.filename = filename
          resp.size = filesize
          resp.allchunks = allchunks
          resp.chunk = chunk
          resp.start = startbyte
          resp.end = endbyte

          callback(resp)
        }

        //Some error..
        MDS.log("MDS FILEUPLOAD CHUNK ERROR: " + request.responseText)
      }
    }
  }

  //And finally send the POST request
  request.send(formdata)
}
