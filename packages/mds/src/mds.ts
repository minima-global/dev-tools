/**
 * The MDS TS Library for building MiniDapps
 * by Minima Global
 */

import { createCommandFunction } from './helpers.js';
import type { MDSObj } from './index.js';

var MDS_MAIN_CALLBACK: any;
var API_CALLS: any[] = [];

export const MDS: MDSObj = {
  filehost: '',
  mainhost: '',
  minidappuid: '',
  testhost: '',
  TEST_MODE: false,
  logging: false,
  DEBUG_HOST: null,
  DEBUG_PORT: 0,
  DEBUG_MINIDAPPID: '',
  init: (callback) => {
    MDS.log('MDS Inited');

    if (isTestEnvironment()) {
      MDS.TEST_MODE = true;
      MDS.minidappuid = MDS.DEBUG_MINIDAPPID || '0x00';
      MDS.filehost = `https://${MDS.DEBUG_HOST}:${MDS.DEBUG_PORT}/`;
      MDS.mainhost = `http://${MDS.DEBUG_HOST}:${MDS.DEBUG_PORT}/`;
      MDS.testhost = `http://${MDS.DEBUG_HOST}:${MDS.DEBUG_PORT}/`;

      MDS_MAIN_CALLBACK = callback;

      if (callback) {
        callback({ event: 'inited', data: null });
      }
      return;
    }

    if (MDS.form.getParams('MDS_LOGGING') != null) {
      MDS.logging = true;
    }

    var host = window.location.hostname;
    var port = Number(window.location.port);

    MDS.minidappuid = MDS.form.getParams('uid');

    if (MDS.DEBUG_HOST != null) {
      MDS.log('DEBUG Settings Found..');

      host = MDS.DEBUG_HOST;
      port = MDS.DEBUG_PORT;
    }

    if (MDS.minidappuid == null) {
      MDS.minidappuid = MDS.DEBUG_MINIDAPPID;
    }

    if (MDS.minidappuid == '0x00') {
      MDS.log('No MiniDAPP UID specified.. using test value');
    }

    MDS.filehost = 'https://' + host + ':' + port + '/';
    MDS.mainhost = 'https://' + host + ':' + port + '/mdscommand_/';
    MDS.testhost = 'https://' + host + ':' + port + '/';
    MDS.log('MDS HOST  : ' + MDS.filehost);

    MDS_MAIN_CALLBACK = callback;

    PollListener();

    //And Post a message

    MDSPostMessage({ event: 'inited' });
  },
  log: (data) => {
    console.log('Minima @ ' + new Date().toLocaleString() + ' : ' + data);
  },
  notify: (output) => {
    httpPostAsync(MDS.mainhost + 'notify?' + 'uid=' + MDS.minidappuid, output);
  },
  notifycancel: () => {
    httpPostAsync('notifycancel', '*');
  },
  cmd: new Proxy({} as any, {
    get: (target, prop: string) => {
      // If the command is already defined, return it
      if (prop in target) {
        return target[prop];
      }
      // Otherwise create a new command function
      const commandFunction = createCommandFunction(prop);

      // Add the command function to the target object
      target[prop] = commandFunction;

      // Return the command function
      return commandFunction;
    },
  }),

  sql: (command, callback) => {
    return new Promise((resolve) => {
      httpPostAsync('sql', command, (data: any) => {
        resolve(data);
        if (callback) {
          callback(data);
        }
      });
    });
  },

  dapplink: (dappname, callback) => {
    return new Promise((resolve) => {
      httpPostAsync('dapplink', dappname, (result: any) => {
        resolve(result);
        if (callback) {
          callback(result);
        }
      });
    });
  },

  api: {
    call: (dappname, data, callback) => {
      var rand = '' + Math.random() * 1000000000;

      //Construct a callback list object
      var callitem: any = {};
      callitem.id = rand;
      callitem.callback = callback;

      //Add to the api calls..
      API_CALLS.push(callitem);

      //Create the single line
      var commsline = dappname + '&request&' + rand + '&' + data;

      //Send via POST
      httpPostAsync('api', commsline);
    },
    reply: (dappname, id, data, callback) => {
      var commsline = dappname + '&response&' + id + '&' + data;
      httpPostAsync('api', commsline, callback);
    },
  },

  net: {
    GET: (url, callback) => {
      httpPostAsync('net', url, callback);
    },
    POST: (url, data, callback) => {
      var postline = url + '&' + data;
      httpPostAsync('netpost', postline, callback);
    },
  },
  keypair: {
    get: (key, callback) => {
      var commsline = 'get&' + key;
      httpPostAsync('keypair', commsline, callback);
    },
    set: (key, value, callback) => {
      var commsline = 'set&' + key + '&' + value;
      httpPostAsync('keypair', commsline, callback);
    },
  },
  comms: {
    broadcast: (message, callback) => {
      var commsline = 'public&' + message;

      httpPostAsync('comms', commsline, callback);
    },
    solo: (message, callback) => {
      var commsline = 'private&' + message;

      httpPostAsync('comms', commsline, callback);
    },
  },

  file: {
    list: (folder, _, callback) => {
      var commsline = 'list&' + folder;
      httpPostAsync('file', commsline, callback);
    },
    save: (filename, text, callback) => {
      var commsline = 'save&' + filename + '&' + text;
      httpPostAsync('file', commsline, callback);
    },
    savebinary: function (filename, hexdata, callback) {
      var commsline = 'savebinary&' + filename + '&' + hexdata;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },

    load: (filename, _, callback) => {
      var commsline = 'load&' + filename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },

    loadbinary(filename, _, callback) {
      var commsline = 'loadbinary&' + filename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    delete: (filename, _, callback) => {
      var commsline = 'delete&' + filename;
      httpPostAsync('file', commsline, callback);
    },

    getpath: (filename, _, callback) => {
      var commsline = 'getpath&' + filename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },

    makedir: (filename, _, callback) => {
      var commsline = 'makedir&' + filename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    copy: (filename, newfilename, callback) => {
      var commsline = 'copy&' + filename + '&' + newfilename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    move: (filename, newfilename, callback) => {
      var commsline = 'move&' + filename + '&' + newfilename;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    download: (url, _, callback) => {
      var commsline = 'download&' + url;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    upload: (file, _, callback) => {
      _recurseUploadMDS(file, 0, callback);
    },
    listweb: (folder, _, callback) => {
      var commsline = 'listweb&' + folder;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    copytoweb: (file, webfile, callback) => {
      var commsline = 'copytoweb&' + file + '&' + webfile;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
    deletefromweb: (file, _, callback) => {
      var commsline = 'deletefromweb&' + file;

      //Send via POST
      httpPostAsync('file', commsline, callback);
    },
  },

  executeRaw: (command: string, callback?: (data: any) => any) => {
    return new Promise((resolve) => {
      httpPostAsync('cmd', command, (data: any) => {
        resolve(data);
        if (callback) {
          callback(data);
        }
      });
    });
  },

  form: {
    getParams: (parameterName) => {
      if (isTestEnvironment()) {
        return null;
      }
      var result: string | null = null;
      var tmp: string[] = [];
      var items = window.location.search.substr(1).split('&');
      for (var index = 0; index < items.length; index++) {
        tmp = items[index]?.split('=') ?? [];
        if (tmp[0] === parameterName) {
          result = decodeURIComponent(tmp[1] ?? '');
        }
      }
      return result;
    },
  },
  util: {
    hexToBase64: (hexstring) => {
      var thex = hexstring;
      if (hexstring.startsWith('0x')) {
        thex = hexstring.substring(2);
      }

      return btoa(
        (thex.match(/\w{2}/g) || [])
          .map(function (a) {
            return String.fromCharCode(parseInt(a, 16));
          })
          .join(''),
      );
    },
    base64ToHex: (base64) => {
      const raw = atob(base64);
      let result = '';
      for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += hex.length === 2 ? hex : '0' + hex;
      }
      return result.toUpperCase();
    },
    base64ToArrayBuffer: (base64) => {
      const binary_string = window.atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },
  },
};

function MDSPostMessage(json: any) {
  if (MDS_MAIN_CALLBACK) {
    //Is this an API response call..
    if (json.event == 'MDSAPI') {
      //Check if it is a response..
      if (!json.data.request) {
        //Find the API CALL Object
        var found = '';
        var len = API_CALLS.length;
        for (var i = 0; i < len; i++) {
          if (API_CALLS[i].id == json.data.id) {
            //found it..!
            found = json.data.id;

            //Construct a reply..
            var reply: any = {};
            reply.status = json.data.status;
            reply.data = json.data.message;

            API_CALLS[i].callback(reply);
          }
        }

        //Remove it..
        if (found != '') {
          API_CALLS = API_CALLS.filter(function (apic: any) {
            return apic.id != found;
          });
        } else {
          //MDS.log("API CALL NOT FOUND!"+JSON.stringify(json));
        }

        //Response messages not forwarded - only via API call
        return;
      }
    }

    //Call the main function
    MDS_MAIN_CALLBACK(json);
  }
}

var PollCounter = 0;
var PollSeries = 0;
function PollListener() {
  //The POLL host
  var pollhost = MDS.mainhost + 'poll?' + 'uid=' + MDS.minidappuid;
  var polldata = 'series=' + PollSeries + '&counter=' + PollCounter;

  httpPostAsyncPoll(pollhost, polldata, function (msg: any) {
    //Are we on the right Series..
    if (PollSeries != msg.series) {
      //Reset to the right series..
      PollSeries = msg.series;
      PollCounter = msg.counter;
    } else {
      //Is there a message ?
      if (msg.status == true) {
        //Get the current counter..
        PollCounter = msg.response.counter + 1;

        //And Post the message..
        MDSPostMessage(msg.response.message);
      }
    }

    //And around we go again..
    PollListener();
  });
}

function postMDSFail<T, O, U>(command: T, params: O, status: U) {
  //Some error..
  if (MDS.logging) {
    MDS.log('** An error occurred during an MDS command!');
  }

  //Create the message
  var errormsg = {
    event: 'MDSFAIL',
    data: {
      command: command,
      params: params,
      status: status,
    },
  };

  //Post it to the stack
  MDSPostMessage(errormsg);
}

export function httpPostAsync<T, O, U>(
  theUrl: T,
  params: O,
  callback?: (msg: U) => void,
) {
  //Add the MiniDAPP UID..
  var finalurl = MDS.TEST_MODE ? MDS.testhost : MDS.mainhost;
  finalurl += theUrl + '?uid=' + MDS.minidappuid;

  var testUrl =
    'http://' + MDS.DEBUG_HOST + ':' + MDS.DEBUG_PORT + '/' + params;

  //Do we log it..
  if (MDS.logging) {
    MDS.log('POST_RPC:' + finalurl + ' PARAMS:' + params);
  }

  // Use fetch in test mode
  if (MDS.TEST_MODE) {
    fetch(testUrl)
      .then((response) => response.json())
      .then((data) => {
        if (MDS.logging) {
          MDS.log('RESPONSE:' + JSON.stringify(data));
        }
        if (callback) {
          callback(data);
        }
      })
      .catch((error) => {
        postMDSFail(finalurl, params, error);
      });
    return;
  }

  // Original XMLHttpRequest code for non-test mode
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    var status = xmlHttp.status;
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Do we log it..
        if (MDS.logging) {
          MDS.log('RESPONSE:' + xmlHttp.responseText);
        }

        //Send it to the callback function..
        if (callback) {
          try {
            const responseJson = JSON.parse(xmlHttp.responseText);
            callback(responseJson);
          } catch (error) {
            console.error('Failed to parse response as JSON', error);
          }
        }
      } else {
        //Some error..
        postMDSFail(finalurl, params, xmlHttp.status);
      }
    }
  };
  xmlHttp.open('POST', finalurl, true); // true for asynchronous
  if (xmlHttp.overrideMimeType) {
    xmlHttp.overrideMimeType('text/plain; charset=UTF-8');
  }
  xmlHttp.send(encodeURIComponent(params as string));
  //xmlHttp.onerror = function () {
  //  console.log("** An error occurred during the transaction");
  //};
}

function httpPostAsyncPoll(theUrl: string, params: string, callback: any) {
  //Do we log it..
  if (MDS.logging) {
    MDS.log('POST_POLL_RPC:' + theUrl + ' PARAMS:' + params);
  }

  // Use fetch in test mode
  if (MDS.TEST_MODE) {
    fetch(theUrl)
      .then((response) => response.json())
      .then((data) => {
        if (MDS.logging) {
          MDS.log('RESPONSE:' + JSON.stringify(data));
        }
        if (callback) {
          callback(data);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          PollListener();
        }, 10000);
      });
    return;
  }

  // Original XMLHttpRequest code for non-test mode
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    var status = xmlHttp.status;
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Do we log it..
        if (MDS.logging) {
          MDS.log('RESPONSE:' + xmlHttp.responseText);
        }

        //Send it to the callback function..
        if (callback) {
          try {
            const responseJson = JSON.parse(xmlHttp.responseText);
            callback(responseJson);
          } catch (error) {
            console.error('Failed to parse response as JSON', error);
          }
        }
      } else {
        //Some error..
        postMDSFail(theUrl, params, xmlHttp.status);
      }
    }
  };
  xmlHttp.addEventListener('error', function () {
    MDS.log('Error Polling - reconnect in 10s');
    setTimeout(function () {
      PollListener();
    }, 10000);
  });
  xmlHttp.open('POST', theUrl, true); // true for asynchronous
  if (xmlHttp.overrideMimeType) {
    xmlHttp.overrideMimeType('text/plain; charset=UTF-8');
  }
  xmlHttp.send(encodeURIComponent(params));
}

