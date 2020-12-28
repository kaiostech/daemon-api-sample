/* global lib_session, lib_apps */

(function (exports) {
  let _appsManager = null;
  let session = null;

  /**
   * lib_session
   * lib_apps.AppsManager
   * lib_apps.AppsManagerService
   *
   * */

  function AppsServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[AppsServiceManager] onsessionconnected');
      lib_apps.AppsManager.get(session).then((AppsManagerService) => {
        console.log(`Got AppsManagerService : #${AppsManagerService.service_id}`);
        _appsManager = AppsManagerService;
      }).catch((e) => {
        console.log(`Error calling AppsManagerService service${JSON.stringify(e)}`);
        _appsManager = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log('[AppsServiceManager] onsessiondisconnected Daemon Crashed');
    };

    // On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
    session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
  }

  AppsServiceManager.prototype = {
    getAll: function getAll(callback) {
      _appsManager.getAll().then((apps) => {
        callback('success', apps);
      }, () => {
        callback('error');
      });
    },

    getApp: function getApp(appManifestUrl, callback) {
      _appsManager.getApp(appManifestUrl).then((app) => {
        callback(app, 'success');
      }, () => {
        callback('error');
      });
    },

    getState: function getState(callback) {
      _appsManager.getState().then((state) => {
        callback('success', state);
      }, () => {
        callback('error');
      });
    },

    installPackage: function installPackage(appManifestUrl, callback) {
      _appsManager.installPackage(appManifestUrl).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    uninstall: function uninstall(appManifest, callback) {
      _appsManager.uninstall(appManifest).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    update: function update(appManifest, callback) {
      _appsManager.update(appManifest).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    checkForUpdate: function checkForUpdate(appManifest, option, callback) {
      _appsManager.checkForUpdate(appManifest, option).then((date) => {
        callback('success', date);
      }, () => {
        callback('error');
      });
    },

    installPwa: function installPwa(appManifest, callback) {
      _appsManager.installPwa(appManifest).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    setEnabled: function setEnabled(appManifest, status, callback) {
      _appsManager.setEnabled(appManifest, status).then((date) => {
        callback(`success:${date}`);
      }, () => {
        callback('error');
      });
    },

    observeAppDownloadFaild: function observeAppDownloadFaild(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_DOWNLOAD_FAILED_EVENT,
        callback,
      );
      console.log('start observeAppDownloadFaild');
    },

    unobserveAppDownloadFaild: function unobserveAppDownloadFaild(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_DOWNLOAD_FAILED_EVENT,
        callback,
      );
      console.log('stop observeAppDownloadFaild');
    },

    observeAppInstalled: function observeAppInstalled(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_INSTALLED_EVENT,
        callback,
      );
      console.log('start observeAppInstalled');
    },

    unobserveAppInstalled: function unobserveAppInstalled(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_INSTALLED_EVENT,
        callback,
      );
      console.log('stop observeAppInstalled');
    },

    observeAppInstalling: function observeAppInstalling(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_INSTALLING_EVENT,
        callback,
      );
      console.log('start observeAppInstalling');
    },

    unobserveAppInstalling: function unobserveAppInstalling(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_INSTALLING_EVENT,
        callback,
      );
      console.log('stop observeAppInstalling');
    },

    observeAppUninstalled: function observeAppUninstalled(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_UNINSTALLED_EVENT,
        callback,
      );
      console.log('start observeAppUninstalled');
    },

    unobserveAppUninstalled: function unobserveAppUninstalled(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_UNINSTALLED_EVENT,
        callback,
      );
      console.log('stop observeAppUninstalled');
    },

    observeAppUpdateAvailable: function observeAppUpdateAvailable(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_UPDATE_AVAILABLE_EVENT,
        callback,
      );
      console.log('start observeAppUpdateAvailable');
    },

    unobserveAppUpdateAvailable: function unobserveAppUpdateAvailable(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_UPDATE_AVAILABLE_EVENT,
        callback,
      );
      console.log('stop observeAppUpdateAvailable');
    },

    observeAppUpdate: function observeAppUpdate(callback) {
      _appsManager.addEventListener(
        _appsManager.APP_UPDATED_EVENT,
        callback,
      );
      console.log('start observeAppUpdate');
    },

    unobserveAppUpdate: function unobserveAppUpdate(callback) {
      _appsManager.removeEventListener(
        _appsManager.APP_UPDATED_EVENT,
        callback,
      );
      console.log('stop observeAppUpdate');
    },

    observeAppStatusChanged: function observeAppStatusChanged(callback) {
      _appsManager.addEventListener(
        _appsManager.APPSTATUS_CHANGED_EVENT,
        callback,
      );
      console.log('start observeAppStatusChanged');
    },

    unobserveAppStatusChanged: function unobserveAppStatusChanged(callback) {
      _appsManager.removeEventListener(
        _appsManager.APPSTATUS_CHANGED_EVENT,
        callback,
      );
      console.log('stop observeAppStatusChanged');
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[AppsServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.AppsServiceManager = AppsServiceManager;
}(window));
