/* global utils, AppsServiceManager, naviBoard */

const AppsManagerService = {
  _appsManagerService: null,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  appDownloadFaildCallback: () => {
    console.log('appDownloadFaild callback');
  },
  appInstalledCallback: () => {
    console.log('appInstalled callback');
  },
  appInstallingCallback: () => {
    console.log('appInstalling callback');
  },
  appUninstalledCallback: () => {
    console.log('appUninstalled callback');
  },
  appUpdateAvailableCallback: () => {
    console.log('appUpdateAvailable callback');
  },
  appUpdateCallback: () => {
    console.log('appUpdate callback');
  },
  appStatusChangedCallback: () => {
    console.log('appStatusChanged callback');
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, AppsManagerService);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('appsManagerNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'getAll':
          this._appsManagerService.getAll((status, apps) => {
            console.log(`call getAll status ${status} Apps:${apps}`);
            apps.forEach((app) => {
              const { name, manifestUrl } = app;
              console.log(`app-name:${name} app-manifest:${manifestUrl}`);
            });
          });
          break;
        case 'getApp':
          this._appsManagerService
            .getApp('http://calculator.localhost/manifest.webapp', (app, status) => {
              const { name, manifestUrl } = app;
              console.log(`call getApp status ${status}`);
              console.log(`app-name:${name} app-manifest:${manifestUrl}`);
            });
          break;
        case 'getState':
          this._appsManagerService.getState((status, state) => {
            console.log(`call getState status ${status} state:${state}`);
          });
          break;
        case 'installPackage':
          this._appsManagerService
            .installPackage('https://api.kaiostech.com/apps/manifest/RZzvAt4g1Je76j4CycaM', (status) => {
              console.log(`call installPackage status ${status}`);
            });
          break;
        case 'uninstall':
          this._appsManagerService
            .uninstall('http://ciautotest.localhost/manifest.webapp', (status) => {
              console.log(`call uninstall status ${status}`);
            });
          break;
        case 'update':
          this._appsManagerService
            .update('http://ciautotest.localhost/manifest.webapp', (status) => {
              console.log(`call update status ${status}`);
            });
          break;
        case 'checkForUpdate':
          this._appsManagerService
            .checkForUpdate(
              'https://api.kaiostech.com/apps/manifest/RZzvAt4g1Je76j4CycaM',
              { autoInstall: false },
              (status) => {
                console.log(`call checkForUpdate status ${status}`);
              },
            );
          break;
        case 'installPwa':
          this._appsManagerService
            .installPwa('https://testpwa.github.io/manifest.webmanifest', (status) => {
              console.log(`call installPwa status ${status}`);
            });
          break;
        case 'setEnabled':
          this._appsManagerService
            .setEnabled('http://ciautotest.localhost/manifest.webapp', 0, (status) => {
              console.log(`call setEnabled status ${status}`);
            });
          break;
        case 'observeAppDownloadFaild':
          this._appsManagerService
            .observeAppDownloadFaild(this.appDownloadFaildCallback);
          break;
        case 'unobserveAppDownloadFaild':
          this._appsManagerService
            .unobserveAppDownloadFaild(this.appDownloadFaildCallback);
          break;
        case 'observeAppInstalled':
          this._appsManagerService
            .observeAppInstalled(this.appInstalledCallback);
          break;
        case 'unobserveAppInstalled':
          this._appsManagerService
            .unobserveAppInstalled(this.appInstalledCallback);
          break;
        case 'observeAppInstalling':
          this._appsManagerService
            .observeAppInstalling(this.appInstallingCallback);
          break;
        case 'unobserveAppInstalling':
          this._appsManagerService
            .unobserveAppInstalling(this.appInstallingCallback);
          break;
        case 'observeAppUninstalled':
          this._appsManagerService
            .observeAppUninstalled(this.appUninstalledCallback);
          break;
        case 'unobserveAppUninstalled':
          this._appsManagerService
            .unobserveAppUninstalled(this.appUninstalledCallback);
          break;
        case 'observeAppUpdateAvailable':
          this._appsManagerService
            .observeAppUpdateAvailable(this.appUpdateAvailableCallback);
          break;
        case 'unobserveAppUpdateAvailable':
          this._appsManagerService
            .unobserveAppUpdateAvailable(this.appUpdateAvailableCallback);
          break;
        case 'observeAppUpdate':
          this._appsManagerService
            .observeAppUpdate(this.appUpdateCallback);
          break;
        case 'unobserveAppUpdate':
          this._appsManagerService
            .unobserveAppUpdate(this.appUpdateCallback);
          break;
        case 'observeAppStatusChanged':
          this._appsManagerService
            .observeAppStatusChanged(this.appStatusChangedCallback);
          break;
        case 'unobserveAppStatusChanged':
          this._appsManagerService
            .unobserveAppStatusChanged(this.appStatusChangedCallback);
          break;
        default:
          break;
      }
    }));

    this._appsManagerService = new AppsServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('appsManagerNavigationArea');
    this._appsManagerService.closeSession();
    utils.destroyService(this);
  },
};
