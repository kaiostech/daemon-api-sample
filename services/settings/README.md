# SettingsManager service

## Instanciating the service

### Request related permission in APP's manifest file and import needed daemon files

```javascript
"settings": { "access": "readwrite" }
``` 

Load the following scripts:

```html
<script src="http://127.0.0.1/api/v1/shared/core.js"></script>
<script src="http://127.0.0.1/api/v1/shared/session.js"></script>
<script src="http://127.0.0.1/api/v1/settings/service.js"></script>
```

You can then get an instance of the service with code similar to:

```javascript
const session = new lib_session.Session();
const sessionstate = {};
let _settingsManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`SettingsManager onsessionconnected`);
  lib_settings.SettingsManager.get(session).then((SettingsManagerService) => {
  console.log(`Got SettingsManager : #SettingsManagerService.service_id}`);
  _settingsManager = SettingsManagerService;
}).catch((e) => {
  console.log(`Error calling SettingsManager service${JSON.stringify(e)}`);
  _settingsManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`SettingsManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_settingsManager** as SettingsManager service instance.

This service implements the [SettingsFactory](#interface_SettingsFactory) interface.

---

## GetErrorReason enumeration
```javascript
{
  UNKNOWN_ERROR,
  NON_EXISTING_SETTING
}
```

---


## GetError dictionnary
```javascript
{
  name: string,
  reason: <a href="#enumeration_GetErrorReason">GetErrorReason</a>
}
```

## SettingInfo dictionnary
```javascript
{
  name: string,
  value: json
}
```

---


## SettingObserver callback object
### Creating a SettingObserver object
Use code similar to:
```javascript
class MyCallbackObject extends lib_settings.SettingObserverBase {
  constructor(service, session) {
    super(service.id, session);
  }
  
    callback(...) {
      ...
  }
  
```

### Methods

[callback](#callback_SettingObserver_method_callback)


callback(/* , setting */ <a href="#dictionary_SettingInfo">SettingInfo</a>)

Resolves with void

Rejects with void




## SettingsFactory Interface



### Methods
&nbsp;&nbsp;[addObserver](#interface_SettingsFactory_method_addObserver)  [clear](#interface_SettingsFactory_method_clear)  [get](#interface_SettingsFactory_method_get)  [getBatch](#interface_SettingsFactory_method_getBatch)  [removeObserver](#interface_SettingsFactory_method_removeObserver)  [set](#interface_SettingsFactory_method_set)  


  addObserver(/* , name */ string/* , observer */ <a href="#callback_SettingObserver">SettingObserver</a>)

  Resolves with void

  Rejects with void

---

  clear()

  Resolves with void

  Rejects with void

---

  get(/* , name */ string)

  Resolves with <a href="#dictionary_SettingInfo">SettingInfo</a>

  Rejects with <a href="#dictionary_GetError">GetError</a>

---

  getBatch(/* , name */ [string])

  Resolves with <a href="#dictionary_SettingInfo">[SettingInfo]</a>

  Rejects with void

---

  removeObserver(/* , name */ string/* , observer */ <a href="#callback_SettingObserver">SettingObserver</a>)

  Resolves with void

  Rejects with void

---

  set(/* , settings */ <a href="#dictionary_SettingInfo">[SettingInfo]</a>)

  Resolves with void

  Rejects with void

---




### Events
&nbsp;&nbsp;[CHANGE](#interface_SettingsFactory_event_CHANGE)  


The CHANGE event emits a <a href="#dictionary_SettingInfo">SettingInfo</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_settingsManager.addEventListener(_settingsManager.CHANGE_EVENT, handleEvent);
_settingsManager.removeEventListener(_settingsManager.CHANGE_EVENT, handleEvent);
```
---
