# Telephony service

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
let _telephonyManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`Telephony onsessionconnected`);
  lib_telephony.Telephony.get(session).then((TelephonyService) => {
  console.log(`Got Telephony : #TelephonyService.service_id}`);
  _telephonyManager = TelephonyService;
}).catch((e) => {
  console.log(`Error calling Telephony service${JSON.stringify(e)}`);
  _telephonyManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`Telephony onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_telephonyManager** as Telephony service instance.

This service implements the [TelephonyManager](#interface_TelephonyManager) interface.

---

## CallState enumeration
```javascript
{
  IDLE,
  RINGING,
  OFFHOOK
}
```

---


---




## TelephonyManager Interface

### Members

[callState](#interface_TelephonyManager_member_callState)


callState is of type <a href="#enumeration_CallState">CallState</a>

To get  value, use code similar to:
```javascript
_telephonyManager.callState().then(value => { ... });
```
To set  value, use code similar to:
```javascript
_telephonyManager.callState = value;
```






### Events
&nbsp;&nbsp;[CALLSTATE_CHANGE](#interface_TelephonyManager_event_CALLSTATE_CHANGE)  


The CALLSTATE_CHANGE event emits a <a href="#enumeration_CallState">CallState</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_telephonyManager.addEventListener(_telephonyManager.CALLSTATE_CHANGE_EVENT, handleEvent);
_telephonyManager.removeEventListener(_telephonyManager.CALLSTATE_CHANGE_EVENT, handleEvent);
```
---
 


