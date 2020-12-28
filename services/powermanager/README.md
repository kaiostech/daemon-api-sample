# PowermanagerService service

## Instanciating the service

### Request related permission in APP's manifest file and import needed daemon files

```javascript
"power": { }
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
let _powermanagerManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`PowermanagerService onsessionconnected`);
  lib_powermanager.PowermanagerService.get(session).then((PowermanagerServiceService) => {
  console.log(`Got PowermanagerService : #PowermanagerServiceService.service_id}`);
  _powermanagerManager = PowermanagerServiceService;
}).catch((e) => {
  console.log(`Error calling PowermanagerService service${JSON.stringify(e)}`);
  _powermanagerManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`PowermanagerService onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_powermanagerManager** as PowermanagerService service instance.

This service implements the [Powermanager](#interface_Powermanager) interface.

---

## FactoryResetReason enumeration
```javascript
{
  NORMAL,
  WIPE,
  ROOT
}
```

---


---




## Powermanager Interface

### Members

[cpuSleepAllowed](#interface_Powermanager_member_cpuSleepAllowed)

[extScreenBrightness](#interface_Powermanager_member_extScreenBrightness)

[extScreenEnabled](#interface_Powermanager_member_extScreenEnabled)

[factoryReset](#interface_Powermanager_member_factoryReset)

[keyLightBrightness](#interface_Powermanager_member_keyLightBrightness)

[keyLightEnabled](#interface_Powermanager_member_keyLightEnabled)

[screenBrightness](#interface_Powermanager_member_screenBrightness)

[screenEnabled](#interface_Powermanager_member_screenEnabled)


cpuSleepAllowed is of type boolean

To get  value, use code similar to:
```javascript
_powermanagerManager.cpuSleepAllowed().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.cpuSleepAllowed = value;
```

extScreenBrightness is of type integer

To get  value, use code similar to:
```javascript
_powermanagerManager.extScreenBrightness().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.extScreenBrightness = value;
```

extScreenEnabled is of type boolean

To get  value, use code similar to:
```javascript
_powermanagerManager.extScreenEnabled().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.extScreenEnabled = value;
```

factoryReset is of type <a href="#enumeration_FactoryResetReason">FactoryResetReason</a>

To get  value, use code similar to:
```javascript
_powermanagerManager.factoryReset().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.factoryReset = value;
```

keyLightBrightness is of type integer

To get  value, use code similar to:
```javascript
_powermanagerManager.keyLightBrightness().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.keyLightBrightness = value;
```

keyLightEnabled is of type boolean

To get  value, use code similar to:
```javascript
_powermanagerManager.keyLightEnabled().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.keyLightEnabled = value;
```

screenBrightness is of type integer

To get  value, use code similar to:
```javascript
_powermanagerManager.screenBrightness().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.screenBrightness = value;
```

screenEnabled is of type boolean

To get  value, use code similar to:
```javascript
_powermanagerManager.screenEnabled().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_powermanagerManager.screenEnabled = value;
```




### Methods
&nbsp;&nbsp;[powerOff](#interface_Powermanager_method_powerOff)  [reboot](#interface_Powermanager_method_reboot)  


  powerOff()

  Resolves with void

  Rejects with void

---

  reboot()

  Resolves with void

  Rejects with void

---