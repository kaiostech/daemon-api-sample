/* global lib_session, lib_devicecapability */

(function (exports) {
  let _deviceCapability = null;
  let session = null;

  /**
   * lib_session
   * lib_devicecapability.DeviceCapabilityManager
   * lib_devicecapability.deviceCapabilityService
   *
   * */

  function DeviceCapabilityServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[DeviceCapabilityServiceManager] onsessionconnected');
      lib_devicecapability.DeviceCapabilityManager.get(session).then((deviceCapabilityService) => {
        console.log(`Got deviceCapabilityService : #${deviceCapabilityService.service_id}`);
        _deviceCapability = deviceCapabilityService;
      }).catch((e) => {
        console.log(`Error calling deviceCapability service${JSON.stringify(e)}`);
        _deviceCapability = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log('[DeviceCapabilityServiceManager] onsessiondisconnected Daemon Crashed');
    };

    // On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
    session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
  }

  DeviceCapabilityServiceManager.prototype = {
    get: function get(capability, callback) {
      _deviceCapability.get(capability).then((state) => {
        callback('success', state);
      }, () => {
        callback('error');
      });
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[DeviceCapabilityServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.DeviceCapabilityServiceManager = DeviceCapabilityServiceManager;
}(window));
