# AudioVolumeManager service

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
let _audiovolumeManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`AudioVolumeManager onsessionconnected`);
  lib_audiovolume.AudioVolumeManager.get(session).then((AudioVolumeManagerService) => {
  console.log(`Got AudioVolumeManager : #AudioVolumeManagerService.service_id}`);
  _audiovolumeManager = AudioVolumeManagerService;
}).catch((e) => {
  console.log(`Error calling AudioVolumeManager service${JSON.stringify(e)}`);
  _audiovolumeManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`AudioVolumeManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_audiovolumeManager** as AudioVolumeManager service instance.

This service implements the [AudioVolume](#interface_AudioVolume) interface.

---

## AudioVolumeState enumeration
```javascript
{
  NONE,
  VOLUME_UP,
  VOLUME_DOWN,
  VOLUME_SHOW
}
```

---


---




## AudioVolume Interface



### Methods
&nbsp;&nbsp;[requestVolumeDown](#interface_AudioVolume_method_requestVolumeDown)  [requestVolumeShow](#interface_AudioVolume_method_requestVolumeShow)  [requestVolumeUp](#interface_AudioVolume_method_requestVolumeUp)  


  requestVolumeDown()

  Resolves with void

  Rejects with void

---

  requestVolumeShow()

  Resolves with void

  Rejects with void

---

  requestVolumeUp()

  Resolves with void

  Rejects with void

---




### Events
&nbsp;&nbsp;[AUDIO_VOLUME_CHANGED](#interface_AudioVolume_event_AUDIO_VOLUME_CHANGED)  


The AUDIO_VOLUME_CHANGED event emits a <a href="#enumeration_AudioVolumeState">AudioVolumeState</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_audiovolumeManager.addEventListener(_audiovolumeManager.AUDIO_VOLUME_CHANGED_EVENT, handleEvent);
_audiovolumeManager.removeEventListener(_audiovolumeManager.AUDIO_VOLUME_CHANGED_EVENT, handleEvent);
```
---