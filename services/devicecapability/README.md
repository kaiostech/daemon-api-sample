# DeviceCapabilityManager service

## Instanciating the service

### Request related permission in APP's manifest file and import needed daemon files

```javascript
"feature-detection": {}
``` 

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
let _devicecapabilityManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`DeviceCapabilityManager onsessionconnected`);
  lib_devicecapability.DeviceCapabilityManager.get(session).then((DeviceCapabilityManagerService) => {
  console.log(`Got DeviceCapabilityManager : #DeviceCapabilityManagerService.service_id}`);
  _devicecapabilityManager = DeviceCapabilityManagerService;
}).catch((e) => {
  console.log(`Error calling DeviceCapabilityManager service${JSON.stringify(e)}`);
  _devicecapabilityManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`DeviceCapabilityManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_devicecapabilityManager** as DeviceCapabilityManager service instance.

This service implements the [DeviceCapabilityFactory](#interface_DeviceCapabilityFactory) interface.

---

---


---




## DeviceCapabilityFactory Interface



### Methods
&nbsp;&nbsp;[get](#interface_DeviceCapabilityFactory_method_get)  


  get(/* , feature */ string)

  Resolves with json

  Rejects with void

---