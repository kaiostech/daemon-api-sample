# TcpSocketManager service

## Instanciating the service

Load the following scripts:

```html
<script src="http://127.0.0.1/api/v1/shared/core.js"></script>
<script src="http://127.0.0.1/api/v1/shared/session.js"></script>
<script src="http://127.0.0.1/api/v1/apps/service.js"></script>
```

You can then get an instance of the service with code similar to:

```javascript
const session = new lib_session.Session();
const sessionstate = {};
let _tcpsocketManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`TcpSocketManager onsessionconnected`);
  lib_tcpsocket.TcpSocketManager.get(session).then((TcpSocketManagerService) => {
  console.log(`Got TcpSocketManager : #TcpSocketManagerService.service_id}`);
  _tcpsocketManager = TcpSocketManagerService;
}).catch((e) => {
  console.log(`Error calling TcpSocketManager service${JSON.stringify(e)}`);
  _tcpsocketManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`TcpSocketManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_tcpsocketManager** as TcpSocketManager service instance.

This service implements the [TcpSocketFactory](#interface_TcpSocketFactory) interface.

---

---


## SocketAddress dictionnary
```javascript
{
  host: string,
  port: integer
}
```

---




## TcpSocket Interface



### Methods
&nbsp;&nbsp;[close](#interface_TcpSocket_method_close)  [resume](#interface_TcpSocket_method_resume)  [send](#interface_TcpSocket_method_send)  [suspend](#interface_TcpSocket_method_suspend)  


  close()

  Resolves with void

  Rejects with void

---

  resume()

  Resolves with void

  Rejects with void

---

  send(/* , data */ arraybuffer)

  Resolves with boolean

  Rejects with void

---

  suspend()

  Resolves with void

  Rejects with void

---




### Events
&nbsp;&nbsp;[CLOSE](#interface_TcpSocket_event_CLOSE)  [DATA](#interface_TcpSocket_event_DATA)  [DRAIN](#interface_TcpSocket_event_DRAIN)  [ERROR](#interface_TcpSocket_event_ERROR)  


The CLOSE event emits a void

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_tcpsocketManager.addEventListener(_tcpsocketManager.CLOSE_EVENT, handleEvent);
_tcpsocketManager.removeEventListener(_tcpsocketManager.CLOSE_EVENT, handleEvent);
```
---

The DATA event emits a arraybuffer

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_tcpsocketManager.addEventListener(_tcpsocketManager.DATA_EVENT, handleEvent);
_tcpsocketManager.removeEventListener(_tcpsocketManager.DATA_EVENT, handleEvent);
```
---

The DRAIN event emits a boolean

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_tcpsocketManager.addEventListener(_tcpsocketManager.DRAIN_EVENT, handleEvent);
_tcpsocketManager.removeEventListener(_tcpsocketManager.DRAIN_EVENT, handleEvent);
```
---

The ERROR event emits a string

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_tcpsocketManager.addEventListener(_tcpsocketManager.ERROR_EVENT, handleEvent);
_tcpsocketManager.removeEventListener(_tcpsocketManager.ERROR_EVENT, handleEvent);
```
---
 


## TcpSocketFactory Interface



### Methods
&nbsp;&nbsp;[open](#interface_TcpSocketFactory_method_open)  


  open(/* , addr */ <a href="#dictionary_SocketAddress">SocketAddress</a>)

  Resolves with <a href="#interface_TcpSocket">TcpSocket</a>

  Rejects with void

---