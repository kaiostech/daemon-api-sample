# AppsManager service

## Instanciating the service

### Request related permission in APP's manifest file and import needed daemon files

```javascript
"webapps-manage": {}
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
let _appsManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`AppsManager onsessionconnected`);
  lib_apps.AppsManager.get(session).then((AppsManagerService) => {
  console.log(`Got AppsManager : #AppsManagerService.service_id}`);
  _appsManager = AppsManagerService;
}).catch((e) => {
  console.log(`Error calling AppsManager service${JSON.stringify(e)}`);
  _appsManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`AppsManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_appsManager** as AppsManager service instance.

This service implements the [AppsEngine](#interface_AppsEngine) interface.

---

## AppsInstallState enumeration
```javascript
{
  INSTALLED,
  INSTALLING,
  PENDING
}
```

## AppsServiceError enumeration
```javascript
{
  APP_NOT_FOUND,
  CLEAR_DATA_ERROR,
  DISK_SPACE_NOT_ENOUGH,
  DOWNLOAD_MANIFEST_FAILED,
  DOWNLOAD_PACKAGE_FAILED,
  DUPLICATED_ACTION,
  INVALID_APP_NAME,
  INVALID_START_URL,
  INVALID_STATE,
  INVALID_MANIFEST,
  INVALID_PACKAGE,
  INVALID_SIGNATURE,
  INVALID_CERTIFICATE,
  NETWORK_FAILURE,
  FILESYSTEM_FAILURE,
  PACKAGE_CORRUPT,
  REGISTRATION_ERROR,
  REINSTALL_FORBIDDEN,
  UPDATE_ERROR,
  UNKNOWN_ERROR
}
```

## AppsServiceState enumeration
```javascript
{
  INITIALIZING,
  RUNNING,
  TERMINATING
}
```

## AppsStatus enumeration
```javascript
{
  ENABLED,
  DISABLED
}
```

## AppsUpdateState enumeration
```javascript
{
  IDLE,
  AVAILABLE,
  DOWNLOADING,
  UPDATING,
  PENDING
}
```

## ClearType enumeration
```javascript
{
  BROWSER,
  STORAGE
}
```

## ConnectionType enumeration
```javascript
{
  WI_FI_ONLY,
  ANY
}
```

---


## AppsObject dictionnary
```javascript
{
  name: string,
  installState: <a href="#enumeration_AppsInstallState">AppsInstallState</a>,
  manifestUrl: string,
  status: <a href="#enumeration_AppsStatus">AppsStatus</a>,
  updateState: <a href="#enumeration_AppsUpdateState">AppsUpdateState</a>,
  updateUrl: string,
  allowedAutoDownload: boolean
}
```

## AppsOptions dictionnary
```javascript
{
  autoInstall: boolean?
}
```

---




## AppsEngine Interface



### Methods
&nbsp;&nbsp;[checkForUpdate](#interface_AppsEngine_method_checkForUpdate)  [clear](#interface_AppsEngine_method_clear)  [getAll](#interface_AppsEngine_method_getAll)  [getApp](#interface_AppsEngine_method_getApp)  [getState](#interface_AppsEngine_method_getState)  [installPackage](#interface_AppsEngine_method_installPackage)  [installPwa](#interface_AppsEngine_method_installPwa)  [setEnabled](#interface_AppsEngine_method_setEnabled)  [setUpdatePolicy](#interface_AppsEngine_method_setUpdatePolicy)  [uninstall](#interface_AppsEngine_method_uninstall)  [update](#interface_AppsEngine_method_update)  [verify](#interface_AppsEngine_method_verify)  


  checkForUpdate(/* , updateUrl */ string/* , appsOption */ <a href="#dictionary_AppsOptions">AppsOptions</a>)

  Resolves with boolean

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  clear(/* , manifestUrl */ string/* , dataType */ <a href="#enumeration_ClearType">ClearType</a>)

  Resolves with boolean

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  getAll()

  Resolves with <a href="#dictionary_AppsObject">[AppsObject]?</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  getApp(/* , manifestUrl */ string)

  Resolves with <a href="#dictionary_AppsObject">AppsObject</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  getState()

  Resolves with <a href="#enumeration_AppsServiceState">AppsServiceState</a>

  Rejects with void

---

  installPackage(/* , updateUrl */ string)

  Resolves with <a href="#dictionary_AppsObject">AppsObject</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  installPwa(/* , manifestUrl */ string)

  Resolves with <a href="#dictionary_AppsObject">AppsObject</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  setEnabled(/* , manifestUrl */ string/* , status */ <a href="#enumeration_AppsStatus">AppsStatus</a>)

  Resolves with <a href="#dictionary_AppsObject">AppsObject</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  setUpdatePolicy(/* , enabled */ boolean/* , allowedType */ <a href="#enumeration_ConnectionType">ConnectionType</a>/* , delay */ integer)

  Resolves with boolean

  Rejects with void

---

  uninstall(/* , manifestUrl */ string)

  Resolves with string

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  update(/* , manifestUrl */ string)

  Resolves with <a href="#dictionary_AppsObject">AppsObject</a>

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---

  verify(/* , manifestUrl */ string/* , certType */ string/* , folderName */ string)

  Resolves with string

  Rejects with <a href="#enumeration_AppsServiceError">AppsServiceError</a>

---




### Events
&nbsp;&nbsp;[APP_DOWNLOAD_FAILED](#interface_AppsEngine_event_APP_DOWNLOAD_FAILED)  [APP_INSTALLED](#interface_AppsEngine_event_APP_INSTALLED)  [APP_INSTALLING](#interface_AppsEngine_event_APP_INSTALLING)  [APP_UNINSTALLED](#interface_AppsEngine_event_APP_UNINSTALLED)  [APP_UPDATE_AVAILABLE](#interface_AppsEngine_event_APP_UPDATE_AVAILABLE)  [APP_UPDATED](#interface_AppsEngine_event_APP_UPDATED)  [APPSTATUS_CHANGED](#interface_AppsEngine_event_APPSTATUS_CHANGED)  


The APP_DOWNLOAD_FAILED event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_DOWNLOAD_FAILED_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_DOWNLOAD_FAILED_EVENT, handleEvent);
```
---

The APP_INSTALLED event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_INSTALLED_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_INSTALLED_EVENT, handleEvent);
```
---

The APP_INSTALLING event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_INSTALLING_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_INSTALLING_EVENT, handleEvent);
```
---

The APP_UNINSTALLED event emits a string

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_UNINSTALLED_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_UNINSTALLED_EVENT, handleEvent);
```
---

The APP_UPDATE_AVAILABLE event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_UPDATE_AVAILABLE_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_UPDATE_AVAILABLE_EVENT, handleEvent);
```
---

The APP_UPDATED event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APP_UPDATED_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APP_UPDATED_EVENT, handleEvent);
```
---

The APPSTATUS_CHANGED event emits a <a href="#dictionary_AppsObject">AppsObject</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_appsManager.addEventListener(_appsManager.APPSTATUS_CHANGED_EVENT, handleEvent);
_appsManager.removeEventListener(_appsManager.APPSTATUS_CHANGED_EVENT, handleEvent);
```
---

