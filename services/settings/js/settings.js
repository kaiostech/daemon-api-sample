/* global lib_session, lib_settings */

(function (exports) {
  let _settingsService = null;
  let observer = null;
  let session = null;

  /**
   * lib_session
   * lib_settings.SettingsManager
   * */

  function createObserver() {
    class Observer extends lib_settings.SettingObserverBase {
      // eslint-disable-next-line no-shadow
      constructor(service, session) {
        super(service.id, session);
      }

      // eslint-disable-next-line class-methods-use-this
      display() {
        return 'Setting observer';
      }

      // eslint-disable-next-line class-methods-use-this
      callback(setting) {
        console.log('MyObserver::callback', setting);
        return Promise.resolve('MyObserver success');
      }
    }
    observer = new Observer(_settingsService, session);
  }

  function SettingsServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[SettingsServiceManager] onsessionconnected');
      lib_settings.SettingsManager.get(session).then((settings) => {
        console.log(`Got SettingsService : #${settings.service_id}`);
        _settingsService = settings;
        createObserver();
      }).catch((e) => {
        console.log(
          `Error calling SettingsService service${JSON.stringify(e)}`,
        );
        _settingsService = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log(
        '[SettingsServiceManager] onsessiondisconnected Daemon Crashed',
      );
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

  SettingsServiceManager.prototype = {
    set: function set(keys, callback) {
      _settingsService.set(keys).then((value) => {
        callback('success', value);
      }, () => {
        callback('error');
      });
    },

    get: function get(key, callback) {
      _settingsService.get(key).then((value) => {
        callback('success', value);
      }, () => {
        callback('error');
      });
    },

    getBatch: function getBatch(keys, callback) {
      _settingsService.getBatch(keys).then((value) => {
        callback('success', value);
      }, () => {
        callback('error');
      });
    },

    clear: function clear() {
      _settingsService.clear().then(() => {
        console.log('success');
      }, () => {
        console.log('error');
      });
    },

    addObserver: function addObserver(name, callback) {
      _settingsService.addObserver(name, observer).then((res) => {
        callback('addObserver success', res);
      }, (e) => {
        callback('addObserver error', e);
      });
    },

    removeObserver: function removeObserver(name, callback) {
      _settingsService.removeObserver(name, observer).then((res) => {
        callback('removeObserver success', res);
      }, (e) => {
        callback('removeObserver error', e);
      });
    },

    observeSettingInfoChange: function observeSettingInfoChange(callback) {
      _settingsService.addEventListener(
        _settingsService.CHANGE_EVENT,
        callback,
      );
    },

    unobserveSettingInfoChange: function unobserveSettingInfoChange(callback) {
      _settingsService.removeEventListener(
        _settingsService.CHANGE_EVENT,
        callback,
      );
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[SettingsServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.SettingsServiceManager = SettingsServiceManager;
}(window));
