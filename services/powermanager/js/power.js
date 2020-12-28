/* global lib_session, lib_powermanager */

(function (exports) {
  let _powerManagerService = null;
  let session = null;
  /**
   * lib_session
   * lib_powermanager.PowermanagerService
   * lib_powermanager.Powermanager
   *
   * */

  function PowerServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[PowerServiceManager] onsessionconnected');
      lib_powermanager.PowermanagerService.get(session).then((powermanager) => {
        console.log(`Got PowermanagerService : #${powermanager.service_id}`);
        _powerManagerService = powermanager;
      }).catch((e) => {
        console.log(`Error calling powermanager service${JSON.stringify(e)}`);
        _powerManagerService = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log('[PowerServiceManager] onsessiondisconnected Daemon Crashed');
    };

    // On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
    session.open(
      'websocket',
      'localhost',
      'secrettoken',
      sessionstate,
      true,
    );
  }

  PowerServiceManager.prototype = {
    powerOff: function powerOff(callback) {
      console.log('Calling powerOff');
      _powerManagerService.powerOff().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    reboot: function reboot(callback) {
      console.log('Calling reboot');
      _powerManagerService.reboot().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    factoryReset: function factoryReset(type) {
      console.log(`Calling factoryReset:${type}`);
      _powerManagerService.factoryReset = type;
    },

    getScreenEnabled: function getScreenEnabled(callback) {
      console.log('Calling getScreenEnabled');
      _powerManagerService.screenEnabled.then((enabled) => {
        callback(enabled, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setScreenEnabled: function setScreenEnabled(enabled) {
      console.log('Calling setScreenEnabled');
      _powerManagerService.screenEnabled = enabled;
    },

    getExtScreenEnabled: function getExtScreenEnabled(callback) {
      console.log('Calling getExtScreenEnabled');
      _powerManagerService.extScreenEnabled.then((enabled) => {
        callback(enabled, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setExtScreenEnabled: function setExtScreenEnabled(enabled) {
      console.log('Calling setExtScreenEnabled');
      _powerManagerService.extScreenEnabled = enabled;
    },

    getKeyLightEnabled: function getKeyLightEnabled(callback) {
      console.log('Calling getKeyLightEnabled');
      _powerManagerService.keyLightEnabled.then((enabled) => {
        callback(enabled, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setKeyLightEnabled: function setKeyLightEnabled(enabled) {
      console.log('Calling setKeyLightEnabled');
      _powerManagerService.keyLightEnabled = enabled;
    },

    getScreenBrightness: function getScreenBrightness(callback) {
      console.log('Calling getScreenBrightness');
      _powerManagerService.screenBrightness.then((brightness) => {
        callback(brightness, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setScreenBrightness: function setScreenBrightness(brightness) {
      console.log('Calling setScreenBrightness');
      _powerManagerService.screenBrightness = brightness;
    },

    getExtScreenBrightness: function getExtScreenBrightness(callback) {
      console.log('Calling getExtScreenBrightness');
      _powerManagerService.extScreenBrightness.then((brightness) => {
        callback(brightness, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setExtScreenBrightness: function setExtScreenBrightness(brightness) {
      console.log('Calling setExtScreenBrightness');
      _powerManagerService.extScreenBrightness = brightness;
    },

    getKeyLightBrightness: function getKeyLightBrightness(callback) {
      console.log('Calling getKeyLightBrightness');
      _powerManagerService.keyLightEnabled.then((brightness) => {
        callback(brightness, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setKeyLightBrightness: function setKeyLightBrightness(brightness) {
      console.log('Calling setKeyLightBrightness');
      _powerManagerService.keyLightBrightness = brightness;
    },

    getCpuSleepAllowed: function getCpuSleepAllowed(callback) {
      console.log('Calling getCpuSleepAllowed');
      _powerManagerService.cpuSleepAllowed.then((enabled) => {
        callback(enabled, 'success');
      }, () => {
        callback(0, 'error');
      });
    },

    setCpuSleepAllowed: function setCpuSleepAllowed(allowed) {
      console.log('Calling setCpuSleepAllowed');
      _powerManagerService.cpuSleepAllowed = allowed;
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[PowerServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.PowerServiceManager = PowerServiceManager;
}(window));
