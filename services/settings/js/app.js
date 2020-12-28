/* global utils, SettingsServiceManager, naviBoard */

const SettingsService = {
  _settingsService: null,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, SettingsService);
  },
  observeCallback: (state, result) => {
    console.log('Observer callback, result:', result);
  },
  changeEventCallback: (result) => {
    console.log('observeSettingInfoChange callback, result:', result);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('settingsNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'set': {
          const keys = [{
            name: 'key-bool',
            value: true,
          }, {
            name: 'key-int',
            value: 1234,
          }, {
            name: 'key-float',
            value: 12.34,
          }, {
            name: 'key-str',
            value: 'this-is-a-string',
          }, {
            name: 'key-other',
            value: 'this-is-also-a-string',
          }, {
            name: 'key-object',
            value: {
              a: 'b',
              number: 4321,
            },
          }];
          this._settingsService.set(keys, (status, value) => {
            console.log(`call set status ${status} value:`, value);
          });
          break;
        }
        case 'get': {
          const key1 = 'key-object';
          this._settingsService.get(key1, (status, value) => {
            console.log(`call setTime status ${status} value:`, value);
          });
          break;
        }
        case 'getBatch': {
          const batchKeys = ['key-bool', 'key-int', 'key-float', 'key-str'];
          this._settingsService.getBatch(batchKeys, (status, value) => {
            console.log(`call setTime status ${status} value:`, value);
          });
          break;
        }
        case 'clear': {
          this._settingsService.clear();
          break;
        }
        case 'addObserver': {
          this._settingsService.addObserver('key-int', this.observeCallback);
          break;
        }
        case 'removeObserver': {
          this._settingsService.removeObserver('key-int', this.observeCallback);
          break;
        }
        case 'observeSettingInfoChange': {
          this._settingsService.observeSettingInfoChange(
            this.changeEventCallback,
          );
          break;
        }
        case 'unobserveSettingInfoChange': {
          this._settingsService.unobserveSettingInfoChange(
            this.changeEventCallback,
          );
          break;
        }
        default:
          break;
      }
    }));

    this._settingsService = new SettingsServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('settingsNavigationArea');
    utils.destroyService(this);
    this._settingsService.closeSession();
  },
};
