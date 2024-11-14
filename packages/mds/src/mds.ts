/**
 * The MDS TS Library for building MiniDapps
 * by Minima Global
 */

import { commandHandler } from './helpers.js';
import type { MDSObj } from './index.js';

var MDS_MAIN_CALLBACK: any;
var API_CALLS: any[] = [];

export const MDS: MDSObj = {
  filehost: '',
  mainhost: '',
  minidappuid: '',
  logging: false,
  DEBUG_HOST: null,
  DEBUG_PORT: 0,
  DEBUG_MINIDAPPID: '',
  init: (callback) => {
    MDS.log('MDS Inited');

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
  cmd: {
    balance: (...args) => {
      const { commandString, callback } = commandHandler('balance', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback && typeof callback === 'function') {
            callback(data);
          }
        });
      });
    },

    block: (callback) => {
      return new Promise((resolve) => {
        httpPostAsync('cmd', 'block', (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    getaddress: (callback) => {
      return new Promise((resolve) => {
        httpPostAsync('cmd', 'getaddress', (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    keys: (...args) => {
      const { commandString, callback } = commandHandler('keys', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    checkaddress: (...args) => {
      const { commandString, callback } = commandHandler('checkaddress', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txpow: (...args) => {
      const { commandString, callback } = commandHandler('txpow', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    newaddress: (...args) => {
      const { commandString, callback } = commandHandler('newaddress', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    coins: (...args) => {
      const { commandString, callback } = commandHandler('coins', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    tokens: (...args) => {
      const { commandString, callback } = commandHandler('tokens', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    consolidate: (...args) => {
      const { commandString, callback } = commandHandler('consolidate', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    coincheck: (...args) => {
      const { commandString, callback } = commandHandler('coincheck', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    cointrack: (...args) => {
      const { commandString, callback } = commandHandler('cointrack', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    hashtest: (...args) => {
      const { commandString, callback } = commandHandler('hashtest', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    send: (...args) => {
      const { commandString, callback } = commandHandler('send', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    checkmode: (...args) => {
      const { commandString, callback } = commandHandler('checkmode', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    checkpending: (...args) => {
      const { commandString, callback } = commandHandler('checkpending', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    checkrestore: (...args) => {
      const { commandString, callback } = commandHandler('checkrestore', args);

      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    mds: (...args) => {
      const { commandString, callback } = commandHandler('mds', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    burn: (...args) => {
      const { commandString, callback } = commandHandler('burn', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    sendpoll: (...args) => {
      const { commandString, callback } = commandHandler('sendpoll', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    sendnosign: (...args) => {
      const { commandString, callback } = commandHandler('sendnosign', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    log: (...args) => {
      const { commandString, callback } = commandHandler('log', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnbasics: (...args) => {
      const { commandString, callback } = commandHandler('txnbasics', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txncheck: (...args) => {
      const { commandString, callback } = commandHandler('txncheck', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnclear: (...args) => {
      const { commandString, callback } = commandHandler('txnclear', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnexport: (...args) => {
      const { commandString, callback } = commandHandler('txnexport', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txndelete: (...args) => {
      const { commandString, callback } = commandHandler('txndelete', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txncreate: (...args) => {
      const { commandString, callback } = commandHandler('txncreate', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    txninput: (...args) => {
      const { commandString, callback } = commandHandler('txninput', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnimport: (...args) => {
      const { commandString, callback } = commandHandler('txnimport', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    txnlist: (...args) => {
      const { commandString, callback } = commandHandler('txnlist', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnpost: (...args) => {
      const { commandString, callback } = commandHandler('txnpost', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnsign: (...args) => {
      const { commandString, callback } = commandHandler('txnsign', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    txnoutput: (...args) => {
      const { commandString, callback } = commandHandler('txnoutput', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    scripts: (...args) => {
      const { commandString, callback } = commandHandler('scripts', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    sendpost: (...args) => {
      const { commandString, callback } = commandHandler('sendpost', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    sendsign: (...args) => {
      const { commandString, callback } = commandHandler('sendsign', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },

    sendview: (...args) => {
      const { commandString, callback } = commandHandler('sendview', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    multisig: (...args) => {
      const { commandString, callback } = commandHandler('multisig', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    connect: (...args) => {
      const { commandString, callback } = commandHandler('connect', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    disconnect: (...args) => {
      const { commandString, callback } = commandHandler('disconnect', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    network: (...args) => {
      const { commandString, callback } = commandHandler('network', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    peers: (...args) => {
      const { commandString, callback } = commandHandler('peers', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    ping: (...args) => {
      const { commandString, callback } = commandHandler('ping', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    rpc: (...args) => {
      const { commandString, callback } = commandHandler('rpc', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    tutorial: (...args) => {
      const { commandString, callback } = commandHandler('tutorial', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxima: (...args) => {
      const { commandString, callback } = commandHandler('maxima', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxcontacts: (...args) => {
      const { commandString, callback } = commandHandler('maxcontacts', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxcreate: (...args) => {
      const { commandString, callback } = commandHandler('maxcreate', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxsign: (...args) => {
      const { commandString, callback } = commandHandler('maxsign', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxextra: (...args) => {
      const { commandString, callback } = commandHandler('maxextra', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    maxverify: (...args) => {
      const { commandString, callback } = commandHandler('maxverify', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    newscript: (...args) => {
      const { commandString, callback } = commandHandler('newscript', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    runscript: (...args) => {
      const { commandString, callback } = commandHandler('runscript', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
    removescript: (...args) => {
      const { commandString, callback } = commandHandler('removescript', args);
      return new Promise((resolve) => {
        httpPostAsync('cmd', commandString, (data: any) => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        });
      });
    },
  },

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
    httpPostAsync('dapplink', dappname, function (result: any) {
      var linkdata: any = {};
      linkdata.status = result.status;

      //Create the link..
      if (result.status) {
        linkdata.uid = result.response.uid;
        linkdata.sessionid = result.response.sessionid;
        linkdata.base =
          MDS.filehost +
          linkdata.uid +
          '/index.html?uid=' +
          result.response.sessionid;
      } else {
        //Not found..
        linkdata.error = result.error;
      }

      callback(linkdata);
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

  form: {
    getParams: (parameterName) => {
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
  var finalurl = MDS.mainhost + theUrl + '?uid=' + MDS.minidappuid;

  //Do we log it..
  if (MDS.logging) {
    MDS.log('POST_RPC:' + finalurl + ' PARAMS:' + params);
  }

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
