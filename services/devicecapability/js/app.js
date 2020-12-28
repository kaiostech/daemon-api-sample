/* global utils, DeviceCapabilityServiceManager, naviBoard */

const DevicecapabilityService = {
  _deviceCapabilityService: null,
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
    utils.serviceDomEventHandler(event, DevicecapabilityService);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('devicecapabilityNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'get':
          this._deviceCapabilityService.get('device.bt', (status, state) => {
            console.log(`call get bt capability status ${status} state:${state}`);
          });

          this._deviceCapabilityService.get('ro.teereader.enabled', (status, state) => {
            console.log(`call get teereader capability status ${status} state:${state}`);
          });

          this._deviceCapabilityService.get('this-name-does-not-exist', (status, state) => {
            console.log(`call not exist name capability status ${status} state:${state}`);
          });
          break;
        default:
          break;
      }
    }));

    this._deviceCapabilityService = new DeviceCapabilityServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('devicecapabilityNavigationArea');
    this._deviceCapabilityService.closeSession();
    utils.destroyService(this);
  },
};
