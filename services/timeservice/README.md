# TimeService service

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
let _timeManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`TimeService onsessionconnected`);
  lib_time.TimeService.get(session).then((TimeServiceService) => {
  console.log(`Got TimeService : #TimeServiceService.service_id}`);
  _timeManager = TimeServiceService;
}).catch((e) => {
  console.log(`Error calling TimeService service${JSON.stringify(e)}`);
  _timeManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`TimeService onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_timeManager** as TimeService service instance.

This service implements the [Time](#interface_Time) interface.

---

## CallbackReason enumeration
```javascript
{
  NONE,
  TIME_CHANGED,
  TIMEZONE_CHANGED
}
```

---


---


## TimeObserver callback object
### Creating a TimeObserver object
Use code similar to:
```javascript
class MyCallbackObject extends lib_time.TimeObserverBase {
  constructor(service, session) {
    super(service.id, session);
  }
  
    callback(...) {
      ...
  }
  
```

### Methods

[callback](#callback_TimeObserver_method_callback)


callback(/* , reason */ <a href="#enumeration_CallbackReason">CallbackReason</a>)

Resolves with void

Rejects with void




## Time Interface



### Methods
&nbsp;&nbsp;[addObserver](#interface_Time_method_addObserver)  [get](#interface_Time_method_get)  [getElapsedRealTime](#interface_Time_method_getElapsedRealTime)  [removeObserver](#interface_Time_method_removeObserver)  [set](#interface_Time_method_set)  [setTimezone](#interface_Time_method_setTimezone)  


  addObserver(/* , reason */ <a href="#enumeration_CallbackReason">CallbackReason</a>/* , observer */ <a href="#callback_TimeObserver">TimeObserver</a>)

  Resolves with void

  Rejects with void

---

  get()

  Resolves with Date

  Rejects with void

---

  getElapsedRealTime()

  Resolves with integer

  Rejects with void

---

  removeObserver(/* , reason */ <a href="#enumeration_CallbackReason">CallbackReason</a>/* , observer */ <a href="#callback_TimeObserver">TimeObserver</a>)

  Resolves with void

  Rejects with void

---

  set(/* , time */ Date)

  Resolves with void

  Rejects with void

---

  setTimezone(/* , timezone */ string)

  Resolves with void

  Rejects with void

---




### Events
&nbsp;&nbsp;[TIME_CHANGED](#interface_Time_event_TIME_CHANGED)  [TIMEZONE_CHANGED](#interface_Time_event_TIMEZONE_CHANGED)  


The TIME_CHANGED event emits a void

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_timeManager.addEventListener(_timeManager.TIME_CHANGED_EVENT, handleEvent);
_timeManager.removeEventListener(_timeManager.TIME_CHANGED_EVENT, handleEvent);
```
---

The TIMEZONE_CHANGED event emits a void

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_timeManager.addEventListener(_timeManager.TIMEZONE_CHANGED_EVENT, handleEvent);
_timeManager.removeEventListener(_timeManager.TIMEZONE_CHANGED_EVENT, handleEvent);
```
---
 