function _recurseUploadMDS(thefullfile: any, chunk: any, callback?: any) {
  //Get some details
  var filename = thefullfile.name;
  var filesize = thefullfile.size;

  //1MB MAX Chunk size..
  var chunk_size = 1024 * 1024;
  var allchunks = Math.ceil(filesize / chunk_size);

  //Have we finished..
  if (chunk > allchunks - 1) {
    return;
  }

  var startbyte = chunk_size * chunk;
  var endbyte = startbyte + chunk_size;
  if (endbyte > filesize) {
    endbyte = filesize;
  }

  //Get a piece of the file
  var filepiece = thefullfile.slice(startbyte, endbyte);

  //Create a form..
  var formdata = new FormData();
  formdata.append('uid', MDS.minidappuid as string);

  //Filedata handled a little differently
  formdata.append('filename', filename);
  formdata.append('filesize', filesize);
  formdata.append('allchunks', allchunks as any);
  formdata.append('chunknum', chunk);
  formdata.append('fileupload', filepiece);

  var request = new XMLHttpRequest();
  request.open('POST', '/fileuploadchunk.html');
  request.onreadystatechange = function () {
    var status = request.status;
    if (request.readyState == XMLHttpRequest.DONE) {
      if (status === 0 || (status >= 200 && status < 400)) {
        //Send it to the callback function..
        if (callback) {
          var resp: any = {};
          resp.status = true;
          resp.filename = filename;
          resp.size = filesize;
          resp.allchunks = allchunks;
          resp.chunk = chunk + 1;
          resp.start = startbyte;
          resp.end = endbyte;

          callback(resp);
        }

        //And now continue uploading..
        if (callback) {
          _recurseUploadMDS(thefullfile, chunk + 1, callback);
        } else {
          _recurseUploadMDS(thefullfile, chunk + 1);
        }
      } else {
        if (callback) {
          var resp: any = {};
          resp.status = false;
          resp.error = request.responseText;
          resp.filename = filename;
          resp.size = filesize;
          resp.allchunks = allchunks;
          resp.chunk = chunk;
          resp.start = startbyte;
          resp.end = endbyte;

          callback(resp);
        }

        //Some error..
        MDS.log('MDS FILEUPLOAD CHUNK ERROR: ' + request.responseText);
      }
    }
  };

  //And finally send the POST request
  request.send(formdata);
}

function isTestEnvironment() {
  return typeof window === 'undefined' || MDS.TEST_MODE;
}
